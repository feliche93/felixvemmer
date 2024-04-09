from datetime import date
from typing import List, Optional
from dotenv import load_dotenv
from crewai import Crew
from crewai import Task
from crewai.process import Process
from felixvemmer_crew.agents import research_analyst, job_analyst
from openai import BaseModel
from pydantic import Field

load_dotenv()


job_url = "https://www.freelancermap.de/projekt/ai-transformation-expert-w-m-d"

get_job_details_task = Task(
    description=f"Scrape and save job details for the job url {job_url}",
    expected_output="Full file path to the job details result",
    agent=research_analyst,
    verbose=True,
)


class Skills(BaseModel):
    """The skills required for the job"""

    skills: List[str] = Field(..., description="The skills required for the job")


class TechStack(BaseModel):
    """The tech stack required for the job"""

    tech_stack: List[str] = Field(
        ..., description="The tech stack required for the job"
    )


class JobPost(BaseModel):
    """A job post"""

    company: str = Field(..., description="The company who's posting the job")
    person: str = Field(..., description="The person who's hiring for the job")
    location: str = Field(..., description="The location of the job")
    fully_remote: bool = Field(..., description="Whether the job is fully remote")
    salary: Optional[str] = Field(..., description="The salary of the job")
    start_date: Optional[date] = Field(..., description="The start date of the job")
    skills: Optional[Skills] = Field(..., description="The skills required for the job")
    tech_stack: Optional[TechStack] = Field(
        ..., description="The tech stack required for the job"
    )


analyse_job_details_task = Task(
    description="Extract the company, person from the saved JSON file of the scraped job.",
    expected_output="Extracted job details such as company, person, location, fully_remote, salary, start_date, skills, and tech_stack.",
    output_pydantic=JobPost,
    agent=job_analyst,
    context=[get_job_details_task],
    verbose=True,
)

# Instantiate the crew with a sequential process
crew = Crew(
    agents=[research_analyst],
    tasks=[get_job_details_task, analyse_job_details_task],
    process=Process.sequential,
    verbose=2,
    memory=True,
    cache=True,
)

# Kick off the process
result = crew.kickoff()

print("Kicking off crew...")
print(result)
