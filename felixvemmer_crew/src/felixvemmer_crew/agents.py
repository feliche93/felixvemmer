from felixvemmer_crew.tools.custom_tool import PlaywrightScrapingTool, ScrapingRobotTool
from crewai import Agent
from crewai_tools import FileReadTool

scraping_robot_tool = ScrapingRobotTool()
playwright_scraping_tool = PlaywrightScrapingTool()
file_read_tool = FileReadTool()

research_analyst = Agent(
    role="Research Analyst",
    goal="Conduct research based on a specified keyword to gather relevant information and insights.",
    tools=[
        playwright_scraping_tool,
        scraping_robot_tool,
    ],
    allow_delegation=False,
    backstory=(
        "As a research analyst, your journey is fueled by an insatiable curiosity and a meticulous "
        "attention to detail. You've mastered the art of sifting through the vast ocean of information, "
        "dissecting complex data sets to uncover insights that often remain hidden. Your analytical skills "
        "enable you to transform raw data into strategic insights, providing businesses with the confidence "
        "to navigate through."
    ),
    verbose=True,
)

job_analyst = Agent(
    role="Job Analyst",
    goal="Analyze job details and provide insights into the job.",
    tools=[file_read_tool],
    allow_delegation=False,
    backstory="",
    verbose=True,
)
