"""
Módulo que define o modelo de Itens de Pedido no banco de dados.

Cada registro representa um produto específico incluído em um pedido.
Contém a quantidade, o preço unitário e referências ao pedido e ao produto.
Essencial para detalhar os itens comprados em cada transação.
"""
from sqlalchemy import Column, Integer, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from src.database.SQLite.base import Base

class ItensPedido(Base):
    """Representa um item associado a um pedido.

    Contém o produto, quantidade e valor unitário, vinculados ao pedido correspondente.
    """
    __tablename__ = 'Itens_pedido'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_pedido = Column(Integer, ForeignKey('pedido.id', ondelete='CASCADE'))
    id_produto = Column(Integer, ForeignKey('produto.id', ondelete='CASCADE'))
    quantidade = Column(Integer, nullable=False)
    preco_unitario = Column(DECIMAL(10,2), nullable=False)
    pedido = relationship("Pedido", back_populates="itens")
    produto = relationship("Produto")
