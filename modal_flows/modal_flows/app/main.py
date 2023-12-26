from dotenv import load_dotenv
import os

from modal_flows.papierkram.client import AsyncPapierkramClient, PapierkramClient
from modal_flows.papierkram.environment import PapierkramClientEnvironment

load_dotenv()


token = os.getenv(key="PAPIERKRAM_TOKEN")

if token is None:
    raise Exception("PAPIERKRAM_TOKEN is not set")

client = PapierkramClient(
    environment=PapierkramClientEnvironment.DEFAULT,
    token=token,
)

client.income_invoice_rechnung.list_all_invoices()
