"""This module contains the Telegram bot used to send messages to a predefined chat."""
import os

import requests
import telegram
from common import image, secret, stub
from db import get_job_post_by_id, update_job_post_status
from dotenv import load_dotenv
from fastapi import Request
from models import FreelanceJobPost, JobStatus
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update

from modal import web_endpoint

load_dotenv()

token = os.getenv("TELEGRAM_TOKEN")
chat_id = 1424617201

bot = telegram.Bot(token=token)


async def send_message(text: str, job_post_id: str, has_reply_markup: bool = False):
    """
    Asynchronously sends a message to a predefined chat using a Telegram bot.

    Args:
        text (str): The text of the message to be sent.
        job_id (str): The ID of the job, used as callback data.
        has_reply_markup (bool): Whether to include a reply markup in the message.
    """

    # Define the inline keyboard
    keyboard = [
        [
            InlineKeyboardButton("Interested ✅", callback_data=f"interested-{job_post_id}"),
            InlineKeyboardButton("Not Interested ❌", callback_data=f"notinterested-{job_post_id}"),
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard) if has_reply_markup else None

    async with bot:
        await bot.send_message(text=text, chat_id=chat_id, reply_markup=reply_markup)


async def send_job_post_notification(job_post: FreelanceJobPost):
    """
    Sends a notification to a predefined Telegram chat when a new user is created.

    Args:
        posthog_event (PostHogUserCreatedEvent): The event data from PostHog.
    """

    platform = "freelance.de" if job_post.platform_id == "freelance_de" else "freelancermap.de"

    message = (
        f"🚀 New freelance job post on {platform}\n\n"
        f"Title: {job_post.title}\n"
        f"Url: {job_post.url}\n\n"
        f"Description: {job_post.description}\n"
    )

    print(f"Sending message for job post id {job_post.id}")

    await send_message(text=message, job_post_id=job_post.id, has_reply_markup=True)


@stub.function(image=image, secret=secret)
async def handle_update(data: dict):
    """
    Handles a callback query from a user.

    Args:
        update (Update): Incoming update from Telegram.
        context (CallbackContext): Context for the current update.
    """

    update = Update.de_json(data, bot)

    # Check if the update has a callback query
    if hasattr(update, "callback_query") and update.callback_query:  # pylint: disable=no-member
        # Extract the callback data (job_id) and chat ID
        callback_data = update.callback_query.data  # pylint: disable=no-member
        incoming_chat_id = update.callback_query.message.chat_id  # pylint: disable=no-member
        message_id = update.callback_query.message.message_id  # pylint: disable=no-member

        # Split the callback data into the action and job_id
        action, job_post_id = callback_data.split("-")

        job_post_id = int(job_post_id)

        job_post = get_job_post_by_id(job_post_id=job_post_id)

        print(f"Received callback data: {callback_data}")

        if action == "interested":
            # If the user is interested, mark the job post as "interested" in your database
            if job_post.status != JobStatus.APPLIED:
                # The response variable is not used, so we can remove it

                response = requests.post(
                    url="https://feliche93--apply-freelance-de-job.modal.run",
                    json=job_post.json(),
                    timeout=50,
                )

                # Extract the application URL from the response
                application_url = response.text

                text = (
                    f"🚀 Applied for job post {job_post_id} on freelance.de\n\n" f"🔗 Application Url: {application_url}"
                )

                await send_message(text=text, job_post_id=job_post_id)

        elif action == "notinterested":
            # If the user is not interested, mark the job post as "not interested" in your database
            if job_post.status != JobStatus.NOT_INTERESTED:
                update_job_post_status(job_post, JobStatus.NOT_INTERESTED)

        # Delete the original message
        try:
            async with bot:
                await bot.delete_message(chat_id=incoming_chat_id, message_id=message_id)
        except telegram.error.BadRequest:
            print(f"Message {message_id} has already been deleted.")

    else:
        # If the update does not have a callback query, you might want to send a default reply
        # Extract the chat ID from the message
        if hasattr(update, "message") and update.message:  # pylint: disable=no-member
            incoming_chat_id = update.message.chat_id  # pylint: disable=no-member
        return


async def register_webhook():
    """
    Registers a webhook for the Telegram bot.
    """

    webhook_url = "https://feliche93--freelance-job-post-telegram-bot-dev.modal.run"

    webhook_url = "https://feliche93--freelance-job-post-telegram-bot.modal.run"

    # Set the webhook
    await bot.set_webhook(webhook_url)


@stub.function(image=image, secret=secret)
@web_endpoint(label="freelance-job-post-telegram-bot", method="POST", wait_for_response=False)
async def handle_telegram_messages(request: Request):
    """
    Asynchronously handles incoming Telegram messages.

    This function is triggered by a webhook when a new message arrives. It parses the update,
    prints it for debugging purposes, and then delegates the handling of the update to the
    `handle_update` function.

    Args:
        request (Request): The incoming request from the webhook, containing the update.

    Returns:
        dict: A dictionary with a single key-value pair, indicating that the handling of the update was successful.
    """
    # Parse the update
    data = await request.json()

    print(f"Received update: {data}")

    # Handle the update
    handle_update.remote(data)

    print("Finished handling update")

    return {"status": "ok"}
