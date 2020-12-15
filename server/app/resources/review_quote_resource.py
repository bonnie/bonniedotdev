import logging

from app.models.review_quote_model import ReviewQuote as ReviewQuoteModel
from app.resources.base_crud_resource import BaseCrudResource
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema


class ReviewQuoteSchema(Schema):
    body = fields.Str(required=True)
    courseId = fields.Int(required=True)

    @post_load
    def make_review_quote(self, data, **kwargs):

        return ReviewQuoteModel(**data)


class ReviewQuote(BaseCrudResource):
    """Flask RESTful Resource for individual quotes."""

    def __init__(self):
        self.schema = ReviewQuoteSchema
        self.model = ReviewQuoteModel
        self.logger = logging.getLogger(__name__)
