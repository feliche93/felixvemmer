from dotenv import load_dotenv
from crewai import Crew
from crewai.process import Process
from felixvemmer_crew.tasks import Tasks
from felixvemmer_crew.agents import Agents

load_dotenv()

tasks = Tasks()
agents = Agents()

keyword = input("What is the keyword to research?\n")
num_websites = int(input("How many top ranking websites to analyze?\n"))

# Create Agents
research_analyst = agents.research_analyst_agent()
seo_analyst = agents.seo_analyst_agent()
content_writer = agents.content_writer_agent()

# Define Tasks for each agent
find_top_ranking_serps_for_keyword_task = tasks.find_top_ranking_serps_for_keyword_task(
    agent=research_analyst,
    num_websites=num_websites,
    keyword=keyword,
)

# extract_website_content_task = tasks.extract_website_content_task(
#     agent=research_analyst,
#     num_websites=num_websites,
#     context=[find_top_ranking_serps_for_keyword_task],
# )

# create_content_outline_task = tasks.create_content_outline_task(
#     content_writer, num_websites, keyword
# )

# Instantiate the crew with a sequential process
crew = Crew(
    agents=[research_analyst, seo_analyst, content_writer],
    tasks=[
        find_top_ranking_serps_for_keyword_task,
        # extract_website_content_task,
        # create_content_outline_task,
    ],
    process=Process.sequential,
    verbose=2,
    # memory=True,
    # cache=True,
)

# Kick off the process
result = crew.kickoff()

print("SEO and Content Creation Process Completed.")
print("Final Content Outline:")
print(result)
