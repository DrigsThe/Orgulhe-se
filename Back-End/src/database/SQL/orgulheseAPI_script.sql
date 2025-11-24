CREATE DATABASE IF NOT EXISTS orgulhe_se;
USE orgulhe_se;

-- DDL
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuario(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL unique,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de produto
CREATE TABLE IF NOT EXISTS produto(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT UNSIGNED,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT,
    descricao TEXT NOT NULL,
    imagem_url VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);

-- Tabela de pedido
CREATE TABLE IF NOT EXISTS pedido(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT UNSIGNED,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_pedido DATETIME NOT NULL,
    endereco_entrega VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabela de carrinho
CREATE TABLE IF NOT EXISTS carrinho(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT UNSIGNED NOT NULL,
    produto_id INT UNSIGNED NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS avaliacao(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT UNSIGNED,
    nota INT,
    comentario TEXT,
    FOREIGN KEY (id_cliente) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS cupom(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(255) UNIQUE,
    desconto DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS relatorio(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255),
    conteudo TEXT
);

CREATE TABLE IF NOT EXISTS mensagem(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT UNSIGNED,
    conteudo TEXT,
    data_envio DATETIME,
    FOREIGN KEY (id_cliente) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS configuracao(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    chave VARCHAR(255),
    valor VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS banner(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    imagem VARCHAR(255),
    link VARCHAR(255)
);

-- DML
-- pedido detalhados -> tabela itens comprados
CREATE TABLE IF NOT EXISTS Itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT UNSIGNED NOT NULL,
    id_produto INT UNSIGNED NOT NULL,
    quantidade INT UNSIGNED NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produto(id) ON DELETE CASCADE
);

-- Gatilho para validar estoque antes de inserir item
DELIMITER //
CREATE TRIGGER validar_estoque
	BEFORE INSERT ON Itens_pedido
		FOR EACH ROW
			BEGIN
				DECLARE qtd_estoque INT;
				SELECT estoque INTO qtd_estoque FROM produto WHERE id = NEW.id_produto;
				IF qtd_estoque < NEW.quantidade THEN
					SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estoque insuficiente para este produto.';
				END IF;
			END;
//
DELIMITER ;

-- Gatilho para atualizar estoque ao inserir item de pedido
DELIMITER //
CREATE TRIGGER decrementar_estoque
	AFTER INSERT ON Itens_pedido
		FOR EACH ROW
			BEGIN
				UPDATE produto
				SET estoque = estoque - NEW.quantidade
					WHERE id = NEW.id_produto;
			END;
//
DELIMITER ;

-- Gatilho para atualizar total do pedido ao inserir item de pedido
DELIMITER //
CREATE TRIGGER atualizar_total_pedido
	AFTER INSERT ON Itens_pedido
		FOR EACH ROW
			BEGIN
				UPDATE pedido
				SET total = IFNULL(total, 0) + (NEW.quantidade * NEW.preco_unitario)
					WHERE id = NEW.id_pedido;
			END;
//
DELIMITER ;

-- View para relatório de vendas por produto
CREATE VIEW VendasPorProduto AS
	SELECT
		p.id AS id_produto,
		p.nome,
		SUM(i.quantidade) AS total_vendido,
		SUM(i.quantidade * i.preco_unitario) AS faturamento
	FROM produto p
		JOIN Itens_pedido i ON p.id = i.id_produto
		GROUP BY p.id, p.nome;

-- View para listagem de pedido com o nome do usuario
CREATE VIEW pedidoDetalhado AS
	SELECT
		p.id AS id_pedido,
		u.nome AS usuario,
		p.data_pedido,
		p.status,
		p.total
	FROM pedido p
	JOIN usuario u ON p.id_usuario=u.id;
