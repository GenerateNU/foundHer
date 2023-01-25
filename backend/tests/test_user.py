from .test_main import client, test_db
def test_register_user(test_db):
    json={"username": "me", "password": "newPassword", "email": "fake_email.com"}
    response = client.post(url="/register", json=json)
    
    assert response.status_code == 200    
    assert response.json()["username"] == json["username"]
    assert response.json()["email"] == json["email"]
    assert "access_token" in response.json()
    assert "hashed_password" not in response.json()



def test_login_user_and_get_profile(test_db):
    json={"username": "me", "password": "newPassword", "email": "fake_email.com"}
    response = client.post(url="/register", json=json)

    assert response.status_code == 200
    
    response = client.post(url="/login", json={"username": json["username"], "password":json["password"]})
    assert response.status_code == 200
    assert "access_token" in response.json()
    token = response.json()["access_token"]
    response = client.get(url="/profile", headers={"Authorization" : f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == json["username"]
    assert response.json()["email"] == json["email"]
    response = client.get(url="/profile", headers={"Authorization" : "Bearer Wrong token"})
    assert response.status_code == 401




    
