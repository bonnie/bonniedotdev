"""SQLAlchemy database models for cheat sheets."""
from datetime import date
from typing import Dict
from typing import List

import jsonpatch
from app.db import db
from app.models.base_model import Base
from sqlalchemy.orm.exc import NoResultFound


class Tag(db.Model, Base):
    """Model for tags db table."""

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    tagName = db.Column(db.String, nullable=False)

    def __init__(self, tagName: str):

        self.tagName = tagName
        self.update_db()


class CheatSheetTag(db.Model, Base):
    """Model for association between cheat sheets and tags."""

    __tablename__ = "cheat_sheet_tags"

    id = db.Column(db.Integer, primary_key=True)
    cheat_sheet_id = db.Column(db.Integer, db.ForeignKey("cheat_sheets.id"))
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"))

    def __init__(
        self,
        cheat_sheet_id: int,
        tag_id: int,
    ):
        """Add record to db."""

        self.cheat_sheet_id = cheat_sheet_id
        self.tag_id = tag_id
        self.update_db()


class CheatSheet(db.Model, Base):
    """Model for cheat_sheets db table."""

    __tablename__ = "cheat_sheets"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    fileName = db.Column(db.String, nullable=False)
    version = db.Column(db.String, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)
    tags = db.relationship("Tag", secondary="cheat_sheet_tags")

    def __init__(
        self,
        title: str,
        fileName: str,
        version: str,
        tagNames: List[str] = [],
    ):
        """Add record to database."""

        self.title = title
        self.fileName = fileName
        self.version = version
        self.updated_at = date.today()
        self.add_tags(tagNames)

        self.update_db()

    def add_tags(self, tag_names: List[str]):
        """Add tag to cheat sheet. If tag doesn't exist, create it."""

        for tag_name in tag_names:
            # translate any capital letters to lowercase and underscores into spaces
            tag_name_clean = tag_name.lower().replace("_", " ")

            # try to find tag
            try:
                tag = Tag.query.filter(Tag.tagName == tag_name_clean).one()
            except NoResultFound:
                # if not found, create it
                tag = Tag(tagName=tag_name_clean)

            self.tags.append(tag)

    def update_from_patch(self, json_patch: Dict):
        """Update based on JsonPatch."""

        # get existing data
        current_data = self.to_dict()

        # Apply patch to existing dict
        updated_data = jsonpatch.apply_patch(current_data, json_patch)

        # Apply the patched dictionary back to the model
        for key, value in updated_data.items():
            if key == "tags":
                # deal with tags separately
                self.tags = []
                self.add_tags(value)
            else:
                # everything else is simpler
                setattr(self, key, value)

        # update the "updated_at" date
        self.updated_at = date.today()

        self.update_db()

    def to_dict(self):
        """Return the called upon resource to dictionary format."""
        return {
            "id": self.id,
            "title": self.title,
            "fileName": self.fileName,
            "version": self.version,
            "updatedAt": self.updated_at.strftime("%Y-%m-%d"),
            "tags": [tag.tagName for tag in self.tags],
        }

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f"""<CheatSheet id={self.id},
                   title={self.title},
                   fileName={self.fileName}>"""
