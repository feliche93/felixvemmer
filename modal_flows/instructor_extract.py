import instructor
from openai import OpenAI
from pydantic import BaseModel, Field


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
