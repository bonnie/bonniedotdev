import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("db_setup_with_data")
@pytest.mark.usefixtures("db_teardown")
@pytest.mark.parametrize(
    ["username", "password", "expected_response"],
    [
        # valid user/password
        ("admin", "abc123", True),
        # invalid password
        # ("admin", "wrong", False),
        # nonexistent user
        # ("not_admin", "abc123", False),
    ],
)
def test_valid_login(
    db_setup_with_data,
    db_teardown,
    test_client,
    username,
    password,
    expected_response,
):

    try:
        response = test_client.get(
            "/api/login",
            json={"username": username, "password": password},
        )

        assert response.json["valid"] == expected_response
    finally:
        # use finally to make sure db gets cleaned up
        # db_teardown()
        # TODO: why can't I tear down here...?
        pass
