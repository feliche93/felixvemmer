"Common modules shared"

from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from modal import Image, Secret, Stub

ENV = "prod"

load_dotenv()

stub = Stub(f"backlinkgpt-{ENV}")

secret = Secret.from_name(f"backlinkgpt-secret-{ENV}")

llm = ChatOpenAI(temperature=0)

image = (
    Image.debian_slim(python_version="3.11.1")
    .pip_install_from_requirements(requirements_txt="./requirements.txt")
    .run_commands(
        [
            "apt-get install -y software-properties-common",
            "apt-add-repository non-free",
            "apt-add-repository contrib",
            "apt-get update",
            "playwright install-deps chromium",
            "playwright install chromium",
        ],
    )
)
