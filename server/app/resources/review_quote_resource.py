from app.models.course_model import ReviewQuote as ReviewQuoteModel
from app.resources.crud_base_resource import CrudBase
from flask_restful import reqparse


class ReviewQuote(CrudBase):
    """Flask RESTful Resource for course review quote CRUD."""

    model = ReviewQuoteModel

    @staticmethod
    def _get_args():
        """Create a parser for POST / PUT data and return args.
        Separate out into its own method for modularity and testability.
        """

        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument("course_id", type=int, required=True)
        parser.add_argument("quote", type=str, required=True)

        return parser.parse_args()
