"""
Módulo de rota para o endpoint /Banners/.

Define as operações CRUD para o recurso Banners:
- Listar todos os banners (GET /Banners/)
- Criar novo banner (POST /Banners/)
- Atualizar banner existente (PUT /Banners/{banner_id})
- Deletar banner (DELETE /Banners/{banner_id})

Utiliza dependência para sessão do banco de dados via SQLAlchemy.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.SQLite.database_script import Banner, BannerCreate, get_db

rota = APIRouter()

#GET - Listar
@rota.get("/Banners/")
def get_banners(db: Session = Depends(get_db)):
    """Retorna os banners"""
    return db.query(Banner).all()

#POST - Criar
@rota.post("/Banner/")
def post_banner(banner: BannerCreate, db: Session = Depends(get_db)):
    """Cria um novo banner"""
    novo_banner = Banner(**banner.model_dump())
    db.add(novo_banner)
    db.commit()

    return {"id": novo_banner.id, "imagem": novo_banner.imagem}

#PUT - Atualizar
@rota.put("/Banner/{banner_id}")
def put_banner(banner_id: int, banner: BannerCreate, db: Session = Depends(get_db)):
    """Atualiza os dados do banner[id]"""
    banner_existente = db.query(Banner).filter(Banner.id == banner_id).first()

    if not banner_existente:
        return {"erro": "Banner não encontrado."}

    for chave, valor in banner.model_dump().items():
        setattr(banner_existente, chave, valor)

    db.commit()
    return {"mensagem": "Banner atualizado com sucesso."}

#DEL - Deletar
@rota.delete("/Banner/{banner_id}")
def del_banner(banner_id: int, db: Session = Depends(get_db)):
    """Deleta os dados do banner[id]"""
    banner_existente = db.query(Banner).filter(Banner.id == banner_id).first()

    if not banner_existente:
        return {"erro": "Banner não encontrado."}

    db.delete(banner_existente)
    db.commit()

    return {"mensagem": "Banner deletado com sucesso."}
