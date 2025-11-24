"""
Script principal de configuração do banco de dados.

Contém a lógica para criação do engine, sessão de banco, e inicialização automática
do banco SQLite, além de importar os modelos e schemas para registrar as tabelas.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.database.SQLite.base import Base

from src.database.models import (
    Usuario,
    Produto,
    Categoria,
    Cupom,
    Banner,
    Pedido,
    Mensagem,
    Avaliacao,
    Relatorio,
    Configuracao,
    ItensPedido
)

from src.database.schemas import (
    UsuarioCreate,
    ProdutoCreate,
    CategoriaCreate,
    CupomCreate,
    BannerCreate,
    PedidoCreate,
    MensagemCreate,
    AvaliacaoCreate,
    RelatorioCreate,
    ConfiguracaoCreate,
    ItensPedidoCreate
)

#Config Banco
db_path = os.path.join(os.path.dirname(__file__), "orgulhe_se.db")

DATABASE = "mysql+pymysql://root:admin123@localhost:3306/orgulhe_se"

engine = create_engine(DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependência de sessão
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# Cria tabelas somente se não existirem
Base.metadata.create_all(bind=engine)

#Testa conexão
with engine.connect() as conexao:
    print("Conexão bem sucedida!")
