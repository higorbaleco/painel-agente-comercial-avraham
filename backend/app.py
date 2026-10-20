import os
import uuid
from datetime import datetime

from dotenv import load_dotenv

# Precisa rodar antes de importar database, que lê DATABASE_URL na importação
load_dotenv()

from flask import Flask, jsonify, request  # noqa: E402
from flask_cors import CORS  # noqa: E402
from sqlalchemy.exc import SQLAlchemyError  # noqa: E402

from database import SessionLocal, init_db  # noqa: E402
from models import Empresa  # noqa: E402

app = Flask(__name__)

ORIGENS_CORS = [
    origem.strip()
    for origem in os.getenv(
        'CORS_ORIGINS',
        'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174',
    ).split(',')
    if origem.strip()
]
CORS(app, origins=ORIGENS_CORS)

init_db()

PRIORIDADES = ('A', 'B', 'C')
STATUS_VALIDOS = (
    'nao-abordado',
    'tentativa-sem-contato',
    'conversou-sem-fit',
    'conversou-fit',
    'diagnostico-agendado',
    'proposta-enviada',
)
CAMPOS_TEXTO = ('neighborhood', 'phone', 'contact', 'facts', 'painHypothesis', 'notes')
LIMITE_NOME = 120
LIMITE_TEXTO = 2000


class ErroValidacao(Exception):
    """Entrada inválida: vira resposta 400."""


def _erro(mensagem: str, codigo: int):
    return jsonify({'error': mensagem}), codigo


def _corpo_json() -> dict:
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        raise ErroValidacao('Envie um objeto JSON válido.')
    return dados


def _validar(dados: dict, completo: bool) -> dict:
    """Valida os campos enviados. Em criação (completo=True) exige o conjunto todo."""
    limpo: dict = {}

    if completo or 'name' in dados:
        nome = dados.get('name')
        if not isinstance(nome, str) or not nome.strip():
            raise ErroValidacao('Nome é obrigatório.')
        if len(nome.strip()) > LIMITE_NOME:
            raise ErroValidacao(f'Nome deve ter até {LIMITE_NOME} caracteres.')
        limpo['name'] = nome.strip()

    if completo or 'priority' in dados:
        prioridade = dados.get('priority', 'B')
        if prioridade not in PRIORIDADES:
            raise ErroValidacao('Prioridade deve ser A, B ou C.')
        limpo['priority'] = prioridade

    if completo or 'status' in dados:
        status = dados.get('status', 'nao-abordado')
        if status not in STATUS_VALIDOS:
            raise ErroValidacao('Status inválido.')
        limpo['status'] = status

    for campo in CAMPOS_TEXTO:
        if completo or campo in dados:
            valor = dados.get(campo) or ''
            if not isinstance(valor, str):
                raise ErroValidacao(f'Campo {campo} deve ser texto.')
            if len(valor) > LIMITE_TEXTO:
                raise ErroValidacao(f'Campo {campo} excede {LIMITE_TEXTO} caracteres.')
            limpo[campo] = valor.strip()

    return limpo


# ============ CRUD ENDPOINTS ============

@app.route('/api/empresas', methods=['GET'])
def list_empresas():
    """Listar todas as empresas, mais recentes primeiro"""
    with SessionLocal() as db:
        empresas = db.query(Empresa).order_by(Empresa.createdAt.desc()).all()
        return jsonify({
            'empresas': [e.to_dict() for e in empresas],
            'total': len(empresas),
        }), 200


@app.route('/api/empresas', methods=['POST'])
def create_empresa():
    """Criar nova empresa. O ID é gerado no servidor."""
    try:
        dados = _validar(_corpo_json(), completo=True)
    except ErroValidacao as e:
        return _erro(str(e), 400)

    with SessionLocal() as db:
        try:
            empresa = Empresa(id=uuid.uuid4().hex, **dados)
            db.add(empresa)
            db.commit()
            db.refresh(empresa)
            return jsonify({
                'empresa': empresa.to_dict(),
                'message': 'Empresa criada com sucesso',
            }), 201
        except SQLAlchemyError:
            db.rollback()
            app.logger.exception('Falha ao criar empresa')
            return _erro('Não foi possível salvar a empresa.', 500)


@app.route('/api/empresas/<empresa_id>', methods=['GET'])
def get_empresa(empresa_id: str):
    """Obter uma empresa por ID"""
    with SessionLocal() as db:
        empresa = db.get(Empresa, empresa_id)
        if not empresa:
            return _erro('Empresa não encontrada', 404)
        return jsonify({'empresa': empresa.to_dict()}), 200


@app.route('/api/empresas/<empresa_id>', methods=['PUT'])
def update_empresa(empresa_id: str):
    """Atualizar campos enviados de uma empresa"""
    try:
        dados = _validar(_corpo_json(), completo=False)
    except ErroValidacao as e:
        return _erro(str(e), 400)

    with SessionLocal() as db:
        try:
            empresa = db.get(Empresa, empresa_id)
            if not empresa:
                return _erro('Empresa não encontrada', 404)

            for campo, valor in dados.items():
                setattr(empresa, campo, valor)
            empresa.updatedAt = datetime.utcnow()

            db.commit()
            db.refresh(empresa)
            return jsonify({
                'empresa': empresa.to_dict(),
                'message': 'Empresa atualizada com sucesso',
            }), 200
        except SQLAlchemyError:
            db.rollback()
            app.logger.exception('Falha ao atualizar empresa')
            return _erro('Não foi possível atualizar a empresa.', 500)


@app.route('/api/empresas/<empresa_id>', methods=['DELETE'])
def delete_empresa(empresa_id: str):
    """Excluir uma empresa"""
    with SessionLocal() as db:
        try:
            empresa = db.get(Empresa, empresa_id)
            if not empresa:
                return _erro('Empresa não encontrada', 404)

            db.delete(empresa)
            db.commit()
            return jsonify({'message': 'Empresa deletada com sucesso'}), 200
        except SQLAlchemyError:
            db.rollback()
            app.logger.exception('Falha ao excluir empresa')
            return _erro('Não foi possível excluir a empresa.', 500)


# ============ FILTROS E BUSCA ============

@app.route('/api/empresas/search', methods=['GET'])
def search_empresas():
    """Buscar empresas por nome ou bairro, com filtros de status e prioridade"""
    termo = request.args.get('q', '').strip()
    status = request.args.get('status')
    prioridade = request.args.get('priority')

    if status and status not in STATUS_VALIDOS:
        return _erro('Status inválido.', 400)
    if prioridade and prioridade not in PRIORIDADES:
        return _erro('Prioridade deve ser A, B ou C.', 400)

    with SessionLocal() as db:
        query = db.query(Empresa)
        if termo:
            query = query.filter(
                Empresa.name.icontains(termo, autoescape=True)
                | Empresa.neighborhood.icontains(termo, autoescape=True)
            )
        if status:
            query = query.filter(Empresa.status == status)
        if prioridade:
            query = query.filter(Empresa.priority == prioridade)

        empresas = query.order_by(Empresa.createdAt.desc()).all()
        return jsonify({
            'empresas': [e.to_dict() for e in empresas],
            'total': len(empresas),
        }), 200


# ============ ESTATÍSTICAS ============

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Obter estatísticas do painel"""
    with SessionLocal() as db:
        total = db.query(Empresa).count()
        contatos = db.query(Empresa).filter(
            Empresa.status.notin_(['nao-abordado', 'tentativa-sem-contato'])
        ).count()
        dores = db.query(Empresa).filter(
            Empresa.status.in_(['conversou-fit', 'diagnostico-agendado'])
        ).count()
        diagnosticos = db.query(Empresa).filter(
            Empresa.status == 'diagnostico-agendado'
        ).count()
        propostas = db.query(Empresa).filter(
            Empresa.status == 'proposta-enviada'
        ).count()

        taxa = (dores / contatos * 100) if contatos > 0 else 0

        return jsonify({
            'stats': {
                'total': total,
                'contatos': contatos,
                'dores': dores,
                'diagnosticos': diagnosticos,
                'propostas': propostas,
                'taxa': round(taxa, 1),
            }
        }), 200


# ============ HEALTH CHECK ============

@app.route('/api/health', methods=['GET'])
def health():
    """Verificar saúde da API"""
    return jsonify({'status': 'ok', 'message': 'API Agente Comercial está funcionando'}), 200


# ============ ERROR HANDLERS ============

@app.errorhandler(404)
def not_found(_error):
    return _erro('Endpoint não encontrado', 404)


@app.errorhandler(405)
def method_not_allowed(_error):
    return _erro('Método não permitido para este endpoint', 405)


@app.errorhandler(500)
def internal_error(_error):
    return _erro('Erro interno do servidor', 500)


if __name__ == '__main__':
    app.run(
        host=os.getenv('HOST', '127.0.0.1'),
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV', 'production') == 'development',
    )
