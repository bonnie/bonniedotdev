import pytest
from app.models.course_model import Course
from app.models.review_quote_model import ReviewQuote


@pytest.fixture
def mock_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(ReviewQuote, "update_db")
    mocker.patch.object(Course, "update_db")


def test_to_dict(mock_update_db):
    review_quote = ReviewQuote(
        courseId=1,
        body="greatest course ever!!!!",
    )

    course = Course(name="name", description="desc", link="link", imageName="imgname")

    review_quote.course = course

    quote_dict = review_quote.to_dict()
    assert set(quote_dict.keys()) == {
        "id",
        "courseId",
        "body",
        "courseName",
        "courseLink",
    }
