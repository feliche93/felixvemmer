from textwrap import dedent
from dotenv import load_dotenv
from crewai import Crew
from crewai.process import Process
from pathlib import Path
from textwrap import dedent
from crewai import Task
from crewai import Agent
from felixvemmer_crew.models import (
    SFindTopRankingSerpsForKeywordTaskOutput,
)
from pathlib import Path
from textwrap import dedent
from crewai import Agent
from felixvemmer_crew.tools.custom_tool import ScrapingRobotTool, PlaywrightScrapingTool
from crewai_tools.tools import FileReadTool, DirectoryReadTool


load_dotenv()


keyword = "best llm agent frameworks"  # input("What is the keyword to research?\n")
num_websites = 2  # int(input("How many top ranking websites to analyze?\n"))
publishing_website = "https://www.backlinkgpt.com"

root_path = Path(__file__).resolve().parent
crew_files_path = root_path / "crew_files"

scraping_robot_tool = ScrapingRobotTool()
playwright_scraping_tool = PlaywrightScrapingTool()

directory_read_tool = DirectoryReadTool(
    # directory=crew_files_path.as_posix()
)
file_read_tool = FileReadTool()

content_outline_file_read_tool = FileReadTool(
    file_path=(root_path / "example_content_outline.md").as_posix(),
    description="A tool to read an example of how exactly the content outline should look like.",
)

file_read_tool_paul_graham_example = FileReadTool(
    file_path=(root_path / "example_paul_graham_essay.md").as_posix(),
    description="A tool to read an example of a Paul Graham essay.",
)

directory_read_tool_extracted_websites = DirectoryReadTool(
    directory=(crew_files_path / "extracted_websites").as_posix(),
    description="A tool to list the extracted website files from the directory.",
)

# Create Agents
research_analyst = Agent(
    role="Research Analyst",
    goal="Conduct research based on a specified keyword to gather relevant information and insights.",
    tools=[
        playwright_scraping_tool,
        scraping_robot_tool,
    ],
    backstory=dedent(
        """As a research analyst, your journey is fueled by an insatiable curiosity and a meticulous
        attention to detail. You've mastered the art of sifting through the vast ocean of information, 
        dissecting complex data sets to uncover insights that often remain hidden. Your analytical skills 
        enable you to transform raw data into strategic insights, providing businesses with the confidence
        to navigate through."""
    ),
    verbose=True,
    allow_delegation=True,
)

seo_analyst = Agent(
    role="Senior SEO Analyst",
    goal="To help businesses improve their online visibility and drive more organic traffic to their websites.",
    tools=[
        file_read_tool,
        directory_read_tool_extracted_websites,
        content_outline_file_read_tool,
    ],
    backstory=dedent(
        """As a senior SEO Analyst, you have a proven track record in optimizing websites 
        to rank higher in search results. You have a deep understanding of search engine algorithms and know how to
        optimize websites to rank higher in search results. You are passionate about
        helping businesses improve their online visibility and drive more organic
        traffic to their websites."""
    ),
    verbose=True,
    allow_delegation=True,
)

content_writer = Agent(
    role="Content Writer",
    goal=dedent(
        """You are an expert on writing concise, clear, and illuminating essays on the topic of the input provided.
        Write the essay exactly like Paul Graham would write it.
        
        - Essay should be written in a simple, conversational style, not in a grandiose or academic style.
        - Use the same style, vocabulary level, and sentence structure as Paul Graham.
        - Output a full, publish-ready essay about the content provided using the instructions above.
        - Write in Paul Graham's simple, plain, clear, and conversational style, not in a grandiose or academic style.
        - Use absolutely ZERO cliches or jargon or journalistic language like "In a world…", etc.
        - Do not use cliches or jargon.
        - Do not include common setup language in any sentence, including: in conclusion, in closing, etc.
        """
    ),
    tools=[
        file_read_tool,
        directory_read_tool,
        file_read_tool_paul_graham_example,
    ],
    backstory=dedent(
        """Embarking on a journey of words, you channel the essence of Paul Graham, a beacon of clarity and 
      simplicity in the realm of writing. Your mission transcends mere content creation; it's about crafting narratives 
      that resonate, enlighten, and inspire. With a style that mirrors Graham's own, you navigate the vast seas of 
      ideas with the precision of a seasoned sailor, transforming complex concepts into engaging, accessible prose. Your pen is your compass, 
      guiding readers through uncharted territories of thought with ease and elegance. In this role, you're not just a writer; you're a storyteller, 
      echoing the insightful, straightforward, and impactful essence of Paul Graham's legacy.
      """
    ),
    verbose=True,
    allow_delegation=True,
)


# Define Tasks for each agent
find_top_ranking_serps_for_keyword_task = Task(
    description=f"Find the title and url for the top {num_websites} search results for a given keyword {keyword}.",
    expected_output=f"A list of the top {num_websites} search results for the {keyword} with their title and URL.",
    agent=research_analyst,
    output_pydantic=SFindTopRankingSerpsForKeywordTaskOutput,
    # human_input=True,
)

extract_website_content_task = Task(
    description=dedent(
        """Extract the body text, title, meta title, meta description, meta image URL,
        and favicon image URL for a list of given website urls and save them to files."""
    ),
    expected_output=dedent("A list of saved filenames with their full url path."),
    agent=research_analyst,
    context=[find_top_ranking_serps_for_keyword_task],
    # human_input=True,
)

create_content_outline_task = Task(
    # human_input=True,
    context=[extract_website_content_task],
    description=dedent(
        """
        Make sure to understand how the content outline should look like in terms of structure and content. Then analyze the content extracted 
        from websites. Focus on crafting a detailed content outline by examining the structure and organization, 
        including titles, headlines, subheadlines, and meta descriptions of the extracted content.
        The extracted content is stored as JSON files in the 'extracted_websites' folder, named after each domain.
        """
    ),
    output_file=f"{keyword.lower().replace(' ', '_')}.md",
    expected_output="A file exactly following the format of `example_content_outline.md` file.",
    agent=seo_analyst,
)

create_first_draft_task = Task(
    description=dedent(
        """Create a first draft of a blog post in the style of Paul Graham, following the structure given in the content outline.

                When writing the first draft of the blog post, write the essay exactly like Paul Graham would write it.
                
                - Essay should be written in a simple, conversational style, not in a grandiose or academic style.
                - Use the same style, vocabulary level, and sentence structure as Paul Graham.
                - Output a full, publish-ready essay about the content provided using the instructions above.
                - Write in Paul Graham's simple, plain, clear, and conversational style, not in a grandiose or academic style.
                - Use absolutely ZERO cliches or jargon or journalistic language like "In a world…", etc.
                - Do not use cliches or jargon.
                - Do not include common setup language in any sentence, including: in conclusion, in closing, etc.
                """
    ),
    expected_output=dedent(
        """A first draft of a blog post in the style of Paul Graham based on the content outline.
                """
    ),
    agent=content_writer,
    context=[create_content_outline_task],
    # human_input=True,
    output_file="first_draft.md",
    verbose=True,
)

# Instantiate the crew with a sequential process
crew = Crew(
    agents=[research_analyst, seo_analyst, content_writer],
    tasks=[
        find_top_ranking_serps_for_keyword_task,
        extract_website_content_task,
        create_content_outline_task,
        # create_first_draft_task,
    ],
    process=Process.sequential,
    verbose=2,
    memory=True,
    cache=True,
)

# Kick off the process
result = crew.kickoff()

print("SEO and Content Creation Process Completed.")
print("Final Content Outline:")
print(result)
