"""
This module contains the implementation for scraping statistics from freelancermap.de.
It includes the function scrape_freelancermap_statistics which logs into the website,
retrieves profile view statistics, and stores these in a database.
"""

import os
from datetime import datetime
from typing import Any, Dict, List, Tuple

from common import image, secret, stub
from db import insert_platform_statistic
from dotenv import load_dotenv
from playwright.async_api import Request, Route
from scraper import get_full_url, initialize_playwright

import modal

load_dotenv()


freelancermap_email = os.environ.get("FREELANCERMAP_EMAIL")
freelancermap_password = os.environ.get("FREELANCERMAP_PASSWORD")

if freelancermap_email is None or freelancermap_password is None:
    raise ValueError("Environment variables FREELANCERMAP_EMAIL and FREELANCERMAP_PASSWORD are not set")


@stub.function(secret=secret, image=image, schedule=modal.Cron("0 1 * * *"))  # type: ignore
async def scrape_freelancermap_statistics():
    """
    Scrapes the freelancermap.de website for statistics.

    This function logs into the freelancermap.de website using the credentials stored in environment variables,
    navigates to the user's profile, retrieves the total number of profile views and the number of profile views
    for the latest date, and stores these statistics in the database. After the operation, it logs out of the website.

    Note: The function operates in non-headless mode, meaning a browser window will be visible during its operation.
    """
    profile_data: Dict[str, Any] = {}

    async def intercept_route(route: Route, request: Request):
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

    last_week_data: List[Tuple[str, int]] = profile_data["data"].get("lastWeek")

    # Sort the data by date in descending order
    last_week_data.sort(key=lambda x: x[0], reverse=True)

    # Get the latest date and the corresponding profile visits
    latest_date, profile_visits = last_week_data[0]

    # Convert the date string to a datetime.date object
    latest_date = datetime.strptime(latest_date, "%Y-%m-%d")

    full_url = get_full_url(page.url)

    # Call insert_platform_statistic with the latest date and the corresponding profile visits
    insert_platform_statistic(full_url, profile_visits=profile_visits, date=latest_date)

    await page.goto("https://www.freelancermap.de/logout")
