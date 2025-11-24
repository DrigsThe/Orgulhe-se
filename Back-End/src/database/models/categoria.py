"""
Módulo que define o modelo de Categorias de produtos.

Cada categoria representa um agrupamento lógico de produtos disponíveis na loja virtual.
"""
from sqlalchemy import Column, Integer, String
from src.database.SQLite.base import Base

class Categoria(Base):
    """Define a categoria de produtos cadastrados no sistema."""
    __tablename__ = 'categoria'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
