"""SQLAlchemy database model for course review quote."""
from app.db import db
from app.models.base_model import Base


class ReviewQuote(db.Model, Base):
    """Model for course review quote db table."""

    __tablename__ = "review_quotes"

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    body = db.Column(db.String, nullable=False)

    course = db.relationship("Course")

    def __init__(
        self,
        body: str,
        course_id: int = None,
    ):
        """Add record to database."""

        self.course_id = course_id
        self.body = body

        self.update_db()

    @classmethod
    def get_display_data(cls):
        """Get display data for all quotes, including course name and course link."""

        allQuotes = cls.query.all()

        return [
            {
                "courseName": q.course.name,
                "courseLink": q.course.link,
                "id": q.id,
                "body": q.body,
            }
            for q in allQuotes
        ]

    def patch(self, body: str, courseId: int):
        """Update quote with new data."""

        self.body = body
        self.course_id = courseId
        self.update_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "course_id": self.course_id,
            "body": self.body,
        }

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f"""<ReviewQuote (id={self.id},
                   course_id={self.course_id},
                   body (excerpt)={self.quote[:25]}>"""
