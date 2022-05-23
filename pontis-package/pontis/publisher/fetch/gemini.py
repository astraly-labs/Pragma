import os
import time

import requests
from pontis.core.entry import construct_entry
from pontis.core.utils import currency_pair_to_key


def fetch_gemini(assets):
    PUBLISHER_PREFIX = os.environ.get("PUBLISHER_PREFIX")
    publisher = PUBLISHER_PREFIX + "-gemini"

    base_url = "https://api.gemini.com/v1"
    response = requests.get(base_url + "/pricefeed", timeout=20)

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            print(f"Skipping Gemini for non-spot asset {asset}")
            continue

        pair = asset["pair"]
        key = currency_pair_to_key(*pair)
        timestamp = int(time.time())
        result = [e for e in response.json() if e["pair"] == "".join(pair)]
        if len(result) == 0:
            print(f"No entry found for {key} from Gemini")
            continue

        assert (
            len(result) == 1
        ), f"Found more than one matching entries for Gemini response and price pair {pair}"
        price = float(result[0]["price"])
        price_int = int(price * (10 ** asset["decimals"]))

        print(f"Fetched price {price} for {key} from Gemini")

        entries.append(
            construct_entry(
                key=key,
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    return entries
