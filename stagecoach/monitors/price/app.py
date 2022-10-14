import asyncio
import os
import time
from typing import Union

import requests
from empiric.core.client import EmpiricClient
from empiric.core.logger import get_stream_logger
from empiric.core.utils import pair_id_for_asset, str_to_felt
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.fetchers import CoingeckoFetcher

logger = get_stream_logger()

# Behavior: Ping betteruptime iff all is good


PRICE_TOLERANCE = 0.1  # in percent
TIME_TOLERANCE = 1200  # in seconds
MIN_NUM_SOURCES_AGGREGATED = 3
EXPERIMENTAL_ASSET_KEYS = {
    "ETH/MXN",
    "TEMP/USD",
}  # do not send slack notifications for these


def handler(event, context):
    asyncio.run(_handler())
    return {
        "success": True,
    }


def check_asset_price(
    reference_price: float, actual_price: float, pair_id: str
) -> Union[str, None]:
    if reference_price * (
        1 - PRICE_TOLERANCE
    ) > actual_price or actual_price > reference_price * (1 + PRICE_TOLERANCE):
        if actual_price == 0:
            ratio = "undefined (div by 0)"
        else:
            ratio = reference_price / actual_price
        return f"{pair_id}: price discrepancy (ratio: {ratio}, reference: {reference_price}, Empiric: {actual_price})"


def check_asset_timestamp(
    last_updated_timestamp: int, pair_id: str
) -> Union[str, None]:
    current_timestamp = int(time.time())
    if (
        current_timestamp - TIME_TOLERANCE > last_updated_timestamp
        or last_updated_timestamp > current_timestamp + TIME_TOLERANCE
    ):
        return f"{pair_id}: stale update (difference {current_timestamp - last_updated_timestamp}, now: {current_timestamp}, last updated: {last_updated_timestamp})"


def check_asset_num_sources_aggregated(
    num_sources_aggregated: int, pair_id: str
) -> Union[str, None]:
    if num_sources_aggregated < MIN_NUM_SOURCES_AGGREGATED:
        return f"{pair_id}: too few sources (aggregated: {num_sources_aggregated}, target {MIN_NUM_SOURCES_AGGREGATED})"


async def _handler():
    slack_url = "https://slack.com/api/chat.postMessage"
    slack_bot_oauth_token = os.environ.get("SLACK_BOT_USER_OAUTH_TOKEN")
    channel_id = os.environ.get("SLACK_CHANNEL_ID")

    assets = EMPIRIC_ALL_ASSETS

    client = EmpiricClient()
    cg = CoingeckoFetcher(assets, "PUBLISHER")
    entries = cg.fetch_sync()

    coingecko = {entry.pair_id: entry.price for entry in entries}

    all_errors = []
    for asset in assets:
        checks = []
        pair_id = pair_id_for_asset(asset)
        felt_pair_id = str_to_felt(pair_id)

        if asset["type"] == "SPOT":
            (
                value,
                _,
                last_updated_timestamp,
                num_sources_aggregated,
            ) = await client.get_spot(pair_id)

            if felt_pair_id in coingecko:
                checks.append(
                    check_asset_price(coingecko[felt_pair_id], value, pair_id)
                )

            checks.append(check_asset_timestamp(last_updated_timestamp, pair_id))
            checks.append(
                check_asset_num_sources_aggregated(num_sources_aggregated, pair_id)
            )
        else:
            logger.info(f"Skipping checking price for asset {asset}")

        if errors := [x for x in checks if x is not None]:
            for error in errors:
                logger.error(error)
            # Always log errors so we have visibility but only alert in Slack for non-experimental assets
            if pair_id not in EXPERIMENTAL_ASSET_KEYS:
                all_errors.extend(errors)
        else:
            logger.info(f"{pair_id}: all good")

    if all_errors:
        slack_text = "Error(s) with Empiric price<!channel>"
        slack_text += "\n".join(all_errors)

        requests.post(
            slack_url,
            headers={"Authorization": f"Bearer {slack_bot_oauth_token}"},
            data={
                "text": slack_text,
                "channel": channel_id,
            },
        )
    else:
        # All data passes checks, ping betteruptime (deadman switch)
        betteruptime_id = os.environ.get("BETTERUPTIME_ID")
        requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")


if __name__ == "__main__":
    handler(None, None)
