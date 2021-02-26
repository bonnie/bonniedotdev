import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
def test_tags_route(test_db, test_client):
    response = test_client.get("/api/tags")

    # tcheck for tag names in test data
    assert response.json == ["testing library", "regular expressions", "testing"]
