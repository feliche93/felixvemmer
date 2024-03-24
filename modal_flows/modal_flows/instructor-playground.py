import asyncio
from marvin import model
from openai import OpenAI, AsyncOpenAI
from pydantic import BaseModel, Field, ValidationInfo, create_model, model_validator
from typing import List, Literal, Optional
import enum
from pydantic import BaseModel
import instructor
from pydantic import BaseModel, Field
from datetime import date
from pydantic import BaseModel, field_validator
from typing_extensions import Annotated
from pydantic import AfterValidator
from openai import OpenAI
from instructor import llm_validator
from pydantic import BaseModel, ValidationError, BeforeValidator
from typing_extensions import Annotated
from tenacity import Retrying, stop_after_attempt, wait_fixed
from typing import Iterable
import logging

# logging.basicConfig(level=logging.DEBUG)

client = instructor.patch(
    AsyncOpenAI(
        base_url="http://localhost:11434/v1",
        api_key="ollama",  # required, but unused
    ),
    # OpenAI(
    #     base_url="http://localhost:11434/v1",
    #     api_key="ollama",  # required, but unused
    # ),
    mode=instructor.Mode.JSON,
)


class Tag(BaseModel):
    id: int
    name: str

    @model_validator(mode="after")
    def validate_ids(self, info: ValidationInfo):
        context = info.context
        if context:
            tags: List[Tag] = context.get("tags")
            assert self.id in {
                tag.id for tag in tags
            }, f"Tag ID {self.id} not found in context"
            assert self.name in {
                tag.name for tag in tags
            }, f"Tag name {self.name} not found in context"
        return self


class TagWithInstructions(Tag):
    instructions: str


class TagRequest(BaseModel):
    texts: List[str]
    tags: List[TagWithInstructions]


class TagResponse(BaseModel):
    texts: List[str]
    predictions: List[Tag]


# logging.basicConfig(level=logging.DEBUG)
tags = [
    TagWithInstructions(id=0, name="personal", instructions="Personal information"),
    TagWithInstructions(id=1, name="phone", instructions="Phone number"),
    TagWithInstructions(id=2, name="email", instructions="Email address"),
    TagWithInstructions(id=3, name="address", instructions="Address"),
    TagWithInstructions(id=4, name="Other", instructions="Other information"),
]

texts = [
    "What is your phone number?",
    # "What is your email address?",
    # "What is your address?",
    # "What is your privacy policy?",
]


async def tag_single_request(text: str, tags: List[Tag]) -> Tag:
    allowed_tags = [(tag.id, tag.name) for tag in tags]
    allowed_tags_str = ", ".join([f"`{tag}`" for tag in allowed_tags])

    return await client.chat.completions.create(
        model="mistral",
        messages=[
            {
                "role": "system",
                "content": "You are a world-class text tagging system.",
            },
            {"role": "user", "content": f"Describe the following text: `{text}`"},
            {
                "role": "user",
                "content": f"Here are the allowed tags: {allowed_tags_str}",
            },
        ],
        max_retries=3,
        response_model=Tag,  # type: ignore
        validation_context={"tags": tags},
    )


async def tag_request(request: TagRequest) -> TagResponse:
    predictions = await asyncio.gather(
        *[tag_single_request(text, request.tags) for text in request.texts]
    )
    return TagResponse(
        texts=request.texts,
        predictions=predictions,
    )


# The request will contain the texts and the tags.
request = TagRequest(texts=texts, tags=tags)

# The response will contain the texts, the predicted tags, and the confidence.
response = await tag_request(request)
print(response.model_dump_json(indent=2))
