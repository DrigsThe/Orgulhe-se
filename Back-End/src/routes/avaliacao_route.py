"""
Módulo de rota para o endpoint /Avaliações/.

Define as operações CRUD para o recurso Avaliações:
- Listar todas as avaliações (GET /Avaliações/)
- Criar nova avaliação (POST /Avaliações/)
- Atualizar avaliação existente (PUT /Avaliações/{avaliacao_id})
- Deletar avaliação (DELETE /Avaliações/{avaliacao_id})

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Avaliacao, AvaliacaoCreate, get_db

rota = APIRouter()

@rota.get("/Avaliações/")
def get_ratings(db: Session = Depends(get_db)):
    return db.query(Avaliacao).all()

@rota.post("/Avaliações/")
def post_rating(avaliacao: AvaliacaoCreate, db: Session = Depends(get_db)):
    nova_avaliacao = Avaliacao(**avaliacao.model_dump())
    db.add(nova_avaliacao)
    db.commit()
    return {"id": nova_avaliacao.id}

#PUT
@rota.put("/Avaliações/{avaliacao_id}")
def put_rating(avaliacao_id: int, avaliacao: AvaliacaoCreate, db: Session = Depends(get_db)):
    db_avaliacao = db.query(Avaliacao).get(avaliacao_id)

    if db_avaliacao:
        for key, value in avaliacao.model_dump().items():
            setattr(db_avaliacao, key, value)

        db.commit()
        return {"msg": "Avaliação atualizada com sucesso"}

    return {"erro": "Avaliação não encontrada"}

#DELETE
@rota.delete("/Avaliações/{avaliacao_id}")
def del_rating(avaliacao_id: int, db: Session = Depends(get_db)):
    db_avaliacao = db.query(Avaliacao).get(avaliacao_id)

    if db_avaliacao:
        db.delete(db_avaliacao)
        db.commit()
        return {"msg": "Avaliação deletada com sucesso"}

    return {"erro": "Avaliação não encontrada"}
