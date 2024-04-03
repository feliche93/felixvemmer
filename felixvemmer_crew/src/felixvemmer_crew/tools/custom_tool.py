from textwrap import dedent
from typing import List, Optional, Type
import httpx
from dotenv import load_dotenv
import os
from pydantic.v1 import BaseModel, Field
from crewai_tools.tools.base_tool import BaseTool
from bs4 import BeautifulSoup
from html2text import HTML2Text
from playwright.sync_api import sync_playwright

load_dotenv()


class ScrapingRobotArgs(BaseModel):
    query: str = Field(..., title="The keyword to search for")
    num: Optional[int] = Field(10, title="The number of search results to return")


class ScrapingRobotResult(BaseModel):
    """A search result from google for a given keyword."""

    title: str = Field(..., title="The title of the search result")
    url: str = Field(..., title="The URL of the search result")


class ScrapingRobotResults(BaseModel):
    """A list of the top ranking search results from google for a given keyword."""

    results: List[ScrapingRobotResult] = Field(..., title="The search results")


class ScrapingRobotTool(BaseTool):
    name: str = "Scraping Robot"
    description: str = dedent(
        """A tool that can be used to extract the top ranking search results from google for a given keyword. It retruns a list of search results with their title and url whre the first result is the top ranking result."""
    )
    args_schema: Type[BaseModel] = ScrapingRobotArgs

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def _run(self, query: str, num: Optional[int] = 10) -> ScrapingRobotResults:
        url = "https://api.scrapingrobot.com/"

        headers = {
            "accept": "application/json",
            "content-type": "application/json",
        }

        token = os.getenv("SCRAPING_ROBOT_TOKEN", None)

        if not token:
            raise ValueError("SCRAPING_ROBOT_TOKEN environment variable is not set")

        payload = {
            "url": "https://www.google.com/search",
            "module": "GoogleScraper",
        }

        if num:
            payload["num"] = num  # type: ignore

        params = {
            "token": token,
            "query": query,
        }

        response = httpx.post(
            url, headers=headers, params=params, json=payload, timeout=30
        )

        if response.status_code != 200:
            raise Exception(f"Failed to scrape data: {response.text}")

        data = response.json().get("result", {}).get("organicResults", {})

        data = [
            {"title": result.get("title"), "url": result.get("url")} for result in data
        ]

        results = [ScrapingRobotResult(**result) for result in data]

        return ScrapingRobotResults(results=results)


class PlaywrightScrapingToolArgs(BaseModel):
    url: str = Field(..., title="The URL of the website to scrape")


class WebsiteContentOutputSchema(BaseModel):
    """
    A Pydantic model representing the output schema for website content.
    """

    bodyText: str = Field(description="The body text of the website.")
    pageTitle: str = Field(description="The title of the webpage.")
    metaTitle: Optional[str] = Field(None, description="The meta title of the webpage.")
    metaDescription: Optional[str] = Field(
        None, description="The meta description of the webpage."
    )
    metaImageUrl: Optional[str] = Field(
        None, description="The meta image URL of the webpage."
    )
    faviconImageUrl: Optional[str] = Field(
        None, description="The favicon image URL of the webpage."
    )
    url: str = Field(description="The URL of the webpage.")


class PlaywrightScrapingTool(BaseTool):
    name: str = "Playwright Scraping Tool"
    description: str = "A tool that can be used to scrape website text, meta title, meta description, meta image, and favicon image url from a website using Playwright."
    args_schema: Type[BaseModel] = PlaywrightScrapingToolArgs

    def _run(self, url: str) -> WebsiteContentOutputSchema:
        return self.get_website_content(PlaywrightScrapingToolArgs(url=url))

    def convert_content_to_soup(self, content: str) -> BeautifulSoup:
        """Convert html content to soup

        Args:
            content (str): html content

        Returns:
            BeautifulSoup: soup
        """
        soup = BeautifulSoup(content, "html.parser")
        return soup

    def convert_content_to_markdown(self, content: str) -> str:
        """
        Convert HTML content to markdown format.

        Args:
            content (str): The HTML content to be converted.

        Returns:
            str: The converted markdown content.
        """

        text_maker = HTML2Text()
        text_maker.ignore_links = False
        text_maker.ignore_images = True
        markdown = text_maker.handle(content)
        return markdown

    def get_website_content(
        self,
        request: PlaywrightScrapingToolArgs,
    ) -> WebsiteContentOutputSchema:
        """Use this to get the text content of a website."""
        url = request.url
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()

            print(f"Goto {url}")
            page.goto(url=url, timeout=5000)
            # get page content
            content = page.content()

            browser.close()

            # parse with BeautifulSoup
            soup = self.convert_content_to_soup(content)

            # body_text
            body_text = self.convert_content_to_markdown(content=content)

            # page_title
            title_tag = soup.find("title")
            page_title = title_tag.text if title_tag else None

            # meta_title
            meta_title = soup.find("meta", property="og:title")
            meta_title = meta_title["content"] if meta_title else None  # type: ignore

            # meta_description
            meta_description = soup.find("meta", property="og:description")
            meta_description = meta_description["content"] if meta_description else None  # type: ignore

            # meta_image_url
            meta_image_url = soup.find("meta", property="og:image")
            meta_image_url = meta_image_url["content"] if meta_image_url else None  # type: ignore

            # favicon_image_url
            favicon_image_url = soup.find("link", rel="icon")
            favicon_image_url = (
                url + favicon_image_url["href"] if favicon_image_url else None  # type: ignore
            )

        print(f"Crawled {url}")

        return WebsiteContentOutputSchema(
            bodyText=body_text,
            pageTitle=page_title,  # type: ignore
            metaTitle=meta_title,  # type: ignore
            metaDescription=meta_description,  # type: ignore
            metaImageUrl=meta_image_url,  # type: ignore
            faviconImageUrl=favicon_image_url,  # type: ignore
            url=url,
        )
