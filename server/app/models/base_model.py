"""Base class for database models."""
from app.db import db
from sqlalchemy.exc import SQLAlchemyError


class Base(db.Model):
    """Base class for inheritance."""

    @classmethod
    def add_to_db(self, entity):
        try:
            db.session.add(entity)
            db.session.commit()
        except SQLAlchemyError:
            raise SQLAlchemyError("DB Commit failed on add.")

    @classmethod
    def add_new(cls, **kwargs):
        """To be supplied by child class."""

    def delete(self):
        """Delete object from db."""
        # TODO
