from typing import List
from felixvemmer_crew.tools.custom_tool import WebsiteContentOutputSchema
from pydantic import BaseModel, Field


class SerpOutput(BaseModel):
    title: str = Field(..., description="The title of the task")
    url: str = Field(..., description="The URL of the website")


class SFindTopRankingSerpsForKeywordTaskOutput(BaseModel):
    """Find Top Ranking Serps for Keyword Task Output"""

    top_ranking_serps: List[SerpOutput]


class ExtractWebsiteContentTask(BaseModel):
    """Extract Website Content Task Output"""

    extracted_websites: List[WebsiteContentOutputSchema]
