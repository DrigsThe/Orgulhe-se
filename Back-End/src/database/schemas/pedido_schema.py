"""
Schema de entrada para pedidos realizados.

Define as informações obrigatórias para registrar um novo pedido, como usuario, status e total.
"""
from pydantic import BaseModel

class PedidoBase(BaseModel):
    """Define os campos principais de um pedido realizado por um usuário."""

class PedidoCreate(BaseModel):
    """Representa um pedido realizado por um usuário.

    Contém o status do pedido, data, valor total e referência ao cliente.
    """
    cliente_id: int
    status: str
    total: float

class PedidoResponse(PedidoBase):
    """Modelo de saída retornado ao consultar pedidos realizados."""
