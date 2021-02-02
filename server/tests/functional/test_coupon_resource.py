from app.models.coupon_model import Coupon as CouponModel


def test_create_new_coupon(test_client, iso_30_days_from_now, simple_course_id):
    coupon_data = {
        "link": "http://link?test",
        "utcExpirationISO": iso_30_days_from_now,
        "price": 9.99,
        "courseId": simple_course_id,
    }

    response = test_client.post("/api/coupon", json=coupon_data)

    assert response.status_code == 201

    new_course_data = test_client.get(f"/api/course/{simple_course_id}").json
    assert new_course_data["bestCoupon"]["link"] == "http://link?test"


def test_update_price(test_db, test_client):
    patch = [
        {
            "op": "replace",
            "path": "/price",
            "value": "0.99",
        },
    ]

    coupon_id = CouponModel.query.first().id
    response = test_client.patch(f"/api/coupon/{coupon_id}", json=patch)

    assert response.status_code == 200

    # test description change
    assert response.json["price"] == 0.99


def test_delete_coupon(test_db, test_client):
    coupon_id = CouponModel.query.first().id
    response = test_client.delete(f"/api/coupon/{coupon_id}")

    assert response.status_code == 204
    assert CouponModel.query.get(coupon_id) is None
