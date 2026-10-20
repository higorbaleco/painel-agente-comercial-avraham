import json
from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Index, Integer, String, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base

from icp import INDICADORES, calcular

Base = declarative_base()

class Empresa(Base):
    __tablename__ = 'empresas'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    neighborhood = Column(String)
    phone = Column(String)
    contact = Column(String)
    priority = Column(String, default='B')  # A, B, C (prioridade manual)
    status = Column(String, default='nao-abordado')
    facts = Column(String)
    painHypothesis = Column(String)
    notes = Column(String)
    # Campos de inteligência comercial (Fase 1)
    cnpj = Column(String)
    city = Column(String)
    segment = Column(String)
    campaign = Column(String)
    offer = Column(String)
    nextContact = Column(String)  # AAAA-MM-DD
    indicators = Column(String)  # JSON com os 8 indicadores (0 a 5)
    icpScore = Column(Integer)  # calculado no servidor
    icpClass = Column(String)  # A, B ou C; None sem os 8 indicadores
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def indicadores_dict(self) -> dict:
        return json.loads(self.indicators) if self.indicators else {}

    def aplicar_indicadores(self, indicadores: dict) -> None:
        """Guarda os indicadores e recalcula score e classe."""
        self.indicators = json.dumps(indicadores)
        self.icpScore, self.icpClass = calcular(indicadores)

    def to_dict(self):
        indicadores = self.indicadores_dict()
        return {
            'id': self.id,
            'name': self.name,
            'neighborhood': self.neighborhood,
            'phone': self.phone,
            'contact': self.contact,
            'priority': self.priority,
            'status': self.status,
            'facts': self.facts,
            'painHypothesis': self.painHypothesis,
            'notes': self.notes,
            'cnpj': self.cnpj,
            'city': self.city,
            'segment': self.segment,
            'campaign': self.campaign,
            'offer': self.offer,
            'nextContact': self.nextContact,
            'indicators': indicadores,
            'indicatorsTotal': len(INDICADORES),
            'icpScore': self.icpScore,
            'icpClass': self.icpClass,
            'createdAt': self.createdAt.isoformat() if self.createdAt else None,
            'updatedAt': self.updatedAt.isoformat() if self.updatedAt else None,
        }


# ============ PROSPECÇÃO (Fase 1, docs/prospeccao/MODELO-DADOS.md) ============

class Busca(Base):
    __tablename__ = 'buscas'

    id = Column(String, primary_key=True)
    nome = Column(String, nullable=False)
    segmento = Column(String)
    cnaes = Column(String, nullable=False)  # JSON: lista de códigos de 7 dígitos
    pais = Column(String, default='BR')
    uf = Column(String(2), nullable=False)
    municipio = Column(String, nullable=False)  # código da Receita
    municipioNome = Column(String)
    status = Column(String, default='rascunho')  # rascunho, executando, concluida, erro
    criadaEm = Column(DateTime, default=datetime.utcnow)
    atualizadaEm = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ReceitaEstabelecimento(Base):
    __tablename__ = 'receita_estabelecimentos'
    __table_args__ = (Index('ix_receita_uf_municipio_cnae', 'uf', 'municipio', 'cnaePrincipal'),)

    cnpj = Column(String(14), primary_key=True)  # só dígitos
    nomeFantasia = Column(String)
    razaoSocial = Column(String)
    cnaePrincipal = Column(String(7))
    cnaesSecundarios = Column(String)  # JSON
    uf = Column(String(2))
    municipio = Column(String)
    bairro = Column(String)
    logradouro = Column(String)
    cep = Column(String)
    situacao = Column(String)
    porte = Column(String)  # MEI, ME, EPP, DEMAIS
    capitalSocial = Column(Float)
    simples = Column(Boolean)
    telefone = Column(String)  # só para não-MEI
    email = Column(String)  # só para não-MEI
    importadoEm = Column(DateTime, default=datetime.utcnow)


class Lead(Base):
    __tablename__ = 'leads'
    __table_args__ = (UniqueConstraint('buscaId', 'cnpj', name='uq_lead_busca_cnpj'),)

    id = Column(String, primary_key=True)
    buscaId = Column(String, ForeignKey('buscas.id'), nullable=False, index=True)
    cnpj = Column(String(14), nullable=False)
    nome = Column(String)
    cidade = Column(String)
    etapa = Column(String, default='descoberto')  # descoberto, enriquecido, aprovado, reprovado, no_pipeline
    veredito = Column(String, default='pendente')  # pendente, aprovado, reprovado
    vereditoMotivo = Column(String)
    criadoEm = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'buscaId': self.buscaId,
            'cnpj': self.cnpj,
            'nome': self.nome,
            'cidade': self.cidade,
            'etapa': self.etapa,
            'veredito': self.veredito,
            'vereditoMotivo': self.vereditoMotivo,
            'criadoEm': self.criadoEm.isoformat() if self.criadoEm else None,
        }


class Cnae(Base):
    __tablename__ = 'referencias_cnaes'

    codigo = Column(String(7), primary_key=True)
    descricao = Column(String, nullable=False)


class Municipio(Base):
    __tablename__ = 'referencias_municipios'
    __table_args__ = (Index('ix_municipio_uf_nome', 'uf', 'nome'),)

    codigo = Column(String, primary_key=True)
    nome = Column(String, nullable=False)
    uf = Column(String(2), nullable=False)
