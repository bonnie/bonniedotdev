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
    courseId = db.Column(db.Integer, db.ForeignKey("courses.id"))
    code = db.Column(db.String, nullable=False)
    link = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(4, 2), nullable=False)
    utcExpirationISO = db.Column(db.DateTime(timezone=True), nullable=False)

    def __init__(
        self,
        code: str,
        link: str,
        utcExpirationISO: str,
        price: float,
        courseId: int = None,
        update_db: bool = True,
    ):
        """Create record and add to db, translating the expiration date to utc."""

        self.courseId = courseId
        self.code = code
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
            "code": self.code,
            "link": self.link,
            "price": float(self.price),
            "utcExpirationISO": datetime.isoformat(self.utcExpirationISO),
        }

    def is_valid(self) -> bool:
        """Return boolean representing whether the coupon is valid."""

        return self.utcExpirationISO > datetime.now(utc)

    def update(self, updated_data):
        """Update with new data."""

        for key, value in updated_data.items():
            if key == "id":
                continue
            setattr(self, key, value)

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f""" < CourseCoupon(id={self.id},
                   courseId={self.courseId},
                   code={self.code},
                   price={self.price},
                   utcExpirationISO={self.utcExpirationISO} >"""
