import time

import requests
from pontis.core.entry import construct_entry
from pontis.core.utils import currency_pair_to_key


def fetch_cryptowatch(assets, publisher):
    sources = [
        "cryptowatch-coinbase-pro",
        "cryptowatch-kraken",
        "cryptowatch-binance",
        "cryptowatch-bitfinex",
    ]

    response = requests.get("https://api.cryptowat.ch/markets/prices")
    result = response.json()["result"]

    entries = []

    for source in sources:

        cryptowatch_source = source.split("-", 1)[1]
        source_results = {
            k.split(":")[2]: v
            for k, v in result.items()
            if k.startswith(f"market:{cryptowatch_source}")
        }

        for asset in assets:
            if asset["type"] != "SPOT":
                print(f"Skipping Cryptowatch for non-spot asset {asset}")
                continue

            pair = asset["pair"]
            key = currency_pair_to_key(*pair)

            try:
                price = source_results["".join(pair).lower()]
            except KeyError:
                print(f"No entry found for {key} from Cryptowatch-{cryptowatch_source}")
                continue

            timestamp = int(time.time())
            price_int = int(price * (10 ** asset["decimals"]))

            print(
                f"Fetched price {price} for {'/'.join(pair)} from Cryptowatch-{cryptowatch_source}"
            )

            entries.append(
                construct_entry(
                    key=key,
                    value=price_int,
                    timestamp=timestamp,
                    source=source,
                    publisher=publisher,
                )
            )

    return entries
