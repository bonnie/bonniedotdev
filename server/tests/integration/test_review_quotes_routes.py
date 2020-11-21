import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
def test_courses_route(test_db, test_client):
    response = test_client.get("/api/review_quotes")

    # two courses in test data, but only one has review quotes
    assert len(response.json) == 1

    # should be two review quotes for the course
    review_quotes = list(response.json.values())[0]
    assert len(review_quotes) == 2
