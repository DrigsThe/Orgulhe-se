"""
Módulo de rota para o endpoint /Usuarios/.

Define as operações CRUD para o recurso Usuarios:
- Listar todos os Usuarios (GET /Usuarios/)
- Criar novo usuario (POST /Usuarios/)
- Atualizar usuario existente (PUT /Usuarios/{cli_id})
- Deletar usuario (DELETE /Usuarios/{cli_id})

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, HTTPException, Depends
from src.database.models import Usuario
from src.database.schemas.usuario_schema import UsuarioCreate
from src.database.SQLite.database_script import get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Usuarios/")
def get_users(db: Session = Depends(get_db)):
    """Retorna os usuários cadastrados"""
    return db.query(Usuario).all()

#POST - Criar
@rota.post("/Usuario/")
def post_user(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    """Cadastrar novo usuário"""
    new_user: Usuario = Usuario(**usuario.model_dump())

    db.add(new_user)

    try:
        db.commit()

    except IntegrityError as exc:
        db.rollback()

        raise HTTPException(status_code=409, detail="Nome ou e-mail já cadastrado") from exc

    return {"id": new_user.id, "nome": new_user.nome}

#PUT - Atualizar
@rota.put("/Usuario/{cli_id}")
def put_user(cli_id: int, updt_data: UsuarioCreate,
                      db: Session = Depends(get_db)) -> dict:
    """Atualiza os dados do usuario{id}"""
    usuario = db.query(Usuario).filter(Usuario.id == cli_id).first()

    if not usuario:
        return {"erro": "Usuário não encontrado"}

    for chave, valor in updt_data.model_dump().items():
        setattr(usuario, chave, valor)

    db.commit()
    db.refresh(usuario)

    return {
        "mensagem": "Usuário atualizado com sucesso", 
        "usuario": {"id": usuario.id, "nome": usuario.nome}
    }

#DEL - Deletar
@rota.delete("/Usuario/{cli_id}")
def del_user(cli_id: int, db: Session = Depends(get_db)):
    """Deleta o usuario{id} e seus dados"""
    usuario = db.query(Usuario).filter(Usuario.id == cli_id).first()

    if not usuario:
        return {"erro": "Usuario não encontrado"}

    db.delete(usuario)
    db.commit()

    return {"mensagem": f"Usuario com ID {cli_id} deletado com sucesso"}
