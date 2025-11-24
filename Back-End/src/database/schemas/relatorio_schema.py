"""
Schema de entrada para relatórios do sistema.

Usado para validar os dados necessários para criar relatórios personalizados.
"""
from pydantic import BaseModel

class RelatorioBase(BaseModel):
    """Define os campos principais de um relatório gerado pelo sistema."""

class RelatorioCreate(BaseModel):
    """Representa um relatório gerado pelo sistema.

    Armazena dados processados de pedidos, usuários ou vendas para análise administrativa.
    """
    titulo: str
    conteudo: str

class RelatorioResponse(RelatorioBase):
    """Modelo de saída retornado ao consultar relatórios gerados."""
