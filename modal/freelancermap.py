"""
This module contains the implementation for scraping statistics from freelancermap.de.
It includes the function scrape_freelancermap_statistics which logs into the website,
retrieves profile view statistics, and stores these in a database.
"""

import json
import os
from datetime import datetime, timedelta
from typing import Any, Dict, List, Tuple

from ai import create_application_message
from bs4 import BeautifulSoup
from common import image, secret, stub
from dateparser import parse
from db import (
    filter_new_job_post_urls,
    insert_platform_statistic,
    update_job_post_status,
    upsert_job_post,
)
from dotenv import load_dotenv
from fastapi import Request
from models import FreelanceJobPost, JobStatus, WorkType
from playwright.async_api import Page, Route
from scraper import get_full_url, initialize_playwright
from telegram_bot import send_job_post_notification

import modal
from modal import web_endpoint  # type: ignore

load_dotenv()


BASE_URL = "https://www.freelancermap.de"

freelancermap_email = os.environ.get("FREELANCERMAP_EMAIL")
freelancermap_password = os.environ.get("FREELANCERMAP_PASSWORD")

if freelancermap_email is None or freelancermap_password is None:
    raise ValueError("Environment variables FREELANCERMAP_EMAIL and FREELANCERMAP_PASSWORD are not set")


async def login_to_freelancermap(page: Page):
    """
    Logs into the freelancermap.de website.

    This function navigates to the login page, accepts cookies,
    fills in the login form with the provided email and password,
    and submits the form.

    Args:
        page: The Playwright page object to interact with.
        email: The email to use for logging in.
        password: The password to use for logging in.

    Returns:
        None
    """
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


@stub.function(secret=secret, image=image, schedule=modal.Cron("0 8-18 * * *"), timeout=600)  # type: ignore
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


@stub.function(secret=secret, image=image, schedule=modal.Cron("0 8-18 * * *"))  # type: ignore
async def scrape_freelancermap_job_posts():
    """
    Scrapes the freelancermap.de website for job posts.
    """

    url = "https://www.freelancermap.de/projektboerse.html?endcustomer=&created=1&excludeDachProjects=&partner=&poster=&posterName=&lastRun=&projectContractTypes%5B0%5D=contracting&currentPlatform=1&locale=de&query=next.js+or+seo+or+python&queryParts=&countries%5B%5D=1&radius=&city=&sort=1"  # pylint: disable=line-too-long

    headless = True
    # headless = False
    _, page = await initialize_playwright(headless=headless)

    await login_to_freelancermap(page=page)

    await page.goto(url)

    job_link_elements = page.locator('xpath=//a[@class="project-title"]')

    job_link_elements_count = await job_link_elements.count()

    print(f"Found {job_link_elements_count} jobs on freelancermap.de")

    job_links: List[str] = []

    for index in range(job_link_elements_count):
        job_link = await job_link_elements.nth(index).get_attribute("href")

        if job_link is not None:
            job_links.append(f"{BASE_URL}{job_link}")

    filtered_links = filter_new_job_post_urls(job_links)

    # going through each job link
    for link in filtered_links:
        await page.goto(link)

        html = await page.content()
        soup = BeautifulSoup(html, "html.parser")

        url = page.url

        job_post = extract_job_details(soup, url)

        upserted_job = upsert_job_post(job_post)

        await send_job_post_notification(upserted_job)
        update_job_post_status(job_post, JobStatus.CONTACTED)

        print(f"Inserted job post with id {upserted_job.id} into the database")


def extract_job_details(soup: BeautifulSoup, url: str) -> FreelanceJobPost:
    """
    Extracts job details from the provided BeautifulSoup object.

    Args:
        soup: The BeautifulSoup object containing the job details.

    Returns:
        A FreelanceJobPost object containing the extracted job details.
    """
    # Extract the required fields
    start_date_elem = soup.find("dt", text="Start")
    start_date_elem = start_date_elem.find_next_sibling("dd") if start_date_elem else None
    start_date = start_date_elem.get_text(strip=True) if start_date_elem else None

    if start_date == "ab sofort":
        start_date = datetime.now()
    elif start_date == "keine Angabe":
        start_date = datetime.now()
    else:
        start_date = parse(start_date) if start_date else None

    if not start_date:
        raise ValueError("Start date is not set")

    workload_elem = soup.find("dt", text="Auslastung")
    workload_elem = workload_elem.find_next_sibling("dd") if workload_elem else None
    workload = workload_elem.get_text(strip=True) if workload_elem else None

    duration_elem = soup.find("dt", text="Dauer")
    duration_elem = duration_elem.find_next_sibling("dd") if duration_elem else None
    duration = duration_elem.get_text(strip=True) if duration_elem else None

    duration = duration.replace("\n", "").replace("(Verlängerung möglich)", "").strip() if duration else None

    parsed_duration = parse(duration) if duration else None
    parsed_duration = parsed_duration.replace(tzinfo=None) if parsed_duration else None

    now = datetime.now()
    duration_in_days = now - parsed_duration if parsed_duration else None

    end_date = start_date + timedelta(days=duration_in_days.days) if start_date and duration_in_days else None

    if end_date is None:
        end_date = start_date

    company_name_elem = soup.find("dt", text="Von")
    company_name_elem = company_name_elem.find_next_sibling("dd") if company_name_elem else None
    company_name = company_name_elem.get_text(strip=True) if company_name_elem else None

    timestamp_posted_elem = soup.find("dt", text="Eingestellt")
    timestamp_posted_elem = timestamp_posted_elem.find_next_sibling("dd") if timestamp_posted_elem else None
    timestamp_posted = timestamp_posted_elem.get_text(strip=True) if timestamp_posted_elem else None
    timestamp_posted = parse(timestamp_posted) if timestamp_posted else None

    if not timestamp_posted:
        raise ValueError("Timestamp posted is not set")

    job_id_elem = soup.find("dt", text="Projekt-ID:")
    job_id_elem = job_id_elem.find_next_sibling("dd") if job_id_elem else None
    job_id = job_id_elem.get_text(strip=True) if job_id_elem else None

    if not job_id:
        raise ValueError("Job id is not set")

    job_work_type_elem = soup.find("i", {"class": "fas fa-globe"})
    job_work_type_elem = job_work_type_elem.parent if job_work_type_elem else None
    job_work_type = job_work_type_elem.get_text(strip=True) if job_work_type_elem else None

    # Convert the work type to the corresponding enum value
    if job_work_type == "Remote":
        work_type = WorkType.REMOTE
    elif job_work_type == "Onsite":
        work_type = WorkType.LOCAL
    else:
        work_type = WorkType.LOCAL

    title = soup.find("h1")
    title = title.get_text(strip=True) if title else None

    if not title:
        raise ValueError("Title is not set")

    description = soup.find_all("div", {"class": "content"})
    description = description[1] if description else None
    description = description.get_text(strip=True) if description else None
    description = description.replace("Beschreibung", "", 1).strip() if description else None

    if not description:
        raise ValueError("Description is not set")

    contact_person_elem = soup.find("dt", text="Ansprechpartner:")
    contact_person_elem = contact_person_elem.find_next_sibling("dd") if contact_person_elem else None
    contact_person = contact_person_elem.get_text(strip=True) if contact_person_elem else None

    contract_type_elem = soup.find("dt", text="Vertragsart")
    contract_type_elem = contract_type_elem.find_next_sibling("dd") if contract_type_elem else None
    contract_type = contract_type_elem.get_text(strip=True) if contract_type_elem else None

    industry = soup.find("dt", text="Branche")
    industry = industry.find_next_sibling("dd") if industry else None
    industry = industry.get_text(strip=True) if industry else None

    location = soup.find("span", {"class": "address"})
    location = location.get_text(strip=True) if location else None

    # Create a FreelanceJobPost object with the extracted fields
    job_post = FreelanceJobPost(
        url=url,
        title=title,
        description=description,
        company_name=company_name,
        contact_person=contact_person,
        industry=industry,
        location=location,
        work_type=work_type,
        start_date=start_date,
        end_date=end_date,
        timestamp_posted=timestamp_posted,
        job_id=job_id,
        contract_type=contract_type,
        workload=workload,
        platform_id=3,
        status=JobStatus.SCRAPED,
    )

    return job_post


@stub.function(secret=secret, image=image)  # type: ignore
@web_endpoint(label="apply-freelancermap-job", method="POST", wait_for_response=True)
async def apply_freelancermap_job(request: Request) -> str:
    """
    Applies to a job on freelancermap.de.

    This function receives a job post as a JSON object in the request body, logs into the freelancermap.de website,
    navigates to the job post's URL, fills in the application form with a generated message, and submits the form.

    Args:
        request: The FastAPI request object containing the job post data in the body.

    Raises:
        ValueError: If the apply button or the success message is not visible on the page.

    Note: The function operates in headless mode, meaning no browser window will be visible during its operation.
    """
    data = await request.json()

    data = json.loads(data)

    print(f"Received data: {data}")

    job_post = FreelanceJobPost(**data)

    headless = True
    # headless = False
    _, page = await initialize_playwright(headless=headless)

    await login_to_freelancermap(page=page)

    await page.goto(job_post.url)

    apply_button_element = page.locator('xpath=//a[@class="fm-btn fm-btn-action w-100"]')
    apply_button_element_visible = await apply_button_element.is_visible()

    if not apply_button_element_visible:
        raise ValueError("Apply button is not visible")

    await apply_button_element.click()

    message = create_application_message(job_post)

    application_text_area_element = page.locator('xpath=//textarea[@id="apply_project_form_content"]')

    await application_text_area_element.fill(message)

    checkbox_1_element = page.locator('xpath=//input[@id="attachment-index-1"]')
    checkbox_1_element_visible = await checkbox_1_element.is_visible()

    if checkbox_1_element_visible:
        await checkbox_1_element.click()

    checkbox_2_element = page.locator('xpath=//input[@name="vcard[]"]')
    checkbox_2_element_visible = await checkbox_2_element.is_visible()

    if checkbox_2_element_visible:
        await checkbox_2_element.click()

    submit_button_element = page.locator("input", has_text="Bewerbung abschicken")

    await submit_button_element.click()

    success_message_element = page.locator("h4", has_text="Ihre Nachricht wurde erfolgreich gesendet.")

    success_message_element_visible = await success_message_element.is_visible()

    if not success_message_element_visible:
        raise ValueError("Success message is not visible")

    print("Successfully applied to job post")

    return message


async def main():
    """
    Main function for scraping freelancermap.de.
    """
    # await scrape_freelancermap_statistics()

    await scrape_freelancermap_job_posts.local()  # type: ignore


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
