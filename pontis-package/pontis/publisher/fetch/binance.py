import datetime
import os
import re

import requests
from pontis.core.entry import construct_entry


def fetch_binance(assets):
    PUBLISHER_PREFIX = os.environ.get("PUBLISHER_PREFIX")
    publisher = PUBLISHER_PREFIX + "-binance"

    base_url = "https://dapi.binance.com/dapi/v1"
    response = requests.get(base_url + "/premiumIndex", timeout=20)

    entries = []

    # Don't fetch spot data because Binance only has crypto/crypto spot price pairs

    for asset in assets:
        if asset["type"] != "FUTURE":
            print(f"Skipping Binance for non-futures asset {asset}")
            continue

        pair = asset["pair"]

        result = [
            e
            for e in response.json()
            if re.match(rf"{pair[0]}{pair[1]}_[0-9]+", e["symbol"])
        ]
        if len(result) == 0:
            print(f"No entry found for {asset['type']} {'/'.join(pair)} from Binance")
            continue

        for future in result:
            timestamp = int(future["time"] / 1000)
            price = float(future["markPrice"])
            price_int = int(price * (10 ** asset["decimals"]))

            future_expiration_date = int(
                datetime.datetime.strptime(
                    future["symbol"],
                    f"{pair[0]}{pair[1]}_%y%m%d",
                ).strftime("%Y%m%d")
            )
            key = f"{pair[0]}/{pair[1]}-{future_expiration_date}".lower()

            print(f"Fetched futures price {price} for {key} from Binance")

            entries.append(
                construct_entry(
                    key=key,
                    value=price_int,
                    timestamp=timestamp,
                    publisher=publisher,
                )
            )

    return entries
