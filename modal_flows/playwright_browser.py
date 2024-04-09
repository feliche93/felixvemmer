import asyncio
from bs4 import BeautifulSoup
from html2text import HTML2Text
from playwright.async_api import async_playwright, Browser, Page, BrowserContext


class Playwright:
    def __init__(self, headless: bool = False):
        self.headless = headless
        self.browser: Browser
        self.context: BrowserContext
        self.page: Page
        asyncio.create_task(self.initialize_playwright())

    async def initialize_playwright(self) -> None:
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(headless=self.headless)
        self.context = await self.browser.new_context(locale="de-DE")
        self.page = await self.context.new_page()

    def convert_content_to_soup(self, content: str) -> BeautifulSoup:
        """Convert html content to soup

        Args:
            content (str): html content

        Returns:
            BeautifulSoup: soup
        """
        soup = BeautifulSoup(content, "html.parser")
        return soup

    def convert_content_to_markdown(self, content: str) -> str:
        """
        Convert HTML content to markdown format, including proper conversion of h1, h2, etc., headings.

        Args:
            content (str): The HTML content to be converted.

        Returns:
            str: The converted markdown content with headings.
        """

        text_maker = HTML2Text()
        text_maker.ignore_links = False
        text_maker.ignore_images = True
        text_maker.body_width = 0  # Prevents line wrapping to maintain formatting
        text_maker.single_line_break = True  # Ensures single line breaks are recognized, important for markdown formatting
        markdown = text_maker.handle(content)
        return markdown

    async def get_page_content_as_markdown(self) -> str:
        content = await self.page.content()
        return self.convert_content_to_markdown(content)


async def main():
    pw = Playwright()

    await pw.page.goto("https://www.felixvemmer.com/en")
