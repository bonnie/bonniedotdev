from datetime import datetime
from datetime import timedelta

import pytest
from app import create_app
from pytz import utc

# test data


@pytest.fixture
def courses():
    return [
        {
            "name": "Awesome Course",
            "link": "https://udemy.com/awesomecourse",
        },
    ]


@pytest.fixture
def coupons():
    return [
        {
            "code": "NOT_EXPIRED",
            "utc_expiration": datetime.now(utc) + timedelta(days=30),
            "course_id": 1,
        },
        {
            "code": "EXPIRED",
            "utc_expiration": datetime.now(utc) - timedelta(days=30),
            "course_id": 1,
        },
    ]


@pytest.fixture
def review_quotes():
    return [
        {"quote": "the best!", "course_id": 1},
        {"quote": "meh", "course_id": 1},
    ]


@pytest.fixture
def users():
    return [{"username": "admin", "password": "abc12"}]


@pytest.fixture
def app():
    return create_app(flask_env="test")


@pytest.fixture
def test_client(app):
    return app.test_client()
