"""This module contains the Telegram bot used to send messages to a predefined chat."""
import os

import telegram
from common import image, secret, stub
from db import update_job_post_status
from dotenv import load_dotenv
from fastapi import Request
from models import FreelanceJobPost, JobStatus
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import CallbackContext

from modal import web_endpoint

load_dotenv()

token = os.getenv("TELEGRAM_TOKEN")
chat_id = 1424617201

bot = telegram.Bot(token=token)


async def send_message(text: str, job_id: str, has_reply_markup: bool = False):
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
            InlineKeyboardButton("Interested ✅", callback_data=f"interested-{job_id}"),
            InlineKeyboardButton("Not Interested ❌", callback_data=f"notinterested-{job_id}"),
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard) if has_reply_markup else None

    async with bot:
        await bot.send_message(text=text, chat_id=chat_id, reply_markup=reply_markup)


async def send_jobpost_message(job_post: FreelanceJobPost):
    """
    Sends a notification to a predefined Telegram chat when a new user is created.

    Args:
        posthog_event (PostHogUserCreatedEvent): The event data from PostHog.
    """

    platform = "freelance.de" if job_post.platform_id == "freelance_de" else "freelancermap.de"

    message = (
        f"🚀 New freelance job post on {platform}\n\n"
        f"Title: {job_post.title}\n"
        f"Description: {job_post.description}\n"
    )

    await send_message(text=message, job_id=job_post.id, has_reply_markup=True)


async def handle_update(update: Update, context: CallbackContext):
    """
    Handles a callback query from a user.

    Args:
        update (Update): Incoming update from Telegram.
        context (CallbackContext): Context for the current update.
    """

    # Check if the update has a callback query
    if update.callback_query:
        # Extract the callback data (job_id) and chat ID
        callback_data = update.callback_query.data
        chat_id = update.callback_query.message.chat_id
        message_id = update.callback_query.message.message_id

        # Split the callback data into the action and job_id
        action, job_id = callback_data.split("-")

        job_id = int(job_id)

        # Here you can add your custom logic
        # For example, you might retrieve a job post using the job_id
        # job_post = retrieve_job_post(job_id)

        if action == "interested":
            # If the user is interested, mark the job post as "interested" in your database
            update_job_post_status(job_id, JobStatus.CONTACTED)

            # TODO: Auto Apply
        elif action == "notinterested":
            # If the user is not interested, mark the job post as "not interested" in your database
            # mark_job_post_as_not_interested(job_post)

            update_job_post_status(job_id, JobStatus.NOT_INTERESTED)
        # Delete the original message
        await bot.delete_message(chat_id=chat_id, message_id=message_id)

    else:
        # If the update does not have a callback query, you might want to send a default reply
        # Extract the chat ID from the message
        chat_id = update.message.chat_id
        return


async def register_webhook():
    """
    Registers a webhook for the Telegram bot.
    """

    webhook_url = "https://feliche93--freelance-job-post-telegram-bot-dev.modal.run"

    # Set the webhook
    await bot.set_webhook(webhook_url)


@stub.function(image=image, secret=secret)
@web_endpoint(label="freelance-job-post-telegram-bot", method="POST")
async def handle_telegram_messages(request: Request):
    # Parse the update
    data = await request.json()

    print(f"Received update: {data}")

    update = Update.de_json(data, bot)

    # Create a CallbackContext
    context = CallbackContext(bot)

    # Handle the update
    await handle_update(update, context)
