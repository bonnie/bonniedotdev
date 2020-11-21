from app.models.course_model import Course as CourseModel
from flask_restful import Resource


class ReviewQuotes(Resource):
    """Flask RESTful Resource for data about Udemy courses."""

    def get(self):
        """Return list of dicts with keys 'courseName' and 'reviewQuotes'.

        courseName is a string, reviewQuotes is a list of strings.
        """

        review_quotes = []
        for course in CourseModel.query.all():
            if len(course.review_quotes) > 0:
                review_quotes.append(
                    {
                        "courseName": course.name,
                        "reviewQuotes": [r.to_dict() for r in course.review_quotes],
                    },
                )

        return review_quotes, 200
