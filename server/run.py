import os

from app import create_app
from app.db import connect_to_db

flask_env = os.getenv("FLASK_ENV")
app = create_app(flask_env)
connect_to_db(app)

if __name__ == "__main__":
    # connect_to_db(app)
    app.run(port=os.getenv("FLASK_PORT", 5000))
