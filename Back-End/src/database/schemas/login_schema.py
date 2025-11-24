"""
Schemas de autenticação (login) usados pela API.

Este módulo contém os modelos Pydantic usados nas rotas de autenticação:
- LoginRequest: credenciais enviadas pelo cliente (email + senha).
- LoginResponse: payload retornado após autenticação bem-sucedida
    (por exemplo: token de acesso, tipo do token, tempo até expiração e id do usuário).
"""
from pydantic import BaseModel, EmailStr, ConfigDict

class LoginBase(BaseModel):
    """Define os campos base utilizados no processo de autenticação de usuários."""
    email: EmailStr
    password: str
    model_config = ConfigDict(from_attributes=True)

class LoginRequest(LoginBase):
    """Modelo de entrada contendo as credenciais para autenticação."""

class LoginResponse(BaseModel):
    """Modelo de saída retornado após autenticação bem-sucedida.

        Campos típicos:
        - access_token: token JWT (ou similar) para autenticação nas próximas requisições
        - token_type: tipo do token (ex: "bearer")
        - expires_in: tempo em segundos até expirar (opcional)
        - user_id: id do usuário autenticado (opcional)
    """
    access_token: str
    token_type: str = "bearer"
    expires_in: int | None = None
    user_id: int | None = None

    model_config = ConfigDict(from_attributes=True)
