import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
def test_courses_route(test_db, test_client):
    response = test_client.get("/api/review_quotes")

    # two quotes in test data
    assert len(response.json) == 2

    # check for proper keys
    expected_keys = {"id", "body", "courseName", "courseLink"}
    first_quote_keys = set(response.json[0].keys())
    assert first_quote_keys == expected_keys
