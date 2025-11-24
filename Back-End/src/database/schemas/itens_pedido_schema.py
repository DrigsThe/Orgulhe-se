"""
Schema de entrada para Itens de Pedido.

Define os dados necessários para registrar cada produto incluído em um pedido,
incluindo quantidade e preço unitário, vinculados ao pedido e ao produto.
"""
from pydantic import BaseModel

class ItemPedidoBase(BaseModel):
    """Define os campos principais de um item de pedido."""

class ItensPedidoCreate(BaseModel):
    """Representa um item associado a um pedido.

    Contém o produto, quantidade e valor unitário, vinculados ao pedido correspondente.
    """
    id_pedido: int
    id_produto: int
    quantidade: int
    preco_unitario: float

class ItemPedidoResponse(ItemPedidoBase):
    """Modelo de saída retornado ao consultar itens de um pedido."""
