from app.models.course_model import Course as CourseModel

# from conftest import future_iso_date


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
        "imageName",
        "description",
        "bestCoupon",
        "coupons",
    }


def test_get_nonexistent_course(test_db, test_client):
    response = test_client.get(f"/api/course/12345")

    assert response.status_code == 404


def test_add_coupons_to_course(
    test_db,
    test_client,
    simple_course_id,
    iso_30_days_from_now,
):
    coupons = [
        {"code": "test", "utcExpirationISO": iso_30_days_from_now, "price": 9.99},
    ]
    patch = [{"op": "add", "path": "/coupons", "value": coupons}]

    response = test_client.patch(f"/api/course/{simple_course_id}", json=patch)

    assert response.status_code == 200

    bestCoupon = response.json["bestCoupon"]
    assert bestCoupon["code"] == "test"


def test_update_description(test_db, test_client, full_course_id):
    patch = [
        {
            "op": "replace",
            "path": "/description",
            "value": "Awesome course, now with more awesome!!",
        },
    ]

    response = test_client.patch(f"/api/course/{full_course_id}", json=patch)

    assert response.status_code == 200

    # test description change
    assert response.json["description"] == "Awesome course, now with more awesome!!"


def test_delete_course(test_db, test_client, simple_course_id):
    # use the simple course, or there are referential integrity errors
    response = test_client.delete(f"/api/course/{simple_course_id}")

    assert response.status_code == 204
    assert CourseModel.query.get(simple_course_id) is None


def test_create_new_course(test_db, test_client):
    course_data = {
        "name": "Coursey Course",
        "description": "The coursiest of courses",
        "link": "http://udemy.com/coursey-course",
        "imageName": "image.png",
    }

    response = test_client.post("/api/course", json=course_data)

    assert response.status_code == 201
    assert (
        CourseModel.query.filter(CourseModel.name == "Coursey Course").one() is not None
    )
