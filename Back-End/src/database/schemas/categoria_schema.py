"""
Schema de entrada para categorias de produtos.

Utilizado para validar o nome de uma nova categoria cadastrada na plataforma.
"""
from pydantic import BaseModel, ConfigDict

class CategoriaBase(BaseModel):
    """Define os campos básicos de uma categoria."""
    nome: str

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaResponse(CategoriaBase):
    """Modelo usado para retornar dados de uma categoria."""
    id: int

    class Config:
        model_config = ConfigDict(from_attributes = True)
