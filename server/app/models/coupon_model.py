"""SQLAlchemy database model for Udemy course coupon."""
from datetime import datetime

import dateutil.parser
from app.db import db
from app.models.base_model import Base
from pytz import utc


class Coupon(db.Model, Base):
    """Model for Udemy course coupon db table."""

    __tablename__ = "coupons"

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    code = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(4, 2), nullable=False)
    utc_expiration = db.Column(db.DateTime(timezone=True), nullable=False)

    def __init__(
        self,
        code: str,
        utcExpirationISO: str,
        price: float,
        course_id: int = None,
    ):
        """Create record and add to db, translating the expiration date to utc."""

        self.course_id = course_id
        self.code = code
        self.utc_expiration = dateutil.parser.parse(utcExpirationISO)
        self.price = price

        self.update_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "course_id": self.course_id,
            "code": self.code,
            "price": float(self.price),
            "utc_expiration": datetime.isoformat(self.utc_expiration),
        }

    def is_valid(self) -> bool:
        """Return boolean representing whether the coupon is valid."""

        return self.utc_expiration > datetime.now(utc)

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f""" < CourseCoupon(id={self.id},
                   course_id={self.course_id},
                   code={self.code},
                   price={self.price},
                   utc_expiration={self.utc_expiration} >"""
