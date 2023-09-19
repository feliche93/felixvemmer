"""
This module is used to set up the database connection and create the necessary tables.
"""
import os
from datetime import datetime

from dotenv import load_dotenv
from models import (  # noqa pylint: disable=unused-import
    FreelancePlatform,
    FreelancePlatformStatistic,
)
from sqlmodel import Session, SQLModel, create_engine, select

load_dotenv()

psql_url: str = os.getenv("DATABASE_URL")
engine = create_engine(psql_url, echo=False)


def create_db_and_tables() -> None:
    """
    This function creates the necessary tables in the database.
    """
    SQLModel.metadata.create_all(engine)


session = Session(engine)

if __name__ == "__main__":
    create_db_and_tables()


def insert_platform_statistic(
    full_url: str,
    profile_visits_total: int = None,
    profile_visits: int = None,
    date: datetime.date = None,
) -> None:
    """
    Inserts a new platform statistic into the database.

    Args:
        session (Session): The SQLModel session to use for database operations.
        full_url (str): The full URL of the freelance platform.
        profile_visits_total (int): The total number of profile visits.
        profile_visits (int): The number of profile visits on a specific date.
        date (datetime.date): The date when the profile visits were recorded.

    Returns:
        None
    """
    with session:
        platform = session.exec(
            select(FreelancePlatform).where(FreelancePlatform.url == full_url)
        ).first()

        previous_stat = session.exec(
            select(FreelancePlatformStatistic)
            .where(FreelancePlatformStatistic.freelance_platform_id == platform.id)
            .order_by(FreelancePlatformStatistic.date.desc())
        ).first()

        # Check if the previous_stat date is equal to the input date
        print(
            f"Checking if previous_stat.date ({previous_stat.date}) is equal to input date ({date})"
        )
        if previous_stat.date == date:
            print("Statistic for this date is already present.")
            return
        else:
            print("Statistic for this date is not present, proceeding with the function.")

        # If profile_visits_total is provided, calculate profile_visits based on the previous date
        if profile_visits_total is not None:
            profile_visits = profile_visits_total - (
                previous_stat.profile_visits_total if previous_stat else 0
            )
        elif profile_visits is not None:
            # If profile_visits is provided, calculate profile_visits_total based on the previous date
            profile_visits_total = (
                previous_stat.profile_visits_total if previous_stat else 0
            ) + profile_visits
        else:
            raise ValueError(
                "Either profile visits or profile visits total with a date must be provided"
            )

        print(f"Date before creating FreelancePlatformStatistic: {date}")

        latest_stat = FreelancePlatformStatistic(
            profile_visits=profile_visits,
            profile_visits_total=profile_visits_total,
            freelance_platform_id=platform.id,
            date=date,
        )

        session.add(latest_stat)
        session.commit()

        session.refresh(latest_stat)

        print("Inserted new statistic:")
        print(latest_stat.dict())
