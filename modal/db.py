"""
This module is used to set up the database connection and create the necessary tables.
"""
import os

from dotenv import load_dotenv
from models import FreelancePlatform, FreelancePlatformStatistic  # noqa pylint: disable=unused-import
from sqlmodel import SQLModel, create_engine

load_dotenv()

psql_url: str = os.getenv("DATABASE_URL")
engine = create_engine(psql_url, echo=True)


def create_db_and_tables() -> None:
    """
    This function creates the necessary tables in the database.
    """
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db_and_tables()
