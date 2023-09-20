"""This module contains the flow definitions for the modal app."""

from freelance_de import scrape_freelance_de_statistics, scrape_job_offers, apply_for_job_post
from freelancermap import scrape_freelancermap_statistics
from common import stub  # noqa: F401  pylint: disable=unused-import
from telegram_bot import handle_telegram_messages, handle_update


async def main():
    """Main function"""
    await scrape_freelancermap_statistics.local()
    await scrape_freelance_de_statistics.local()
    await scrape_job_offers.local()
    await apply_for_job_post.local()
    await handle_telegram_messages.local()
    await handle_update.local()
