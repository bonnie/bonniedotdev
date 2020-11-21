import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
def test_courses_route(test_db, test_client):
    response = test_client.get("/api/review_quotes")

    # two courses in test data, but only one has review quotes
    assert len(response.json) == 1

    # should be two review quotes for the course
    assert len(response.json[0]["reviewQuotes"]) == 2
