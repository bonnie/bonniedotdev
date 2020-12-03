from app.models.review_quote_model import ReviewQuote as ReviewQuoteModel
from flask import request
from flask_restful import Resource
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema


class ReviewQuoteSchema(Schema):
    body = fields.Str(required=True)
    courseId = fields.Int(required=True)

    @post_load
    def make_review_quote(self, data, **kwargs):

        # translate courseId to snake case
        data["course_id"] = data["courseId"]
        del data["courseId"]
        return ReviewQuoteModel(**data)


class ReviewQuote(Resource):
    """Flask RESTful Resource for individual quotes."""

    # TODO: reduce boilerplate for this and Course resource by subclassing

    def _get_by_id(self, id: int) -> ReviewQuoteModel:
        """Return record object for specified ID."""

        record = ReviewQuoteModel.query.get_or_404(id)

        return record

    def get(self, id):
        """Return data for particular review quote ID."""

        quote = self._get_by_id(id)
        return quote.to_dict(), 200

    def patch(self, id):
        """Update existing quote."""

        quote = self._get_by_id(id)
        args = ReviewQuoteSchema.load(request.json)
        quote.patch(**args)

        return quote.to_dict(), 200

    def post(self):
        """Create new quote."""

        new_quote = ReviewQuoteSchema().load(request.json)

        return new_quote.to_dict(), 201

    def delete(self, id):
        """Delete review quote."""

        review_quote = self._get_by_id(id)
        review_quote.delete()

        return None, 204
