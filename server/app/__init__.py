from app.resources.course_resource import Course
from app.resources.courses_resource import Courses
from app.resources.login_resource import Login
from app.resources.review_quote_resource import ReviewQuote
from app.resources.review_quotes_resource import ReviewQuotes
from config import app_config
from flask import Flask
from flask import send_file
from flask_restful import Api


def create_app(flask_env):
    """Create an app for the server to run.
    flask_env should be one of the following:
        production
        development
        test
    """

    # create app and Flask-RESTful Api instance
    app = Flask(__name__)

    # set up config based on flask_env
    config = app_config.get(
        flask_env,
        app_config["production"],
    )  # default to production
    app.config.from_object(config)

    # for development server testing without having to rebuild react
    if flask_env == "development":
        from flask_cors import CORS

        # CORS(app, resources={r"/api/*": {"origins": "localhost:3000"}})
        CORS(app)

    # for Flask-RESTful
    api = Api(app, prefix="/api", catch_all_404s=True)

    # add resources / routes
    # api.add_resource(FooterLinks, "/api/footer_links")
    api.add_resource(Login, "/login")
    api.add_resource(ReviewQuotes, "/review_quotes")
    api.add_resource(ReviewQuote, "review_quote/<int:id>", "/review_quote/add")
    api.add_resource(Courses, "/courses")
    api.add_resource(Course, "/course/<int:id>", "/course/add")

    @app.route("/")
    def serve_react():
        """Serve the built react app."""
        return send_file("index.html")

    # make sure react router urls route back to react, and not to the server
    @app.route("/", defaults={"input_path": ""})
    @app.route("/<path:input_path>")
    def homepage(input_path):
        """Serve the built react app."""

        return send_file("index.html")

    return app
