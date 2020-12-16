import os

import psycopg2
from app import create_app
from app.db import connect_to_db
from app.db import db
from app.helpers import get_flask_env


DEBUG = False


def print_debug(statement: str):
    """Print statement if debug is true."""
    if DEBUG is True:
        print(statement)


def get_db_name_from_app(app):
    """Get db name from app config."""

    return app.config["SQLALCHEMY_DATABASE_URI"].split("/")[-1]


def create_db_connection():
    # establishing the connection
    conn = psycopg2.connect(
        database="postgresql",
        user=os.getenv("PSQL_USERNAME"),
        password=os.getenv("PSQL_PASSWORD"),
        host=os.getenv("PSQL_HOST"),
        port=os.getenv("PSQL_PORT"),
    )
    conn.autocommit = True
    cursor = conn.cursor()

    return conn, cursor


def drop_db(app):
    """Drop db from app config."""

    conn, cursor = create_db_connection()
    db_name = get_db_name_from_app(app)

    sql = f"""DROP database {db_name}"""
    cursor.execute(sql)

    # Closing the connection
    conn.close()


def create_db(app):
    """Create db from app config.

    adapted from
    https://www.tutorialspoint.com/python_data_access/python_postgresql_create_database.htm
    """

    conn, cursor = create_db_connection()
    db_name = get_db_name_from_app(app)

    sql = f"""CREATE database {db_name}"""

    try:
        cursor.execute(sql)
        print_debug(f"Database {db_name} created successfully")
    except psycopg2.errors.DuplicateDatabase:
        print_debug(f"Database {db_name} already exists; skipping")

    # Closing the connection
    conn.close()


def create_tables():
    """Create SQLAlchemy tables."""

    print_debug(f"Creating tables in {db}")
    db.create_all()


if __name__ == "__main__":
    DEBUG = True

    flask_env = get_flask_env()
    app = create_app(flask_env)
    connect_to_db(app)

    create_db(app)
    create_tables()
