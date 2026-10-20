import json
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer
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
