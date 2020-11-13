import os

import psycopg2
from app import create_app
from app.db import connect_to_db
from app.db import db

# create db if it doesn't already exist


def create_db():
    """Create db from app config.

    adapted from
    https://www.tutorialspoint.com/python_data_access/python_postgresql_create_database.htm
    """

    flask_env = os.getenv("FLASK_ENV")
    app = create_app(flask_env)

    # establishing the connection
    conn = psycopg2.connect(
        database="postgres",
        user=os.getenv("PSQL_USERNAME"),
        password=os.getenv("PSQL_PASSWORD"),
        host=os.getenv("PSQL_HOST"),
        port=os.getenv("PSQL_PORT"),
    )
    conn.autocommit = True
    cursor = conn.cursor()

    db_url = app.config["SQLALCHEMY_DATABASE_URI"].split("/")[-1]
    sql = f"""CREATE database {db_url}"""

    try:
        cursor.execute(sql)
        print(f"Database {db_url} created successfully")
    except psycopg2.errors.DuplicateDatabase:
        print(f"Database {db_url} already exists; skipping")

    # Closing the connection
    conn.close()


def create_tables():
    """Create SQLAlchemy tables."""
    flask_env = os.getenv("FLASK_ENV")
    app = create_app(flask_env)
    connect_to_db(app)

    print(f"Creating tables in {db}")
    db.create_all()


if __name__ == "__main__":
    create_db()
    create_tables()
