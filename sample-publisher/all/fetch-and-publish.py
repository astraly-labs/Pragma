import asyncio
import base64
import datetime
import hmac
import os
from hashlib import sha256
from pontis.core.utils import construct_entry

import requests
from pontis.publisher.client import PontisPublisherClient
from pontis.core.const import ORACLE_ADDRESS, NETWORK

PUBLISHER_REGISTRATION_PRIVATE_KEY = int(
    os.environ.get("PUBLISHER_REGISTRATION_PRIVATE_KEY")
)


async def fetch_coinapi(price_pair, decimals):
    COINAPI_KEY = os.environ.get("COINAPI_KEY")
    PRICE_URL = f"https://rest.coinapi.io/v1/exchangerate/{'/'.join(price_pair)}"

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

    COINAPI_PUBLISHER_PRIVATE_KEY = int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY"))
    publisher = "coinapi"
    client = PontisPublisherClient(
        ORACLE_ADDRESS, COINAPI_PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    print(f"Fetched price {price} for {'/'.join(price_pair)} from Coin API")

    return construct_entry(
        key="".join(price_pair),
        value=price_int,
        timestamp=timestamp,
        publisher=publisher,
    )


async def fetch_coinmarketcap(price_pair, decimals):
    COINMARKETCAP_KEY = os.environ.get("COINMARKETCAP_KEY")
    PRICE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

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

    COINMARKETCAP_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")
    )
    publisher = "coinmarketcap"
    client = PontisPublisherClient(
        ORACLE_ADDRESS,
        COINMARKETCAP_PUBLISHER_PRIVATE_KEY,
        publisher,
        network="testnet",
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    print(f"Fetched price {price} for {'/'.join(price_pair)} from Coinmarketcap")

    return construct_entry(
        key="".join(price_pair),
        value=price_int,
        timestamp=timestamp,
        publisher=publisher,
    )


async def fetch_coingecko(price_pair, decimals):
    if price_pair[0] == "ETH":
        PRICE_URL = "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
    else:
        raise Exception(
            f"Unknown price pair, do not know how to query coingecko for {price_pair[0]}"
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

    COINGECKO_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY")
    )
    publisher = "coingecko"
    client = PontisPublisherClient(
        ORACLE_ADDRESS, COINGECKO_PUBLISHER_PRIVATE_KEY, publisher, network="testnet"
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    print(f"Fetched price {price} for {'/'.join(price_pair)} from Coingecko")

    return construct_entry(
        key="".join(price_pair),
        value=price_int,
        timestamp=timestamp,
        publisher=publisher,
    )


async def fetch_coinbase(price_pair, decimals):
    COINBASE_API_SECRET = os.environ.get("COINBASE_API_SECRET")
    COINBASE_API_KEY = os.environ.get("COINBASE_API_KEY")
    COINBASE_API_PASSPHRASE = os.environ.get("COINBASE_API_PASSPHRASE")
    URL = "https://api.exchange.coinbase.com"
    REQUEST_PATH = "/oracle"
    METHOD = "GET"

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

    COINBASE_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINBASE_PUBLISHER_PRIVATE_KEY")
    )
    publisher = "coinbase"
    client = PontisPublisherClient(
        ORACLE_ADDRESS, COINBASE_PUBLISHER_PRIVATE_KEY, publisher, network="testnet"
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    print(f"Fetched price {price} for {'/'.join(price_pair)} from Coinbase")

    return construct_entry(
        key="".join(price_pair),
        value=price_int,
        timestamp=timestamp,
        publisher=publisher,
    )


async def publish_all(PRICE_PAIR, DECIMALS):
    entries = []
    entries.append(await fetch_coinapi(PRICE_PAIR, DECIMALS))
    entries.append(await fetch_coinmarketcap(PRICE_PAIR, DECIMALS))
    entries.append(await fetch_coingecko(PRICE_PAIR, DECIMALS))
    entries.append(await fetch_coinbase(PRICE_PAIR, DECIMALS))

    private_keys = [
        int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY")),
        int(os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")),
        int(os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY")),
        int(os.environ.get("COINBASE_PUBLISHER_PRIVATE_KEY")),
    ]
    await PontisPublisherClient.publish_many(
        ORACLE_ADDRESS, NETWORK, entries, private_keys
    )


if __name__ == "__main__":
    DECIMALS = 10
    PRICE_PAIR = ["ETH", "USD"]

    asyncio.run(publish_all(PRICE_PAIR, DECIMALS))
