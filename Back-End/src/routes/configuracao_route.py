"""
Módulo de rota para o endpoint /Configurações/.

Define as operações CRUD para o recurso Configurações:
- Listar todas as configurações (GET /Configurações/)
- Criar nova configuração (POST /Configurações/)
- Atualizar configuração existente (PUT /Configurações/{config_id})
- Deletar configuração (DELETE /Configurações/{config_id})

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Configuracao, ConfiguracaoCreate, get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Configurações/")
def get_configs(db: Session = Depends(get_db)):
    """Retorna as configurações"""
    return db.query(Configuracao).all()

#POST - Criar
@rota.post("/Configuracao/")
def post_config(config: ConfiguracaoCreate, db: Session = Depends(get_db)):
    """Cria uma nova configuração"""
    nova_config = Configuracao(**config.model_dump())
    db.add(nova_config)
    db.commit()

    return {"id": nova_config.id}

#PUT - Atualizar
@rota.put("/Configuracao/{config_id}")
def put_config(config_id: int, config: ConfiguracaoCreate, db: Session = Depends(get_db)):
    """Atualiza os dados da configuração[id]"""
    db_config = db.query(Configuracao).get(config_id)

    if db_config:
        for key, value in config.model_dump().items():
            setattr(db_config, key, value)

        db.commit()
        return {"msg": "Configuração atualizada com sucesso"}

#DEL - Deletar
@rota.delete("/Configuracao/{config_id}")
def del_config(config_id: int, db: Session = Depends(get_db)):
    """Deleta a configuração[id] e seus dados"""
    db_config = db.query(Configuracao).get(config_id)

    if db_config:
        db.delete(db_config)
        db.commit()
        return {"msg": "Configuração deletada com sucesso"}

    return {"erro": "Configuração não encontrada"}
