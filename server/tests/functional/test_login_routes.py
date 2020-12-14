import pytest


@pytest.mark.parametrize(
    ["username", "password", "expected_response"],
    [
        # valid user/password
        ("admin", "abc123", None),
        # invalid password
        ("admin", "wrong", "Incorrect login"),
        # nonexistent user
        ("not_admin", "abc123", "Incorrect login"),
        # missing argument
        (
            "not_admin",
            None,
            "incorrect arguments: {'password': ['Field may not be null.']}",
        ),
    ],
)
def test_valid_login(
    test_db,
    test_client,
    username,
    password,
    expected_response,
):

    response = test_client.post(
        "/api/login",
        json={"username": username, "password": password},
    )

    assert response.json.get("message") == expected_response
