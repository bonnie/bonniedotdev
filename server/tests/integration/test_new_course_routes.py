from conftest import course_with_coupons_and_quotes


def test_create_new_course_with_coupons_and_quotes(test_db, test_client):
    response = test_client.post(f"/api/course", json=course_with_coupons_and_quotes)

    assert response.status_code == 201
    assert response.json.keys() == {
        "id",
        "name",
        "link",
        "description",
        "review_quotes",
        "valid_coupons",
    }
