from multiprocessing import context
from typing import Any, Dict
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from langchain_openai import ChatOpenAI

# Uncomment the following line to use an example of a custom tool
from mdx_blogpost_crew.tools.custom_tool import (
    ScrapingRobotTool,
    PlaywrightScrapingTool,
)

# Check our tools documentations for more information on how to use them
# from crewai_tools import SeleniumScrapingTool


@CrewBase
class MdxBlogpostCrewCrew:
    """MdxBlogpostCrew crew"""

    agents_config: Dict[str, Any] = "config/agents.yaml"  # type: ignore
    tasks_config: Dict[str, Any] = "config/tasks.yaml"  # type: ignore

    # OPENAI_API_BASE = "http://localhost:1234/v1"
    # OPENAI_MODEL_NAME = ""  # Adjust based on available model
    # OPENAI_API_KEY = "NA"

    manager_llm = ChatOpenAI(
        # base_url=OPENAI_API_BASE,
        # model=OPENAI_MODEL_NAME,
        # api_key=OPENAI_API_KEY,
    )

    @agent
    def detective(self) -> Agent:
        return Agent(
            config=self.agents_config["detective"],
            tools=[PlaywrightScrapingTool(), ScrapingRobotTool()],
            verbose=True,
            llm=self.manager_llm,
        )

    @task
    def find_info_about_person_task(self) -> Task:
        return Task(
            config=self.tasks_config["find_info_about_person_task"],
            agent=self.detective(),
            verbose=True,
            outout="info_about_person.md",
        )

    # @agent
    # def researcher(self) -> Agent:
    #     return Agent(
    #         config=self.agents_config["researcher"],
    #         tools=[PlaywrightScrapingTool(), ScrapingRobotTool()],
    #         verbose=True,

    #         llm=self.manager_llm,
    #     )

    # @task
    # def find_relevant_keywords_task(self) -> Task:
    #     return Task(
    #         config=self.tasks_config["find_relevant_keywords_task"],
    #         agent=self.researcher(),
    #         verbose=True,
    #     )

    # @task
    # def scrape_websites(self) -> Task:
    #     return Task(
    #         config=self.tasks_config["scrape_websites_task"],
    #         agent=self.researcher(),
    #         verbose=True,
    #         async_execution=False,
    #     )

    # @task
    # def extract_meta_information(self) -> Task:
    #     return Task(
    #         config=self.tasks_config["extract_meta_information_task"],
    #         agent=self.researcher(),
    #         verbose=True,
    #         async_execution=False,
    #     )

    @crew
    def crew(self) -> Crew:
        """Creates the MdxBlogpostCrew crew"""
        return Crew(
            agents=self.agents,  # type: ignore Automatically created by the @agent decorator
            tasks=self.tasks,  # type: ignore Automatically created by the @task decorator
            process=Process.sequential,
            verbose=2,
            # manager_llm=self.manager_llm,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
