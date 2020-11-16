from typing import List

from app.models.course_model import Course as CourseModel
from app.typed_dicts import CouponDict
from app.typed_dicts import ReviewQuoteDict
from flask_restful import abort
from flask_restful import reqparse
from flask_restful import Resource
from jsonpatch import JsonPatchException


class Course(Resource):
    """Flask RESTful Resource for course data."""

    model = CourseModel

    @staticmethod
    def _post_args():
        """Create a parser for POST / PUT data and return args.
        Separate out into its own method for modularity and testability.
        """

        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument("name", type=str, required=True)
        parser.add_argument("link", type=str, required=True)
        parser.add_argument("description", type=str, required=True)
        parser.add_argument("coupons", type=List[CouponDict])
        parser.add_argument("review_quotes", type=List[ReviewQuoteDict])

        return parser.parse_args()

    def _get_by_id(self, id: int) -> CourseModel:
        """Return record object for specified ID."""

        record = CourseModel.query.get_or_404(id)

        return record

    def get(self, id):
        """Return dict for coupon.s"""

        course = self._get_by_id(id)
        return course.to_dict(), 200

    def post(self):
        """Create new coupon."""

        args = self._post_args()
        new_course = CourseModel(**args)

        return new_course.to_dict(), 201

    def patch(self, id):
        course = self._get_by_id(id)

        # Create the patch object
        try:
            course.update(self.request.get_json())
        except JsonPatchException:
            abort("Invalid JSON patch", 400)

        return course.to_dict(), 200

    def delete(self, id):
        """Delete Udemy coupon."""

        coupon = self._get_by_id(id)
        coupon.delete()

        return None, 204
