import asyncio
import json
import os
import time
from typing import Union

import boto3
import requests
import telegram
from empiric.core.client import EmpiricClient
from empiric.core.logger import get_stream_logger
from empiric.core.utils import pair_id_for_asset, str_to_felt
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS, get_spot_asset_spec_for_pair_id
from empiric.publisher.fetchers import CoinbaseFetcher
from empiric.publisher.types import PublisherFetchError

logger = get_stream_logger()

# Behavior: Ping betteruptime if all is good


PRICE_TOLERANCE = float(os.environ.get("PRICE_TOLERANCE", 0.1))  # as a fraction
TIME_TOLERANCE = int(os.environ.get("TIME_TOLERANCE", 1200))  # in seconds
MIN_NUM_SOURCES_AGGREGATED = int(os.environ.get("MIN_NUM_SOURCES_AGGREGATED", 3))
EXPERIMENTAL_ASSET_KEYS = {
    "ETH/MXN",
    "TEMP/USD",
}  # do not send notifications for these

SECRET_NAME = os.environ.get("SECRET_NAME")


def handler(event, context):
    asyncio.run(_handler())
    return {
        "success": True,
    }


def check_asset_price(
    reference_price: float, actual_price: float, pair_id: str, oracle_decimals: int
) -> Union[str, None]:
    lower_bound = reference_price * (1 - PRICE_TOLERANCE)
    upper_bound = reference_price * (1 + PRICE_TOLERANCE)
    if actual_price < lower_bound or actual_price > upper_bound:
        if actual_price == 0:
            ratio = "undefined (div by 0)"
        else:
            ratio = reference_price / actual_price
        return f"{pair_id}: price discrepancy (ratio: {ratio}, reference: {reference_price}, Empiric: {actual_price})"
    publisher_decimals = get_spot_asset_spec_for_pair_id(pair_id)["decimals"]
    if oracle_decimals != publisher_decimals:
        return f"{pair_id}: decimals mismatch (oracle: {oracle_decimals}, publisher: {publisher_decimals})"


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


def _get_telegram_bot_token_from_aws():
    region_name = "eu-west-3"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)
    get_secret_value_response = client.get_secret_value(SecretId=SECRET_NAME)
    return json.loads(get_secret_value_response["SecretString"])[
        "TELEGRAM_BOT_USER_OAUTH_TOKEN"
    ]


async def _handler():
    chat_id = os.environ.get("CHAT_ID")
    telegram_bot_token = os.environ.get("TELEGRAM_BOT_USER_OAUTH_TOKEN")
    if telegram_bot_token is None:
        telegram_bot_token = _get_telegram_bot_token_from_aws()

    bot = telegram.Bot(token=telegram_bot_token)

    network = os.environ.get("NETWORK")
    ignore_assets_str = os.environ.get("IGNORE_ASSETS", "")
    ignore_assets = ignore_assets_str.split(",")

    assets = [
        asset
        for asset in EMPIRIC_ALL_ASSETS
        if asset["type"] == "SPOT" and pair_id_for_asset(asset) not in ignore_assets
    ]

    client = EmpiricClient(network)
    cb = CoinbaseFetcher(assets, "PUBLISHER")
    entries = cb.fetch_sync()
    coinbase = {
        entry.pair_id: entry.price
        for entry in entries
        if type(entry) != PublisherFetchError
    }

    all_errors = []
    for asset in assets:
        checks = []
        pair_id = pair_id_for_asset(asset)
        felt_pair_id = str_to_felt(pair_id)

        if asset["type"] == "SPOT":
            (
                value,
                decimals,
                last_updated_timestamp,
                num_sources_aggregated,
            ) = await client.get_spot(pair_id)

            if felt_pair_id in coinbase:
                checks.append(
                    check_asset_price(coinbase[felt_pair_id], value, pair_id, decimals)
                )

            checks.append(check_asset_timestamp(last_updated_timestamp, pair_id))
            checks.append(
                check_asset_num_sources_aggregated(num_sources_aggregated, pair_id)
            )
        else:
            logger.info(f"Skipping checking price for pair {pair_id}")

        if errors := [x for x in checks if x is not None]:
            for error in errors:
                logger.error(error)
            # Always log errors so we have visibility but only alert in Telegram for non-experimental assets
            if pair_id not in EXPERIMENTAL_ASSET_KEYS:
                all_errors.extend(errors)
        else:
            logger.info(f"All checks passed for pair {pair_id}")

    if all_errors:
        telegram_text = f"Prices monitoring :Error(s) with Empiric price on network {client.network} \n"
        telegram_text += "\n".join(all_errors)

        await bot.send_message(chat_id, text=telegram_text)

    else:
        # All data passes checks, ping betteruptime (deadman switch)
        betteruptime_id = os.environ.get("BETTERUPTIME_ID")
        requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")


if __name__ == "__main__":
    handler(None, None)
