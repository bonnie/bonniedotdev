from app.resources.login_resource import Login
from config import app_config
from flask import Flask
from flask import send_file
from flask_restful import Api

# from flask_cors import CORS


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

    # for Flask-RESTful
    api = Api(app, prefix="/api", catch_all_404s=True)

    # add resources / routes
    # api.add_resource(FooterLinks, "/api/footer_links")
    api.add_resource(Login, "/login")

    @app.route("/")
    def serve_react():
        """Serve the built react app."""
        return send_file("index.html")

    return app
