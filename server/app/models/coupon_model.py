"""SQLAlchemy database model for Udemy course coupon."""
from datetime import datetime
from typing import Dict

import dateutil.parser
import jsonpatch
from app.db import db
from app.models.base_model import Base
from pytz import utc


class Coupon(db.Model, Base):
    """Model for Udemy course coupon db table."""

    __tablename__ = "coupons"

    id = db.Column(db.Integer, primary_key=True)
    courseId = db.Column(db.Integer, db.ForeignKey("courses.id"))
    link = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(4, 2), nullable=False)
    utcExpirationISO = db.Column(db.DateTime(timezone=True), nullable=False)

    def __init__(
        self,
        link: str,
        utcExpirationISO: str,
        price: float,
        courseId: int = None,
        update_db: bool = True,
    ):
        """Create record and add to db, translating the expiration date to utc."""

        self.courseId = courseId
        self.utcExpirationISO = dateutil.parser.parse(utcExpirationISO)
        self.price = price
        self.link = link

        if update_db:
            self.update_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "courseId": self.courseId,
            "link": self.link,
            "price": float(self.price),
            "utcExpirationISO": datetime.isoformat(self.utcExpirationISO),
        }

    def is_valid(self) -> bool:
        """Return boolean representing whether the coupon is valid."""

        return self.utcExpirationISO > datetime.now(utc)

    def update_from_patch(self, json_patch: Dict):
        """Update based on JsonPatch."""

        current_data = self.to_dict()

        # Apply patch to existing dict
        updated_data = jsonpatch.apply_patch(current_data, json_patch)

        # Apply the patched dictionary back to the model
        for key, value in updated_data.items():
            setattr(self, key, value)

        self.update_db()

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f""" < CourseCoupon(id={self.id},
                   courseId={self.courseId},
                   link={self.link},
                   price={self.price},
                   utcExpirationISO={self.utcExpirationISO} >"""
