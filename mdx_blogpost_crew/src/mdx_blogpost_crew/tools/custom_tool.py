from typing import Optional
from crewai_tools import BaseTool
import httpx
import json
from dotenv import load_dotenv
import os

load_dotenv()


class ScrapingRobotTool(BaseTool):
    name: str = "Scraping Robot"
    description: str = "A tool that can be used to extract search results from the web for a given keyword."

    def _run(self, query: str, num: Optional[int] = 10) -> str:
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

        return json.dumps(data, indent=2)


scraping_robot_tool = ScrapingRobotTool()

scraping_robot_tool.run("link building tool")
