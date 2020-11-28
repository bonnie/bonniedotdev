from app.models.review_quote_model import ReviewQuote as ReviewQuoteModel
from flask import request
from flask_restful import Resource
from marshmallow import fields
from marshmallow import Schema


class ReviewQuoteSchema(Schema):
    body = fields.Str(required=True)
    courseId = fields.Int(required=True)


class ReviewQuote(Resource):
    """Flask RESTful Resource for individual quotes."""

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

        args = ReviewQuoteSchema.load(request.json)
        new_quote = ReviewQuoteModel(**args)

        return new_quote.to_dict(), 201
