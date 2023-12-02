import os
from dotenv import load_dotenv
from playwright.async_api import async_playwright
import asyncio


class LinkedIn:
    def __init__(self, email=None, password=None, headless=False):
        load_dotenv()
        self.email = email if email else os.getenv(key="LINKEDIN_EMAIL")
        self.password = password if password else os.getenv(key="LINKEDIN_PASSWORD")
        self.headless = headless

    async def _intialize_playwright(self):
        pw = await async_playwright().start()  # pylint: disable=invalid-name
        browser = await pw.chromium.launch(headless=self.headless)

        context = await browser.new_context(
            locale="de-DE",
            # viewport={"width": 1920, "height": 1080}
        )

        page = await context.new_page()

        return browser, page

    async def _login(self):
        if not self.email:
            raise ValueError("Email is required")

        if not self.password:
            raise ValueError("Password is required")

        login_url = "https://www.linkedin.com/uas/login"

        browser, page = await self._intialize_playwright()

        await page.goto(login_url)

        await page.fill("#username", self.email)
        await page.fill("#password", self.password)

        await page.click("button[type='submit']")

        # make user confirm via cli that auth passed
        input("Press Enter to continue...")

        cookies = await browser.contexts[0].cookies()

        li_at = None

        for cookie in cookies:
            if cookie.get("name") == "li_at":
                li_at = cookie.get("value")
                break

        if not li_at:
            raise ValueError("Could not find li_at cookie")

        self.li_at = li_at

        print("Logging in...")


async def main():
    linkedin = LinkedIn()
    await linkedin._login()


if __name__ == "__main__":
    asyncio.run(main())
