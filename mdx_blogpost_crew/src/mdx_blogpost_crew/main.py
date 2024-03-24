#!/usr/bin/env python
from mdx_blogpost_crew.crew import MdxBlogpostCrewCrew


def run():
    # Example inputs for testing
    company_description = "A leading provider of AI-driven marketing solutions, specializing in personalized customer engagement and analytics."
    company_domain = "aimarketing.com"
    hiring_needs = "Senior SEO Specialist, Content Marketing Manager"
    specific_benefits = (
        "Remote work flexibility, health and wellness programs, stock options"
    )

    # Prepare inputs for the crew
    inputs = {
        "company_description": company_description,
        "company_domain": company_domain,
        "hiring_needs": hiring_needs,
        "specific_benefits": specific_benefits,
    }

    # Kickoff the crew with the provided inputs
    MdxBlogpostCrewCrew().crew().kickoff(inputs=inputs)
