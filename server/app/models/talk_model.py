"""SQLAlchemy database model for course review quote."""
from datetime import date
from typing import Dict

import jsonpatch
from app.db import db
from app.models.base_model import Base


class Talk(db.Model, Base):
    """Model for course talk db table."""

    __tablename__ = "talks"

    id = db.Column(db.Integer, primary_key=True)
    courseId = db.Column(db.Integer, db.ForeignKey("courses.id"))
    title = db.Column(db.String, nullable=False)
    utcDateStringISO = db.Column(db.Date, nullable=False)
    description = db.Column(db.String, nullable=False)
    slidesFilename = db.Column(db.String, nullable=False)
    conferenceImageName = db.Column(db.String, nullable=False)
    conferenceName = db.Column(db.String, nullable=False)
    conferenceLink = db.Column(db.String, nullable=False)
    recordingLink = db.Column(db.String, nullable=False)

    def __init__(
        self,
        title: str,
        utcDateStringISO: str,
        description: str,
        slidesFilename: str,
        conferenceImageName: str,
        conferenceName: str,
        conferenceLink: str,
        recordingLink: str,
    ):
        """Add record to database."""

        self.title = title
        self.utcDateStringISO = date.fromisoformat(utcDateStringISO)
        self.description = description
        self.slidesFilename = slidesFilename
        self.conferenceImageName = conferenceImageName
        self.conferenceName = conferenceName
        self.conferenceLink = conferenceLink
        self.recordingLink = recordingLink

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
            "utcDateStringISO": date.isoformat(self.utcDateStringISO),
            "description": self.description,
            "slidesFilename": self.slidesFilename,
            "conferenceImageName": self.conferenceImageName,
            "conferenceName": self.conferenceName,
            "conferenceLink": self.conferenceLink,
            "recordingLink": self.recordingLink,
        }

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f"""<Talk (id={self.id}, title={self.title}>"""
