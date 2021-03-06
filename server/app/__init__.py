import logging
import os

from app.enums import FlaskEnv
from app.resources.cheat_sheet_resource import CheatSheet
from app.resources.cheat_sheets_resource import CheatSheets
from app.resources.coupon_resource import Coupon
from app.resources.course_resource import Course
from app.resources.courses_resource import Courses
from app.resources.log_resource import Log
from app.resources.login_resource import Login
from app.resources.review_quote_resource import ReviewQuote
from app.resources.review_quotes_resource import ReviewQuotes
from app.resources.tags_resource import Tags
from app.resources.talk_resource import Talk
from app.resources.talks_resource import Talks
from app.resources.upload_resource import Upload
from config import app_config
from flask import Flask
from flask import send_file
from flask import send_from_directory
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
    api.add_resource(CheatSheets, "/cheat_sheets")
    api.add_resource(CheatSheet, "/cheat_sheet", "/cheat_sheet/<int:id>")
    api.add_resource(Log, "/log")
    api.add_resource(Login, "/login")
    api.add_resource(ReviewQuotes, "/review_quotes")
    api.add_resource(ReviewQuote, "/review_quote/<int:id>", "/review_quote")
    api.add_resource(Coupon, "/coupon/<int:id>", "/coupon")
    api.add_resource(Courses, "/courses")
    api.add_resource(Course, "/course/<int:id>", "/course")
    api.add_resource(Tags, "/tags")
    api.add_resource(Talks, "/talks")
    api.add_resource(Talk, "/talk/<int:id>", "/talk")
    api.add_resource(Upload, "/upload")

    @app.route("/")
    def serve_react():
        """Serve the built react app."""
        return send_file("index.html")

    @app.route("/robots.txt")
    def serve_robots():
        return send_file("static/robots.txt")

    @app.route("/sitemap.xml")
    def serve_sitemap():
        return send_file("static/sitemap.xml")

    @app.route("/manifest.json")
    def serve_manifest():
        return send_file("static/manifest.json")

    @app.route("/asset-manifest.txt")
    def serve_asset_manifest():
        return send_file("static/asset-manifest.txt")

    @app.route("/favicon/<icon_file>")
    def serve_favicon(icon_file):
        return send_from_directory("static/favicon/", icon_file)

    @app.route("/portraits/<filename>")
    def serve_portrait_image(filename):
        return send_from_directory("static/images/portraits", filename)

    @app.route("/uploads/<filename>")
    def serve_upload_image(filename):
        return send_from_directory(os.getenv("BDD_UPLOAD_FOLDER"), filename)

    # make sure react router urls route back to react, and not to the server
    @app.route("/", defaults={"input_path": ""})
    @app.route("/<path:input_path>")
    def homepage(input_path):
        """Serve the built react app."""

        return send_file("index.html")

    return app
