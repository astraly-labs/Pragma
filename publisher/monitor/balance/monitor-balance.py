import asyncio
import datetime
import os

import requests
from empiric.core_.client import EmpiricClient
from empiric.core_.logger import get_stream_logger
from empiric.core_.utils import felt_to_str
from empiric.publisher_.client import EmpiricPublisherClient

logger = get_stream_logger()

# Inputs
# [Optional]: Publisher names; if empty, query for all
# [Optional]: Balance threshold; if empty, defaults to 0.1 * 10**18 Wei

# Behavior: Ping betteruptime iff all is good


async def main(publishers=None, threshold_wei=None):
    slack_url = "https://slack.com/api/chat.postMessage"
    slack_bot_oauth_token = os.environ.get("SLACK_BOT_USER_OAUTH_TOKEN")
    channel_id = os.environ.get("SLACK_CHANNEL_ID")

    # Set admin private key to 1 because we aren't using the client for protected invokes
    client = EmpiricClient()

    if publishers is None:
        publishers = await client.get_all_publishers()

    if threshold_wei is None:
        threshold_wei = 0.1 * 10**18

    all_above_threshold = True
    addresses = set()

    for publisher in publishers:
        address = await client.get_publisher_address(publisher)
        if address in addresses:
            # Already checked this address (different publishers can share the same address)
            continue

        addresses.add(address)

        # Set publisher private key to None because we aren't using the client for protected invokes
        publisher_client = EmpiricPublisherClient()
        balance = await publisher_client.get_balance(address)

        if balance < threshold_wei:
            logger.warn(
                f"\nWarning: Balance below threshold! Publisher: {felt_to_str(publisher)}, address: {address}, balance in ETH: {balance/(10**18)}\n"
            )
            all_above_threshold = False
            requests.post(
                slack_url,
                headers={"Authorization": f"Bearer {slack_bot_oauth_token}"},
                data={
                    "text": f"Balance below threshold! Publisher: {felt_to_str(publisher)}, address: {address}, balance in ETH: {balance/(10**18)}",
                    "channel": channel_id,
                },
            )
        else:
            logger.info(
                f"Balance above threshold for publisher: {felt_to_str(publisher)}, address: {address}, balance in ETH: {balance/(10**18)}"
            )

    if all_above_threshold:
        betteruptime_id = os.environ.get("BETTERUPTIME_ID")
        requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")

    logger.info(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))


if __name__ == "__main__":
    asyncio.run(main())
