from app.models.course import Course as CourseModel
from flask_restful import abort
from flask_restful import reqparse
from flask_restful import Resource


class Courses(Resource):
    """Flask RESTful Resource for data about Udemy courses."""

    def _get_args(self):
        """Create a parser for POST / PUT data and return args.
        Separate out into its own method for modularity and testability.
        """

        # bundle errors so that the response includes all errors,
        # not just the first
        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument("name", type=str, required=True)
        parser.add_argument("link", type=str, required=True)
        parser.add_argument("description", type=str, required=True)

        return parser.parse_args()

    def _get_course(self, id: int) -> CourseModel:
        """Return course object for course ID."""

        course = CourseModel.query(id).one()

        if not course:
            message = f"{id} does not exist in the course database"
            abort(422, message=message)

        return course

    def get(self, id):
        """Return dict for course.s"""

        course_dict = self._get_course(id).to_dict()

        return course_dict, 200

    def post(self):
        """Create new course."""

        args = self._get_args()
        new_course = CourseModel.add_new(**args)

        return new_course, 201

    def put(self, id):
        """Update course data."""

        args = self._get_args()
        course = self._get_course(id)

        updated_course = course.update(**args)

        return updated_course, 200

    def delete(self, id):
        """Delete Udemy course."""

        course = self._get_course(id)
        course.delete()

        return None, 204
