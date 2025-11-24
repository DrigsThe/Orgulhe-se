"""
Inicializa e organiza os modelos do banco de dados.

Este módulo importa todas as classes de modelo (tabelas) utilizadas pela aplicação,
permitindo uma referência centralizada para migrações, inicializações e instâncias do ORM.

Modelos incluídos:
- Usuario
- Produto
- Categoria
- Cupom
- Banner
- Pedido
- Mensagem
- Avaliacao
- Relatorio
- Configuracao
"""
from .usuario import Usuario
from .produto import Produto
from .categoria import Categoria
from .cupom import Cupom
from .banner import Banner
from .pedido import Pedido
from .mensagem import Mensagem
from .avaliacao import Avaliacao
from .relatorio import Relatorio
from .configuracao import Configuracao
from .itens_pedido import ItensPedido
