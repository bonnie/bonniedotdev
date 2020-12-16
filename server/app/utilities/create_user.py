import argparse

from app import create_app
from app.db import connect_to_db
from app.helpers import get_flask_env
from app.models.user_model import User


parser = argparse.ArgumentParser(description="Add a user to the database.")
parser.add_argument("-u", "--username", type=str, required=True)
parser.add_argument("-p", "--password", type=str, required=True)

if __name__ == "__main__":

    flask_env = get_flask_env()
    app = create_app(flask_env)
    connect_to_db(app)

    args = parser.parse_args()

    try:
        User(username=args.username, password=args.password)
        print(f"Successfully added user [{args.username}]")
        print()
    except Exception as e:
        print("ERROR:", e)
