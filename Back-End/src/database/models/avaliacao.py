"""
Módulo que define o modelo de Avaliações no banco de dados.

Representa a nota e o comentário deixados por Usuarios sobre produtos ou serviços.
Cada avaliação está vinculada a um usuario.
"""
from sqlalchemy import Column, Integer, ForeignKey, Text
from src.database.SQLite.base import Base

class Avaliacao(Base):
    """Representa uma avaliação feita por um usuário sobre um produto.

    Contém a nota atribuída, o comentário e a referência ao produto e ao usuário avaliador.
    """
    __tablename__ = 'avaliacao'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_cliente = Column(Integer, ForeignKey('usuario.id'))
    nota = Column(Integer)
    comentario = Column(Text)