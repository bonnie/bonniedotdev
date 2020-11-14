import pytest


@pytest.mark.usefixtures("test_client")
@pytest.fixture
def login_response(test_client):
    return test_client.get("/api/login_response")


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
def test_valid_login(username, password, expected_response):
    pass


# def test_footer_status(footer_response):
#     assert footer_response.status_code == 200


# def test_footer_dict_keys(footer_response):
#     response_json = footer_response.json
#     assert all(["icon" in link for link in response_json])
#     assert all(["target" in link for link in response_json])
