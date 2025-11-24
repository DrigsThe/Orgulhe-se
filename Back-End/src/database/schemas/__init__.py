"""
Centraliza os schemas de entrada da aplicação.

Este módulo importa e organiza todos os schemas utilizados para validação
e manipulação de dados de entrada nas operações da API.
"""
from .usuario_schema import UsuarioCreate
from .produto_schema import ProdutoCreate
from .categoria_schema import CategoriaCreate
from .cupom_schema import CupomCreate
from .banner_schema import BannerCreate
from .pedido_schema import PedidoCreate
from .mensagem_schema import MensagemCreate
from .avaliacao_schema import AvaliacaoCreate
from .relatorio_schema import RelatorioCreate
from .configuracao_schema import ConfiguracaoCreate
from .itens_pedido_schema import ItensPedidoCreate
