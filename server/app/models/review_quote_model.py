"""SQLAlchemy database model for course review quote."""
from app.db import db
from app.models.base_model import Base


class ReviewQuote(db.Model, Base):
    """Model for course review quote db table."""

    __tablename__ = "review_quotes"

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    quote = db.Column(db.String, nullable=False)

    def __init__(
        self,
        course_id: int,
        review_quote: str,
    ):
        """Add record to database."""

        self.course_id = course_id
        self.review_quote = review_quote

        self.add_to_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "course_id": self.course_id,
            "review_quote": self.review_quote,
        }

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f"""<ReviewQuote (id={self.id},
                   course_id={self.course_id},
                   quote (excerpt)={self.quote[:25]}>"""
