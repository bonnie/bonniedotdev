"""SQLAlchemy database model for Udemy Course."""
from app.db import db
from app.models.base_model import Base
from app.models.coupon_model import Coupon


class Course(db.Model, Base):
    """Model for Udemy course db table."""

    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)  # link to include referral code
    description = db.Column(db.String)
    review_quotes = db.relationship("ReviewQuote")

    def __init__(self, name: str, link: str, description: str):
        """Create record and add to db."""

        self.name = name
        self.link = link
        self.description = description

        self.add_to_db()

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
        return f"""<Course(id={self.id},
                   name={self.name}>"""
