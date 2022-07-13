import asyncio
import datetime
import os
import time
import traceback

import requests
from empiric.core.client import EmpiricClient
from empiric.core.const import DEFAULT_AGGREGATION_MODE
from empiric.core.utils import key_for_asset, str_to_felt
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.fetch import fetch_coingecko

# Behavior: Ping betteruptime iff all is good


PRICE_TOLERANCE = 0.1  # in percent
TIME_TOLERANCE = 1200  # in seconds
EXPERIMENTAL_ASSET_KEYS = {
    "eth/mxn",
    "temp/usd",
}  # do not send slack notifications for these


async def main():
    slack_url = "https://slack.com/api/chat.postMessage"
    slack_bot_oauth_token = os.environ.get("SLACK_BOT_USER_OAUTH_TOKEN")
    channel_id = os.environ.get("SLACK_CHANNEL_ID")

    assets = EMPIRIC_ALL_ASSETS

    client = EmpiricClient(n_retries=5)

    coingecko = {
        entry.key: entry.value for entry in fetch_coingecko(assets, "publisher")
    }
    aggregation_mode = DEFAULT_AGGREGATION_MODE

    all_prices_valid = True
    for asset in assets:
        key = key_for_asset(asset)
        felt_key = str_to_felt(key)
        if felt_key not in coingecko or asset["type"] != "SPOT":
            print(
                f"Skipping checking price for asset {asset} because no reference data"
            )
            continue

        (
            value,
            _,
            last_updated_timestamp,
            num_sources_aggregated,
        ) = await client.get_value(key, aggregation_mode)

        try:
            assert (
                coingecko[felt_key] * (1 - PRICE_TOLERANCE)
                <= value
                <= coingecko[felt_key] * (1 + PRICE_TOLERANCE)
            ), f"Coingecko says {coingecko[felt_key]}, Empiric says {value} (ratio {coingecko[felt_key]/value})"

            current_timestamp = int(time.time())

            assert (
                current_timestamp - TIME_TOLERANCE
                <= last_updated_timestamp
                <= current_timestamp + TIME_TOLERANCE
            ), f"Timestamp is {current_timestamp}, Empiric has last updated timestamp of {last_updated_timestamp} (difference {current_timestamp - last_updated_timestamp})"
            print(
                f"Price {value} checks out for asset {key} (reference: {coingecko[felt_key]})"
            )

            assert (
                num_sources_aggregated >= 3
            ), f"Aggregated less than 3 sources for asset {key}: {num_sources_aggregated}"
        except AssertionError as e:
            print(f"\nWarning: Price inaccurate or stale! Asset: {asset}\n")
            print(e)
            print(traceback.format_exc())

            if key not in EXPERIMENTAL_ASSET_KEYS:
                slack_text = "Error with Empiric price<!channel>"
                slack_text += f"\nAsset: {asset}"
                slack_text += f"\nTimestamp is {current_timestamp}, Empiric has last updated timestamp of {last_updated_timestamp} (difference {current_timestamp - last_updated_timestamp})"
                slack_text += f"\nCoingecko says {coingecko[felt_key]}, Empiric says {value} (ratio {coingecko[felt_key]/value})"
                slack_text += f"\n{traceback.format_exc()}"

                requests.post(
                    slack_url,
                    headers={"Authorization": f"Bearer {slack_bot_oauth_token}"},
                    data={
                        "text": slack_text,
                        "channel": channel_id,
                    },
                )
                all_prices_valid = False

    if all_prices_valid:
        # Ping betteruptime
        betteruptime_id = os.environ.get("BETTERUPTIME_ID")
        requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")

    print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%s"))


if __name__ == "__main__":
    asyncio.run(main())
