"""Flask settings for this app."""
import os


class CommonConfig:
    """Common settings."""

    # process and return all reqparse errors, rather than stopping at the first
    BUNDLE_ERRORS = True

    # keep app secure
    SECRET_KEY = os.environ.get("FLASK_SECRET")

    # don't need to keep track of DB changes
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(CommonConfig):
    """Settings for production."""

    DEBUG = False
    SQLALCHEMY_DATABASE_URI = "sqlite:////tmp/production.db"


class DevConfig(CommonConfig):
    """Settings for development."""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:////tmp/development.db"


class TestConfig(CommonConfig):
    """Settings for test."""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:////tmp/test.db"


# to make it easier to select which config to use without conditionals
app_config = {
    "production": ProductionConfig,
    "development": DevConfig,
    "test": TestConfig,
}
