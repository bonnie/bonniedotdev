import pytest
from app import create_app


@pytest.fixture
def test_client():
    app = create_app(flask_env="test")
    return app.test_client()
