"""SQLAlchemy database model for Udemy Course."""
from typing import List

from app.db import db
from app.models.base_model import Base
from app.models.coupon_model import Coupon
from app.models.review_quote_model import ReviewQuote
from app.typed_dicts import CouponDict
from app.typed_dicts import ReviewQuoteDict
from jsonpatch import JsonPatch


class Course(db.Model, Base):
    """Model for Udemy course db table."""

    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)  # link to include referral code
    description = db.Column(db.String)
    review_quotes = db.relationship("ReviewQuote")

    def __init__(
        self,
        name: str,
        link: str,
        description: str,
        coupons: List[CouponDict] = None,
        review_quotes: List[ReviewQuoteDict] = None,
    ):
        """Create record and add to db."""

        coupons = coupons or []
        review_quotes = review_quotes or []

        self.name = name
        self.link = link
        self.description = description
        self.coupons = [Coupon(**data) for data in coupons]
        self.review_quotes = [ReviewQuote(**data) for data in review_quotes]

        self.update_db()

    @property
    def valid_coupons(self):
        """
        Return all valid coupon codes for course.

        returns:
            list of strings
        """

        all_coupons = Coupon.query.filter(
            Coupon.course_id == self.id,
        ).all()

        return [coupon for coupon in all_coupons if coupon.is_valid()]

    def update_from_patch(self, json_patch):
        """Update based on JsonPatch."""

        # patch-ify the json
        patch = JsonPatch(json_patch)

        # Apply the patch to the  dictionary instance of the model
        updated_data = patch.apply(self.to_dict())

        # Apply the patched dictionary back to the model
        self.update(**updated_data)
        self.update_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "link": self.link,
            "valid_coupons": self.valid_coupons,
            "review_quotes": self.review_quotes,
        }

    def __repr__(self):
        """Return a pretty print version of the course."""
        return f""" < Course(id={self.id},
                   name={self.name} >"""
