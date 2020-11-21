from app.models.review_quote_model import ReviewQuote as ReviewQuoteModel
from flask_restful import Resource


class ReviewQuotes(Resource):
    """Flask RESTful Resource for data about Udemy courses."""

    def get(self):
        """Return list of review quote data dicts (including course name and link)."""

        return ReviewQuoteModel.get_display_data(), 200
