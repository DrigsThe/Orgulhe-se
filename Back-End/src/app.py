"""
Ponto de entrada principal da API.

Configura a instância do FastAPI, registra as rotas da aplicação e inicia o servidor
utilizando o Uvicorn para desenvolvimento local com hot reload.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import LOCALHOST, PORT
from .routes import rotas
from . import database

# App
app = FastAPI()

# Configuração CORS global e permissiva
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem
    allow_credentials=True,  # Importante para cookies/sessão
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

for rota in rotas:
    app.include_router(rota)

# Rota de teste para verificar a integração
@app.get("/api/test")
async def test_connection() -> dict[str, str]:
    """Rota de teste para verificar a integração entre o backend e o frontend."""
    return {
        "message": "Conexão backend-frontend estabelecida com sucesso!",
        "status": "active"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.app:app",
        host=LOCALHOST,
        port=PORT,
        reload=True,
        workers=1
    )
