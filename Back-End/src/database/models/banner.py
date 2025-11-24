"""
Módulo que define o modelo de Banners promocionais.

Contém as informações de imagem e link dos banners exibidos na interface da aplicação.
Usado para fins de marketing e navegação visual.
"""
from sqlalchemy import Column, Integer, String
from src.database.SQLite.base import Base

class Banner(Base):
    """Representa um banner exibido na interface do sistema.

    Armazena informações sobre imagem, título, texto e status de exibição.
    """
    __tablename__ = 'banner'

    id = Column(Integer, primary_key=True, autoincrement=True)
    imagem = Column(String(255))
    link = Column(String(255))

