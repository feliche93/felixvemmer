import marvin

result = marvin.classify(
    "Marvin is so easy to use!",
    labels=["positive", "negative"],
)

MARVIN_OPENAI_API_BASE = "http://localhost:11434/v1"
OPENAI_MODEL_NAME = "openhermes"  # Adjust based on available model
OPENAI_API_KEY = ""
