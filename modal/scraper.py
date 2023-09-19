"""
This module contains functions for web scraping,
including converting HTML content to BeautifulSoup objects and markdown,
and getting website content using playwright.
"""

import os
from datetime import date, datetime
from typing import Tuple
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from common import image, secret, stub
from db import insert_platform_statistic
from dotenv import load_dotenv
from html2text import HTML2Text
from playwright.async_api import Browser, Page, async_playwright
from playwright_stealth import stealth_async

import modal

load_dotenv()

freelance_de_email = os.environ.get("FREELANCE_DE_EMAIL")
freelance_de_password = os.environ.get("FREELANCE_DE_PASSWORD")
freelancermap_email = os.environ.get("FREELANCERMAP_EMAIL")
freelancermap_password = os.environ.get("FREELANCERMAP_PASSWORD")


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


@stub.function(secret=secret, image=image, schedule=modal.Cron("55 21 * * *"))
async def scrape_freelance_de_statistics():
    """
    Scrapes the freelance.de website for statistics.

    This function logs into the freelance.de website using the credentials stored in environment variables,
    navigates to the user's profile, retrieves the total number of profile views, and stores this statistic
    in the database. After the operation, it logs out of the website.

    Note: The function operates in non-headless mode, meaning a browser window will be visible during its operation.
    """
    headless = True
    # headless = False
    _, page = await initialize_playwright(headless=headless)

    await page.goto("https://www.freelance.de/login.php")

    await page.wait_for_timeout(3000)

    # close cookie banner
    await page.locator("a", has_text="Auswahl bestätigen").click()

    # input id username
    await page.locator('xpath=//input[@id="username"]').fill(freelance_de_email)

    # input id password
    await page.locator('xpath=//input[@id="password"]').fill(freelance_de_password)

    # sign in
    await page.locator("input", has_text="Anmelden").click()

    # profile views
    profile_visits_total = await page.locator('xpath=//i[@class="far fa-fw fa-eye"]/..').inner_text()

    profile_visits_total = int(profile_visits_total.replace(" Profilaufrufe gesamt", ""))

    full_url = get_full_url(page.url)

    today = date.today()

    insert_platform_statistic(full_url=full_url, profile_visits_total=profile_visits_total, date=today)

    await page.goto("https://www.freelance.de/logout.php")


@stub.function(secret=secret, image=image, schedule=modal.Cron("0 1 * * *"))
async def scrape_freelancermap():
    """
    Scrapes the freelancermap.de website for statistics.

    This function logs into the freelancermap.de website using the credentials stored in environment variables,
    navigates to the user's profile, retrieves the total number of profile views and the number of profile views
    for the latest date, and stores these statistics in the database. After the operation, it logs out of the website.

    Note: The function operates in non-headless mode, meaning a browser window will be visible during its operation.
    """
    profile_data = {}

    async def intercept_route(route, request):
        """
        Intercept the route and capture the response data.

        Args:
            route: The route to be intercepted.
            request: The request to be intercepted.
        """
        if "profiles" in request.url:
            try:
                response = await route.fetch()
                if response.ok:
                    profile_data["data"] = await response.json()
            except Exception as e:  # pylint: disable=broad-except,invalid-name
                print(f"Failed to get response: {e}")  # pylint: disable=invalid-name
        else:
            await route.continue_()

    headless = True
    # headless = False
    _, page = await initialize_playwright(headless=headless)

    await page.route("**/*", intercept_route)

    await page.goto("https://www.freelancermap.de/login")

    await page.wait_for_timeout(3000)

    # accept cookies
    await page.locator("button", has_text="Alle Cookies akzeptieren").click()

    await page.wait_for_timeout(3000)

    # input id username
    await page.locator('xpath=//input[@id="login"]').fill(freelancermap_email)

    # input id password
    await page.locator('xpath=//input[@id="password"]').fill(freelancermap_password)

    # sign in
    await page.locator("button", has_text="Anmelden").click()

    await page.wait_for_timeout(3000)

    await page.goto("https://www.freelancermap.de/profilaufrufe.html")

    await page.wait_for_timeout(2000)

    # This will print the data from the first profile-related fetch call
    # print(profile_data["data"])

    last_week_data = profile_data["data"].get("lastWeek")

    # Sort the data by date in descending order
    last_week_data.sort(key=lambda x: x[0], reverse=True)

    # Get the latest date and the corresponding profile visits
    latest_date, profile_visits = last_week_data[0]

    # Convert the date string to a datetime.date object
    latest_date = datetime.strptime(latest_date, "%Y-%m-%d").date()

    full_url = get_full_url(page.url)

    # Call insert_platform_statistic with the latest date and the corresponding profile visits
    insert_platform_statistic(full_url, profile_visits=profile_visits, date=latest_date)

    await page.goto("https://www.freelancermap.de/logout")


@stub.local_entrypoint()
async def main():
    """
    Main function to execute the scraping of freelance.de statistics.

    This function calls the scrape_freelance_de_statistics function and prints the result.
    """
    # await scrape_freelancermap.local()
    await scrape_freelance_de_statistics.local()
