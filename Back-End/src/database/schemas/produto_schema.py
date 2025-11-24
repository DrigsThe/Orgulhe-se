"""
Schema de entrada para produtos disponíveis.

Inclui os campos exigidos para cadastrar um novo produto, como nome, preço e estoque.
"""
from pydantic import BaseModel, ConfigDict

class ProdutoBase(BaseModel):
    """Define os campos básicos de um produto."""
    nome: str
    descricao: str | None = None
    preco: float
    categoria_id: int

class ProdutoCreate(ProdutoBase):
    """Modelo usado para criar um novo produto."""
    usuario_id: int
    categoria_id: int

class ProdutoResponse(ProdutoBase):
    """Modelo usado para retornar dados de um produto existente."""
    id: int

    class Config:
        model_config = ConfigDict(from_attributes = True)
