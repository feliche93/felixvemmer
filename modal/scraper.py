"""
This module contains functions for web scraping,
including converting HTML content to BeautifulSoup objects and markdown,
and getting website content using playwright.
"""

from bs4 import BeautifulSoup
from html2text import HTML2Text
from playwright.async_api import async_playwright, Browser, Page
from playwright_stealth import stealth_async
import os
from typing import Tuple
from dotenv import load_dotenv

load_dotenv()

freelance_de_email = os.environ.get("FREELANCE_DE_EMAIL")
freelance_de_password = os.environ.get("FREELANCE_DE_PASSWORD")


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

    context.set_default_timeout(4000)

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


async def scrape_analytics():
    # headless = True
    headless = False
    browser, page = await initialize_playwright(headless=headless)

    await page.goto("https://www.freelance.de/login.php")

    # close cookie banner
    await page.locator("a", has_text="Auswahl bestätigen").click()

    # input id username
    await page.locator('xpath=//input[@id="username"]').fill(freelance_de_email)

    # input id password
    await page.locator('xpath=//input[@id="password"]').fill(freelance_de_password)

    # sign in
    await page.locator("input", has_text="Anmelden").click()

    # profile views
    profile_views_total = await page.locator('xpath=//i[@class="far fa-fw fa-eye"]/..').inner_text()

    profile_views_total = int(profile_views_total.replace(" Profilaufrufe gesamt", ""))

    await page.goto("https://www.freelance.de/logout.php")
