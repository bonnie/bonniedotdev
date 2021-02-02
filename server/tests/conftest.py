from datetime import datetime
from datetime import timedelta

import pytest
from app import create_app
from app.enums import FlaskEnv
from pytz import utc

# test data


@pytest.fixture
def now_date_utc():
    return datetime.now(utc)


@pytest.fixture
def iso_30_days_from_now():
    return datetime.isoformat(datetime.now(utc) + timedelta(days=5))


@pytest.fixture
def iso_30_days_ago():
    return datetime.isoformat(datetime.now(utc) - timedelta(days=5))


@pytest.fixture
def courses():
    return [
        {
            "name": "Awesome Course",
            "link": "https://udemy.com/awesomecourse",
        },
    ]


@pytest.fixture
def coupons(iso_30_days_from_now, iso_30_days_ago):
    return [
        {
            "utcExpirationISO": iso_30_days_from_now,
            "course_id": 1,
            "link": "http://link?NOT_EXPIRED",
        },
        {
            "utcExpirationISO": iso_30_days_ago,
            "course_id": 1,
            "link": "http://link?EXPIRED",
        },
    ]


@pytest.fixture
def review_quotes():
    return [
        {"quote": "the best!", "courseId": 1},
        {"quote": "meh", "courseId": 1},
    ]


@pytest.fixture
def users():
    return [{"username": "admin", "password": "abc12"}]


@pytest.fixture
def app():
    return create_app(flask_env=FlaskEnv.TEST)


# TODO: move this to appropriate conftest
# TODO: optimize to have one dependency for test_db and test_client instead of 2
# TODO: understand "with" contexts here:
#           https://flask.palletsprojects.com/en/1.1.x/testing/
@pytest.fixture
def test_client(app):
    return app.test_client()
