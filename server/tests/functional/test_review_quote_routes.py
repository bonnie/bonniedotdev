import pytest
from app.models.review_quote_model import ReviewQuote as ReviewQuoteModel

# from conftest import future_iso_date


@pytest.fixture
def review_quote_id(test_db):
    return ReviewQuoteModel.query.filter(ReviewQuoteModel.body == "Wowza").one().id


def test_get_existing_course(
    test_db,
    test_client,
    review_quote_id,
):
    response = test_client.get(f"/api/review_quote/{review_quote_id}")

    assert response.status_code == 200

    assert response.json.keys() == {
        "body",
        "id",
        "courseId",
        "courseName",
        "courseLink",
    }


def test_get_nonexistent_review_quote(test_db, test_client):
    response = test_client.get(f"/api/review_quote/12345")

    assert response.status_code == 404


def test_update_description(test_db, test_client, review_quote_id):
    patch = [
        {
            "op": "replace",
            "path": "/body",
            "value": "Awesome course!!",
        },
    ]

    response = test_client.patch(f"/api/review_quote/{review_quote_id}", json=patch)

    assert response.status_code == 200

    # test description change
    assert response.json["body"] == "Awesome course!!"


def test_delete_review_quote(test_db, test_client, review_quote_id):
    response = test_client.delete(f"/api/review_quote/{review_quote_id}")

    assert response.status_code == 204
    assert ReviewQuoteModel.query.get(review_quote_id) is None


def test_create_new_review_quote(test_db, test_client, simple_course_id):
    course_data = {
        "body": "I <3 this course",
        "courseId": simple_course_id,
    }

    response = test_client.post("/api/review_quote", json=course_data)

    assert response.status_code == 201
    assert (
        ReviewQuoteModel.query.filter(ReviewQuoteModel.body == "I <3 this course").one()
        is not None
    )
