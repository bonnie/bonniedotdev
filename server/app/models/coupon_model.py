"""SQLAlchemy database model for Udemy course coupon."""
from datetime import datetime

from app.db import db
from app.models.base_model import Base
from pytz import timezone
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
        expiration_iso_string: str,
        price: float,
        local_tz_string: str = "US/Pacific",
        course_id: int = None,
    ):
        """Create record and add to db, translating the expiration date to utc."""

        # translate iso string into datetime
        naive_expiration = datetime.fromisoformat(expiration_iso_string)

        # make datetime timezone aware
        local_tz = timezone(local_tz_string)
        local_expiration = local_tz.localize(naive_expiration)

        # translate to utc for storage
        utc_expiration = local_expiration.astimezone(utc)

        self.course_id = course_id
        self.code = code
        self.utc_expiration = utc_expiration
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
