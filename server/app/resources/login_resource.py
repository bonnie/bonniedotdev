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

    def post(self):
        """Return username and userID for valid login; error for invalid."""

        args = self._get_args()
        user = UserModel.validate_user(args["username"], args["password"])

        if user is None:
            return {"message": "incorrect login"}, 400

        return {"username": user.username, "id": user.id}, 200
