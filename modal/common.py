"Common modules shared"

from dotenv import load_dotenv
from modal import Image, Secret, Stub

ENV = "prod"

load_dotenv()

stub: Stub = Stub(f"felixvemmer-{ENV}")

secret = Secret.from_name(f"felixvemmer-secret-{ENV}")

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
