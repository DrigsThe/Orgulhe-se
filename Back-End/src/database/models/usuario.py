"""
Módulo que define o modelo de Usuarios no banco de dados.

Armazena informações básicas dos usuários cadastrados na plataforma.
"""
from sqlalchemy import Column, Integer, String
from src.database.SQLite.base import Base

class Usuario(Base):
    """Representa um usuário do sistema.

    Armazena informações essenciais sobre o usuário, como nome, email e senha.
    """
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), unique=True, nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    senha = Column(String(128), nullable=False)
