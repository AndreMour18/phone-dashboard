def test_create_user(client):
    response = client.post(
        "/users/",
        json={"email": "user1@test.com", "password": "secret", "is_admin": False},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "user1@test.com"
    assert "id" in data


def test_get_users(client):
    client.post(
        "/users/",
        json={"email": "user2@test.com", "password": "123", "is_admin": False},
    )
    response = client.get("/users/")
    assert response.status_code == 200
    assert any(u["email"] == "user2@test.com" for u in response.json())
