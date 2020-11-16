"""SQLAlchemy database model for Udemy Course."""
from typing import Dict
from typing import List

import jsonpatch
from app.db import db
from app.models.base_model import Base
from app.models.coupon_model import Coupon
from app.models.review_quote_model import ReviewQuote
from app.typed_dicts import CouponDict
from app.typed_dicts import ReviewQuoteDict


class Course(db.Model, Base):
    """Model for Udemy course db table."""

    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)  # link to include referral code
    description = db.Column(db.String)
    coupons = db.relationship("Coupon")
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
        self.set_coupons(coupons)
        self.set_review_quotes(review_quotes)

        self.update_db()

    def set_coupons(self, coupons: List[CouponDict]):
        self.coupons = [Coupon(**data) for data in coupons]

    def set_review_quotes(self, review_quotes: List[ReviewQuoteDict]):
        self.review_quotes = [ReviewQuote(**data) for data in review_quotes]

    @property
    def valid_coupons(self) -> List[CouponDict]:
        """Return dicts for all valid coupon codes for course."""

        return [coupon.to_dict() for coupon in self.coupons if coupon.is_valid()]

    def update_from_patch(self, json_patch: Dict):
        """Update based on JsonPatch."""

        # update to_dict output to have 'coupons' key rather than 'valid_coupons'
        current_data = self.to_dict()
        current_data["coupons"] = current_data["valid_coupons"]
        del current_data["valid_coupons"]

        # Apply patch to existing dict
        updated_data = jsonpatch.apply_patch(current_data, json_patch)

        # handle coupons and review_quotes separately
        if "coupons" in updated_data:
            self.set_coupons(updated_data["coupons"])
            del updated_data["coupons"]

        if "review_quotes" in updated_data:
            self.set_review_quotes(updated_data["review_quotes"])
            del updated_data["review_quotes"]

        # Apply the patched dictionary back to the model
        for key, value in updated_data.items():
            setattr(self, key, value)

        self.update_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "link": self.link,
            "valid_coupons": self.valid_coupons,
            "review_quotes": [r.to_dict() for r in self.review_quotes],
        }

    def __repr__(self):
        """Return a pretty print version of the course."""
        return f""" < Course(id={self.id},
                   name={self.name} >"""
