"""This module contains the Telegram bot used to send messages to a predefined chat."""
import os

import telegram
from dotenv import load_dotenv
from models import (
    PostHogBacklinkProspectsCreatedEvent,
    PostHogCampaignCreatedEvent,
    PostHogCancellationSurveySubmittedEvent,
    PosthogMessageCreatedEvent,
    PostHogOnboardingSurveyCompletedEvent,
    PostHogSubscriptionUpdatedEvent,
    PostHogUserCreatedEvent,
)

load_dotenv()

token = os.getenv("TELEGRAM_TOKEN")
chat_id = 1424617201

bot = telegram.Bot(token=token)


async def send_message(text: str):
    """
    Asynchronously sends a message to a predefined chat using a Telegram bot.

    Args:
        text (str): The text of the message to be sent.
    """

    async with bot:
        await bot.send_message(text=text, chat_id=chat_id)


async def send_telegram_notification(posthog_event):
    """
    Sends a notification to a predefined Telegram chat when a new user is created.

    Args:
        posthog_event (PostHogUserCreatedEvent): The event data from PostHog.
    """
    if isinstance(posthog_event, PostHogUserCreatedEvent):
        message = (
            f"👤 New user created: {posthog_event.properties.email}\n"
            f"Time of creation: {posthog_event.properties.created_at}"
        )

    if isinstance(posthog_event, PostHogSubscriptionUpdatedEvent):
        message = (
            f"💸 Subscription updated for user: {posthog_event.properties.email}\n"
            f"Product variant: {posthog_event.properties.product_variant}\n"
            f"New subscription status: {posthog_event.properties.subscription_status}\n"
            f"Subscription renews at {posthog_event.properties.subscription_renews_at}\n"
            f"Subscription ends at {posthog_event.properties.subscription_ends_at}\n"
        )

    if isinstance(posthog_event, PostHogOnboardingSurveyCompletedEvent):
        message = (
            f"📝 Onboarding survey completed by user: {posthog_event.properties.email}\n"
            f"Onboarding Organization: {posthog_event.properties.onboarding_organization}\n"
            f"Onboarding Role: {posthog_event.properties.onboarding_role}\n"
            f"Onboarding Problem: {posthog_event.properties.onboarding_problem}\n"
        )

    if isinstance(posthog_event, PostHogCancellationSurveySubmittedEvent):
        message = (
            f"📝 Cancellation survey submitted by user: {posthog_event.properties.email}\n"
            f"Cancellation reason: {posthog_event.properties.reason_cancellation}\n"
            f"Cancellation reason other: {posthog_event.properties.reason_other}\n"
        )

    if isinstance(posthog_event, PostHogCampaignCreatedEvent):
        message = f"📝 Campaign created for url: {posthog_event.properties.url}\n"

    if isinstance(posthog_event, PostHogBacklinkProspectsCreatedEvent):
        message = f"📝 Backlink prospects created for campaign id: {posthog_event.properties.campaign_id}\n"

    if isinstance(posthog_event, PosthogMessageCreatedEvent):
        message = f"📝 Message created: {posthog_event.properties.message}\n"

    await send_message(message)
