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
            return {"message": "Incorrect login"}, 400

        return {"username": user.username, "id": user.id}, 200
