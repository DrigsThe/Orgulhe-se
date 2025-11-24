"""
Schema de entrada para configurações do sistema.

Utilizado para definir pares chave-valor com configurações específicas da aplicação.
"""
from pydantic import BaseModel

class ConfiguracaoBase(BaseModel):
    """Define os campos de configuração geral da aplicação."""

class ConfiguracaoCreate(BaseModel):
    """Armazena configurações gerais da aplicação.

    Inclui parâmetros de controle do sistema, como modos de exibição, limites e opções administrativas.
    """
    chave: str
    valor: str

class ConfiguracaoUpdate(ConfiguracaoBase):
    """Modelo de entrada para atualização das configurações."""

class ConfiguracaoResponse(ConfiguracaoBase):
    """Modelo de saída retornado ao consultar as configurações atuais."""
