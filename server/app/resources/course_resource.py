from app.models.course_model import Course as CourseModel
from app.resources.crud_base_resource import CrudBase
from flask_restful import reqparse


class Course(CrudBase):
    """Flask RESTful Resource for course CRUD."""

    model = CourseModel

    @staticmethod
    def _get_args():
        """Create a parser for POST / PUT data and return args.
        Separate out into its own method for modularity and testability.
        """

        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument("name", type=str, required=True)
        parser.add_argument("link", type=str, required=True)
        parser.add_argument("description", type=str, required=True)

        return parser.parse_args()
