import logging

from app.models.coupon_model import Coupon as CouponModel
from app.resources.base_crud_resource import BaseCrudResource
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema


class CouponSchema(Schema):
    link = fields.Str(required=True)
    price = fields.Float(required=True)
    utcExpirationISO = fields.Str(required=True)
    courseId = fields.Float(required=True)

    @post_load
    def make_coupon(self, data, **kwargs):
        return CouponModel(**data)


class Coupon(BaseCrudResource):
    """Flask RESTful Resource for individual quotes."""

    def __init__(self):
        self.schema = CouponSchema
        self.model = CouponModel
        self.logger = logging.getLogger(__name__)
