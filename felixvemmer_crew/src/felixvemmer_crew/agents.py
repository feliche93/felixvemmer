from pathlib import Path
from textwrap import dedent
from typing import Any, List, Optional
from crewai import Agent
from felixvemmer_crew.tools.custom_tool import ScrapingRobotTool, PlaywrightScrapingTool
from crewai_tools.tools import FileReadTool, DirectoryReadTool

crew_files_path = Path(__file__).parent.parent / "crew_files"

scraping_robot_tool = ScrapingRobotTool()
playwright_scraping_tool = PlaywrightScrapingTool()
file_read_tool = FileReadTool(
    file_path="job_description_example.md",
    description="A tool to read the job description example file.",
)
directory_read_tool = DirectoryReadTool(
    # directory=crew_files_path.as_posix()
)
file_read_tool = FileReadTool()
paul_graham_example_file_read_tool = FileReadTool(
    file_path="example_paul_graham_essay.md",
    description="A tool to read an example of a Paul Graham essay.",
)


class Agents:
    def seo_analyst_agent(self):
        return Agent(
            role="Senior SEO Analyst",
            goal="To help businesses improve their online visibility and drive more organic traffic to their websites.",
            tools=[file_read_tool, directory_read_tool],
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

    def research_analyst_agent(self):
        return Agent(
            role="Research Analyst",
            goal="Conduct research based on a specified keyword to gather relevant information and insights.",
            tools=[
                playwright_scraping_tool,
                scraping_robot_tool,
                file_read_tool,
                directory_read_tool,
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

    def content_writer_agent(self):
        return Agent(
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
                playwright_scraping_tool,
                scraping_robot_tool,
                file_read_tool,
                directory_read_tool,
                paul_graham_example_file_read_tool,
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

    def editor_agent(self):
        return Agent(
            role="Editor",
            goal="You are a writing expert. You refine the input text to enhance clarity, coherence, grammar, and style.",
            tools=[file_read_tool, directory_read_tool],
            backstory=dedent(
                """As an editor, you are the guardian of words, ensuring that every sentence shines with clarity and precision. 
                With a keen eye for detail and a passion for perfection, you have honed your skills over years of meticulous work. 
                Your expertise lies not just in correcting grammatical errors, but in enhancing the narrative flow and ensuring that 
                every piece of content resonates with its intended audience. You are the unsung hero behind the scenes, sculpting 
                raw ideas into masterpieces of communication that engage, inform, and inspire."""
            ),
            verbose=True,
            allow_delegation=True,
        )
