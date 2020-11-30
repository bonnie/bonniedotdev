import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
@pytest.mark.parametrize(
    ["username", "password", "expected_response"],
    [
        # valid user/password
        ("admin", "abc123", True),
        # invalid password
        ("admin", "wrong", False),
        # nonexistent user
        ("not_admin", "abc123", False),
    ],
)
def test_valid_login(
    test_db,
    test_client,
    username,
    password,
    expected_response,
):

    response = test_client.get(
        "/api/login",
        json={"username": username, "password": password},
    )

    assert response.json["valid"] == expected_response
