from datetime import date
from datetime import datetime
from datetime import timedelta

import pytest
from app import create_app
from app.db import connect_to_db
from app.db import db
from app.enums import FlaskEnv
from app.models.cheat_sheet_model import CheatSheet
from app.models.cheat_sheet_model import Tag
from app.models.coupon_model import Coupon
from app.models.course_model import Course
from app.models.review_quote_model import ReviewQuote
from app.models.talk_model import Talk
from app.models.user_model import User
from app.utilities.init_db import create_db
from psycopg2.errors import UniqueViolation
from pytz import utc
from sqlalchemy.exc import IntegrityError
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.exc import SQLAlchemyError

# from app.utilities.init_db import drop_db

future_iso_date = datetime.isoformat(datetime.now(utc) + timedelta(days=30))
past_iso_date = datetime.isoformat(datetime.now(utc) - timedelta(days=30))

course_with_coupons_and_quotes = {
    "name": "Awesome Course",
    "link": "https://udemy.com/awesomecourse",
    "description": "Whatta course!",
    "imageName": "course_image.png",
}

coupons = [
    {
        "utcExpirationISO": future_iso_date,
        "link": "http://link?NOT_EXPIRED",
        "price": 12.99,
    },
    {
        "link": "http://link?EXPIRED",
        "utcExpirationISO": past_iso_date,
        "price": 9.99,
    },
]

course_without_coupons_and_quotes = {
    "name": "Simple Course",
    "link": "https://udemy.com/simplecourse",
    "description": "simple, but good",
    "imageName": "course_image.png",
}

admin_user = {"username": "admin", "password": "abc123"}

talks = [
    {
        "title": "i am an older talk",
        "utcDateStringISO": "2020-01-23",
        "description": "this talks discusses stuff and it is good",
        "slidesFilename": "http://link-to-slides",
        "conferenceName": "bonnieCon",
        "conferenceLink": "http://bonniecon.com",
        "recordingLink": "http://youtube.com/bonnie",
    },
    {
        "title": "i am further in the foooture",
        "utcDateStringISO": "2099-01-28",
        "description": "this talks discusses stuff and it is also good",
        "slidesFilename": "http://link-to-slides",
        "conferenceName": "bonnieCon",
        "conferenceLink": "http://bonniecon.com",
        "recordingLink": "http://youtube.com/bonnie",
    },
]

tags = ["testing library", "regular expressions", "testing"]

cheat_sheets = [
    {
        "title": "Testing Library Cheat Sheet",
        "tagNames": ["testing library", "testing"],
        "fileName": "testing_library.pdf",
        "version": "1.0",
    },
    {
        "title": "Regex Cheat Sheet",
        "tagNames": ["regular expressions"],
        "fileName": "regex.pdf",
        "version": "2.3",
    },
]


def load_test_data():
    """Load test data into db."""

    courses = [course_with_coupons_and_quotes, course_without_coupons_and_quotes]
    users = [admin_user]
    review_quotes = ["Wowza", "Stinks"]

    try:
        for course in courses:
            Course(**course)

        for user in users:
            User(**user)

        course = Course.query.first()
        for review_quote in review_quotes:
            ReviewQuote(body=review_quote, courseId=course.id)
        for coupon in coupons:
            Coupon(**coupon, courseId=course.id)

        for talk in talks:
            Talk(**talk)

        for tag in tags:
            Tag(tagName=tag)

        for cheat_sheet in cheat_sheets:
            CheatSheet(**cheat_sheet)

        # artifically backdate the regex cheat sheet to test updating the date
        cheat_sheet = CheatSheet.query.filter(
            CheatSheet.title == "Regex Cheat Sheet",
        ).one()
        cheat_sheet.updated_at = date(2020, 2, 2)
        db.session.add(cheat_sheet)
        db.session.commit()

    except (IntegrityError, UniqueViolation, SQLAlchemyError, InvalidRequestError) as e:
        # Keep from printing hundreds of lines simply for a db issue
        red = "\033[91m"
        print(f"{red}>>>>>>>>CORRUPT DATABASE<<<<<<<<<")
        print(f"{red}{e}")


@pytest.fixture
def app():
    return create_app(flask_env=FlaskEnv.TEST)


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


@pytest.fixture
def simple_course_id(test_db):
    return Course.query.filter(Course.name == "Simple Course").one().id


@pytest.fixture
def full_course_id(test_db):
    return Course.query.filter(Course.name == "Awesome Course").one().id
