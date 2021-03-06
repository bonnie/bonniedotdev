import os
from datetime import datetime
from datetime import timedelta
from functools import wraps
from logging import getLogger

import jwt
from app.models.user_model import User
from flask import request
from flask_restful import abort
from jwt.exceptions import InvalidKeyError
from jwt.exceptions import InvalidTokenError

JWT_HEADER_KEY = "x-access-token"


def create_jwt(user_id: int, expiration_date: str = None) -> str:
    """Create JSON web token for user id, expires in 3 days by default."""
    if expiration_date:
        expire_date_string = expiration_date
    else:
        expire_date = datetime.utcnow() + timedelta(hours=3 * 24)
        expire_date_string = datetime.strftime(expire_date, "%Y-%m-%d")

    return jwt.encode(
        {"userId": user_id, "expiration": expire_date_string},
        os.environ.get("FLASK_SECRET"),
    ).decode("UTF-8")


def checkuser(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger = getLogger("jwt")

        token = None
        if JWT_HEADER_KEY in request.headers:
            token = request.headers[JWT_HEADER_KEY]
        if not token:
            return abort(401)

        try:
            token_data = jwt.decode(token, os.environ.get("FLASK_SECRET"))
            user_id = token_data.get("userId")
            if not user_id:
                raise (InvalidKeyError("userId"))
            current_user = User.query.get(user_id)
            if not current_user:
                raise InvalidTokenError(f"user not found for user_id {user_id}")
            expiration = token_data.get("expiration")
            print("expiration", expiration)
            if not expiration:
                raise (InvalidKeyError("expiration"))
            if datetime.strptime(expiration, "%Y-%m-%d") < datetime.now():
                return {"message": "Login expired"}, 401

            # survived the gauntlet!
            return func(*args, **kwargs)
        except (
            InvalidTokenError,
            InvalidKeyError,
        ) as e:
            logger.error(f"invalid auth: {e}")
            return abort(401)

    return wrapper
