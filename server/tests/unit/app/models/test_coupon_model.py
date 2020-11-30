from datetime import datetime
from datetime import timedelta

import pytest
from app.models.coupon_model import Coupon
from pytz import utc


# TODO: move to conftest so they can be used in test_course_model
@pytest.fixture
def now_date_utc():
    return datetime.now(utc)


@pytest.fixture
def future_date_iso():
    return datetime.isoformat(datetime.now() + timedelta(days=5))


@pytest.fixture
def past_date_iso():
    return datetime.isoformat(datetime.now() - timedelta(days=5))


@pytest.fixture
def mock_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Coupon, "update_db")


@pytest.fixture
def valid_coupon(mock_update_db, future_date_iso):
    return Coupon(
        code="NOT_EXPIRED",
        expiration_iso_string=future_date_iso,
        price=12.99,
        course_id=1,
    )


@pytest.fixture
def invalid_coupon(mock_update_db, past_date_iso):
    return Coupon(
        code="EXPIRED",
        expiration_iso_string=past_date_iso,
        price=9.99,
        course_id=1,
    )


def test_to_dict(valid_coupon):
    out_dict = valid_coupon.to_dict()
    assert set(out_dict.keys()) == {
        "id",
        "code",
        "utc_expiration",
        "course_id",
        "price",
    }


def test_valid_coupon_is_valid(valid_coupon):
    assert valid_coupon.is_valid() is True


def test_invalid_coupon_is_not_valid(invalid_coupon):
    assert invalid_coupon.is_valid() is False
