from datetime import datetime
from datetime import timedelta
from unittest.mock import PropertyMock

import pytest
from app.models.coupon_model import Coupon
from app.models.course_model import Course


@pytest.fixture
def mock_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Course, "update_db")


@pytest.fixture
def mock_coupon_property(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Course, "best_coupon", PropertyMock)


@pytest.fixture
def course(mock_update_db, mock_coupon_property):
    return Course(
        name="coursey course",
        link="https://udemy.com/coursey-course",
        description="the coursiest of courses",
    )


def test_to_dict(course):
    course_dict = course.to_dict()
    assert set(course_dict.keys()) == {
        "id",
        "name",
        "link",
        "description",
        "review_quotes",
        "best_coupon",
    }


###########################################################
# Best coupon tests
###########################################################


@pytest.fixture
def unmocked_course(mock_update_db):
    return Course(
        name="coursey course",
        link="https://udemy.com/coursey-course",
        description="the coursiest of courses",
    )


@pytest.fixture
def mock_coupon_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Coupon, "update_db")


@pytest.fixture
def expired_coupon(mock_coupon_update_db):
    return Coupon(
        code="EXPIRED",
        expiration_iso_string=datetime.isoformat(datetime.now() - timedelta(days=30)),
        price=9.99,
    )


@pytest.fixture
def good_coupon_30_days(mock_coupon_update_db):
    return Coupon(
        code="GOOD_30",
        expiration_iso_string=datetime.isoformat(datetime.now() + timedelta(days=30)),
        price=9.99,
    )


@pytest.fixture
def good_coupon_4_days(mock_coupon_update_db):
    return Coupon(
        code="GOOD_4",
        expiration_iso_string=datetime.isoformat(datetime.now() + timedelta(days=4)),
        price=9.99,
    )


@pytest.fixture
def bad_coupon(mock_coupon_update_db):
    return Coupon(
        code="BAD",
        expiration_iso_string=datetime.isoformat(datetime.now() + timedelta(days=30)),
        price=12.99,
    )


def test_best_coupon_no_coupons(unmocked_course):
    best_coupon = unmocked_course.best_coupon
    assert best_coupon is None


def test_best_coupon_one_expired(unmocked_course, expired_coupon):
    unmocked_course.coupons.append(expired_coupon)
    assert unmocked_course.best_coupon is None


def test_best_coupon_one_good_coupon(unmocked_course, good_coupon_30_days):
    unmocked_course.coupons.append(good_coupon_30_days)
    assert unmocked_course.best_coupon["code"] == "GOOD_30"


def test_best_coupon_three_coupons(
    unmocked_course,
    good_coupon_30_days,
    bad_coupon,
    expired_coupon,
):
    unmocked_course.coupons.extend([good_coupon_30_days, bad_coupon, expired_coupon])
    assert unmocked_course.best_coupon["code"] == "GOOD_30"


def test_best_coupon_three_coupons_price_tie(
    unmocked_course,
    good_coupon_30_days,
    good_coupon_4_days,
    expired_coupon,
):
    unmocked_course.coupons.extend(
        [good_coupon_30_days, good_coupon_4_days, expired_coupon],
    )
    assert unmocked_course.best_coupon["code"] == "GOOD_30"


###########################################################
# End: best coupon tests
###########################################################
