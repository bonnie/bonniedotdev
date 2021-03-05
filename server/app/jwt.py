import os
from datetime import datetime
from functools import wraps
from logging import getLogger

import jwt
from app.models.user_model import User
from flask import request
from flask_restful import abort
from jwt.exceptions import InvalidKeyError
from jwt.exceptions import InvalidTokenError


def checkuser(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger = getLogger("jwt")

        token = None
        if "x-access-token" in request.headers:
            token = request.headers["x-access-token"]
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
