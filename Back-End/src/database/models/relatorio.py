"""
Módulo que define o modelo de Relatórios gerados pela aplicação.

Usado para registrar análises e informações consolidadas, como dados de vendas,
atividades de usuários ou desempenho da plataforma.
"""
from sqlalchemy import Column, Integer, String, Text
from src.database.SQLite.base import Base

class Relatorio(Base):
    """Representa um relatório gerado pelo sistema.

    Armazena dados processados de pedidos, usuários ou vendas para análise administrativa.
    """
    __tablename__ = 'relatorio'

    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(255))
    conteudo = Column(Text)

