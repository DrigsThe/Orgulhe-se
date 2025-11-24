"""
Importação dos módulos e bibliotecas essenciais para a aplicação API.

Inclui bibliotecas para manipulação de datas, banco de dados (SQLAlchemy), API (FastAPI),
modelos de dados (Pydantic) e sistema operacional.
"""
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
