import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./agente_comercial.db')

engine = create_engine(
    DATABASE_URL,
    connect_args={'check_same_thread': False} if 'sqlite' in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

COLUNAS_ICP = (
    ('cnpj', 'VARCHAR'),
    ('city', 'VARCHAR'),
    ('segment', 'VARCHAR'),
    ('campaign', 'VARCHAR'),
    ('offer', 'VARCHAR'),
    ('nextContact', 'VARCHAR'),
    ('indicators', 'VARCHAR'),
    ('icpScore', 'INTEGER'),
    ('icpClass', 'VARCHAR'),
)

def _adicionar_colunas_ausentes() -> None:
    """Migração aditiva: inclui colunas novas em bancos antigos. Não remove nem altera dados."""
    with engine.begin() as conexao:
        existentes = {linha[1] for linha in conexao.exec_driver_sql('PRAGMA table_info(empresas)')}
        for nome, tipo in COLUNAS_ICP:
            if nome not in existentes:
                conexao.exec_driver_sql(f'ALTER TABLE empresas ADD COLUMN {nome} {tipo}')

def init_db():
    """Criar tabelas no banco de dados e aplicar migração aditiva"""
    Base.metadata.create_all(bind=engine)
    if engine.dialect.name == 'sqlite':
        _adicionar_colunas_ausentes()

def get_db():
    """Dependency para obter sessão do banco"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
