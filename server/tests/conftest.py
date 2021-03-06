from datetime import datetime
from datetime import timedelta

import pytest
from app import create_app
from app.enums import FlaskEnv
from app.jwt import create_jwt
from app.jwt import JWT_HEADER_KEY
from flask import testing
from pytz import utc
from werkzeug.datastructures import Headers


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


class TestClient(testing.FlaskClient):
    def open(self, *args, **kwargs):
        # by default, test client uses a valid jwt
        # use user_id=1
        jwt = create_jwt(1)

        api_key_headers = Headers({JWT_HEADER_KEY: jwt})
        headers = kwargs.pop("headers", Headers())
        headers.extend(api_key_headers)
        kwargs["headers"] = headers
        return super().open(*args, **kwargs)


# TODO: move this to appropriate conftest
# TODO: optimize to have one dependency for test_db and test_client instead of 2
# TODO: understand "with" contexts here:
#           https://flask.palletsprojects.com/en/1.1.x/testing/
@pytest.fixture
def test_client(app):
    app.test_client_class = TestClient
    return app.test_client()
