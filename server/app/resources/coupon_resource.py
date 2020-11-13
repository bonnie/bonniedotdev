from app.models.coupon_model import Coupon as CouponModel
from app.resources.crud_base_resource import CrudBase
from flask_restful import reqparse


class Coupon(CrudBase):
    """Flask RESTful Resource for course coupons CRUD."""

    model = CouponModel

    @staticmethod
    def _get_args():
        """Create a parser for POST / PUT data and return args.
        Separate out into its own method for modularity and testability.
        """

        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument("course_id", type=int, required=True)
        parser.add_argument("code", type=str, required=True)
        parser.add_argument("expiration_iso_string", type=str, required=True)
        parser.add_argument("local_tz_string", type=str)

        return parser.parse_args()
