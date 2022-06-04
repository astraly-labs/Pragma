import asyncio
import datetime
import os
import time
import traceback

import requests
from pontis.core.client import PontisClient
from pontis.core.const import DEFAULT_AGGREGATION_MODE
from pontis.core.utils import currency_pair_to_key, str_to_felt
from pontis.publisher.fetch import fetch_coingecko

# Behavior: Ping betteruptime iff all is good


PRICE_TOLERANCE = 0.1  # in percent
TIME_TOLERANCE = 600  # in seconds


async def main():
    assets = [
        {"type": "SPOT", "pair": ("BTC", "USD")},
        {"type": "SPOT", "pair": ("ETH", "USD")},
        {"type": "SPOT", "pair": ("LUNA", "USD")},
        {"type": "SPOT", "pair": ("SOL", "USD")},
        {"type": "SPOT", "pair": ("AVAX", "USD")},
        {"type": "SPOT", "pair": ("DOGE", "USD")},
        {"type": "SPOT", "pair": ("SHIB", "USD")},
        {"type": "SPOT", "pair": ("TEMP", "USD")},
        {"type": "SPOT", "pair": ("ETH", "MXN")},
        {"type": "FUTURE", "pair": ("BTC", "USD")},
        {"type": "FUTURE", "pair": ("ETH", "USD")},
    ]
    os.environ["PUBLISHER_PREFIX"] = "pontis"

    client = PontisClient()
    for i, asset in enumerate(assets):
        key = currency_pair_to_key(*asset["pair"])
        decimals = await client.get_decimals(key)
        assets[i]["decimals"] = decimals

    coingecko = {entry.key: entry.value for entry in fetch_coingecko(assets)}
    aggregation_mode = DEFAULT_AGGREGATION_MODE

    all_prices_valid = True
    for asset in assets:
        key = currency_pair_to_key(*asset["pair"])
        felt_key = str_to_felt(key)
        if felt_key not in coingecko or asset["type"] != "SPOT":
            print(
                f"Skipping checking price for asset {asset} because no reference data"
            )
            continue

        value, last_updated_timestamp = await client.get_value(key, aggregation_mode)

        try:
            assert (
                coingecko[felt_key] * (1 - PRICE_TOLERANCE)
                <= value
                <= coingecko[felt_key] * (1 + PRICE_TOLERANCE)
            )

            current_timestamp = int(time.time())

            assert (
                current_timestamp - TIME_TOLERANCE
                <= last_updated_timestamp
                <= current_timestamp + TIME_TOLERANCE
            )
            print(
                f"Price {value} checks out for asset {key} (reference: {coingecko[felt_key]})"
            )
        except AssertionError as e:
            print(
                f"\nWarning: Price inaccurate or stale! Asset: {asset}, Coingecko: {coingecko[felt_key]}, Pontis: {value}\n"
            )
            print(e)
            print(traceback.format_exc())
            all_prices_valid = False

    if all_prices_valid:
        # Ping betteruptime
        requests.get(
            "https://betteruptime.com/api/v1/heartbeat/RVXYz4tMHb7wnr9CTKFTuRES"
        )

    print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%s"))


if __name__ == "__main__":
    asyncio.run(main())
