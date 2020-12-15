import os

from app import create_app
from app.db import connect_to_db
from app.enums import FlaskEnv
from app.logging import log_setup

raw_env = os.getenv("FLASK_ENV")
if raw_env == "test":
    flask_env = FlaskEnv.TEST
elif raw_env == "development":
    flask_env = FlaskEnv.DEVELOPMENT
else:
    # default to production
    flask_env = FlaskEnv.PRODUCTION

app = create_app(flask_env)
connect_to_db(app)

if __name__ == "__main__":
    print("FLASK_ENV", flask_env)
    log_setup(flask_env)
    app.run(port=os.getenv("FLASK_PORT", 5000))
