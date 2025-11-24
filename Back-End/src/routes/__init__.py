"""ROTA DOS ENDPOINTS DA API"""
from .usuario_route import rota as usuario_route
from .produto_route import rota as produto_route
from .categoria_route import rota as categoria_route
from .cupon_route import rota as cupon_route
from .banner_route import rota as banner_route
from .pedido_route import rota as pedido_route
from .mensagen_route import rota as mensagen_route
from .avaliacao_route import rota as avaliacao_route
from .relatorio_route import rota as relatorio_route
from .configuracao_route import rota as configuracao_route
from .login_route import rota as login_route
from .social_login_route import rota as social_login_route

rotas = [
    usuario_route,
    produto_route,
    categoria_route,
    cupon_route,
    banner_route,
    pedido_route,
    mensagen_route,
    avaliacao_route,
    relatorio_route,
    configuracao_route,
    login_route,
    social_login_route
]
