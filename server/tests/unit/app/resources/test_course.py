import pytest
from app.models.people import People as PeopleModel
from app.resources.person import Person


@pytest.fixture
def person_id():
    """A person id to use across tests. Value is unimportant."""

    return 123


@pytest.fixture
def mock_record(mocker):
    """Mock record to test against output of update_person.

    Not strictly necessary here since this is only used by one test,
    but good practice for the future."""

    # Create mock object representing record returned from
    # PeopleModel.update_person
    return mocker.Mock()


@pytest.fixture
def mock__get_put_args(mocker, bach_data):
    """Mock Person._get_put_args with valid return values."""

    return mocker.patch.object(Person, "_get_put_args", return_value=bach_data)


def test_put_return_value_matches_db_output(
    mocker,
    person_id,
    mock_record,
    mock__get_put_args,
):
    """Test that Person.put returns the id from the db."""

    # Mock PeopleModel.update_person and return mock
    mocker.patch.object(PeopleModel, "update_person", return_value=mock_record)

    # Call Person.put and return the output
    r = Person()
    updated_person = r.put(person_id)

    # see whether we got the mock record from the db update_person method
    assert updated_person == mock_record


@pytest.mark.parametrize(
    "keys_to_remove",
    [
        [],  # use all of the keys
        ["deathdate", "occupation"],  # remove some optional keys
        # remove all of the keys
        # a future feature may be to return an error if there's no data,
        # but for now it's ok
        ["name", "birthdate", "deathdate", "occupation"],
    ],
)
def test_update_person_args(
    mocker,
    person_id,
    mock__get_put_args,
    bach_data,
    keys_to_remove,
):
    """Test that PeopleModel.update_person is called with the correct args."""

    # first, remove the keys as indicated
    for key in keys_to_remove:
        del bach_data[key]  # good thing this is a fixture!

    # then override the return value for mock__get_put_args
    mock__get_put_args.return_value = bach_data

    # Mock PeopleModel.update_person
    mock_update_person = mocker.patch.object(PeopleModel, "update_person")

    # call the method with an id argument
    r = Person()
    r.put(person_id)  # no need to store the result!

    # check that update_person was called with the proper kwargs
    mock_update_person.assert_called_with(person_id, **bach_data)


def test_delete_method_returns_none(mocker, person_id):
    """Test that the Person.delete method returns None."""

    # Make sure that delete_person doesn't run as part of this test,
    # to keep the test isolated
    mocker.patch.object(PeopleModel, "delete_person")

    # call the method with an id argument
    r = Person()
    result = r.delete(person_id)

    # make sure the method didn't return anything
    assert result is None
