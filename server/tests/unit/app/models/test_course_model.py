from datetime import datetime
from datetime import timedelta
from unittest.mock import PropertyMock

import pytest
from app.models.coupon_model import Coupon
from app.models.course_model import Course
from pytz import utc

###########################################################
# fixtures
###########################################################


@pytest.fixture
def mock_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Course, "update_db")


@pytest.fixture
def mock_coupon_property(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Course, "bestCoupon", PropertyMock)


@pytest.fixture
def course(mock_update_db, mock_coupon_property):
    return Course(
        name="coursey course",
        link="https://udemy.com/coursey-course",
        description="the coursiest of courses",
        imageName="image.png",
    )


@pytest.fixture
def course_with_coupons(mock_update_db, iso_30_days_from_now):
    return Course(
        name="coursey course",
        link="https://udemy.com/coursey-course",
        description="the coursiest of courses",
        imageName="image.png",
        coupons=[
            {
                "code": "GOOD_COUPON",
                "utcExpirationISO": iso_30_days_from_now,
                "price": 1.99,
            },
            {
                "code": "BAD_COUPON",
                "utcExpirationISO": iso_30_days_from_now,
                "price": 1111.99,
            },
        ],
    )


###########################################################
# methods
#############################################################


def test_to_dict(course):
    course_dict = course.to_dict()
    assert set(course_dict.keys()) == {
        "id",
        "name",
        "link",
        "description",
        "imageName",
        "bestCoupon",
        "coupons",
    }


def test_to_dict_with_coupons(course_with_coupons):
    course_dict = course_with_coupons.to_dict()
    assert set(course_dict.keys()) == {
        "id",
        "name",
        "link",
        "description",
        "imageName",
        "bestCoupon",
        "coupons",
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
        imageName="image.png",
    )


@pytest.fixture
def mock_coupon_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Coupon, "update_db")


@pytest.fixture
def expired_coupon(mock_coupon_update_db, iso_30_days_ago):
    return Coupon(
        code="EXPIRED",
        utcExpirationISO=iso_30_days_ago,
        price=9.99,
    )


@pytest.fixture
def good_coupon_30_days(mock_coupon_update_db, iso_30_days_from_now):
    return Coupon(
        code="GOOD_30",
        utcExpirationISO=iso_30_days_from_now,
        price=9.99,
    )


@pytest.fixture
def good_coupon_4_days(mock_coupon_update_db):
    return Coupon(
        code="GOOD_4",
        utcExpirationISO=datetime.isoformat(datetime.now(utc) + timedelta(days=4)),
        price=9.99,
    )


@pytest.fixture
def bad_coupon(mock_coupon_update_db, iso_30_days_from_now):
    return Coupon(
        code="BAD",
        utcExpirationISO=iso_30_days_from_now,
        price=12.99,
    )


def test_bestCoupon_no_coupons(unmocked_course):
    bestCoupon = unmocked_course.bestCoupon
    assert bestCoupon is None


def test_bestCoupon_one_expired(unmocked_course, expired_coupon):
    unmocked_course.coupons.append(expired_coupon)
    assert unmocked_course.bestCoupon is None


def test_bestCoupon_one_good_coupon(unmocked_course, good_coupon_30_days):
    unmocked_course.coupons.append(good_coupon_30_days)
    assert unmocked_course.bestCoupon["code"] == "GOOD_30"


def test_bestCoupon_three_coupons(
    unmocked_course,
    good_coupon_30_days,
    bad_coupon,
    expired_coupon,
):
    unmocked_course.coupons.extend([good_coupon_30_days, bad_coupon, expired_coupon])
    assert unmocked_course.bestCoupon["code"] == "GOOD_30"


def test_bestCoupon_three_coupons_price_tie(
    unmocked_course,
    good_coupon_30_days,
    good_coupon_4_days,
    expired_coupon,
):
    unmocked_course.coupons.extend(
        [good_coupon_30_days, good_coupon_4_days, expired_coupon],
    )
    assert unmocked_course.bestCoupon["code"] == "GOOD_30"


###########################################################
# End: best coupon tests
###########################################################
