import pytest
from app.models.coupon_model import Coupon


@pytest.fixture
def mock_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Coupon, "update_db")


@pytest.fixture
def valid_coupon(mock_update_db, iso_30_days_from_now):
    return Coupon(
        code="NOT_EXPIRED",
        link="http://link",
        utcExpirationISO=iso_30_days_from_now,
        price=12.99,
        courseId=1,
    )


@pytest.fixture
def invalid_coupon(mock_update_db, iso_30_days_ago):
    return Coupon(
        code="EXPIRED",
        link="http://link",
        utcExpirationISO=iso_30_days_ago,
        price=9.99,
        courseId=1,
    )


def test_to_dict(valid_coupon):
    out_dict = valid_coupon.to_dict()
    assert set(out_dict.keys()) == {
        "id",
        "code",
        "link",
        "utcExpirationISO",
        "courseId",
        "price",
    }


def test_valid_coupon_is_valid(valid_coupon):
    assert valid_coupon.is_valid() is True


def test_invalid_coupon_is_not_valid(invalid_coupon):
    assert invalid_coupon.is_valid() is False
