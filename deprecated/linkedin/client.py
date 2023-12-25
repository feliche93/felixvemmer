import os


class LinkedIn:
    def __init__(self, email=None, password=None):
        self.email = email if email else os.getenv("LINKEDIN_EMAIL")
        self.password = password if password else os.getenv("LINKEDIN_PASSWORD")

    def login(self):
        print("Logging in...")
