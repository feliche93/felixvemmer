from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from langchain_openai import ChatOpenAI

# Uncomment the following line to use an example of a custom tool
from mdx_blogpost_crew.tools.custom_tool import ScrapingRobotTool

# Check our tools documentations for more information on how to use them
from crewai_tools import WebsiteSearchTool, FileReadTool


@CrewBase
class MdxBlogpostCrewCrew:
    """MdxBlogpostCrew crew"""

    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"

    @agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config["researcher"],
            tools=[WebsiteSearchTool(), ScrapingRobotTool()],
            verbose=True,
            delegate=True,
        )

    @agent
    def job_description_writer(self) -> Agent:
        return Agent(
            config=self.agents_config["job_description_writer"],
            tools=[
                WebsiteSearchTool(),
                ScrapingRobotTool(),
                FileReadTool(file_path="job_description_example.md"),
            ],
            verbose=True,
            delegate=True,
        )

    @agent
    def review_and_editing_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config["review_and_editing_specialist"],
            tools=[
                WebsiteSearchTool(),
                ScrapingRobotTool(),
                FileReadTool(file_path="job_description_example.md"),
            ],
            verbose=True,
            delegate=True,
        )

    @task
    def research_company_culture_task(self) -> Task:
        return Task(
            config=self.tasks_config["research_company_culture_task"],
            agent=self.researcher(),
            verbose=True,
        )

    @task
    def research_role_requirements_task(self) -> Task:
        return Task(
            config=self.tasks_config["research_role_requirements_task"],
            agent=self.researcher(),
            verbose=True,
        )

    @task
    def draft_job_posting_task(self) -> Task:
        return Task(
            config=self.tasks_config["draft_job_posting_task"],
            agent=self.job_description_writer(),
            context=[
                self.research_company_culture_task(),
                self.research_role_requirements_task(),
            ],
            verbose=True,
        )

    @task
    def review_and_edit_job_posting_task(self) -> Task:
        return Task(
            config=self.tasks_config["review_and_edit_job_posting_task"],
            agent=self.review_and_editing_specialist(),
            context=[self.draft_job_posting_task()],
            output_file="job_posting.md",
            verbose=True,
        )

    @task
    def industry_analysis_task(self) -> Task:
        return Task(
            config=self.tasks_config["industry_analysis_task"],
            agent=self.researcher(),
            verbose=True,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the MdxBlogpostCrew crew"""
        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=2,
            manager_llm=ChatOpenAI(model="gpt-4"),
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
