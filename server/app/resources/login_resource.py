import os
from datetime import datetime
from datetime import timedelta

import jwt
from app.models.user_model import User as UserModel
from flask import request
from flask_restful import Resource
from marshmallow import fields
from marshmallow import Schema
from marshmallow.exceptions import ValidationError


class userLoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class Login(Resource):
    """Flask RESTful Resource for logging in user."""

    def post(self):
        """Return username and userID for valid login; error for invalid."""

        try:
            args = userLoginSchema().load(request.json)
        except ValidationError as e:
            return {"message": f"incorrect arguments: {e}"}, 400

        user = UserModel.validate_user(args["username"], args["password"])

        if user is None:
            username = args["username"]
            return {"message": f"Incorrect login for user {username}"}, 400

        # if we got to here, login is legit
        # time to create the jwt
        expire_date = datetime.utcnow() + timedelta(hours=24 * 3)
        expire_date_string = datetime.strftime(expire_date, "%Y-%m-%d")

        token = jwt.encode(
            {"userId": user.id, "expiration": expire_date_string},
            os.environ.get("FLASK_SECRET"),
        )

        return {
            "token": token.decode("UTF-8"),
            "username": user.username,
            "id": user.id,
        }, 200
