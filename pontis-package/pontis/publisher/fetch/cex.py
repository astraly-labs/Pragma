import os

import requests
from pontis.core.entry import construct_entry
from pontis.core.utils import currency_pair_to_key


def fetch_cex(assets):
    PUBLISHER_PREFIX = os.environ.get("PUBLISHER_PREFIX")
    publisher = PUBLISHER_PREFIX + "-cex"
    base_url = "https://cex.io/api/ticker"

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            print(f"Skipping CEX for non-spot asset {asset}")
            continue

        pair = asset["pair"]
        response = requests.get(f"{base_url}/{pair[0]}/{pair[1]}", timeout=10)
        result = response.json()

        if "error" in result and result["error"] == "Invalid Symbols Pair":
            print(f"No data found for {'/'.join(pair)} from CEX")
            continue

        timestamp = int(result["timestamp"])
        price = float(result["last"])
        price_int = int(price * (10 ** asset["decimals"]))
        key = currency_pair_to_key(*pair)

        print(f"Fetched price {price} for {'/'.join(pair)} from CEX")

        entries.append(
            construct_entry(
                key=key,
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    return entries
