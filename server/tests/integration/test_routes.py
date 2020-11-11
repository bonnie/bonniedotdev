import pytest


@pytest.mark.usefixtures("test_client")
@pytest.fixture
def footer_response(test_client):
    return test_client.get("/api/footer_links")


def test_footer_status(footer_response):
    assert footer_response.status_code == 200


def test_footer_dict_keys(footer_response):
    response_json = footer_response.json
    assert all(["icon" in link for link in response_json])
    assert all(["target" in link for link in response_json])
