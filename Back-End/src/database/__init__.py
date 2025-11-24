"""
Inicialização do pacote de banco de dados.

Importa e centraliza os objetos essenciais de conexão, modelos e schemas
utilizados em toda a aplicação para facilitar o acesso e organização.
"""
from .SQLite.database_script import(
    db_path, DATABASE, Base,
    create_engine, engine, sessionmaker, SessionLocal, get_db
)

from .models import (
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
from .schemas import (
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
