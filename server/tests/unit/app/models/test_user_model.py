import pytest
from app.models.user_model import User


@pytest.fixture
def mock_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(User, "update_db")


def test_create_user(mock_update_db):
    # make sure there are no errors creating a user

    user = User(
        username="admin",
        password="abc123",
    )

    assert type(user) == User


def test_hash_password():
    salt = bytearray("salt", "ascii")
    password = "abc123"

    hash = User.hash_password(password, salt)

    assert (
        hash
        == b"^^+w\x02\xa7\xcb!\xa0x2\xab\xe4K\xda\n\x97\xde\xf6\xfd\xc1\xd0\xc3?\xe8\xeb\xac\xd4l\x8d\xdc\xb3"  # noqa: E501
    )
