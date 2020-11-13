import os

import requests
from flask_restful import Resource


UDEMY_ENDPOINT_BASE = "https://www.udemy.com/instructor-api/v1"


class UdemyData(Resource):
    """Flask RESTful Resource for data about Udemy courses."""

    @staticmethod
    def make_request(request):
        """Make a request to the Udemy API.

        Note: request MUST NOT start with '/'
        """

        auth_header = "bearer " + os.getenv("UDEMY_API_TOKEN")
        headers = {"Authorization": auth_header}
        return requests.get(f"{UDEMY_ENDPOINT_BASE}/{request}", headers=headers)

    def get(self):
        """Return list of course dicts for published udemy courses"""

        course_response = self.make_request("taught_courses/courses")

        # abort if udemy returns an error
        if course_response.status_code != 200:
            error = course_response.json["message"]
            return {
                "message": f"could not retrieve course information: {error}",
            }, course_response.status_code

        # otherwise, get published courses
        courses = course_response.json()

        return courses, 200
