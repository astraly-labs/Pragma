import os

import requests
from pontis.core.entry import construct_entry
from pontis.core.utils import currency_pair_to_key


def fetch_bitstamp(assets):
    PUBLISHER_PREFIX = os.environ.get("PUBLISHER_PREFIX")
    publisher = PUBLISHER_PREFIX + "-bitstamp"
    base_url = "https://www.bitstamp.net/api/v2/ticker"

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            print(f"Skipping Bitstamp for non-spot asset {asset}")
            continue

        pair = asset["pair"]
        response = requests.get(
            f"{base_url}/{pair[0].lower()}{pair[1].lower()}", timeout=10
        )
        if response.status_code == 404:
            print(f"No data found for {'/'.join(pair)} from Bitstamp")
            continue

        result = response.json()

        timestamp = int(result["timestamp"])
        price = float(result["last"])
        price_int = int(price * (10 ** asset["decimals"]))
        key = currency_pair_to_key(*pair)

        print(f"Fetched price {price} for {'/'.join(pair)} from Bitstamp")

        entries.append(
            construct_entry(
                key=key,
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    return entries
