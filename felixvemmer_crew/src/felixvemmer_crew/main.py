#!/usr/bin/env python
from felixvemmer_crew.crew import FelixVemmerCrew
from dotenv import load_dotenv


def run():
    load_dotenv()
    # inputs = {"keyword": "backlink gpt", "num_results": 1}
    inputs = {"num_websites": 3, "keyword": "link building tools"}
    crew = FelixVemmerCrew().crew()

    results = crew.kickoff(inputs=inputs)

    print("Crew usage", crew.usage_metrics)

    print("Crew work results:")
    print(results)


# if __name__ == "__main__":
#     run()
