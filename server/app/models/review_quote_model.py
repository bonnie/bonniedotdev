"""SQLAlchemy database model for course review quote."""
from typing import Dict

import jsonpatch
from app.db import db
from app.models.base_model import Base


class ReviewQuote(db.Model, Base):
    """Model for course review quote db table."""

    __tablename__ = "review_quotes"

    id = db.Column(db.Integer, primary_key=True)
    courseId = db.Column(db.Integer, db.ForeignKey("courses.id"))
    body = db.Column(db.String, nullable=False)

    course = db.relationship("Course")

    def __init__(
        self,
        body: str,
        courseId: int = None,
    ):
        """Add record to database."""

        self.courseId = courseId
        self.body = body

        self.update_db()

    def update_from_patch(self, json_patch: Dict):
        """Update based on JsonPatch."""

        # get existing data
        current_data = self.to_dict()

        # Apply patch to existing dict
        updated_data = jsonpatch.apply_patch(current_data, json_patch)

        # Apply the patched dictionary back to the model
        for key, value in updated_data.items():
            setattr(self, key, value)

        self.update_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "body": self.body,
            "courseId": self.courseId,
            "courseName": self.course.name,
            "courseLink": self.course.link,
        }

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f"""<ReviewQuote (id={self.id},
                   courseId={self.courseId},
                   body (excerpt)={self.quote[:25]}>"""
