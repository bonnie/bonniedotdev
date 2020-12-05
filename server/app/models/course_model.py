"""SQLAlchemy database model for Udemy Course."""
from typing import Dict
from typing import List

import jsonpatch
from app.db import db
from app.models.base_model import Base
from app.models.coupon_model import Coupon
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
        if len(coupons) > 0:
            self.set_coupons(coupons)

        self.update_db()

    def set_coupons(self, newCoupons: List[CouponDict]) -> None:
        """Set coupon property."""
        self.coupons = []

        for coupon in newCoupons:
            if "id" in coupon:
                # this is already in the db, no need to make a new one
                coupon_obj = Coupon.query.get(coupon["id"])
                coupon_obj.update(coupon)
                self.coupons.append(coupon_obj)
            else:
                # not in db, need to make a new one
                # don't update the database yet, otherwise SQAlchemy gets confused
                newCoupon = Coupon(**coupon, update_db=False)
                self.coupons.append(newCoupon)

    @property
    def bestCoupon(self) -> CouponDict:
        """Return dicts for all valid coupon codes for course."""

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
                if coupon.utc_expiration > bestCoupon.utc_expiration:
                    bestCoupon = coupon

        # at the end of it all, who's the winner?
        if bestCoupon is None:
            return None

        return bestCoupon.to_dict()

    def update_from_patch(self, json_patch: Dict):
        """Update based on JsonPatch."""

        # update to_dict output to have all coupons rather than just the "best"
        current_data = self.to_dict()

        if self.coupons is not None:
            current_data["coupons"] = [c.to_dict() for c in self.coupons]

        # remove bestCoupon
        if "bestCoupon" in current_data:
            del current_data["bestCoupon"]

        # Apply patch to existing dict
        updated_data = jsonpatch.apply_patch(current_data, json_patch)

        # handle coupons separately
        if "coupons" in updated_data:
            self.set_coupons(updated_data["coupons"])
            del updated_data["coupons"]

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
            "coupons": [c.to_dict() for c in self.coupons],
        }

    def __repr__(self):
        """Return a pretty print version of the course."""
        return f""" < Course(id={self.id},
                   name={self.name} >"""
