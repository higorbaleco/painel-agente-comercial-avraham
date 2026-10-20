"""Prospecção (Fase 1): buscas por CNAE e município, leads e importação da base da Receita.

Contrato: docs/prospeccao/API.md. Formato de erro: {"erro": codigo, "mensagem": texto}.
A execução de busca é síncrona nesta fase (API.md prevê 202 com job; fica para a fase de jobs).
"""
import csv
import json
import re
import uuid
from datetime import datetime

from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from sqlalchemy.exc import SQLAlchemyError

from database import SessionLocal
from models import Busca, Cnae, Lead, Municipio, ReceitaEstabelecimento

bp = Blueprint('prospeccao', __name__, url_prefix='/api/v1')

UFS = {
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
    'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
}
PADRAO_CNAE = re.compile(r'\d{7}')
PADRAO_MUNICIPIO = re.compile(r'\d{1,10}')
PORTES_VALIDOS = ('MEI', 'ME', 'EPP', 'DEMAIS')
COLUNAS_RECEITA = (
    'cnpj', 'razaoSocial', 'nomeFantasia', 'cnaePrincipal', 'cnaesSecundarios', 'uf', 'municipio',
    'bairro', 'logradouro', 'cep', 'situacao', 'porte', 'capitalSocial', 'simples', 'telefone', 'email',
)
TAMANHO_LOTE = 1000


class ErroApi(Exception):
    def __init__(self, status: int, codigo: str, mensagem: str):
        super().__init__(mensagem)
        self.status = status
        self.codigo = codigo
        self.mensagem = mensagem


@bp.errorhandler(ErroApi)
def _tratar_erro(erro: ErroApi):
    return jsonify({'erro': erro.codigo, 'mensagem': erro.mensagem}), erro.status


def _corpo() -> dict:
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        raise ErroApi(400, 'entrada_invalida', 'Envie um objeto JSON válido.')
    return dados


def _texto(valor, campo: str, obrigatorio: bool, limite: int) -> str:
    if valor is None or valor == '':
        if obrigatorio:
            raise ErroApi(400, 'validacao', f'{campo} é obrigatório.')
        return ''
    if not isinstance(valor, str):
        raise ErroApi(400, 'validacao', f'{campo} deve ser texto.')
    valor = valor.strip()
    if obrigatorio and not valor:
        raise ErroApi(400, 'validacao', f'{campo} é obrigatório.')
    if len(valor) > limite:
        raise ErroApi(400, 'validacao', f'{campo} deve ter até {limite} caracteres.')
    return valor


def _busca_dict(busca: Busca, total_leads: int) -> dict:
    return {
        'id': busca.id,
        'nome': busca.nome,
        'segmento': busca.segmento,
        'cnaes': json.loads(busca.cnaes),
        'pais': busca.pais,
        'uf': busca.uf,
        'municipio': busca.municipio,
        'municipioNome': busca.municipioNome,
        'status': busca.status,
        'totalLeads': total_leads,
        'criadaEm': busca.criadaEm.isoformat() if busca.criadaEm else None,
        'atualizadaEm': busca.atualizadaEm.isoformat() if busca.atualizadaEm else None,
    }


# ============ BUSCAS ============

@bp.route('/buscas', methods=['POST'])
def criar_busca():
    dados = _corpo()
    nome = _texto(dados.get('nome'), 'nome', True, 120)
    segmento = _texto(dados.get('segmento'), 'segmento', False, 120)
    pais = _texto(dados.get('pais'), 'pais', False, 2) or 'BR'
    if pais != 'BR':
        raise ErroApi(400, 'validacao', 'Por enquanto só o Brasil é suportado.')

    cnaes = dados.get('cnaes')
    if not isinstance(cnaes, list) or not cnaes:
        raise ErroApi(422, 'sem_cnae', 'Informe ao menos um CNAE.')
    if not all(isinstance(c, str) and PADRAO_CNAE.fullmatch(c) for c in cnaes):
        raise ErroApi(400, 'validacao', 'CNAE deve ter 7 dígitos.')
    cnaes = list(dict.fromkeys(cnaes))

    uf = _texto(dados.get('uf'), 'uf', True, 2).upper()
    if uf not in UFS:
        raise ErroApi(400, 'validacao', 'UF inválida.')
    municipio = _texto(dados.get('municipio'), 'municipio', True, 10)
    if not PADRAO_MUNICIPIO.fullmatch(municipio):
        raise ErroApi(400, 'validacao', 'Município deve ser o código da Receita.')
    municipio_nome = _texto(dados.get('municipioNome'), 'municipioNome', False, 120)

    with SessionLocal() as db:
        busca = Busca(
            id=uuid.uuid4().hex,
            nome=nome,
            segmento=segmento or None,
            cnaes=json.dumps(cnaes),
            pais=pais,
            uf=uf,
            municipio=municipio,
            municipioNome=municipio_nome or None,
            status='rascunho',
        )
        db.add(busca)
        db.commit()
        db.refresh(busca)
        return jsonify({'busca': _busca_dict(busca, 0)}), 201


@bp.route('/buscas', methods=['GET'])
def listar_buscas():
    with SessionLocal() as db:
        buscas = db.query(Busca).order_by(Busca.criadaEm.desc()).all()
        resposta = []
        for busca in buscas:
            total = db.query(Lead).filter(Lead.buscaId == busca.id).count()
            resposta.append(_busca_dict(busca, total))
        return jsonify({'buscas': resposta, 'total': len(resposta)}), 200


def _obter_busca(db, busca_id: str) -> Busca:
    busca = db.get(Busca, busca_id)
    if not busca:
        raise ErroApi(404, 'nao_encontrado', 'Busca não encontrada.')
    return busca


@bp.route('/buscas/<busca_id>', methods=['GET'])
def obter_busca(busca_id: str):
    with SessionLocal() as db:
        busca = _obter_busca(db, busca_id)
        total = db.query(Lead).filter(Lead.buscaId == busca.id).count()
        return jsonify({'busca': _busca_dict(busca, total)}), 200


@bp.route('/buscas/<busca_id>', methods=['DELETE'])
def excluir_busca(busca_id: str):
    with SessionLocal() as db:
        busca = _obter_busca(db, busca_id)
        if busca.status == 'executando':
            raise ErroApi(409, 'em_execucao', 'A busca está executando e não pode ser excluída.')
        try:
            db.query(Lead).filter(Lead.buscaId == busca.id).delete()
            db.delete(busca)
            db.commit()
        except SQLAlchemyError:
            db.rollback()
            raise ErroApi(500, 'erro_interno', 'Não foi possível excluir a busca.')
        return '', 204


def _executar_busca(db, busca: Busca) -> dict:
    cnaes = set(json.loads(busca.cnaes))
    candidatos = (
        db.query(ReceitaEstabelecimento)
        .filter(ReceitaEstabelecimento.uf == busca.uf)
        .filter(ReceitaEstabelecimento.municipio == busca.municipio)
        .filter(ReceitaEstabelecimento.situacao == 'ATIVA')
        .all()
    )
    encontrados = []
    for registro in candidatos:
        secundarios = json.loads(registro.cnaesSecundarios) if registro.cnaesSecundarios else []
        if registro.cnaePrincipal in cnaes or cnaes.intersection(secundarios):
            encontrados.append(registro)

    ja_existentes = {
        cnpj for (cnpj,) in db.query(Lead.cnpj).filter(Lead.buscaId == busca.id).all()
    }
    novos = 0
    for registro in encontrados:
        if registro.cnpj in ja_existentes:
            continue
        db.add(Lead(
            id=uuid.uuid4().hex,
            buscaId=busca.id,
            cnpj=registro.cnpj,
            nome=registro.nomeFantasia or registro.razaoSocial,
            cidade=busca.municipioNome,
            etapa='descoberto',
            veredito='pendente',
        ))
        novos += 1
    return {'encontrados': len(encontrados), 'novos': novos, 'jaExistentes': len(encontrados) - novos}


@bp.route('/buscas/<busca_id>/executar', methods=['POST'])
def executar_busca(busca_id: str):
    with SessionLocal() as db:
        busca = _obter_busca(db, busca_id)
        if busca.status == 'executando':
            raise ErroApi(409, 'em_execucao', 'A busca já está executando.')
        if not busca.cnaes or not busca.uf or not busca.municipio:
            raise ErroApi(422, 'sem_localidade', 'A busca precisa de CNAE e localidade.')

        base_importada = db.query(ReceitaEstabelecimento.cnpj).first() is not None
        if not base_importada:
            raise ErroApi(503, 'base_nao_importada', 'A base da Receita ainda não foi importada.')

        busca.status = 'executando'
        db.commit()
        try:
            resultado = _executar_busca(db, busca)
            busca.status = 'concluida'
            db.commit()
        except SQLAlchemyError:
            db.rollback()
            busca = _obter_busca(db, busca_id)
            busca.status = 'erro'
            db.commit()
            raise ErroApi(500, 'erro_interno', 'Não foi possível executar a busca.')

        total = db.query(Lead).filter(Lead.buscaId == busca.id).count()
        return jsonify({'busca': _busca_dict(busca, total), 'resultado': resultado}), 200


@bp.route('/buscas/<busca_id>/status', methods=['GET'])
def status_busca(busca_id: str):
    with SessionLocal() as db:
        busca = _obter_busca(db, busca_id)
        total = db.query(Lead).filter(Lead.buscaId == busca.id).count()
        return jsonify({'status': busca.status, 'totalEncontrado': total}), 200


# ============ LEADS ============

@bp.route('/leads', methods=['GET'])
def listar_leads():
    busca_id = request.args.get('buscaId')
    etapa = request.args.get('etapa')
    termo = (request.args.get('q') or '').strip()
    try:
        pagina = max(1, int(request.args.get('pagina', 1)))
        tamanho = min(100, max(1, int(request.args.get('tamanho', 20))))
    except ValueError:
        raise ErroApi(400, 'filtro_invalido', 'Página e tamanho devem ser números.')

    with SessionLocal() as db:
        consulta = db.query(Lead)
        if busca_id:
            consulta = consulta.filter(Lead.buscaId == busca_id)
        if etapa:
            consulta = consulta.filter(Lead.etapa == etapa)
        if termo:
            consulta = consulta.filter(or_(Lead.nome.icontains(termo, autoescape=True), Lead.cnpj.startswith(re.sub(r'\D', '', termo) or termo)))
        total = consulta.count()
        itens = (
            consulta.order_by(Lead.nome)
            .offset((pagina - 1) * tamanho)
            .limit(tamanho)
            .all()
        )
        return jsonify({
            'leads': [lead.to_dict() for lead in itens],
            'total': total,
            'pagina': pagina,
            'tamanho': tamanho,
        }), 200


@bp.route('/leads/<lead_id>', methods=['GET'])
def obter_lead(lead_id: str):
    with SessionLocal() as db:
        lead = db.get(Lead, lead_id)
        if not lead:
            raise ErroApi(404, 'nao_encontrado', 'Lead não encontrado.')
        return jsonify({'lead': lead.to_dict()}), 200


# ============ RECEITA ============

def _valor_receita(valor: str):
    return valor.strip() if isinstance(valor, str) and valor.strip() else None


def _normalizar_linha(linha: dict) -> dict:
    cnpj = re.sub(r'\D', '', linha.get('cnpj') or '')
    if len(cnpj) != 14:
        raise ValueError('cnpj inválido')
    secundarios = [c for c in re.split(r'[;,\s]+', linha.get('cnaesSecundarios') or '') if PADRAO_CNAE.fullmatch(c)]
    porte = (linha.get('porte') or '').strip().upper() or None
    if porte and porte not in PORTES_VALIDOS:
        porte = 'DEMAIS'
    mei = porte == 'MEI'
    capital = _valor_receita(linha.get('capitalSocial'))
    return {
        'cnpj': cnpj,
        'razaoSocial': _valor_receita(linha.get('razaoSocial')),
        'nomeFantasia': _valor_receita(linha.get('nomeFantasia')),
        'cnaePrincipal': re.sub(r'\D', '', linha.get('cnaePrincipal') or '')[:7] or None,
        'cnaesSecundarios': json.dumps(secundarios),
        'uf': (_valor_receita(linha.get('uf')) or '').upper()[:2] or None,
        'municipio': _valor_receita(linha.get('municipio')),
        'bairro': _valor_receita(linha.get('bairro')),
        'logradouro': _valor_receita(linha.get('logradouro')),
        'cep': re.sub(r'\D', '', linha.get('cep') or '') or None,
        'situacao': (_valor_receita(linha.get('situacao')) or '').upper() or None,
        'porte': porte,
        'capitalSocial': float(capital.replace(',', '.')) if capital else None,
        'simples': (linha.get('simples') or '').strip().lower() in ('1', 'true', 's', 'sim'),
        # LGPD: contato pessoal só para não-MEI (ESCOPO.md)
        'telefone': None if mei else _valor_receita(linha.get('telefone')),
        'email': None if mei else _valor_receita(linha.get('email')),
    }


@bp.route('/receita/importar', methods=['POST'])
def importar_receita():
    dados = _corpo()
    caminho = _texto(dados.get('caminho'), 'caminho', True, 500)
    try:
        with open(caminho, encoding='utf-8', newline='') as arquivo:
            leitor = csv.DictReader(arquivo, delimiter=';')
            cabecalho = set(leitor.fieldnames or [])
            faltando = {'cnpj', 'situacao', 'uf', 'municipio', 'cnaePrincipal'} - cabecalho
            if faltando:
                raise ErroApi(400, 'arquivo_invalido', f'Colunas ausentes: {", ".join(sorted(faltando))}.')

            importados = ignorados = 0
            with SessionLocal() as db:
                lote = 0
                for linha in leitor:
                    try:
                        registro = _normalizar_linha(linha)
                    except ValueError:
                        ignorados += 1
                        continue
                    if registro['situacao'] != 'ATIVA':
                        ignorados += 1
                        continue
                    db.merge(ReceitaEstabelecimento(**registro, importadoEm=datetime.utcnow()))
                    importados += 1
                    lote += 1
                    if lote >= TAMANHO_LOTE:
                        db.commit()
                        lote = 0
                db.commit()
    except FileNotFoundError:
        raise ErroApi(400, 'arquivo_invalido', 'Arquivo não encontrado no caminho informado.')
    except (UnicodeDecodeError, csv.Error):
        raise ErroApi(400, 'arquivo_invalido', 'Arquivo inválido: use CSV em UTF-8 com separador ponto e vírgula.')
    return jsonify({'importados': importados, 'ignorados': ignorados}), 200


@bp.route('/receita/status', methods=['GET'])
def status_receita():
    with SessionLocal() as db:
        total = db.query(ReceitaEstabelecimento).count()
        ultima = db.query(ReceitaEstabelecimento.importadoEm).order_by(ReceitaEstabelecimento.importadoEm.desc()).first()
        return jsonify({
            'totalRegistros': total,
            'ultimaImportacao': ultima[0].isoformat() if ultima and ultima[0] else None,
        }), 200


# ============ REFERÊNCIAS ============

@bp.route('/referencias/cnaes', methods=['GET'])
def listar_cnaes():
    termo = (request.args.get('q') or '').strip()
    with SessionLocal() as db:
        consulta = db.query(Cnae)
        if termo:
            consulta = consulta.filter(or_(
                Cnae.codigo.startswith(re.sub(r'\D', '', termo) or '#'),
                Cnae.descricao.icontains(termo, autoescape=True),
            ))
        itens = consulta.order_by(Cnae.codigo).limit(50).all()
        return jsonify({'cnaes': [{'codigo': c.codigo, 'descricao': c.descricao} for c in itens]}), 200


@bp.route('/referencias/municipios', methods=['GET'])
def listar_municipios():
    uf = (request.args.get('uf') or '').strip().upper()
    termo = (request.args.get('q') or '').strip()
    if uf and uf not in UFS:
        raise ErroApi(400, 'validacao', 'UF inválida.')
    with SessionLocal() as db:
        consulta = db.query(Municipio)
        if uf:
            consulta = consulta.filter(Municipio.uf == uf)
        if termo:
            consulta = consulta.filter(Municipio.nome.icontains(termo, autoescape=True))
        itens = consulta.order_by(Municipio.nome).limit(50).all()
        return jsonify({'municipios': [{'codigo': m.codigo, 'nome': m.nome, 'uf': m.uf} for m in itens]}), 200
