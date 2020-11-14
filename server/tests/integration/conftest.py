from app import create_app
from app.db import connect_to_db
from app.db import db
from app.models.coupon_model import Coupon
from app.models.course_model import Course
from app.models.review_quote_model import ReviewQuote
from app.models.user_model import User


def _load_test_data(courses, coupons, review_quotes, users):
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
    app = create_app(flask_env="test")
    connect_to_db(app)
    db.create_all()

    _load_test_data()


def db_teardown():
    """Tear down database for testing"""

    db.session.close()
    db.drop_all()
