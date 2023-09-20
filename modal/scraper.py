"""
This module contains functions for web scraping,
including converting HTML content to BeautifulSoup objects and markdown,
and getting website content using playwright.
"""

from typing import Tuple
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from common import stub
from html2text import HTML2Text
from playwright.async_api import Browser, Page, async_playwright
from playwright_stealth import stealth_async
import random


async def random_wait(page):
    """
    Waits for a random timeout between 2 and 5 seconds.

    Args:
        page: The Playwright page object to perform actions on.
    """
    timeout = random.randint(2, 5) * 1000  # Convert to milliseconds
    print(f"Waiting for {timeout/1000} seconds")  # Print the waiting time in seconds
    await page.wait_for_timeout(timeout)
    print("Wait completed")  # Print a message after waiting is completed


async def initialize_playwright(headless: bool = True) -> Tuple[Browser, Page]:
    """
    Initialize a Playwright browser and page with the necessary settings.

    Args:
        headless (bool, optional): Whether to start the browser in headless mode. Defaults to True.

    Returns:
        Tuple[Browser, Page]: A tuple containing the initialized Browser and Page objects.
    """

    pw = await async_playwright().start()  # pylint: disable=invalid-name

    browser: Browser = await pw.chromium.launch(headless=headless)

    context = await browser.new_context(
        locale="de-DE",
        # viewport={"width": 1920, "height": 1080}
    )

    context.set_default_timeout(8000)

    page: Page = await context.new_page()
    await stealth_async(page)

    return browser, page


def convert_content_to_soup(content: str) -> BeautifulSoup:
    """Convert html content to soup

    Args:
        content (str): html content

    Returns:
        BeautifulSoup: soup
    """
    soup = BeautifulSoup(content, "html.parser")
    return soup


def convert_content_to_markdown(content: str) -> str:
    """Convert soup to markdown

    Args:
        soup (BeautifulSoup): soup

    Returns:
        str: markdown
    """
    text_maker = HTML2Text()
    markdown = text_maker.handle(content)
    return markdown


def get_full_url(page_url: str) -> str:
    """
    Constructs the full URL from a given page URL.

    Args:
        page_url (str): The URL of the page.

    Returns:
        str: The full URL.
    """
    domain = urlparse(page_url).netloc
    scheme = urlparse(page_url).scheme
    full_url = f"{scheme}://{domain}"

    return full_url


@stub.local_entrypoint()
async def main():
    """
    Main function to execute the scraping of freelance.de statistics.

    This function calls the scrape_freelance_de_statistics function and prints the result.
    """
    # await scrape_freelancermap.local()
    # await scrape_freelance_de_statistics.local()
