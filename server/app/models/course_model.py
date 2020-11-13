"""SQLAlchemy database model for Udemy Course."""
from app.db import db
from app.models.base import Base
from udemy_coupon import CourseCoupon


class Course(Base):
    """Model for Udemy course db table."""

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)  # link to include referral code
    description = db.Column(db.String)
    quotes = db.relationship("UdemyReviewQuote")

    @property
    def valid_coupons(self):
        """
        Return all valid coupon codes for course.

        returns:
            list of strings
        """

        all_coupons = CourseCoupon.query.filter(
            CourseCoupon.course_id == self.id,
        ).all()

        return [coupon for coupon in all_coupons if coupon.is_valid()]

    @classmethod
    def add_new(cls, name: str, link: str, referral_code: str):
        """
        Add record to database and return dict of newly created course.

        returns:
            dict representing new record
        """

        new_course = cls.__call__(
            name=name,
            link=link,
            referral_code=referral_code,
        )

        cls.add_to_db(new_course)
        return new_course.to_dict()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "link": self.link,
        }

    def __repr__(self):
        """Return a pretty print version of the course."""
        return f"""<Course(id={self.id},
                   name={self.name}>"""
