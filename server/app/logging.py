import logging.handlers

from app.enums import FlaskEnv

rotating_handler = logging.handlers.RotatingFileHandler(
    "/var/log/bonniedotdev/app.log",
    mode="a",
    maxBytes=102400,
    backupCount=10,
)


def log_setup(flask_env: FlaskEnv) -> None:
    if flask_env == FlaskEnv.PRODUCTION:
        log_level = logging.WARNING
        format = "%(asctime)s %(levelname)s:%(name)s:%(message)s"
    else:
        log_level = logging.DEBUG
        format = """%(asctime)s %(levelname)s:%(name)s:%(message)s
        %(module)s:%(funcName)%s:%(lineno)s"""

    log_handler = rotating_handler
    formatter = logging.Formatter(format)
    log_handler.setFormatter(formatter)
    logger = logging.getLogger()
    logger.addHandler(log_handler)
    logger.setLevel(log_level)
