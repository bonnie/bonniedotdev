from app.models.review_quote_model import ReviewQuote as ReviewQuoteModel
from flask import request
from flask_restful import abort
from flask_restful import Resource
from jsonpatch import JsonPatchException
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema


class ReviewQuoteSchema(Schema):
    body = fields.Str(required=True)
    courseId = fields.Int(required=True)

    @post_load
    def make_review_quote(self, data, **kwargs):

        return ReviewQuoteModel(**data)


class ReviewQuote(Resource):
    """Flask RESTful Resource for individual quotes."""

    # TODO: reduce repetitio for this and Course resource by subclassing

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

        course = self._get_by_id(id)

        try:
            course.update_from_patch(request.json)
        except JsonPatchException as e:
            # TODO: log this instead of printing
            print(e)
            abort(400)

        return course.to_dict(), 200

    def post(self):
        """Create new quote."""

        new_quote = ReviewQuoteSchema().load(request.json)

        return new_quote.to_dict(), 201

    def delete(self, id):
        """Delete review quote."""

        review_quote = self._get_by_id(id)
        review_quote.delete()

        return None, 204
