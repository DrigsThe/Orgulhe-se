"""
Configurações de conexão com o banco MySQL para a API Flask.

Define os parâmetros de conexão com o MySQL, como host, usuário, senha, banco de dados
e classe de cursor para manipulação dos dados retornados.
"""
import os
from dotenv import load_dotenv

load_dotenv()

LOCALHOST=str(os.getenv("API_HOST"))
PORT=int(os.getenv("API_PORT", 8000))

# from flask import Flask
# from flask_mysqldb import MySQL

# app = Flask(__name__)

# mysql = MySQL(app)

# class Config:
#     """Configurações do MySQL"""
#     def iniciar(self):
#         """ Inicia as configurações """
#         app.config['MYSQL_HOST'] = 'localhost'
#         app.config['MYSQL_USER'] = 'root'
#         app.config['MYSQL_PASSWORD'] = 'admin123'
#         app.config['MYSQL_DB'] = 'ecommerce'
#         app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
