"""
Rotas para autenticação social (Google e Facebook).

Esses endpoints recebem um token OAuth2 do frontend, validam (simulado) e retornam sucesso ou erro.
- POST /api/Login/google
- POST /api/Login/facebook
"""
from fastapi import APIRouter, HTTPException, Request
import asyncio

rota = APIRouter()

@rota.post('/api/Login/google')
async def login_google(request: Request):
    data = await request.json()
    token = data.get('token')
    if not token:
        raise HTTPException(status_code=400, detail='Token não fornecido')
    return {'message': 'Login Google bem-sucedido'}

@rota.post('/api/Login/facebook')
async def login_facebook(request: Request):
    data = await request.json()
    token = data.get('token')
    if not token:
        raise HTTPException(status_code=400, detail='Token não fornecido')
    return {'message': 'Login Facebook bem-sucedido'}
