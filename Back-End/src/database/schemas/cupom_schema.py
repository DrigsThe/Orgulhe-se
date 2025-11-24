"""
Schema de entrada para cupons de desconto.

Valida os dados exigidos para criar um novo cupom, como código e valor do desconto.
"""
from pydantic import BaseModel

class CupomBase(BaseModel):
    """Define os campos principais de um cupom de desconto."""

class CupomCreate(BaseModel):
    """Representa um cupom de desconto aplicado a pedidos.

    Contém o código do cupom, valor de desconto, validade e status de uso.
    """
    codigo: str
    desconto: float

class CupomResponse(CupomBase):
    """Modelo de saída retornado ao consultar cupons disponíveis."""
