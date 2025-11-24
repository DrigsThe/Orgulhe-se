"""
Módulo Relatórios

Responsável pela geração e manipulação dos relatórios do sistema.

Funções principais:
- Coleta e agregação de dados para relatórios;
- Formatação e exportação em diferentes formatos (PDF, CSV, etc.);
- Geração de relatórios estatísticos e operacionais.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Relatorio, RelatorioCreate, get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Relatorios/")
def get_reports(db: Session = Depends(get_db)):
    """Retorna os relatórios criados"""
    return db.query(Relatorio).all()

#POST - Criar
@rota.post("/Relatorio/")
def post_report(relatorio: RelatorioCreate, db: Session = Depends(get_db)):
    """Cria um novo relatório"""
    novo_relatorio = Relatorio(**relatorio.model_dump())
    db.add(novo_relatorio)
    db.commit()

    return {"id": novo_relatorio.id}

#PUT - Atualizar
@rota.put("/Relatorio/{relatorio_id}")
def put_report(relatorio_id: int, relatorio: RelatorioCreate, db: Session = Depends(get_db)):
    """Atualiza os dados do relatório[id]"""
    db_relatorio = db.query(Relatorio).get(relatorio_id)

    if db_relatorio:
        for key, value in relatorio.model_dump().items():
            setattr(db_relatorio, key, value)

        db.commit()
        return {"msg": "Relatório atualizado com sucesso"}

    return {"erro": "Relatório não encontrado"}

#DEL - Deletar
@rota.delete("/Relatorio/{relatorio_id}")
def del_report(relatorio_id: int, db: Session = Depends(get_db)):
    """Deleta os dados do relatório[id]"""
    db_relatorio = db.query(Relatorio).get(relatorio_id)

    if db_relatorio:
        db.delete(db_relatorio)
        db.commit()
        return {"msg": "Relatório deletado com sucesso"}

    return {"erro": "Relatório não encontrado"}
