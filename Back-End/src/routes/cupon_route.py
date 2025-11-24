"""
Módulo de rota para o endpoint /Cupons/.

Define as operações CRUD para o recurso Cupons:
- Listar todos os cupons (GET /Cupons/)
- Criar novo cupom (POST /Cupons/)
- Atualizar cupom existente (PUT /Cupons/{cupom_id})
- Deletar cupom (DELETE /Cupons/{cupom_id})

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Cupom, CupomCreate, get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Cupons/")
def get_cupons(db: Session = Depends(get_db)):
    """Retorna os cupons"""
    return db.query(Cupom).all()

#POST - Criar
@rota.post("/Cupom/")
def post_cupon(cupom: CupomCreate, db: Session = Depends(get_db)):
    """Cria um novo cupom"""
    novo_cupom = Cupom(**cupom.model_dump())
    db.add(novo_cupom)
    db.commit()

    return {"id": novo_cupom.id, "codigo": novo_cupom.codigo}

#PUT - Atualizar
@rota.put("/Cupom/{cupom_id}")
def put_cupon(cupom_id: int, cupom: CupomCreate, db: Session = Depends(get_db)):
    """Atualiza os dados do cupom[id]"""
    db_cupom = db.query(Cupom).get(cupom_id)

    if db_cupom:
        for key, value in cupom.model_dump().items():
            setattr(db_cupom, key, value)

        db.commit()
        return {"msg": "Cupom atualizado com sucesso"}

    return {"erro": "Cupom não encontrado"}

#DEL - Deletar
@rota.delete("/Cupom/{cupom_id}")
def del_cupon(cupom_id: int, db: Session = Depends(get_db)):
    """ Deleta o cupom[id] e seus dados"""
    db_cupom = db.query(Cupom).get(cupom_id)

    if db_cupom:
        db.delete(db_cupom)
        db.commit()
        return {"msg": "Cupom deletado com sucesso"}

    return {"erro": "Cupom não encontrado"}
