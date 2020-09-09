import os

from app import create_app

# from app.models import connect_to_db

flask_env = os.getenv("FLASK_ENV")
app = create_app(flask_env)

if __name__ == "__main__":
    # connect_to_db(app)
    app.run(port=os.getenv("FLASK_PORT", 5000))
