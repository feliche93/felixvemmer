"""This module contains the flow definitions for the modal app."""

from freelance_de import scrape_freelance_de_statistics, scrape_job_offers
from freelancermap import scrape_freelancermap_statistics
from common import stub  # noqa: F401  pylint: disable=unused-import


async def main():
    """Main function"""
    await scrape_freelancermap_statistics.local()
    await scrape_freelance_de_statistics.local()
    await scrape_job_offers.local()
