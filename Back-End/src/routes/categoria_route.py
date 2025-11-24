"""
Módulo de rota para o endpoint /Categorias/.

Define as operações CRUD para o recurso Categorias:
- Listar todas as categorias (GET /Categorias/)
- Criar nova categoria (POST /Categorias/)
- Atualizar categoria existente (PUT /Categorias/{categoria_id})
- Deletar categoria (DELETE /Categorias/{categoria_id})

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Categoria, CategoriaCreate, get_db

rota = APIRouter()

@rota.get("/Categorias/")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Categoria).all()

@rota.post("/Categoria/")
def post_category(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    nova_categoria = Categoria(**categoria.model_dump())
    db.add(nova_categoria)
    db.commit()

    return {"id": nova_categoria.id, "nome": nova_categoria.nome}

#PUT
@rota.put("/Categoria/{categoria_id}")
def put_category(categoria_id: int, categoria: CategoriaCreate, db: Session = Depends(get_db)):
    db_categoria = db.query(Categoria).get(categoria_id)

    if db_categoria:
        for key, value in categoria.model_dump().items():
            setattr(db_categoria, key, value)

        db.commit()
        return {"msg": "Categoria atualizada com sucesso"}

    return {"erro": "Categoria não encontrada"}

#DELETE
@rota.delete("/Categoria/{categoria_id}")
def del_category(categoria_id: int, db: Session = Depends(get_db)):
    db_categoria = db.query(Categoria).get(categoria_id)

    if db_categoria:
        db.delete(db_categoria)
        db.commit()
        return {"msg": "Categoria deletada com sucesso"}

    return {"erro": "Categoria não encontrada"}
