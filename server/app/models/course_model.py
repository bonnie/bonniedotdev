"""SQLAlchemy database model for Udemy Course."""
from typing import Dict
from typing import List
from typing import Union

import jsonpatch
from app.db import db
from app.models.base_model import Base
from app.typed_dicts import CouponDict


class Course(db.Model, Base):
    """Model for Udemy course db table."""

    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)  # link to include referral code
    description = db.Column(db.String)
    imageName = db.Column(db.String)  # name of image to display
    coupons = db.relationship("Coupon")

    def __init__(
        self,
        name: str,
        link: str,
        description: str,
        imageName: str,
        coupons: List[CouponDict] = [],
    ):
        """Create record and add to db."""

        self.name = name
        self.link = link
        self.description = description
        self.imageName = imageName

        self.update_db()

    @property
    def bestCoupon(self) -> Union[CouponDict, None]:
        """Return dicts for best coupon (best price, then latest date)."""

        bestCoupon = None
        for coupon in self.coupons:
            if not coupon.is_valid():
                continue
            if bestCoupon is None:
                bestCoupon = coupon
                continue
            # is the price better than the current bestCoupon?
            if coupon.price < bestCoupon.price:
                bestCoupon = coupon
                continue
            # if price is the same, is expiration better?
            if coupon.price == bestCoupon.price:
                if coupon.utcExpirationISO > bestCoupon.utcExpirationISO:
                    bestCoupon = coupon

        # at the end of it all, who's the winner?
        if bestCoupon is None:
            return None

        return bestCoupon.to_dict()

    def update_from_patch(self, json_patch: Dict):
        """Update based on JsonPatch."""

        current_data = self.to_dict()

        # remove coupon data; this will not be updated via course patch
        del current_data["bestCoupon"]
        del current_data["coupons"]

        # Apply patch to existing dict
        updated_data = jsonpatch.apply_patch(current_data, json_patch)

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
            "imageName": self.imageName,  # defer to JS for camel case
            "bestCoupon": self.bestCoupon,
            "coupons": [c.to_dict() for c in self.coupons if c.is_valid()],
        }

    def __repr__(self):
        """Return a pretty print version of the course."""
        return f""" < Course(id={self.id},
                   name={self.name} >"""
