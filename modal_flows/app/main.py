from dotenv import load_dotenv
import os

from modal_flows.papierkram.client import PapierkramClient


load_dotenv()

token = os.getenv(key="PAPIERKRAM_TOKEN")

if not token:
    raise ValueError("Papierkram token is required")

client = PapierkramClient(token=token)
