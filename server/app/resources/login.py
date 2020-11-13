from app.models.user import User as UserModel
from flask_restful import reqparse
from flask_restful import Resource


class Login(Resource):
    """Flask RESTful Resource for logging in user."""

    def post(self):
        """Return whether or not user/password is valid."""

        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument("username", type=str, required=True)
        parser.add_argument("password", type=str, required=True)

        args = parser.parse_args()
        valid = UserModel.is_valid_user(**args)

        return {"valid": valid}, 200
