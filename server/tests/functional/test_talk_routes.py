import pytest
from app.models.talk_model import Talk as TalkModel

# from conftest import future_iso_date


@pytest.fixture
def talk_id(test_db):
    return (
        TalkModel.query.filter(TalkModel.title == "i am further in the foooture")
        .one()
        .id
    )


def test_get_existing_course(
    test_db,
    test_client,
    talk_id,
):
    response = test_client.get(f"/api/talk/{talk_id}")

    assert response.status_code == 200

    assert response.json.keys() == {
        "id",
        "utcDateStringISO",
        "description",
        "slidesFilename",
        "conferenceImageName",
        "conferenceName",
        "conferenceLink",
        "recordingLink",
    }


def test_get_nonexistent_talk(test_db, test_client):
    response = test_client.get(f"/api/talk/12345")

    assert response.status_code == 404


def test_update_description(test_db, test_client, talk_id):
    patch = [
        {
            "op": "replace",
            "path": "/description",
            "value": "Awesome talk!!",
        },
    ]

    response = test_client.patch(f"/api/talk/{talk_id}", json=patch)

    assert response.status_code == 200

    # test description change
    assert response.json["description"] == "Awesome talk!!"


def test_delete_talk(test_db, test_client, talk_id):
    response = test_client.delete(f"/api/talk/{talk_id}")

    assert response.status_code == 204
    assert TalkModel.query.get(talk_id) is None


def test_create_new_talk(test_db, test_client, talk_id):
    talk_data = {
        "title": "i am a brand new talk",
        "utcDateStringISO": "2020-01-23",
        "description": "this talks discusses stuff and it is good",
        "slidesFilename": "http://link-to-slides",
        "conferenceImageName": "bonnieCon.png",
        "conferenceName": "bonnieCon",
        "conferenceLink": "http://bonniecon.com",
        "recordingLink": "http://youtube.com/bonnie",
    }

    response = test_client.post("/api/talk", json=talk_data)

    assert response.status_code == 201
    assert (
        TalkModel.query.filter(TalkModel.title == "i am a brand new talk").one()
        is not None
    )
