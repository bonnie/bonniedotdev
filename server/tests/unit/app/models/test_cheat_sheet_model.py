from datetime import date
from unittest.mock import PropertyMock

import pytest
from app.models.cheat_sheet_model import CheatSheet

###########################################################
# fixtures
###########################################################


@pytest.fixture
def mock_update_db(mocker):
    # make sure db doesn't get called
    mocker.patch.object(CheatSheet, "update_db")


@pytest.fixture
def mock_tags_property(mocker):
    # make sure db doesn't get called
    mocker.patch.object(CheatSheet, "tagNames", PropertyMock)


@pytest.fixture
def cheat_sheet(mock_update_db):
    return CheatSheet(
        title="My Cheat Sheet",
        fileName="cheat.pdf",
        version="1.2",
    )


###########################################################
# methods
#############################################################


def test_to_dict(cheat_sheet):
    cheat_sheet_dict = cheat_sheet.to_dict()
    assert set(cheat_sheet_dict.keys()) == {
        "id",
        "title",
        "fileName",
        "version",
        "tagNames",
        "updatedAt",
    }


def test_created_at(cheat_sheet):
    cheat_sheet_dict = cheat_sheet.to_dict()
    assert cheat_sheet_dict["updatedAt"] == date.today().strftime("%Y-%m-%d")
