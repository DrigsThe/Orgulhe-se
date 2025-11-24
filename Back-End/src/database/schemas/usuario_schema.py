"""
Schema de entrada para Usuarios.

Define os dados necessários para cadastrar um novo usuario.
"""
from pydantic import BaseModel, ConfigDict, EmailStr

class UsuarioBase(BaseModel):
    """Define os campos básicos de um usuário."""
    nome: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    """Modelo usado para criar um novo usuário."""
    senha: str

class UsuarioResponse(UsuarioBase):
    """Modelo usado para retornar dados de um usuário existente."""
    id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
