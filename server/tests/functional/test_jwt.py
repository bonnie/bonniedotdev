import pytest
from app.jwt import create_jwt
from app.jwt import JWT_HEADER_KEY


@pytest.fixture()
def clean_test_client(app):
    # don't use the global test client, as that has a valid jwt by default
    return app.test_client()


def test_no_jwt(clean_test_client, test_db):
    response = clean_test_client.delete("/api/talk/1")
    assert response.status_code == 401


def test_expired_jwt(clean_test_client, test_db):
    expired_jwt = create_jwt(user_id=1, expiration_date="2020-02-02")
    response = clean_test_client.delete(
        "/api/talk/1",
        headers={JWT_HEADER_KEY: expired_jwt},
    )
    assert response.status_code == 401


def test_jwt_for_invalid_user(clean_test_client, test_db):
    bad_user_jwt = create_jwt(user_id=1000)
    response = clean_test_client.delete(
        "/api/talk/1",
        headers={JWT_HEADER_KEY: bad_user_jwt},
    )
    assert response.status_code == 401


def test_invalid_jwt(clean_test_client, test_db):
    bad_jwt = "abc123"
    response = clean_test_client.delete(
        "/api/talk/1",
        headers={JWT_HEADER_KEY: bad_jwt},
    )
    assert response.status_code == 401
