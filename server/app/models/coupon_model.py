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
    utc_expiration = db.Column(db.DateTime, nullable=False)

    def __init__(
        self,
        course_id: int,
        code: str,
        expiration_iso_string: str,
        local_tz_string: str = "US/Pacific",
    ):
        """
        Add record to database and return id of newly created person.

        expiration_date

        returns:
            dict representing new record
        """

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

        self.add_to_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "course_id": self.course_id,
            "code": self.code,
            "utc_expiration": self.utc_expiration,
        }

    def is_valid(self) -> bool:
        """Return boolean representing whether the coupon is valid."""

        return self.utc_expiration > datetime.now(utc)

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f"""<CourseCoupon (id={self.id},
                   course_id={self.course_id},
                   code={self.code},
                   utc_expiration={self.utc_expiration}>"""
