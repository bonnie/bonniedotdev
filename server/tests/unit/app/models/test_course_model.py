from unittest.mock import PropertyMock

import pytest
from app.models.course_model import Course


@pytest.fixture
def mock_add_to_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Course, "add_to_db")


@pytest.fixture
def mock_coupon_property(mocker):
    # make sure db doesn't get called
    mocker.patch.object(Course, "valid_coupons", PropertyMock)


@pytest.fixture
def course(mock_add_to_db, mock_coupon_property):
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
        "valid_coupons",
    }
