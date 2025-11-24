"""
Módulo Mensagens

Responsável pelo gerenciamento, criação e envio de mensagens dentro do sistema.

Contém funções para:
- Construção de mensagens padronizadas;
- Envio de notificações e alertas;
- Formatação de texto para comunicação interna ou externa.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Mensagem, MensagemCreate, get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Mensagens/")
def get_mensagens(db: Session = Depends(get_db)):
    """Retorna todas as mensagens"""
    return db.query(Mensagem).all()

#POST - Criar
@rota.post("/Mensagem/")
def post_message(mensagem: MensagemCreate, db: Session = Depends(get_db)):
    """Cria uma nova mensagem"""
    nova_mensagem = Mensagem(**mensagem.model_dump())
    db.add(nova_mensagem)
    db.commit()

    return {"id": nova_mensagem.id}

#PUT - Atualizar
@rota.put("/Mensagem/{mensagem_id}")
def put_message(mensagem_id: int, mensagem: MensagemCreate, db: Session = Depends(get_db)):
    """Atualiza os dados da mensagem[id]"""
    mensagem_existente = db.query(Mensagem).filter(Mensagem.id == mensagem_id).first()

    if not mensagem_existente:
        return {"erro": "Mensagem não encontrada."}

    for chave, valor in mensagem.model_dump().items():
        setattr(mensagem_existente, chave, valor)

    db.commit()

    return {"mensagem": "Mensagem atualizada com sucesso."}

#DEL - Deletar
@rota.delete("/Mensagem/{mensagem_id}")
def del_message(mensagem_id: int, db: Session = Depends(get_db)):
    """Deleta os dados da mensagem[id] e seus dados"""
    mensagem_existente = db.query(Mensagem).filter(Mensagem.id == mensagem_id).first()

    if not mensagem_existente:
        return {"erro": "Mensagem não encontrada."}

    db.delete(mensagem_existente)
    db.commit()

    return {"mensagem": "Mensagem deletada com sucesso."}
