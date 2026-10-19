from datetime import datetime
from sqlalchemy import Column, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Empresa(Base):
    __tablename__ = 'empresas'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    neighborhood = Column(String)
    phone = Column(String)
    contact = Column(String)
    priority = Column(String, default='B')  # A, B, C
    status = Column(String, default='nao-abordado')
    facts = Column(String)
    painHypothesis = Column(String)
    notes = Column(String)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
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
            'createdAt': self.createdAt.isoformat() if self.createdAt else None,
            'updatedAt': self.updatedAt.isoformat() if self.updatedAt else None,
        }
