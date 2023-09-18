"""
This module is used to create freelance platforms in the database.
"""

from models import FreelancePlatform
from db import engine
from sqlmodel import Session


def create_freelance_platforms(name: str, url: str):
    """
    This function creates a new freelance platform and adds it to the database.
    """
    freelance_platform = FreelancePlatform(name=name, url=url)

    session = Session(engine)

    session.add(freelance_platform)

    session.commit()

    session.close()


if __name__ == "__main__":
    create_freelance_platforms("freelance.de", "https://www.freelance.de")
    create_freelance_platforms("freelancermap", "https://www.freelancermap.de")
    create_freelance_platforms("malt", "https://www.malt.de")
