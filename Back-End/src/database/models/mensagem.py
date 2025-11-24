"""
Módulo que define o modelo de Mensagens enviadas pelos Usuarios.

Cada mensagem está associada a um usuario e armazena conteúdo textual
com data de envio. Útil para suporte, feedback ou comunicação geral.
"""
from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from src.database.SQLite.base import Base
from datetime import datetime

class Mensagem(Base):
    """Representa uma mensagem trocada entre usuários ou enviada pelo suporte.

    Armazena conteúdo textual, remetente, destinatário e data de envio.
    """
    __tablename__ = 'mensagem'

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_cliente = Column(Integer, ForeignKey('usuario.id'))
    conteudo = Column(Text)
    data_envio = Column(DateTime, default=datetime.utcnow)

