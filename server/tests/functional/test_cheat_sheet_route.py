import pytest
from app.models.cheat_sheet_model import CheatSheet as CheatSheetModel


@pytest.fixture
def cheat_sheet_id():
    return (
        CheatSheetModel.query.filter(CheatSheetModel.title == "Regex Cheat Sheet")
        .one()
        .id
    )


def test_update_title(test_db, test_client, cheat_sheet_id):
    patch = [
        {
            "op": "replace",
            "path": "/title",
            "value": "Best Cheat Sheet EVER!!",
        },
    ]

    response = test_client.patch(f"/api/cheat_sheet/{cheat_sheet_id}", json=patch)

    assert response.status_code == 200

    # test title change
    assert response.json["title"] == "Best Cheat Sheet EVER!!"

    # test update_at update


def test_add_known_tag_capitalized_underscored(test_db, test_client, cheat_sheet_id):
    patch = [
        {
            "op": "add",
            "path": "/tags/0",
            "value": "Testing_Library",
        },
    ]

    response = test_client.patch(f"/api/cheat_sheet/{cheat_sheet_id}", json=patch)

    assert response.status_code == 200

    # test title change
    assert response.json["tags"] == ["testing library", "regular expressions"]


def test_add_unknown_tag(test_db, test_client, cheat_sheet_id):
    patch = [
        {
            "op": "add",
            "path": "/tags/0",
            "value": "Python",
        },
    ]

    response = test_client.patch(f"/api/cheat_sheet/{cheat_sheet_id}", json=patch)

    assert response.status_code == 200

    # test title change
    assert response.json["tags"] == ["regular expressions", "python"]


def test_delete_cheat_sheet(test_db, test_client, cheat_sheet_id):
    response = test_client.delete(f"/api/cheat_sheet/{cheat_sheet_id}")

    assert response.status_code == 204
    assert CheatSheetModel.query.get(cheat_sheet_id) is None


def test_create_new_cheat_sheet(test_db, test_client):
    cheet_sheet_data = {
        "title": "New Cheat Sheet",
        "fileName": "new.pdf",
        "version": "2.0",
        "tagNames": ["testing", "JavaScript"],
    }

    response = test_client.post("/api/cheat_sheet", json=cheet_sheet_data)

    assert response.status_code == 201
    assert (
        CheatSheetModel.query.filter(CheatSheetModel.title == "New Cheat Sheet").one()
        is not None
    )
