import pytest


@pytest.mark.usefixtures("test_client")
@pytest.mark.usefixtures("test_db")
def test_courses_route(test_db, test_client):
    response = test_client.get("/api/courses")
    print(response.json)
    course_titles = [course["name"] for course in response.json]

    assert course_titles == ["Awesome Course", "Simple Course"]
