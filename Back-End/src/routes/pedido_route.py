"""
Módulo Pedidos

Gerencia as operações relacionadas aos pedidos no sistema.

Inclui funcionalidades para:
- Criação, edição e exclusão de pedidos;
- Validação de dados de pedidos;
- Consulta e listagem de pedidos ativos ou históricos;
- Processamento do status dos pedidos.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Pedido, PedidoCreate, get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Pedidos/")
def get_orders(db: Session = Depends(get_db)):
    """Retorna os pedidos gerados"""
    return db.query(Pedido).all()

#POST - Criar
@rota.post("/Pedido/")
def post_order(pedido: PedidoCreate, db: Session = Depends(get_db)):
    """Cria um novo pedido"""
    novo_pedido = Pedido(**pedido.model_dump())
    db.add(novo_pedido)
    db.commit()

    return {"id": novo_pedido.id, "status": novo_pedido.status}

#PUT - Atualizar
@rota.put("/Pedido/{pedido_id}")
def put_order(pedido_id: int, pedido: PedidoCreate, db: Session = Depends(get_db)):
    """Atualiza os dados do pedido[id]"""
    db_pedido = db.query(Pedido).get(pedido_id)

    if db_pedido:
        for key, value in pedido.model_dump().items():
            setattr(db_pedido, key, value)

        db.commit()
        return {"msg": "Pedido atualizado com sucesso"}

    return {"erro": "Pedido não encontrado"}

#DEL - Deletar
@rota.delete("/Pedido/{pedido_id}")
def del_order(pedido_id: int, db: Session = Depends(get_db)):
    """Deleta o pedido[id] e seus dados"""
    db_pedido = db.query(Pedido).get(pedido_id)

    if db_pedido:
        db.delete(db_pedido)
        db.commit()
        return {"msg": "Pedido deletado com sucesso"}

    return {"erro": "Pedido não encontrado"}
