import pytest
from app.models.review_quote_model import ReviewQuote


@pytest.fixture
def mock_add_to_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(ReviewQuote, "add_to_db")


def test_to_dict(mock_add_to_db):
    review_quote = ReviewQuote(
        course_id=1,
        review_quote="greatest course ever!!!!",
    )

    quote_dict = review_quote.to_dict()
    assert set(quote_dict.keys()) == {"id", "course_id", "review_quote"}
