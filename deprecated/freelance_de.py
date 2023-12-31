"""
This module contains functions for scraping the freelance.de website.
"""

import json
import os
import re
from datetime import datetime
from typing import List, Optional

from bs4 import BeautifulSoup, Tag
from common import image, secret, stub
from dateparser import parse
from db import (
    filter_new_job_post_urls,
    find_new_jobs,
    insert_platform_statistic,
    update_job_post_status,
    upsert_job_post,
)
from dotenv import load_dotenv
from fastapi import Request
from models import FreelanceJobPost, JobStatus, WorkType
from playwright.async_api import Page
from playwright.async_api import TimeoutError as PlaywrightTimeoutError
from scraper import get_full_url, initialize_playwright, random_wait
from telegram_bot import send_job_post_notification

import modal
from modal import web_endpoint  # type: ignore

load_dotenv()

freelance_de_email = os.environ.get("FREELANCE_DE_EMAIL")
freelance_de_password = os.environ.get("FREELANCE_DE_PASSWORD")

if not freelance_de_email or not freelance_de_password:
    raise ValueError(
        "Please set FREELANCE_DE_EMAIL and FREELANCE_DE_PASSWORD environment variables."
    )

BASE_URL = "https://www.freelance.de"


async def login_to_freelance_de(
    email: str, password: str, headless: bool = True
) -> Page:
    """
    Logs into the freelance.de website.

    This function initializes a Playwright page object, navigates to the login page of the freelance.de website,
    fills in the provided email and password, and submits the form to log in.

    Args:
        email: The email to use for logging in.
        password: The password to use for logging in.
        headless: Whether to run browser in headless mode. Default is True.

    Returns:
        page: The Playwright page object to perform actions on.
    """
    _, page = await initialize_playwright(headless=headless)

    await page.goto("https://www.freelance.de/login.php")

    # close cookie banner
    await page.locator("a", has_text="Auswahl bestätigen").click()

    # input id username
    await page.locator('xpath=//input[@id="username"]').fill(email)

    # input id password
    await page.locator('xpath=//input[@id="password"]').fill(password)

    # sign in
    await page.locator("input", has_text="Anmelden").click()

    return page


@stub.function(secret=secret, image=image, schedule=modal.Cron("55 21 * * *"))  # type: ignore
async def scrape_freelance_de_statistics() -> None:
    """
    Scrapes the freelance.de website for statistics.

    This function logs into the freelance.de website using the credentials stored in environment variables,
    navigates to the user's profile, retrieves the total number of profile views, and stores this statistic
    in the database. After the operation, it logs out of the website.

    Note: The function operates in non-headless mode, meaning a browser window will be visible during its operation.
    """
    page = await login_to_freelance_de(freelance_de_email, freelance_de_password)

    # adds a delay to make sure the page is loaded
    await page.wait_for_timeout(5000)

    # profile views
    profile_visits_total = await page.locator(
        'xpath=//i[@class="far fa-fw fa-eye"]/..'
    ).inner_text()

    profile_visits_total = int(
        profile_visits_total.replace(" Profilaufrufe gesamt", "")
    )

    full_url = get_full_url(page.url)

    today = datetime.today()

    insert_platform_statistic(
        full_url=full_url, profile_visits_total=profile_visits_total, date=today
    )

    await page.goto("https://www.freelance.de/logout.php")


async def extract_job_links(page: Page) -> List[str]:
    """
    Extracts job offer links from the freelance.de website.

    This function finds all h3 elements with the class 'action-icons-overlap' on the page,
    extracts the href attribute from the a elements inside them, and returns a list of these links.

    Args:
        page: The Playwright page object to perform actions on.

    Returns:
        links: A list of job offer links.
    """
    h3_elements = page.locator('xpath=//h3[@class="action-icons-overlap"]/a')

    h3_elements_count = await h3_elements.count()

    print(f"Found {h3_elements_count} job offers.")

    links: List[str] = []

    for index in range(h3_elements_count):
        link = await h3_elements.nth(index).get_attribute("href")
        links.append(f"{BASE_URL}{link}")

    return links


@stub.function(
    secret=secret, image=image, schedule=modal.Cron("0 8-18 * * *"), timeout=600
)  # type: ignore
async def scrape_job_offers(num_pages: int = 6):
    """
    Scrapes the freelance.de website for job offers.
    """

    page = await login_to_freelance_de(
        freelance_de_email,
        freelance_de_password,
        # headless=False
    )

    await random_wait(page)

    base_job_page = "https://www.freelance.de/search/project.php?__search_sort_by=1&__search_project_age=0&__search_profile_availability=0&__search_profile_update=0&__search_profile_apply_watchlist=0&__search_project_start_date=&__search_profile_ac=&__search_additional_filter=&__search=search&search_extended=0&__search_freetext=%28Python+OR+Next.js+OR+SQL+OR+JavaScript+OR+TypeScript%29+AND+NOT+%28%22Java%22+AND+NOT+JavaScript%29&__search_city=&seal=2feb68b0bf51ece41a556e0c14aef0d82d36f923&__search_city_location_id=&__search_city_country=&__search_city_country_extended=&__search_city_perimeter=0&search_id=a3c3b9ae5ba06b22f6aa3054c7213cd1&__search_country=&__search_hour_rate_modifier=&__search_experience_modifier=&__search_additional_filter=&__search_project_age_remote=0&__search_project_start_date_remote=&__search_sort_by_remote=1"  # noqa: E501, pylint: disable=line-too-long

    links: List[str] = []

    for i in range(num_pages):
        offset = i * 20
        job_page = f"{base_job_page}&_offset={offset}"

        await page.goto(job_page)

        await random_wait(page)

        page_links = await extract_job_links(page)
        links.extend(page_links)

    print(f"Found {len(links)} job offers.")

    filtered_links = filter_new_job_post_urls(links)

    async for result in scrape_job_detail_offer.map(
        filtered_links, return_exceptions=True
    ):  # type: ignore
        print(result)  # type: ignore

    new_jobs = find_new_jobs()

    print(f"Sending notification for {len(new_jobs)} new jobs.")

    for job_post in new_jobs:
        await send_job_post_notification(job_post)
        update_job_post_status(job_post, JobStatus.CONTACTED)

    print("Finished flow.")


@stub.function(
    secret=secret, image=image, concurrency_limit=3, allow_concurrent_inputs=3
)  # type: ignore
async def scrape_job_detail_offer(url: str):
    """
    Scrapes the details of a specific job offer from the freelance.de website.

    This function logs into the freelance.de website, navigates to the URL of a specific job offer,
    extracts various details about the job (such as the title, company name, job details, and description),
    creates a FreelanceJobPost object with these details, and upserts this job post into the database.

    Args:
        page: The Playwright page object to perform actions on.
        url: The URL of the job offer to scrape.

    Returns:
        None. The function prints the ID of the upserted job post.
    """
    page = await login_to_freelance_de(
        freelance_de_email,
        freelance_de_password,
        # headless=False
    )

    await random_wait(page)

    await page.goto(url)

    soup = BeautifulSoup(await page.content(), "html.parser")

    h1_tag = soup.find("h1")

    if not h1_tag:
        raise ValueError("Could not find h1 tag.")

    title = h1_tag.text.strip()

    # Extracting the company name
    company_name_element = soup.find("p", {"class": "company-name"})
    company_name = company_name_element.text.strip() if company_name_element else None

    # Extracting the job details
    details: List[Optional[Tag]] = soup.find("div", {"class": "overview"}).find_all(
        "li"
    )  # type: ignore

    # Initialize variables
    start_date = None
    end_date = None
    location = None
    hourly_rate = None
    job_id = None
    timestamp_posted = None

    # Loop through details
    if not details:
        raise ValueError("No details found.")

    for detail in details:
        i_tag = detail.find("i")  # type: ignore
        if i_tag is not None:
            detail_type = i_tag.get("data-original-title")  # type: ignore

            if not detail:
                raise ValueError("Could not extract detail type.")

            detail_text = detail.text.strip()

            if detail_type == "Geplanter Start":
                start_date_str = detail_text
                start_date = (
                    parse(start_date_str)
                    if start_date_str != "nicht angegeben"
                    else None
                )
                if start_date:
                    start_date = start_date.replace(day=1)
            elif detail_type == "Voraussichtliches Ende":
                end_date_str = detail_text
                end_date = (
                    parse(end_date_str) if end_date_str != "nicht angegeben" else None
                )
                if end_date:
                    end_date = end_date.replace(day=1)
            elif detail_type == "Projektort":
                location = detail_text
            elif detail_type == "Stundensatz":
                hourly_rate = None if detail_text == "auf Anfrage" else detail_text
            elif detail_type == "Letztes Update":
                timestamp_posted = datetime.strptime(detail_text, "%d.%m.%Y")

    if not timestamp_posted:
        raise ValueError("Could not extract timestamp posted.")

    job_id_match = re.search(r"Projekt-(\d+)-", url)
    job_id = job_id_match.group(1) if job_id_match else None

    if not job_id:
        raise ValueError("Could not extract job ID from URL.")

    # Extracting the description
    description_tag = soup.find("div", {"class": "panel-body highlight-text"})
    if not description_tag:
        raise ValueError("Could not find description tag.")

    description = description_tag.text.strip()

    print(f"Start date: {start_date}")

    job_post = FreelanceJobPost(
        title=title,
        description=description,
        timestamp_posted=timestamp_posted,
        start_date=start_date.date() if start_date else None,
        end_date=end_date.date() if end_date else None,
        location=location,
        hourly_rate=hourly_rate,
        job_id=job_id,
        company_name=company_name,
        platform_id=1,
        status=JobStatus.SCRAPED,
        url=url,
        work_type=WorkType.REMOTE,
    )

    upserted_job = upsert_job_post(job_post)

    print(f"Inserted job post with id {upserted_job.id}.")

    return upserted_job.id


@stub.function(secret=secret, image=image)  # type: ignore
@web_endpoint(label="apply-freelance-de-job", method="POST", wait_for_response=True)
async def apply_for_job_post(request: Request):
    """
    Applies for a job post on the freelance.de website.

    This function logs into the freelance.de website, navigates to the URL of a specific job post,
    clicks the "Bewerbung senden" button to apply for the job, and then retrieves the URL of the application.

    Args:
        job_post (FreelanceJobPost): The job post to apply for.

    Returns:
        str: The URL of the application.
    """

    data = await request.json()

    data = json.loads(data)

    print(f"Received data: {data}")

    job_post = FreelanceJobPost(**data)

    print("Logging into freelance.de...")
    page = await login_to_freelance_de(
        freelance_de_email,
        freelance_de_password,
        # headless=False
    )

    print(f"Navigating to job post at {job_post.url}...")
    await page.goto(job_post.url)

    # Check if 'Data Privacy Policy' checkbox exists and try to check it
    data_policy_checkbox = page.locator(
        'xpath=//input[@id="data_policy_accepted"]'
    ).nth(0)
    if await data_policy_checkbox.is_visible():
        print("Accepting Data Privacy Policy...")
        try:
            await data_policy_checkbox.click()
            print("Data Privacy Policy accepted.")
        except PlaywrightTimeoutError:
            print("Could not accept Data Privacy Policy.")
    else:
        print("Data Privacy Policy checkbox not found.")

    # Check if 'Profile up to date' checkbox exists and try to click it
    profile_up_to_date_checkbox = page.locator(
        'xpath=//input[@name="profile_up_to_date"]'
    ).nth(0)
    if await profile_up_to_date_checkbox.is_visible():
        print("Clicking 'Profile up to date' checkbox...")
        try:
            await profile_up_to_date_checkbox.click()
            print("'Profile up to date' checkbox clicked.")
        except PlaywrightTimeoutError:
            print("Could not click 'Profile up to date' checkbox.")
    else:
        print("'Profile up to date' checkbox not found.")

    print("Clicking 'Bewerbung senden' button...")
    await page.locator("button", has_text="Bewerbung senden").click()

    print("Waiting for 10 seconds...")
    await page.wait_for_timeout(10000)

    print("Retrieving URL of application...")
    application_url = await page.locator(
        "a", has_text="Sie haben sich bereits auf das Projekt beworben."
    ).get_attribute("href")

    application_url = f"{BASE_URL}{application_url}"

    print(f"Application URL: {application_url}")

    return application_url
