import pytest
from app.models.course_model import Course as CourseModel
from conftest import future_iso_date


@pytest.fixture
def simple_course_id(test_db):
    return CourseModel.query.filter(CourseModel.name == "Simple Course").one().id


def test_get_existing_course(
    test_db,
    test_client,
    course_id,
):
    response = test_client.get(f"/api/course/{course_id}")

    assert response.status_code == 200

    assert response.json.keys() == {
        "id",
        "name",
        "link",
        "description",
        "review_quotes",
        "valid_coupons",
    }


def test_get_nonexistent_course(test_db, test_client):
    response = test_client.get(f"/api/course/12345")

    assert response.status_code == 404


def test_add_coupons_to_course(test_db, test_client, simple_course_id):
    coupons = [{"code": "test", "expiration_iso_string": future_iso_date}]
    patch = [{"op": "add", "path": "/coupons", "value": coupons}]

    response = test_client.patch(f"/api/course/{simple_course_id}", json=patch)

    assert response.status_code == 200

    first_coupon = response.json["valid_coupons"][0]
    assert first_coupon["code"] == "test"
