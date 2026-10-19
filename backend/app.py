from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from database import init_db, get_db, SessionLocal
from models import Empresa

load_dotenv()

app = Flask(__name__)
CORS(app)

# Inicializar banco de dados
init_db()

# ============ CRUD ENDPOINTS ============

@app.route('/api/empresas', methods=['GET'])
def list_empresas():
    """Listar todas as empresas"""
    db: Session = SessionLocal()
    try:
        empresas = db.query(Empresa).all()
        return jsonify({
            'empresas': [e.to_dict() for e in empresas],
            'total': len(empresas)
        }), 200
    finally:
        db.close()

@app.route('/api/empresas', methods=['POST'])
def create_empresa():
    """Criar nova empresa"""
    db: Session = SessionLocal()
    try:
        data = request.json

        # Validar campos obrigatórios
        if not data.get('name'):
            return jsonify({'error': 'Nome é obrigatório'}), 400

        empresa = Empresa(
            id=data.get('id', str(int(datetime.utcnow().timestamp() * 1000))),
            name=data.get('name'),
            neighborhood=data.get('neighborhood', ''),
            phone=data.get('phone', ''),
            contact=data.get('contact', ''),
            priority=data.get('priority', 'B'),
            status=data.get('status', 'nao-abordado'),
            facts=data.get('facts', ''),
            painHypothesis=data.get('painHypothesis', ''),
            notes=data.get('notes', '')
        )

        db.add(empresa)
        db.commit()
        db.refresh(empresa)

        return jsonify({
            'empresa': empresa.to_dict(),
            'message': 'Empresa criada com sucesso'
        }), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/empresas/<empresa_id>', methods=['GET'])
def get_empresa(empresa_id: str):
    """Obter uma empresa por ID"""
    db: Session = SessionLocal()
    try:
        empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()

        if not empresa:
            return jsonify({'error': 'Empresa não encontrada'}), 404

        return jsonify({'empresa': empresa.to_dict()}), 200
    finally:
        db.close()

@app.route('/api/empresas/<empresa_id>', methods=['PUT'])
def update_empresa(empresa_id: str):
    """Atualizar uma empresa"""
    db: Session = SessionLocal()
    try:
        empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()

        if not empresa:
            return jsonify({'error': 'Empresa não encontrada'}), 404

        data = request.json

        # Atualizar campos
        if 'name' in data:
            empresa.name = data['name']
        if 'neighborhood' in data:
            empresa.neighborhood = data['neighborhood']
        if 'phone' in data:
            empresa.phone = data['phone']
        if 'contact' in data:
            empresa.contact = data['contact']
        if 'priority' in data:
            empresa.priority = data['priority']
        if 'status' in data:
            empresa.status = data['status']
        if 'facts' in data:
            empresa.facts = data['facts']
        if 'painHypothesis' in data:
            empresa.painHypothesis = data['painHypothesis']
        if 'notes' in data:
            empresa.notes = data['notes']

        empresa.updatedAt = datetime.utcnow()

        db.commit()
        db.refresh(empresa)

        return jsonify({
            'empresa': empresa.to_dict(),
            'message': 'Empresa atualizada com sucesso'
        }), 200
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/empresas/<empresa_id>', methods=['DELETE'])
def delete_empresa(empresa_id: str):
    """Deletar uma empresa"""
    db: Session = SessionLocal()
    try:
        empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()

        if not empresa:
            return jsonify({'error': 'Empresa não encontrada'}), 404

        db.delete(empresa)
        db.commit()

        return jsonify({'message': 'Empresa deletada com sucesso'}), 200
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

# ============ FILTROS E BUSCA ============

@app.route('/api/empresas/search', methods=['GET'])
def search_empresas():
    """Buscar empresas por nome, bairro ou status"""
    db: Session = SessionLocal()
    try:
        query = db.query(Empresa)

        # Filtro por nome ou bairro
        search = request.args.get('q', '').lower()
        if search:
            query = query.filter(
                (Empresa.name.ilike(f'%{search}%')) |
                (Empresa.neighborhood.ilike(f'%{search}%'))
            )

        # Filtro por status
        status = request.args.get('status')
        if status:
            query = query.filter(Empresa.status == status)

        # Filtro por prioridade
        priority = request.args.get('priority')
        if priority:
            query = query.filter(Empresa.priority == priority)

        empresas = query.all()

        return jsonify({
            'empresas': [e.to_dict() for e in empresas],
            'total': len(empresas)
        }), 200
    finally:
        db.close()

# ============ ESTATÍSTICAS ============

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Obter estatísticas do painel"""
    db: Session = SessionLocal()
    try:
        total = db.query(Empresa).count()
        contatos = db.query(Empresa).filter(
            (Empresa.status != 'nao-abordado') &
            (Empresa.status != 'tentativa-sem-contato')
        ).count()
        dores = db.query(Empresa).filter(
            (Empresa.status == 'conversou-fit') |
            (Empresa.status == 'diagnostico-agendado')
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
                'taxa': round(taxa, 1)
            }
        }), 200
    finally:
        db.close()

# ============ HEALTH CHECK ============

@app.route('/api/health', methods=['GET'])
def health():
    """Verificar saúde da API"""
    return jsonify({'status': 'ok', 'message': 'API Agente Comercial está funcionando'}), 200

# ============ ERROR HANDLERS ============

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint não encontrado'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Erro interno do servidor'}), 500

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV', 'production') == 'development'
    )
