import re

import pytest
from app import create_app


@pytest.fixture
def test_client():
    app = create_app(flask_env="test")
    return app.test_client()


@pytest.fixture
def homepage_response(test_client):
    return test_client.get("/")


def test_homepage_status(homepage_response):
    assert homepage_response.status_code == 200


def test_homepage_text(homepage_response):
    assert b"Bonnie Schulkin" in homepage_response.data


def test_homepage_buttons(homepage_response):
    link_buttons = re.findall(b'span class="icon"', homepage_response.data)
    assert len(link_buttons) == 4
