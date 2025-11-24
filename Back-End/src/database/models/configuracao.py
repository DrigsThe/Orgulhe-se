"""
Módulo que define o modelo de Configurações do sistema.

Permite armazenar pares de chave e valor para configurações dinâmicas da aplicação.
Ideal para ajustes sem necessidade de alterações diretas no código.
"""
from sqlalchemy import Column, Integer, String
from src.database.SQLite.base import Base

class Configuracao(Base):
    """Armazena configurações gerais da aplicação.

    Inclui parâmetros de controle do sistema, como modos de exibição, limites e opções administrativas.
    """
    __tablename__ = 'configuracao'

    id = Column(Integer, primary_key=True, autoincrement=True)
    chave = Column(String(255), unique=True)
    valor = Column(String(255))

