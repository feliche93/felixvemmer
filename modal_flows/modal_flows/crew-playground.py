from crewai import Agent
from crewai import Task
from crewai import Crew, Process
from dotenv import load_dotenv
import os 

load_dotenv()

import openai
from langsmith.wrappers import wrap_openai
from langsmith import traceable

# Auto-trace LLM calls in-context
client = openai.Client())

@traceable # Auto-trace this function
def pipeline(user_input: str):
    result = client.chat.completions.create(
        messages=[{"role": "user", "content": user_input}],
        model="gpt-3.5-turbo"
    )
    return result.choices[0].message.content

pipeline("Hello, world!")
# Out:  Hello there! How can I assist you today?
# See trace: https://smith.langchain.com/public/b37ca9b1-60cd-4a2a-817e-3c4e4443fdc0/r

OPENAI_API_BASE = "http://localhost:11434/v1"
OPENAI_MODEL_NAME = "openhermes"  # Adjust based on available model
OPENAI_API_KEY = ""
LANGCHAIN_TRACING_V2= True

# Creating a senior researcher agent with memory and verbose mode
researcher = Agent(
    role="Senior Researcher",
    goal="Uncover groundbreaking technologies in {topic}",
    verbose=True,
    memory=True,
    backstory=(
        "Driven by curiosity, you're at the forefront of"
        "innovation, eager to explore and share knowledge that could change"
        "the world."
    ),
    allow_delegation=True,
)

# Creating a writer agent with custom tools and delegation capability
writer = Agent(
    role="Writer",
    goal="Narrate compelling tech stories about {topic}",
    verbose=True,
    memory=True,
    backstory=(
        "With a flair for simplifying complex topics, you craft"
        "engaging narratives that captivate and educate, bringing new"
        "discoveries to light in an accessible manner."
    ),
    allow_delegation=False,
)


# Research task
research_task = Task(
    description=(
        "Identify the next big trend in {topic}."
        "Focus on identifying pros and cons and the overall narrative."
        "Your final report should clearly articulate the key points"
        "its market opportunities, and potential risks."
    ),
    expected_output="A comprehensive 3 paragraphs long report on the latest AI trends.",
    agent=researcher,
)

# Writing task with language model configuration
write_task = Task(
    description=(
        "Compose an insightful article on {topic}."
        "Focus on the latest trends and how it's impacting the industry."
        "This article should be easy to understand, engaging, and positive."
    ),
    expected_output="A 4 paragraph article on {topic} advancements formatted as markdown.",
    agent=writer,
    async_execution=False,
    output_file="new-blog-post.md",  # Example of output customization
)

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential,  # Optional: Sequential task execution is default
)

result = crew.kickoff(inputs={"topic": "Berlin"})
print(result)
