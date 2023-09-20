"""
This module is used to set up the database connection and create the necessary tables.
"""
import os
from datetime import datetime, timedelta
from typing import List

from dotenv import load_dotenv
from models import (  # noqa pylint: disable=unused-import
    FreelanceJobPost,
    FreelancePlatform,
    FreelancePlatformStatistic,
    JobStatus,
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
        platform = session.exec(select(FreelancePlatform).where(FreelancePlatform.url == full_url)).first()

        previous_stat = session.exec(
            select(FreelancePlatformStatistic)
            .where(FreelancePlatformStatistic.freelance_platform_id == platform.id)
            .order_by(FreelancePlatformStatistic.date.desc())
        ).first()

        # Check if the previous_stat date is equal to the input date
        print(f"Checking if previous_stat.date ({previous_stat.date}) is equal to input date ({date})")
        if previous_stat.date == date:
            print("Statistic for this date is already present.")
            return
        else:
            print("Statistic for this date is not present, proceeding with the function.")

        # If profile_visits_total is provided, calculate profile_visits based on the previous date
        if profile_visits_total is not None:
            profile_visits = profile_visits_total - (previous_stat.profile_visits_total if previous_stat else 0)
        elif profile_visits is not None:
            # If profile_visits is provided, calculate profile_visits_total based on
            # the previous date
            profile_visits_total = (previous_stat.profile_visits_total if previous_stat else 0) + profile_visits
        else:
            raise ValueError("Either profile visits or profile visits total with a date must be provided")

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


def filter_new_job_post_urls(urls: List[str]) -> List[str]:
    """
    Filters out URLs of job posts that already exist in the database.

    Args:
        urls (List[str]): A list of URLs to check.

    Returns:
        new_urls (List[str]): A list of URLs that do not exist in the database.
    """
    with session:
        # Get the URLs that are already in the database
        existing_urls = session.exec(select(FreelanceJobPost.url).where(FreelanceJobPost.url.in_(urls))).all()

        # Print the number of URLs before filtering
        print(f"Number of URLs before filtering: {len(urls)}")

        # Return the URLs that are not in the existing_urls list
        new_urls = [url for url in urls if url not in existing_urls]

        # Print the number of URLs after filtering
        print(f"Number of URLs after filtering: {len(new_urls)}")

    return new_urls


def upsert_job_post(job_post: FreelanceJobPost) -> int:
    """
    Inserts a new job post into the database or does nothing if it already exists.

    Args:
        job_post (FreelanceJobPost): The job post to insert or update.

    Returns:
        id (int): The id of the inserted job post, or the id of the existing job post if it already exists.
    """
    print(f"Upserting job post: {job_post.dict()}")

    with session:
        existing_job_post = session.exec(select(FreelanceJobPost).where(FreelanceJobPost.url == job_post.url)).first()

        if existing_job_post is None:
            print(f"Job post with url {job_post.url} not found in the database. Inserting new job post.")
            session.add(job_post)
            session.commit()
            session.refresh(job_post)
            print(f"Inserted new job post with id {job_post.id}.")
            return job_post.id
        else:
            print(f"Job post with url {job_post.url} already exists in the database. Doing nothing.")
            return existing_job_post.id


def find_new_jobs() -> List[FreelanceJobPost]:
    """
    Finds new job posts in the database.

    Args:
        session (Session): The SQLModel session to use for database operations.

    Returns:
        List[FreelanceJobPost]: A list of FreelanceJobPost objects that were created in the last 24 hours.
    """
    with session:
        # Get the job posts that were created in the last 24 hours
        new_jobs = session.exec(
            select(FreelanceJobPost)
            .where(FreelanceJobPost.timestamp_posted >= datetime.now() - timedelta(days=1))
            .where(FreelanceJobPost.status == JobStatus.SCRAPED)
            .order_by(FreelanceJobPost.timestamp_posted.desc())
        ).all()

        print(f"Found {len(new_jobs)} matching jobs.")

        return new_jobs


def update_job_post_status(job_post_id: int, status: JobStatus) -> None:
    """
    Updates the status of a job post in the database.

    Args:
        job_post_id (int): The ID of the job post to update.
        status (JobStatus): The new status for the job post.
    """
    with session:
        # Retrieve the job post
        job_post = session.exec(select(FreelanceJobPost).where(FreelanceJobPost.id == job_post_id)).first()

        # If the job post does not exist, raise an exception
        if job_post is None:
            raise ValueError(f"No job post found with ID {job_post_id}")

        print(f"Updating status of job post with ID {job_post_id} to {status}.")

        # Update the status of the job post
        job_post.status = status
        session.merge(job_post)
        session.commit()

        print(f"Updated status of job post with ID {job_post_id} to {status}.")
