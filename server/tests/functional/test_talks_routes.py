import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
def test_talks_route(test_db, test_client):
    response = test_client.get("/api/talks")

    # two talks in test data
    assert len(response.json) == 2

    # check for proper keys
    expected_keys = {
        "id",
        "title",
        "utcDateStringISO",
        "description",
        "slidesFilename",
        "conferenceImageName",
        "conferenceName",
        "conferenceLink",
        "recordingLink",
    }
    first_talk_keys = set(response.json[0].keys())
    assert first_talk_keys == expected_keys
