from openai import OpenAI
from pydantic import BaseModel, Field
from typing import List
from playwright.async_api import async_playwright
from playwright.async_api import async_playwright, Playwright
from unstructured.partition.html import partition_html

import instructor

from distutils.command.build_scripts import first_line_re

pw = async_playwright().start()

url = "https://aavegrants.org/"
elements = partition_html(url=url)


class Grant(BaseModel):
    "The object representing a web3 grant."

    title: str = Field(description="The name or title of the grant")
    description: str = Field(description="The description of the grant")


# enables `response_model` in create call
client = instructor.patch(
    OpenAI(
        # base_url="http://localhost:11434/v1",
        # api_key="ollama",  # required, but unused
    ),
    # mode=instructor.Mode.JSON,
)

resp = client.chat.completions.create(
    max_retries=3,
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "system",
            "content": "You are a research assitatant who helps to extract infromation from web 3 grants. Below you'll find content to extract info from:",
        },
        {"role": "user", "content": f"{'\n\n'.join([str(el) for el in elements])}"},
    ],
    response_model=Grant,  # type: ignore
)

resp
