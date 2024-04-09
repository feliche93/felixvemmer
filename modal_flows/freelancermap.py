import asyncio
from pathlib import Path
from playwright_browser import Playwright
from dotenv import load_dotenv
import os


class FreelancerMap(Playwright):
    def __init__(self, headless: bool = False):
        super().__init__(headless)
        self.base_url = "https://www.freelancermap.com"

    async def _login(self):
        load_dotenv(Path(__file__).resolve().parent / ".env")

        page, context, browser = await self.initialize_playwright()

        context.set_default_timeout(5000)

        password = os.getenv("FREELANCERMAP_PASSWORD")
        email = os.getenv("FREELANCERMAP_EMAIL")

        if not email or not password:
            raise ValueError("FREELANCERMAP_EMAIL or FREELANCERMAP_PASSWORD not set")

        await page.goto("https://www.freelancermap.com/login")
        # await page.wait_for_timeout(3000)

        await page.locator("button", has_text="Accept all cookies").click()
        await page.locator('xpath=//input[@id="login"]').fill(email)
        await page.locator('xpath=//input[@id="password"]').fill(password)
        await page.locator("button", has_text="Login").first.click()

    async def close_cookie_banner(self):
        try:
            await self.page.locator("button", has_text="Accept all cookies").click()
        except Exception as e:
            print(e)

        try:
            await self.page.locator(
                "button", has_text="Alle Cookies akzeptieren"
            ).click()
        except Exception as e:
            print(e)

    async def scrape_freelancermap_job_posts(
        self,
        url: str = "https://www.freelancermap.de/projektboerse.html?endcustomer=&created=1&excludeDachProjects=&partner=&poster=&posterName=&lastRun=&projectContractTypes%5B0%5D=contracting&currentPlatform=1&locale=de&query=next.js+or+seo+or+python&queryParts=&countries%5B%5D=1&radius=&city=&sort=1",
    ):
        await self.page.goto(url)
        await self.close_cookie_banner()

        job_link_elements = self.page.locator('xpath=//a[@class="project-title"]')

        job_link_elements_count = await job_link_elements.count()

        print(f"Found {job_link_elements_count} jobs on freelancermap.de")

        job_links: list[str] = []

        for index in range(job_link_elements_count):
            job_link = await job_link_elements.nth(index).get_attribute("href")

            if job_link is not None:
                job_links.append(f"{self.base_url}{job_link}")

        filtered_links = filter_new_job_post_urls(job_links)


async def main():
    self = FreelancerMap()

    await self._login()


# asyncio.run(main())
