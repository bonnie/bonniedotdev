"""SQLAlchemy database model for Udemy course coupon."""
import hashlib
import os

from app.db import db
from app.models.base_model import Base
from sqlalchemy.orm.exc import NoResultFound


class User(db.Model, Base):
    """Model for Udemy course coupon db table."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    hashed_password = db.Column(db.LargeBinary, nullable=False)
    salt = db.Column(db.LargeBinary, nullable=False)

    def __init__(
        self,
        username: int,
        password: str,
    ):
        """Add record to database, with salt and hashed password."""

        salt = os.urandom(32)
        hashed_password = self.hash_password(password, salt)

        self.username = username
        self.hashed_password = hashed_password
        self.salt = salt

        self.update_db()

    @staticmethod
    def hash_password(password: str, salt: bytes) -> bytes:
        # from https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
        return hashlib.pbkdf2_hmac(
            "sha256",  # The hash digest algorithm for HMAC
            password.encode("utf-8"),  # Convert the password to bytes
            salt,  # Provide the salt
            100000,  # Use 100,000 iterations of SHA-256
        )

    @classmethod
    def validate_user(
        cls,
        username: str,
        password: str,
    ):
        """Return the user object if there's a username/password match; None otherwise."""

        try:
            user = cls.query.filter(cls.username == username).one()
        except NoResultFound:
            return None

        hashed_password = cls.hash_password(password, user.salt)
        if hashed_password == user.hashed_password:
            return user

        return None

    def __repr__(self):
        """Return a pretty print version of the retrieved resource."""
        return f"<User (id={self.id}, username={self.username}>"
