import datetime
import os

import requests
from pontis.core.entry import construct_entry
from pontis.core.utils import currency_pair_to_key


def fetch_coinapi(assets):
    PUBLISHER_PREFIX = os.environ.get("PUBLISHER_PREFIX")
    publisher = PUBLISHER_PREFIX + "-coinapi"
    COINAPI_KEY = os.environ.get("COINAPI_KEY")
    headers = {"X-CoinAPI-Key": COINAPI_KEY}

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            print(f"Skipping Coinapi for non-spot asset {asset}")
            continue

        pair = asset["pair"]

        url = f"https://rest.coinapi.io/v1/exchangerate/{'/'.join(pair)}"
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        price = response.json()["rate"]
        timestamp = int(
            datetime.datetime.strptime(
                response.json()["time"], "%Y-%m-%dT%H:%M:%S.%f0%z"
            ).timestamp()
        )
        price_int = int(price * (10 ** asset["decimals"]))
        key = currency_pair_to_key(*pair)

        print(f"Fetched price {price} for {key} from Coin API")

        entries.append(
            construct_entry(
                key=key,
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    return entries
