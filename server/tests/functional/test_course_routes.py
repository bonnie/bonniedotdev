import pytest
from app.models.course_model import Course as CourseModel
from conftest import future_iso_date


@pytest.fixture
def simple_course_id(test_db):
    return CourseModel.query.filter(CourseModel.name == "Simple Course").one().id


@pytest.fixture
def full_course_id(test_db):
    return CourseModel.query.filter(CourseModel.name == "Awesome Course").one().id


def test_get_existing_course(
    test_db,
    test_client,
    full_course_id,
):
    response = test_client.get(f"/api/course/{full_course_id}")

    assert response.status_code == 200

    assert response.json.keys() == {
        "id",
        "name",
        "link",
        "description",
        "best_coupon",
    }


def test_get_nonexistent_course(test_db, test_client):
    response = test_client.get(f"/api/course/12345")

    assert response.status_code == 404


def test_add_coupons_to_course(test_db, test_client, simple_course_id):
    coupons = [
        {"code": "test", "expiration_iso_string": future_iso_date, "price": 9.99},
    ]
    patch = [{"op": "add", "path": "/coupons", "value": coupons}]

    response = test_client.patch(f"/api/course/{simple_course_id}", json=patch)

    assert response.status_code == 200

    best_coupon = response.json["best_coupon"]
    assert best_coupon["code"] == "test"


# TODO: we don't delete reviews like this :-/
def test_update_description_and_delete_review(test_db, test_client, full_course_id):
    patch = [
        {"op": "remove", "path": "/review_quotes/1"},
        {
            "op": "replace",
            "path": "/description",
            "value": "Awesome course, now with more awesome!!",
        },
    ]

    response = test_client.patch(f"/api/course/{full_course_id}", json=patch)

    assert response.status_code == 200

    # did number of reviews reduce to 1?
    assert len(response.json["review_quotes"]) == 1

    # test description change
    assert response.json["description"] == "Awesome course, now with more awesome!!"


def test_delete_course(test_db, test_client, full_course_id):
    response = test_client.delete(f"/api/course/{full_course_id}")

    assert response.status_code == 204
    assert CourseModel.query.get(full_course_id) is None


# TODO: test creating new course!
