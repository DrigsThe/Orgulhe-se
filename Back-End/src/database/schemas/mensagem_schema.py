"""
Schema de entrada para mensagens de Usuarios.

Estrutura os dados enviados pelos Usuarios, como conteúdo e remetente.
"""
from pydantic import BaseModel

class MensagemBase(BaseModel):
    """Define os campos principais de uma mensagem enviada no sistema."""

class MensagemCreate(BaseModel):
    """Representa uma mensagem trocada entre usuários ou enviada pelo suporte.

    Armazena conteúdo textual, remetente, destinatário e data de envio.
    """
    cliente_id: int
    conteudo: str

class MensagemResponse(MensagemBase):
    """Modelo de saída retornado ao consultar mensagens enviadas ou recebidas."""
