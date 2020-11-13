from app.models.course import Course as CourseModel
from flask_restful import Resource


class Courses(Resource):
    """Flask RESTful Resource for data about Udemy courses."""

    def get(self):
        """Return list of course dicts for published udemy courses"""

        course_dicts = [course.to_dict() for course in CourseModel.query.all()]

        return course_dicts, 200
