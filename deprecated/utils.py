from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
from cleantext import clean
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter


async def get_page_content(url: str) -> str:
    """Gets the page content

    Args:
        url (str): The url to get the content from

    Returns:
        str: The type of the content
    """
    # pylint: disable=invalid-name
    async with async_playwright() as p:
        # p = await async_playwright().start()
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url)
        content = await page.content()
        await browser.close()

        soup = BeautifulSoup(content, "html.parser")

        title = (
            soup.find("meta", {"property": "og:title"})["content"]
            if soup.find("meta", {"property": "og:title"})
            else None
        )
        description = (
            soup.find("meta", {"name": "description"})["content"]
            if soup.find("meta", {"name": "description"})
            else None
        )
        image = (
            soup.find("meta", {"property": "og:image"})["content"]
            if soup.find("meta", {"property": "og:image"})
            else None
        )

        body = soup.find("body")

        len(body)

        if header := body.find("header"):
            header.decompose()

        if footer := body.find("footer"):
            footer.decompose()

        body_text = body.get_text()

        body_text = clean(
            text=body_text,
            fix_unicode=True,
            lower=False,
            to_ascii=True,
            no_line_breaks=True,
            normalize_whitespace=True,
            strip_lines=True,
        )

        doc = Document(
            page_content=body_text,
            metadata={
                "title": title,
                "description": description,
                "image": image,
                "url": url,
            },
        )

        split_docs = RecursiveCharacterTextSplitter().split_documents(documents=[doc])

        return title, description, image, split_docs
