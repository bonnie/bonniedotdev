import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
def test_cheat_sheets_route(test_db, test_client):
    response = test_client.get("/api/cheat_sheets")
    cheat_sheet_titles = [cheat_sheet["title"] for cheat_sheet in response.json]

    assert cheat_sheet_titles == ["Testing Library Cheat Sheet", "Regex Cheat Sheet"]
