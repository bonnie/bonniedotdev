from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_to_db(app):
    """Connect the database to our Flask app."""

    # db settings come from app config
    db.app = app
    db.init_app(app)
