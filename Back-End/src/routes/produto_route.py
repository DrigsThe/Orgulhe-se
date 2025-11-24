"""
Módulo de rota para o endpoint /Produtos/.

Define as operações CRUD para o recurso Produtos:
- Listar todos os produtos (GET /Produtos/)
- Criar novo produto (POST /Produtos/)
- Atualizar produto existente (PUT /Produtos/{produto_id})
- Deletar produto (DELETE /Produtos/{produto_id})

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Produto, ProdutoCreate, get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Produtos/")
def get_products(db: Session = Depends(get_db)):
    """Retorna os produtos cadastrados"""
    return db.query(Produto).all()

#POST - Criar
@rota.post("/Produto/")
def post_product(produto: ProdutoCreate, db: Session = Depends(get_db)):
    """Cria um novo produto"""
    novo_produto = Produto(**produto.model_dump())
    db.add(novo_produto)
    db.commit()

    return {"id": novo_produto.id, "nome": novo_produto.nome}

#PUT - Atualizar
@rota.put("/Produto/{produto_id}")
def put_product(produto_id: int, produto: ProdutoCreate, db: Session = Depends(get_db)):
    """Atualiza os dados do produto[id]"""
    db_produto = db.query(Produto).get(produto_id)

    if db_produto:
        for key, value in produto.model_dump().items():
            setattr(db_produto, key, value)

        db.commit()
        return {"msg": "Produto atualizado com sucesso"}

    return {"erro": "Produto não encontrado"}

#DEL - Deletar
@rota.delete("/Produto/{produto_id}")
def del_product(produto_id: int, db: Session = Depends(get_db)):
    """Deleta os o produto[id] e seus dados"""
    db_produto = db.query(Produto).get(produto_id)

    if db_produto:
        db.delete(db_produto)
        db.commit()
        return {"msg": "Produto deletado com sucesso"}

    return {"erro": "Produto não encontrado"}
