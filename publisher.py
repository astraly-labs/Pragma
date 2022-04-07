import asyncio
import base64
import datetime
import hmac
import os
from hashlib import sha256

import requests
from starkware.crypto.signature.signature import private_to_stark_key

from client import try_publish
from tests.entry import Entry
from tests.utils import str_to_felt


def get_entry_from_coinapi_price(price_pair, decimals):
    COINAPI_KEY = os.environ.get("COINAPI_KEY")
    PRICE_URL = f"https://rest.coinapi.io/v1/exchangerate/{'/'.join(price_pair)}"
    COINAPI_PUBLISHER_PRIVATE_KEY = int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY"))
    COINAPI_PUBLISHER_PUBLIC_KEY = private_to_stark_key(COINAPI_PUBLISHER_PRIVATE_KEY)

    headers = {"X-CoinAPI-Key": COINAPI_KEY}

    response = requests.get(PRICE_URL, headers=headers)
    response.raise_for_status()
    price = response.json()["rate"]
    timestamp = int(
        datetime.datetime.strptime(
            response.json()["time"].split(".")[0], "%Y-%m-%dT%H:%M:%S"
        ).timestamp()
    )
    price_int = int(price) * (10**decimals)
    entry = Entry(
        timestamp=timestamp,
        price=price_int,
        asset=str_to_felt("".join(price_pair)),
        publisher=str_to_felt("coinapi"),
    )
    print(f"Submitting price {price} for {'/'.join(price_pair)} from Coin API")
    return (entry, (COINAPI_PUBLISHER_PRIVATE_KEY, COINAPI_PUBLISHER_PUBLIC_KEY))


def get_entry_from_coinmarketcap_price(price_pair, decimals):
    COINMARKETCAP_KEY = os.environ.get("COINMARKETCAP_KEY")
    PRICE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    COINMARKETCAP_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")
    )
    COINMARKETCAP_PUBLISHER_PUBLIC_KEY = private_to_stark_key(
        COINMARKETCAP_PUBLISHER_PRIVATE_KEY
    )

    headers = {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
        "Accepts": "application/json",
    }

    parameters = {"symbol": price_pair[0], "convert": price_pair[1]}

    response = requests.get(PRICE_URL, headers=headers, params=parameters)
    response.raise_for_status()
    price = response.json()["data"][PRICE_PAIR[0]]["quote"][PRICE_PAIR[1]]["price"]
    timestamp = int(
        datetime.datetime.strptime(
            response.json()["data"][PRICE_PAIR[0]]["quote"][PRICE_PAIR[1]][
                "last_updated"
            ].split(".")[0],
            "%Y-%m-%dT%H:%M:%S",
        ).timestamp()
    )
    price_int = int(price) * (10**decimals)

    entry = Entry(
        timestamp=timestamp,
        price=price_int,
        asset=str_to_felt("".join(price_pair)),
        publisher=str_to_felt("coinmarketcap"),
    )
    print(f"Submitting price {price} for {'/'.join(price_pair)} from Coinmarketcap")
    return (
        entry,
        (COINMARKETCAP_PUBLISHER_PRIVATE_KEY, COINMARKETCAP_PUBLISHER_PUBLIC_KEY),
    )


def get_entry_from_coingecko_price(price_pair, decimals):
    if price_pair[0] == "ETH":
        PRICE_URL = "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
    else:
        raise Exception(
            f"Unknown price pair, do not know how to query coingecko for {price_pair[0]}"
        )
    COINGECKO_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY")
    )
    COINGECKO_PUBLISHER_PUBLIC_KEY = private_to_stark_key(
        COINGECKO_PUBLISHER_PRIVATE_KEY
    )

    headers = {
        "Accepts": "application/json",
    }

    response = requests.get(PRICE_URL, headers=headers)
    response.raise_for_status()
    price = response.json()["market_data"]["current_price"][price_pair[1].lower()]
    timestamp = int(
        datetime.datetime.strptime(
            response.json()["last_updated"].split(".")[0],
            "%Y-%m-%dT%H:%M:%S",
        ).timestamp()
    )
    price_int = int(price) * (10**decimals)

    entry = Entry(
        timestamp=timestamp,
        price=price_int,
        asset=str_to_felt("".join(price_pair)),
        publisher=str_to_felt("coingecko"),
    )
    print(f"Submitting price {price} for {'/'.join(price_pair)}  from Coingecko")
    return (entry, (COINGECKO_PUBLISHER_PRIVATE_KEY, COINGECKO_PUBLISHER_PUBLIC_KEY))


def get_entry_from_coinbase_price(price_pair, decimals):
    COINBASE_API_SECRET = os.environ.get("COINBASE_API_SECRET")
    COINBASE_API_KEY = os.environ.get("COINBASE_API_KEY")
    COINBASE_API_PASSPHRASE = os.environ.get("COINBASE_API_PASSPHRASE")
    URL = "https://api.exchange.coinbase.com"
    REQUEST_PATH = "/oracle"
    METHOD = "GET"

    COINBASE_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINBASE_PUBLISHER_PRIVATE_KEY")
    )
    COINBASE_PUBLISHER_PUBLIC_KEY = private_to_stark_key(COINBASE_PUBLISHER_PRIVATE_KEY)

    request_timestamp = str(
        int(
            datetime.datetime.now(datetime.timezone.utc)
            .replace(tzinfo=datetime.timezone.utc)
            .timestamp()
        )
    )

    signature = hmac.new(
        base64.b64decode(COINBASE_API_SECRET),
        (request_timestamp + METHOD + REQUEST_PATH).encode("ascii"),
        sha256,
    )

    headers = {
        "Accept": "application/json",
        "CB-ACCESS-KEY": COINBASE_API_KEY,
        "CB-ACCESS-SIGN": base64.b64encode(signature.digest()),
        "CB-ACCESS-TIMESTAMP": request_timestamp,
        "CB-ACCESS-PASSPHRASE": COINBASE_API_PASSPHRASE,
    }

    response = requests.request(METHOD, URL + REQUEST_PATH, headers=headers)

    response.raise_for_status()
    result = response.json()
    price = float(result["prices"][PRICE_PAIR[0]])
    price_int = int(price) * (10**decimals)

    timestamp = int(result["timestamp"])

    entry = Entry(
        timestamp=timestamp,
        price=price_int,
        asset=str_to_felt("".join(price_pair)),
        publisher=str_to_felt("coinbase"),
    )
    print(f"Submitting price {price} for {'/'.join(price_pair)} from Coinbase")
    return (
        entry,
        (COINBASE_PUBLISHER_PRIVATE_KEY, COINBASE_PUBLISHER_PUBLIC_KEY),
    )


if __name__ == "__main__":
    DECIMALS = 10
    PRICE_PAIR = ["ETH", "USD"]

    coinapi_publisher_entry = get_entry_from_coinapi_price(PRICE_PAIR, DECIMALS)
    coinmarketcap_publisher_entry = get_entry_from_coinmarketcap_price(
        PRICE_PAIR, DECIMALS
    )
    coingecko_publisher_entry = get_entry_from_coingecko_price(PRICE_PAIR, DECIMALS)
    coinbase_publisher_entry = get_entry_from_coinbase_price(PRICE_PAIR, DECIMALS)
    asyncio.run(
        try_publish(
            [
                coinapi_publisher_entry,
                coinmarketcap_publisher_entry,
                coingecko_publisher_entry,
                coinbase_publisher_entry,
            ]
        )
    )
