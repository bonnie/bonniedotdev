from datetime import datetime
from datetime import timedelta

from app.db import connect_to_db
from app.db import db
from app.models.coupon import Coupon
from app.models.course_model import Course
from app.models.review_quote import ReviewQuote
from app.models.user import User
from pytz import utc

from server import app

# test data
courses = [
    {
        "name": "Awesome Course",
        "link": "https://udemy.com/awesomecourse",
    },
]
coupons = [
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
review_quotes = [
    {"quote": "the best!", "course_id": 1},
    {"quote": "meh", "course_id": 1},
]
users = [{"username": "admin", "password": "abc123"}]


def _load_test_data():
    """Load test data into db."""

    for course in courses:
        Course.add_new(**course)

    for coupon in coupons:
        Coupon.add_new(**coupon)

    for review_quote in review_quotes:
        ReviewQuote.add_new(**review_quote)

    for user in users:
        User.add_new(**user)


def db_setup_with_data():
    """Set up database for testing"""

    # test db should be part of app config
    connect_to_db(app)
    db.create_all()

    _load_test_data()


def db_teardown():
    """Tear down database for testing"""

    db.session.close()
    db.drop_all()
