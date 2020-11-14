from app.models.user_model import User as UserModel
from flask_restful import reqparse
from flask_restful import Resource


class Login(Resource):
    """Flask RESTful Resource for logging in user."""

    def _get_args(self):
        """Separate out for ease of testing."""

        parser = reqparse.RequestParser(bundle_errors=True)

        parser.add_argument("username", type=str, required=True)
        parser.add_argument("password", type=str, required=True)

        return parser.parse_args()

    def get(self):
        """Return whether or not user/password is valid."""

        args = self._get_args()

        valid = UserModel.is_valid_user(**args)

        return {"valid": valid}, 200
