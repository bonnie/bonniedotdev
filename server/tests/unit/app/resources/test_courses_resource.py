import pytest
from app.models.people import People as PeopleModel
from app.resources.people import People as PeopleResource


@pytest.fixture
def mock__get_args(mocker, bach_data):
    """Mock reqparse.parse_args with valid return values."""

    return mocker.patch.object(
        PeopleResource,
        "_get_args",
        return_value=bach_data,
    )


@pytest.fixture
def mock_record(mocker):
    """Mock record to test against output of add_new_person."""

    # Create mock object representing record returned from
    # PeopleModel.add_new_person
    return mocker.Mock()


@pytest.fixture
def people_post_output(mocker, mock_record, mock__get_args):
    """Make a People.post call and return the output.
    Return value will be a tuple
        first value is dict of data returned
        second value is int of HTTP status code
    """

    # Mock PeopleModel.add_new_person and return mock
    mocker.patch.object(
        PeopleModel,
        "add_new_person",
        return_value=mock_record,
    )

    # Call PeopleResource.post and return the output
    r = PeopleResource()
    return r.post()


def test_post_return_value_matches_new_record(mock_record, people_post_output):
    """Test that PeopleResource.post returns the new record from the db."""

    # unpack the post method output
    new_person, status = people_post_output

    actual_record = new_person["id"]
    # see whether we got the id returned from the db add_new_person method
    assert actual_record == mock_record


def test_post_return_value_status_code(people_post_output):
    """Test that PeopleResource.post returns the correct status code."""

    # unpack the post method output
    data, status = people_post_output

    # see whether we got the id returned from the db add_new_person method
    assert status == 201


@pytest.mark.parametrize(
    "keys_to_remove",
    [
        [],  # use all of the keys
        ["deathdate", "occupation"],  # remove optional keys
    ],
)
def test_add_new_person_args(
    mocker,
    mock__get_args,
    bach_data,
    keys_to_remove,
):
    """
    Test that PeopleModel.add_new_person is called with the correct args.
    """

    # first, remove the keys as indicated
    for key in keys_to_remove:
        del bach_data[key]  # good thing this is a fixture!

    # then override the return value for mock__get_args
    mock__get_args.return_value = bach_data

    # Mock PeopleModel.add_new_person; return value unimportant for this test
    mock_add_new_person = mocker.patch.object(PeopleModel, "add_new_person")

    # call the method
    r = PeopleResource()
    r.post()  # no need to store the result!

    # check that add_new_person was called with the proper kwargs
    mock_add_new_person.assert_called_with(**bach_data)
