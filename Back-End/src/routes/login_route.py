"""
Módulo de rota para o endpoint /Login/.

Define a operação de login para o recurso Usuarios:
- Realiza autenticação de usuário (POST /Login/)

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.database.models import Usuario
from src.database.SQLite.database_script import get_db
from src.database.schemas.login_schema import LoginRequest

rota = APIRouter()

@rota.post("/Login/")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.nome == data.login).first()

    if not usuario or data.password != usuario.senha:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return {"message": "Login bem-sucedido", "cliente_id": usuario.id}
