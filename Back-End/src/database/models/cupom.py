"""
Módulo que define o modelo de Cupons de desconto.

Cada cupom possui um código único e um valor de desconto,
permitindo promoções aplicáveis aos pedidos realizados.
"""
from sqlalchemy import Column, Integer, String, DECIMAL
from src.database.SQLite.base import Base

class Cupom(Base):
    """Representa um cupom de desconto aplicado a pedidos.

    Contém o código do cupom, valor de desconto, validade e status de uso.
    """
    __tablename__ = 'cupom'

    id = Column(Integer, primary_key=True, autoincrement=True)
    codigo = Column(String(255), unique=True)
    desconto = Column(DECIMAL(10,2))

