import os

from app.enums import FlaskEnv


def get_flask_env():
    """Get enum flask env from environment variable string."""
    raw_env = os.getenv("FLASK_ENV")
    if raw_env == "test":
        return FlaskEnv.TEST
    if raw_env == "development":
        return FlaskEnv.DEVELOPMENT

    # default to production
    return FlaskEnv.PRODUCTION
