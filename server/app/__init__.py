from config import app_config
from flask import Flask
from flask import render_template


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

    # For now, just serving static page
    # In the future, will have a db and react front-end
    @app.route("/")
    def single_page():
        """Show a simple single page.

        To be replaced with a React front end.
        """

        links = [
            {
                "icon": "linkedin.png",
                "target": "https://www.linkedin.com/in/bonnie-schulkin/",
            },
            {
                "icon": "twitter.png",
                "target": "https://twitter.com/bonniedotdev/",
            },
            {
                "icon": "github.png",
                "target": "http://github.com/flyrightsister",
            },
            {
                "icon": "udemy.png",
                "target": "https://www.udemy.com/react-testing-with-jest-and-enzyme/?couponCode=REACT-TESTING-999",  # noqa #E501
            },
        ]
        return render_template("home.html", links=links)

    return app
