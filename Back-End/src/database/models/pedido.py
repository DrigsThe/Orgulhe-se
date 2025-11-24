"""
Módulo que define o modelo de Pedidos realizados na plataforma.

Cada pedido é associado a um usuario e inclui informações como data, status e valor total.
Essencial para o controle de transações e histórico de compras.
"""
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from src.database.SQLite.base import Base
from datetime import datetime

class Pedido(Base):
    """Representa um pedido realizado por um usuário.

    Contém o status do pedido, data, valor total e referência ao cliente.
    """
    __tablename__ = 'pedido'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('usuario.id', ondelete='CASCADE'))
    total = Column(DECIMAL(10,2), default=0)
    status = Column(String(50), nullable=False)
    data_pedido = Column(DateTime, default=datetime.utcnow)
    endereco_entrega = Column(String(255))
    itens = relationship("ItensPedido", back_populates="pedido", cascade="all, delete-orphan")
