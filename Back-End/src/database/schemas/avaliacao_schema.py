"""
Schema de entrada para avaliações de Usuarios.

Define os dados necessários para criar uma nova avaliação, incluindo nota e comentário.
"""
from pydantic import BaseModel

class AvaliacaoBase():
    """Define os campos base para criação e leitura de avaliações."""
    pass

class AvaliacaoCreate(BaseModel):
    """Modelo de entrada para criação de uma nova avaliação."""
    cliente_id: int
    nota: int
    comentario: str

class AvaliacaoResponse(AvaliacaoBase):
    """Modelo de saída retornado ao consultar avaliações cadastradas."""
