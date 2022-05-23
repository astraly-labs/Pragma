import datetime
import os

import requests
from pontis.core.entry import construct_entry
from pontis.core.utils import currency_pair_to_key


def fetch_coinmarketcap(assets):
    PUBLISHER_PREFIX = os.environ.get("PUBLISHER_PREFIX")
    publisher = PUBLISHER_PREFIX + "-coinmarketcap"
    COINMARKETCAP_KEY = os.environ.get("COINMARKETCAP_KEY")
    headers = {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
        "Accepts": "application/json",
    }

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            print(f"Skipping Coinmarketcap for non-spot asset {asset}")
            continue

        pair = asset["pair"]

        key = currency_pair_to_key(*pair)
        parameters = {"symbol": pair[0], "convert": pair[1]}

        response = requests.get(url, headers=headers, params=parameters, timeout=10)
        response.raise_for_status()
        price = response.json()["data"][pair[0]]["quote"][pair[1]]["price"]
        timestamp = int(
            datetime.datetime.strptime(
                response.json()["data"][pair[0]]["quote"][pair[1]]["last_updated"],
                "%Y-%m-%dT%H:%M:%S.%f%z",
            ).timestamp()
        )
        price_int = int(price * (10 ** asset["decimals"]))

        print(f"Fetched price {price} for {key} from Coinmarketcap")

        entries.append(
            construct_entry(
                key=key,
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    return entries
