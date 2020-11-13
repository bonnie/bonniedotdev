"""Base class for database models."""
from app.db import db
from sqlalchemy.exc import SQLAlchemyError


class Base:
    """Base class for inheritance."""

    def add_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except SQLAlchemyError:
            raise SQLAlchemyError("DB Commit failed on add.")

    def delete(self):
        """Delete object from db."""
        # TODO
