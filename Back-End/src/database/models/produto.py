"""
Módulo que define o modelo de Produtos disponíveis na loja.

Cada produto possui nome, preço, estoque e está vinculado a uma categoria.
Elemento central do catálogo de vendas da aplicação.
"""
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from src.database.SQLite.base import Base

class Produto(Base):
    """Representa um produto disponível no sistema.

    Cada produto está vinculado a um usuário e a uma categoria.
    """
    __tablename__ = 'produto'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_categoria = Column(Integer, ForeignKey('categoria.id'))
    nome = Column(String(100), nullable=False)
    preco = Column(Float, nullable=False)
    estoque = Column(Integer, default=0)
    descricao = Column(Text, nullable=False)
    imagem_url = Column(String(255))