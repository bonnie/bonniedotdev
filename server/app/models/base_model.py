"""Base class for database models."""
from app.db import db
from sqlalchemy.exc import SQLAlchemyError


class Base:
    """Base class for inheritance."""

    def update_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except SQLAlchemyError as e:
            raise SQLAlchemyError("DB Commit failed.", e)

    def delete(self):
        """Delete object from db."""
        try:
            db.session.delete(self)
            db.session.commit()
        except SQLAlchemyError:
            raise SQLAlchemyError("DB Commit failed.")
