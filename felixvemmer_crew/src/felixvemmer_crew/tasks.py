from textwrap import dedent
from typing import List, Optional
from crewai import Task
from crewai import Agent
from felixvemmer_crew.models import SFindTopRankingSerpsForKeywordTaskOutput


class Tasks:
    def find_top_ranking_serps_for_keyword_task(
        self, agent: Agent, num_websites: int, keyword: str
    ) -> Task:
        return Task(
            description=dedent(
                f"""\
								Find the title and url for the top {num_websites} search results for a given keyword {keyword}."""
            ),
            expected_output=dedent(
                """\
								A list of the top {num_websites} search results for the {keyword} with their title and URL."""
            ),
            agent=agent,
            output_pydantic=SFindTopRankingSerpsForKeywordTaskOutput,
        )

    def extract_website_content_task(
        self, agent: Agent, num_websites: int, context: Optional[List["Task"]]
    ) -> Task:
        return Task(
            description=dedent(
                f"""\
								Extract the body text, title, meta title, meta description, meta image URL, 
                and favicon image URL for the list of the three {num_websites} given website urls. 
                Analyze the extracted content to understand the key factors contributing to the 
                website's SEO performance."""
            ),
            expected_output=dedent(
                """\
								A list of websites with their content, title, meta description, meta image, favicon, and body text, along with an analysis of the key SEO factors."""
            ),
            agent=agent,
            context=context,
        )

    def create_content_outline_task(
        self, agent: Agent, num_websites: int, keyword: str
    ) -> Task:
        return Task(
            description=dedent(
                f"""\
								Create a content outline for the keyword {keyword} based on the top {num_websites} 
                ranking websites body text, title, meta description, meta image, favicon, and body text. 
                Identify common themes, topics, and strategies used by these top-ranking pages to inform
                the content strategy."""
            ),
            expected_output=dedent(
                """
                A document giving a content outline in the following format as shown in this example:
                                                              
                # Title Ideas

                - How to Make Ramen From Scratch (The Easier, Better Way)
                - How to Make Authentic Japanese-Style Ramen Noodles
                - This Is Exactly How to Make the Most Delicious Ramen Noodles

                ## Goal

                To promote our hoisin sauce and create brand awareness

                ## Keyword

                How to make ramen noodles

                ## Search Intent and Content Angle

                Results show a mix of ramen noodles from scratch and improving prepackaged ramen with 
                better ingredients. Let's do a guide to making the noodles from scratch and improving 
                the final dish with better ingredients.

                ## USP

                Easy and tasty homemade ramen noodles that are authentic to Japan.

                ## Outline

                ### Intro

                - Talk about how easy this recipe is
                - Mention that it's hard to roll ramen noodles by hand, but a pasta machine makes it much easier
                - Talk about how ramen is actually made in Japan and how this recipe is authentic

                ### What Ingredients Go Into Ramen Noodles?

                - List the ingredients of authentic ramen, as well as prepackaged ramen

                ### What Veggies Go Well in Ramen?

                - List some veggies you can add to this recipe (or any ramen recipe) to make it better

                ### How to Add Egg to Ramen

                - Talk about how to boil and season an egg to add to your ramen

                ### What Else to Eat with Ramen

                - List traditional, authentic foods that go in ramen in Japan that the reader can choose from

                ### How to Make Homemade Ramen Noodles Step by Step

                Write out each step with pictures showing how it's done:

                1. Make an alkaline water solution
                2. Mix flour and alkaline solution in a large mixing bowl
                3. Rest the dough for 30 minutes at room temperature
                4. Knead the dough for two to three minutes
                5. Roll the dough flat with a pasta machine
                6. Continue rolling the dough through the pasta maker until desired thinness
                7. Cut dough into long strips of noodles with the pasta machine
                8. Simmer noodles in boiling water
                9. Serve with desired veggies, meats, and broth

                ## Instructions and Ingredients Box

                End with this section.
                """
            ),
            agent=agent,
        )
