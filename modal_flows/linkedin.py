import json
from typing import Any, Optional
from dotenv import load_dotenv
import os
from playwright_browser import Playwright
from instructor_extract import InstructorExtract
# Load environment variables from .env file at the start of the script


class LinkedIn(Playwright):
    def __init__(
        self,
        headless: bool = False,
    ):
        super().__init__(headless)
        self.instructor_extract = InstructorExtract()

    async def _login(self):
        cookies = await self.load_cookies()
        if cookies:
            await self.context.add_cookies(cookies)
        else:
            load_dotenv(".env")

            email = os.getenv("LINKEDIN_EMAIL")
            password = os.getenv("LINKEDIN_PASSWORD")
            if not email or not password:
                raise ValueError("Email and password are required for login")

            login_url = "https://www.linkedin.com/uas/login"
            await self.page.goto(login_url)
            await self.page.fill("#username", email)
            await self.page.fill("#password", password)
            await self.page.click("button[type='submit']")

            # Confirm authentication via CLI
            input("Press Enter to continue...")

            await self.save_cookies()

    async def _get_profile_stats(self):
        # Navigate to profile stats page and print its content
        await self.page.goto("https://www.linkedin.com/dashboard")

        stats_content = await self.get_page_content_as_markdown()

        linkedin_stats = self.instructor_extract.extract_linkedin_profile_stats(
            stats_content
        )

    async def save_cookies(self):
        # Save cookies to a file
        cookies = await self.browser.contexts[0].cookies()
        with open("cookies.json", "w") as f:
            json.dump(cookies, f)

    async def load_cookies(self) -> Optional[Any]:
        # Load cookies from a file if it exists
        try:
            with open("cookies.json", "r") as f:
                return json.load(f)
        except FileNotFoundError:
            return None


async def main():
    # Main function to run the LinkedIn automation
    linkedin = LinkedIn()
    self = linkedin


# if __name__ == "__main__":
#     asyncio.run(main())
