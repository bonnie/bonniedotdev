from app.models.course_model import Course as CourseModel
from flask_restful import Resource


class ReviewQuotes(Resource):
    """Flask RESTful Resource for data about Udemy courses."""

    def get(self):
        """Return dict of review quote lists organized by course."""

        review_quotes_by_course = {}
        for course in CourseModel.query.all():
            if len(course.review_quotes) > 0:
                review_quotes_by_course[course.name] = [
                    r.to_dict() for r in course.review_quotes
                ]

        return review_quotes_by_course, 200
