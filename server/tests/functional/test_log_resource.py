import pytest


@pytest.mark.usefixtures("test_client")
def test_courses_route(test_client):
    response = test_client.post(
        "/api/log",
        json={"message": "oops", "logLevel": "debug"},
    )
    print(response.json)
    assert response.status_code == 200
