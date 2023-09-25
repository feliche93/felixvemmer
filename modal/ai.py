from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import SystemMessagePromptTemplate
from langdetect import detect
from models import FreelanceJobPost


def detect_language(job_post: FreelanceJobPost) -> str:
    """
    Detects the language of a given job post's description.

    This function uses the langdetect library to determine the language of the job post's description.
    If the detected language is not a string, it defaults to English ("en").

    Args:
        job_post (FreelanceJobPost): The job post for which the language of the description is to be detected.

    Returns:
        str: The detected language of the job post's description. Returns 'en' if the detected language is not a string.
    """
    lang = detect(job_post.description)  # type: ignore

    if not isinstance(lang, str):
        lang = "en"

    return lang


def create_application_message(job_post: FreelanceJobPost) -> str:
    """
    Creates an application message for a given job post using the OpenAI model.

    This function uses the OpenAI model to generate a cover letter for a given job post.
    The cover letter is generated based on a predefined experience and a system message prompt template.
    The system message prompt template is filled with the details of the job post and the experience.
    The language of the cover letter is determined by the language of the job post.

    Args:
        job_post (FreelanceJobPost): The job post for which the application message is to be created.

    Returns:
        str: The generated application message (cover letter) for the job post.
    """
    llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-16k")

    # noqa: E501
    experience = """I am a self-taught programmer with a CEMS Master in International Management.
    Having both a business and deep technical understanding allows me to easily communicate complex technical ideas with business stakeholders.

    What can I help you with? 💪

    1) Full-Stack Development: Build and ship the next modern frontend application to power your individual idea.

    Languages I speak: Typescript, CSS, HTML

    Frameworks & Libraries Expertise:

    - Next.js / Next13
    - Tailwind CSS & UI / Daisy UI / ShadcnUI
    - React Hook Form
    - Tanstack Table
    - Clerk Auth
    - Drizzle ORM
    - Directus & Strapi CMS
    - 🤖 Data & AI Services

    2) Data & AI Services: Derive better insights and build new data products with a scalable data warehouse and custom data pipelines.

    Languages I speak: Python, SQL, Prompt Engineering

    Frameworks & Libraries Expertise:

    - Langchain
    - Postgres: Neon / Supabase
    - DBT
    - Pandas
    - Modal
    - Superset
    - Airbyte
    - Great Expectations
    - FasAPI

    3) Business Process Automation & SEO: Deploy automation scripts to optimize operations and leverage SEO strategies to amplify your online reach.

    Tools:

    - Ahrefs
    - Google Search Console
    - Google Tag Manager
    - Posthog
    - Linear
    - Pipedream
    """

    system_message_prompt = """
    You're crafting a cover letter for "Felix Vemmer", an experienced IT developer applying for a freelance job. Your goal is to make him stand out by emphasizing his experience and expertise that directly align with the requirements of the job post.

    **Guidelines**:
    - **Match & Mention**: Identify and emphasize the skills and experiences from Felix's background that match the job's DESCRIPTION.
    - **Language**: Ensure the cover letter is written in the TARGET LANGUAGE.
    - **Structure**:
        - Begin with a PERSONAL GREETING to the CONTACT_PERSON.
        - State Felix's keen INTEREST in the TITLE job.
        - Highlight Felix's relevant skills and experiences that directly correspond with the job's DESCRIPTION, pulling from the provided EXPERIENCE. 
        - Mention that Felix has attached his CV and offers the option to discuss further via a chat at: https://cal.com/felix-vemmer/30-minute-google-hangout-chat
        - Wrap up with a CLOSING GREETING.

    TARGET LANGUAGE: {target_language}
    TITLE: {title}
    CONTACT_PERSON: {contact_person}
    DESCRIPTION: {description}
    EXPERIENCE: {experience}
    APPLICANT: "Felix Vemmer"
    """

    system_message = SystemMessagePromptTemplate.from_template(system_message_prompt).format(
        target_language=detect_language(job_post),
        title=job_post.title,
        contact_person=job_post.contact_person,
        description=job_post.description,
        experience=experience,
    )

    print("Generating application message...")
    message = llm.predict(system_message.content)

    print(message)

    return message
