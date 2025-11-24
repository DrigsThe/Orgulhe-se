"""
Fixtures globais para testes da API Orgulhe-se.

Fornece:
- client: TestClient para simular requisições HTTP
- db_session: Sessão de banco temporária para testes isolados
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from src.database.SQLite.base import Base
from src.database.SQLite.database_script import get_db
from src.app import app

TEST_DATABASE_PATH = "mysql+pymysql://root:admin123@localhost:3306/orgulhe_se_teste"
engine = create_engine(TEST_DATABASE_PATH)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()

    try:
        yield db

    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="function")
def client():
    """Fixture para fornecer o TestClient da FastAPI"""
    with TestClient(app) as cli:
        yield cli

@pytest.fixture(autouse=True)
def limpar_banco():
    """Limpa todas as tabelas antes de cada teste."""
    db: Session = TestingSessionLocal()

    for tabela in reversed(Base.metadata.sorted_tables):
        db.execute(tabela.delete())

    db.commit()
    db.close()
