#!/usr/bin/env python
from mdx_blogpost_crew.crew import MdxBlogpostCrewCrew


def run():
    # inputs = {"keyword": "backlink gpt", "num_results": 1}
    inputs = {"person_name": "Iva Gjolli"}
    crew = MdxBlogpostCrewCrew().crew()

    results = crew.kickoff(inputs=inputs)

    print("Crew usage", crew.usage_metrics)

    print("Crew work results:")
    print(results)
