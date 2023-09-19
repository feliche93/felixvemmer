"""
This module defines the SQLModel classes for the FreelancePlatform and FreelancePlatformStatistics tables.
"""

from datetime import date
from typing import Optional

from sqlalchemy.dialects.postgresql import TEXT
from sqlmodel import Column, Field, SQLModel


class FreelancePlatform(SQLModel, table=True):
    """
    This class represents the freelance_platform table in the database.
    It has the following columns: id, name, url.
    """

    __tablename__ = "freelance_platforms"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(default=None, sa_column=Column(TEXT, unique=True, nullable=False))
    url: str = Field(default=None, sa_column=Column(TEXT, unique=True, nullable=False))


class FreelancePlatformStatistic(SQLModel, table=True):
    """
    This class represents the freelance_platform_statistics table in the database.
    It has the following columns: id, freelance_platform_id, date, profile_visits, profile_visits_total.
    """

    __tablename__ = "freelance_platform_statistics"

    id: Optional[int] = Field(default=None, primary_key=True)
    freelance_platform_id: int = Field(foreign_key="freelance_platforms.id")
    date: date
    profile_visits: int = Field(default=None, nullable=False)
    profile_visits_total: int = Field(default=None, nullable=False)
