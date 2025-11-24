"""
Testes para endpoints de /Usuarios/ da API Orgulhe-se.

Testa criação, listagem, atualização e exclusão de usuários.
"""

def test_post_usuario(client):
    """Testa criação de um novo usuário"""
    response = client.post("/Usuario/", json={
        "nome": "Teste",
        "email": "teste@email.com",
        "senha": "123456"
    })
    assert response.status_code == 200 or response.status_code == 201
    data = response.json()
    assert data["nome"] == "Teste"
    assert "id" in data

def test_get_usuarios(client):
    """Testa listagem de usuários"""
    response = client.get("/Usuarios/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:  # se houver usuários cadastrados
        assert "nome" in data[0]
        assert "email" in data[0]

def test_atualizar_usuario(client):
    """Testa atualização de um usuário existente"""
    # Primeiro cria um usuário
    resp_create = client.post("/Usuario/", json={
        "nome": "AtualizarTeste",
        "email": "atualizar@email.com",
        "senha": "123456"
    })
    user_id = resp_create.json()["id"]

    # Atualiza o nome
    resp_update = client.put(f"/Usuarios/{user_id}", json={
        "nome": "Atualizado",
        "email": "atualizar@email.com",
        "senha": "123456"
    })
    assert resp_update.status_code == 200
    data = resp_update.json()
    assert data["usuario"]["nome"] == "Atualizado"

def test_deletar_usuario(client):
    """Testa exclusão de um usuário"""
    # Primeiro cria um usuário
    resp_create = client.post("/Usuario/", json={
        "nome": "DeletarTeste",
        "email": "deletar@email.com",
        "senha": "123456"
    })
    user_id = resp_create.json()["id"]

    # Deleta o usuário
    resp_delete = client.delete(f"/Usuarios/{user_id}")
    assert resp_delete.status_code == 200
    data = resp_delete.json()
    assert "mensagem" in data
