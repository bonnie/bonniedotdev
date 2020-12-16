import logging
import os

from app import create_app
from app.db import connect_to_db
from app.helpers import get_flask_env
from app.logging import log_setup

flask_env = get_flask_env()

app = create_app(flask_env)
connect_to_db(app)

if __name__ == "__main__":
    log_setup(flask_env)
    logger = logging.getLogger("root")
    logger.info("Starting server")

    app.run(port=os.getenv("FLASK_PORT", 5000))
