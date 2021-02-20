"""Flask settings for this app."""
import os

from app.enums import FlaskEnv

user = os.getenv("PSQL_USERNAME")
pw = os.getenv("PSQL_PASSWORD")
host = os.getenv("PSQL_HOST")
port = os.getenv("PSQL_PORT")

psql_uri_prefix = f"postgresql://{user}:{pw}@{host}:{port}"


class CommonConfig:
    """Common settings."""

    # process and return all reqparse errors, rather than stopping at the first
    BUNDLE_ERRORS = True

    # keep app secure
    SECRET_KEY = os.getenv("FLASK_SECRET")

    # don't need to keep track of DB changes
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # for uploaded files
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024


class ProductionConfig(CommonConfig):
    """Settings for production."""

    DEBUG = False
    SQLALCHEMY_DATABASE_URI = f"{psql_uri_prefix}/bonniedotdev"


class DevConfig(CommonConfig):
    """Settings for development."""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"{psql_uri_prefix}/dev_bonniedotdev"


class TestConfig(CommonConfig):
    """Settings for test."""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"{psql_uri_prefix}/test_bonniedotdev"


# to make it easier to select which config to use without conditionals
app_config = {
    FlaskEnv.PRODUCTION: ProductionConfig,
    FlaskEnv.DEVELOPMENT: DevConfig,
    FlaskEnv.TEST: TestConfig,
}
