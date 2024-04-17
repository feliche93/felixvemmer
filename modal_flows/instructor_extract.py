from textwrap import dedent
from typing import Literal
import instructor
from openai import OpenAI
from pydantic import BaseModel, Field


client = instructor.from_openai(OpenAI())


class Sentiment(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"] = Field(
        ..., description="Sentiment of the text"
    )


client.chat.completions.create(
    model="gpt-4-turbo-preview",
    response_model=Sentiment,
    messages=[
        {"role": "system", "content": "What is the sentiment of the given text?"},
        {"role": "user", "content": "The instructor llm library is awesome!"},
    ],
)


from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from langchain_openai import OpenAI

model = OpenAI(temperature=0.0)


class Sentiment(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"] = Field(
        ..., description="Sentiment of the text"
    )


parser = PydanticOutputParser(pydantic_object=Sentiment)

prompt = PromptTemplate(
    template="What is the sentiment of the given text?\n{format_instructions}\n{query}\n",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

# And a query intended to prompt a language model to populate the data structure.
chain = prompt | model | parser
output = chain.invoke({"query": "The instructor llm library is awesome!"})
sentiment = parser.parse(output)

print(sentiment)


class Metadata(BaseModel):
    meta_title: str = Field(
        ...,
        min_length=50,
        max_length=60,
        description="Meta Title between 50-60 characters. Should be concise, descriptive and include primary keyword.",
    )
    meta_description: str = Field(
        ...,
        min_length=150,
        max_length=160,
        description="Meta Description between 150-160 characters. Should be compelling, summarize the page content and include relevant keywords naturally.",
    )


meta_descrioption = client.chat.completions.create(
    model="gpt-4",
    max_retries=3,
    response_model=Metadata,
    messages=[
        {"role": "system", "content": content},
    ],
)


class LinkedInProfileStats(BaseModel):
    post_impressions: int = Field(..., description="Number of post impressions")
    followers: int = Field(..., description="Number of followers")
    profile_viewers: int = Field(..., description="Number of profile viewers")
    search_appearances: int = Field(..., description="Number of search appearances")


class InstructorExtract:
    def __init__(self) -> None:
        self.client = instructor.from_openai(
            OpenAI(
                base_url="http://localhost:11434/v1",
                api_key="ollama",  # required, but unused
            ),
            mode=instructor.Mode.JSON,
        )

    def extract_linkedin_profile_stats(self, markdown: str) -> LinkedInProfileStats:
        linkedin_stats = self.client.chat.completions.create(
            model="gpt-4-turbo-preview",
            response_model=LinkedInProfileStats,
            messages=[
                {
                    "role": "system",
                    "content": "Extract the following stats from the given markdown",
                },
                {"role": "user", "content": markdown},
            ],
        )

        return linkedin_stats
