from datetime import datetime
from datetime import timedelta

import pytest
from app import create_app
from app.db import connect_to_db
from app.db import db
from app.models.course_model import Course
from app.models.user_model import User


def load_test_data():
    """Load test data into db."""

    future_iso_date = datetime.isoformat(datetime.now() + timedelta(days=30))
    past_iso_date = datetime.isoformat(datetime.now() - timedelta(days=30))

    courses = [
        {
            "name": "Awesome Course",
            "link": "https://udemy.com/awesomecourse",
            "description": "Whatta course!",
            "coupons": [
                {
                    "code": "NOT_EXPIRED",
                    "expiration_iso_string": future_iso_date,
                },
                {
                    "code": "EXPIRED",
                    "expiration_iso_string": past_iso_date,
                },
            ],
            "review_quotes": [
                {"review_quote": "the best!"},
                {"review_quote": "meh"},
            ],
        },
    ]
    users = [{"username": "admin", "password": "abc123"}]

    for course in courses:
        Course(**course)

    for user in users:
        User(**user)


@pytest.fixture
def connect_db():
    app = create_app(flask_env="test")
    db.init_app(app)
    connect_to_db(app)


@pytest.fixture
def db_setup_with_data(connect_db):
    """Set up database for testing"""

    # test db should be part of app config
    db.create_all()
    load_test_data()


@pytest.fixture
def db_teardown(connect_db):
    """Tear down database for testing"""

    db.session.close()
    db.drop_all()
