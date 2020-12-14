from datetime import datetime
from datetime import timedelta

import pytest
from app import create_app
from app.db import connect_to_db
from app.db import db
from app.models.course_model import Course
from app.models.review_quote_model import ReviewQuote
from app.models.user_model import User
from app.utilities.init_db import create_db
from pytz import utc

# from app.utilities.init_db import drop_db

future_iso_date = datetime.isoformat(datetime.now(utc) + timedelta(days=30))
past_iso_date = datetime.isoformat(datetime.now(utc) - timedelta(days=30))

course_with_coupons_and_quotes = {
    "name": "Awesome Course",
    "link": "https://udemy.com/awesomecourse",
    "description": "Whatta course!",
    "imageName": "course_image.png",
    "coupons": [
        {
            "code": "NOT_EXPIRED",
            "utcExpirationISO": future_iso_date,
            "price": 12.99,
        },
        {"code": "EXPIRED", "utcExpirationISO": past_iso_date, "price": 9.99},
    ],
}

course_without_coupons_and_quotes = {
    "name": "Simple Course",
    "link": "https://udemy.com/simplecourse",
    "description": "simple, but good",
    "imageName": "course_image.png",
}

admin_user = {"username": "admin", "password": "abc123"}


def load_test_data():
    """Load test data into db."""

    courses = [course_with_coupons_and_quotes, course_without_coupons_and_quotes]
    users = [admin_user]
    review_quotes = ["Wowza", "Stinks"]

    for course in courses:
        Course(**course)

    for user in users:
        User(**user)

    course = Course.query.first()
    for review_quote in review_quotes:
        ReviewQuote(body=review_quote, courseId=course.id)


@pytest.fixture
def app():
    return create_app(flask_env="test")


@pytest.fixture
def test_db(app):
    create_db(app)

    db.init_app(app)
    connect_to_db(app)

    db.create_all()
    load_test_data()

    yield db

    # cleanup
    db.session.close()
    db.drop_all()
    # drop_db()  # TODO: get this working
