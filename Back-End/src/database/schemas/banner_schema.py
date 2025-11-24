"""
Schema de entrada para banners promocionais.

Especifica os campos obrigatórios para registrar um novo banner no sistema.
"""
from pydantic import BaseModel

class BannerBase(BaseModel):
    """Define os campos principais de um banner exibido no sistema."""

class BannerCreate(BaseModel):
    """Representa um banner exibido na interface do sistema.

    Armazena informações sobre imagem, título, texto e status de exibição.
    """
    imagem: str
    link: str

class BannerResponse(BannerBase):
    """Modelo de saída retornado ao consultar banners cadastrados."""
