import logging

from app.enums import FlaskEnv
from app.resources.course_resource import Course
from app.resources.courses_resource import Courses
from app.resources.log_resource import Log
from app.resources.login_resource import Login
from app.resources.review_quote_resource import ReviewQuote
from app.resources.review_quotes_resource import ReviewQuotes
from config import app_config
from flask import Flask
from flask import send_file
from flask_restful import Api

logger = logging.getLogger(__name__)


def create_app(flask_env: FlaskEnv):
    """Create an app for the server to run."""

    # create app and Flask-RESTful Api instance
    app = Flask(__name__)

    # set up config based on flask_env
    config = app_config.get(flask_env)
    app.config.from_object(config)

    # for development server testing without having to rebuild react
    if flask_env == FlaskEnv.DEVELOPMENT:
        from flask_cors import CORS

        CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # for Flask-RESTful
    api = Api(app, prefix="/api", catch_all_404s=True)

    # add resources / routes
    api.add_resource(Log, "/log")
    api.add_resource(Login, "/login")
    api.add_resource(ReviewQuotes, "/review_quotes")
    api.add_resource(ReviewQuote, "/review_quote/<int:id>", "/review_quote")
    api.add_resource(Courses, "/courses")
    api.add_resource(Course, "/course/<int:id>", "/course")

    @app.route("/")
    def serve_react():
        """Serve the built react app."""
        return send_file("index.html")

    @app.route("/robots.txt")
    def serve_robots():
        return send_file("static/robots.txt")

    @app.route("/manifest.json")
    def serve_manifest():
        return send_file("static/manifest.json")

    @app.route("/asset-manifest.txt")
    def serve_asset_manifest():
        return send_file("static/asset-manifest.txt")

    @app.route("/favicon/<icon_file>")
    def serve_favicon(icon_file):
        return send_file(f"static/favicon/{icon_file}")

    # make sure react router urls route back to react, and not to the server
    @app.route("/", defaults={"input_path": ""})
    @app.route("/<path:input_path>")
    def homepage(input_path):
        """Serve the built react app."""

        return send_file("index.html")

    return app
