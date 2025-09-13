def test_login_success(client):
    client.post(
        "/users/",
        json={"email": "admin@test.com", "password": "admin123", "is_admin": True},
    )
    response = client.post(
        "/auth/token", data={"username": "admin@test.com", "password": "admin123"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_fail(client):
    response = client.post(
        "/auth/token", data={"username": "wrong@test.com", "password": "123"}
    )
    assert response.status_code == 401
