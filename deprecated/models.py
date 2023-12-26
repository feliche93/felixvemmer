"""
This module defines the SQLModel classes for the FreelancePlatform and FreelancePlatformStatistics tables.
"""

from datetime import date, datetime
from enum import Enum
from typing import Optional

from sqlalchemy.dialects.postgresql import DATE, ENUM, TEXT
from sqlmodel import Column, Field, SQLModel  # type: ignore


class FreelancePlatform(SQLModel, table=True):
    """
    This class represents the freelance_platform table in the database.
    It has the following columns: id, name, url.
    """

    __tablename__: str = "freelance_platforms"  # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(default=None, sa_column=Column(TEXT, unique=True, nullable=False))
    url: str = Field(default=None, sa_column=Column(TEXT, unique=True, nullable=False))


class FreelancePlatformStatistic(SQLModel, table=True):
    """
    This class represents the freelance_platform_statistics table in the database.
    It has the following columns: id, freelance_platform_id, date, profile_visits, profile_visits_total.
    """

    __tablename__: str = "freelance_platform_statistics"  # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    freelance_platform_id: int = Field(foreign_key="freelance_platforms.id")
    date: date
    profile_visits: int = Field(default=None, nullable=False)
    profile_visits_total: int = Field(default=None, nullable=False)


class WorkType(str, Enum):
    """
    This class represents the work type of a job post.
    It can be either REMOTE or LOCAL.
    """

    REMOTE = "remote"
    LOCAL = "local"


class JobStatus(str, Enum):
    """
    This class represents the status of a job post.
    It can be any of the following: SCRAPED, CONTACTED, NOT_INTERESTED,
    INTERVIEWED, REJECTED, APPLIED.
    """

    SCRAPED = "scraped"
    CONTACTED = "contacted"
    NOT_INTERESTED = "not_interested"
    INTERVIEWED = "interviewed"
    REJECTED = "rejected"
    APPLIED = "applied"


class FreelanceJobPost(SQLModel, table=True):
    """
    This class represents the freelance_job_post table in the database.
    It has the following columns: id, title, description, timestamp_posted,
    start_date, end_date, workload, location, hourly_rate, job_id, company_name,
    contact_person, industry, contract_type, work_type, status, platform_id.
    """

    __tablename__: str = "freelance_job_posts"  # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(default=None, sa_column=Column(TEXT, nullable=False))
    description: str = Field(default=None, sa_column=Column(TEXT, nullable=False))
    timestamp_posted: datetime = Field(default=None, nullable=False)
    start_date: Optional[date] = Field(default=None, sa_column=Column(DATE))
    end_date: Optional[date] = Field(default=None, sa_column=Column(DATE))
    workload: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    location: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    hourly_rate: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    job_id: str = Field(default=None, sa_column=Column(TEXT, nullable=False))
    company_name: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    contact_person: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    industry: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    contract_type: Optional[str] = Field(default=None, sa_column=Column(TEXT))
    work_type: WorkType = Field(sa_column=Column(ENUM(WorkType)))
    status: Optional[JobStatus] = Field(sa_column=Column(ENUM(JobStatus)))
    platform_id: int = Field(foreign_key="freelance_platforms.id")
    url: str = Field(default=None, sa_column=Column(TEXT, nullable=False, unique=True))
