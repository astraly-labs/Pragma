import asyncio
import base64
import datetime
import hmac
import os
import time
from hashlib import sha256

import requests
from pontis.core.const import NETWORK, ORACLE_ADDRESS
from pontis.core.utils import construct_entry
from pontis.publisher.client import PontisPublisherClient

PUBLISHER_REGISTRATION_PRIVATE_KEY = int(
    os.environ.get("PUBLISHER_REGISTRATION_PRIVATE_KEY")
)


async def fetch_coinapi(price_pairs, decimals):
    COINAPI_PUBLISHER_PRIVATE_KEY = int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY"))
    publisher = "coinapi"
    client = PontisPublisherClient(
        ORACLE_ADDRESS, COINAPI_PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    COINAPI_KEY = os.environ.get("COINAPI_KEY")
    headers = {"X-CoinAPI-Key": COINAPI_KEY}

    entries = []

    for price_pair in price_pairs:
        url = f"https://rest.coinapi.io/v1/exchangerate/{'/'.join(price_pair)}"
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        price = response.json()["rate"]
        timestamp = int(
            datetime.datetime.strptime(
                response.json()["time"], "%Y-%m-%dT%H:%M:%S.%f0%z"
            ).timestamp()
        )
        price_int = int(price * (10**decimals))

        print(f"Fetched price {price} for {'/'.join(price_pair)} from Coin API")

        entries.append(
            construct_entry(
                key="/".join(price_pair).lower(),
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    return entries


async def fetch_coinmarketcap(price_pairs, decimals):
    COINMARKETCAP_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")
    )
    publisher = "coinmarketcap"
    client = PontisPublisherClient(
        ORACLE_ADDRESS,
        COINMARKETCAP_PUBLISHER_PRIVATE_KEY,
        publisher,
        network=NETWORK,
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    COINMARKETCAP_KEY = os.environ.get("COINMARKETCAP_KEY")
    headers = {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
        "Accepts": "application/json",
    }

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

    entries = []

    for price_pair in price_pairs:
        parameters = {"symbol": price_pair[0], "convert": price_pair[1]}

        response = requests.get(url, headers=headers, params=parameters)
        response.raise_for_status()
        price = response.json()["data"][price_pair[0]]["quote"][price_pair[1]]["price"]
        timestamp = int(
            datetime.datetime.strptime(
                response.json()["data"][price_pair[0]]["quote"][price_pair[1]][
                    "last_updated"
                ],
                "%Y-%m-%dT%H:%M:%S.%f%z",
            ).timestamp()
        )
        price_int = int(price * (10**decimals))

        print(f"Fetched price {price} for {'/'.join(price_pair)} from Coinmarketcap")

        entries.append(
            construct_entry(
                key="/".join(price_pair).lower(),
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )
    return entries


async def fetch_coingecko(price_pairs, decimals):
    COINGECKO_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY")
    )
    publisher = "coingecko"
    client = PontisPublisherClient(
        ORACLE_ADDRESS, COINGECKO_PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    headers = {
        "Accepts": "application/json",
    }

    entries = []

    for price_pair in price_pairs:
        if price_pair[0] == "ETH":
            price_pair_id = "ethereum"
        elif price_pair[0] == "BTC":
            price_pair_id = "bitcoin"
        elif price_pair[0] == "LUNA":
            price_pair_id = "terra-luna"
        elif price_pair[0] == "SOL":
            price_pair_id = "solana"
        elif price_pair[0] == "AVAX":
            price_pair_id = "avalanche-2"
        elif price_pair[0] == "DOGE":
            price_pair_id = "dogecoin"
        elif price_pair[0] == "SHIB":
            price_pair_id = "shiba-inu"
        elif price_pair[0] == "TEMP":
            price_pair_id = "tempus"
        else:
            raise Exception(
                f"Unknown price pair, do not know how to query coingecko for {price_pair[0]}"
            )

        url = f"https://api.coingecko.com/api/v3/coins/{price_pair_id}?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false"

        response = requests.get(url, headers=headers)
        response.raise_for_status()
        price = response.json()["market_data"]["current_price"][price_pair[1].lower()]
        timestamp = int(
            datetime.datetime.strptime(
                response.json()["last_updated"],
                "%Y-%m-%dT%H:%M:%S.%f%z",
            ).timestamp()
        )
        price_int = int(price * (10**decimals))

        print(f"Fetched price {price} for {'/'.join(price_pair)} from Coingecko")

        entries.append(
            construct_entry(
                key="/".join(price_pair).lower(),
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    return entries


async def fetch_coinbase(price_pairs, decimals):
    COINBASE_PUBLISHER_PRIVATE_KEY = int(
        os.environ.get("COINBASE_PUBLISHER_PRIVATE_KEY")
    )
    publisher = "coinbase"
    client = PontisPublisherClient(
        ORACLE_ADDRESS, COINBASE_PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    COINBASE_API_SECRET = os.environ.get("COINBASE_API_SECRET")
    COINBASE_API_KEY = os.environ.get("COINBASE_API_KEY")
    COINBASE_API_PASSPHRASE = os.environ.get("COINBASE_API_PASSPHRASE")
    URL = "https://api.exchange.coinbase.com"
    REQUEST_PATH = "/oracle"
    METHOD = "GET"

    entries = []

    for price_pair in price_pairs:

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
        if price_pair[0] in result["prices"]:
            price = float(result["prices"][price_pair[0]])
            price_int = int(price * (10**decimals))

            timestamp = int(result["timestamp"])

            print(f"Fetched price {price} for {'/'.join(price_pair)} from Coinbase")

            entries.append(
                construct_entry(
                    key="/".join(price_pair).lower(),
                    value=price_int,
                    timestamp=timestamp,
                    publisher=publisher,
                )
            )
        else:
            print(f"No entry found for {'/'.join(price_pair)} from Coinbase")

    return entries


async def fetch_gemini(price_pairs, decimals):
    GEMINI_PUBLISHER_PRIVATE_KEY = int(os.environ.get("GEMINI_PUBLISHER_PRIVATE_KEY"))
    publisher = "gemini"
    client = PontisPublisherClient(
        ORACLE_ADDRESS, GEMINI_PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
    )

    r, s = client.sign_publisher_registration(PUBLISHER_REGISTRATION_PRIVATE_KEY)
    await client.register_publisher_if_not_registered(r, s)

    base_url = "https://api.gemini.com/v1"
    response = requests.get(base_url + "/pricefeed")

    entries = []

    for price_pair in price_pairs:
        timestamp = int(time.time())
        result = [e for e in response.json() if e["pair"] == "".join(price_pair)]
        if len(result) == 0:
            print(f"No entry found for {'/'.join(price_pair)} from Gemini")
            continue

        assert (
            len(result) == 1
        ), f"Found more one matching entries for Gemini response and price pair {price_pair}"
        price = float(result[0]["price"])
        price_int = int(price * (10**decimals))

        print(f"Fetched price {price} for {'/'.join(price_pair)} from Gemini")

        entries.append(
            construct_entry(
                key="/".join(price_pair).lower(),
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )
    return entries


async def publish_all(PRICE_PAIRS, DECIMALS):
    entries = []
    private_keys = []

    try:
        coinapi_entries = await fetch_coinapi(PRICE_PAIRS, DECIMALS)
        entries.extend(coinapi_entries)
        coinapi_private_key = int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coinapi_private_key] * len(coinapi_entries))
    except Exception as e:
        print(f"Error fetching Coinapi price: {e}")

    try:
        coinmarketcap_entries = await fetch_coinmarketcap(PRICE_PAIRS, DECIMALS)
        entries.extend(coinmarketcap_entries)
        coinmarketcap_private_key = int(
            os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")
        )
        private_keys.extend([coinmarketcap_private_key] * len(coinmarketcap_entries))
    except Exception as e:
        print(f"Error fetching Coinmarketcap price: {e}")

    try:
        coingecko_entries = await fetch_coingecko(PRICE_PAIRS, DECIMALS)
        entries.extend(coingecko_entries)
        coingecko_private_key = int(os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coingecko_private_key] * len(coingecko_entries))
    except Exception as e:
        print(f"Error fetching Coingecko price: {e}")

    try:
        coinbase_entries = await fetch_coinbase(PRICE_PAIRS, DECIMALS)
        entries.extend(coinbase_entries)
        coinbase_pricate_key = int(os.environ.get("COINBASE_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coinbase_pricate_key] * len(coinbase_entries))
    except Exception as e:
        print(f"Error fetching Coinbase price: {e}")

    try:
        gemini_entries = await fetch_gemini(PRICE_PAIRS, DECIMALS)
        entries.extend(gemini_entries)
        gemini_private_key = int(os.environ.get("GEMINI_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([gemini_private_key] * len(gemini_entries))
    except Exception as e:
        print(f"Error fetching Gemini price: {e}")

    response = await PontisPublisherClient.publish_many(
        ORACLE_ADDRESS, NETWORK, entries, private_keys
    )
    print(f"Bulk updated with response {response}")

    # Post success to Better Uptime
    requests.get("https://betteruptime.com/api/v1/heartbeat/eLy7zigidGbx5s6jnsfQiqJQ")


if __name__ == "__main__":
    DECIMALS = 18
    PRICE_PAIRS = [
        ["ETH", "USD"],
        ["BTC", "USD"],
        ["LUNA", "USD"],
        ["SOL", "USD"],
        ["AVAX", "USD"],
        ["DOGE", "USD"],
        ["SHIB", "USD"],
        ["TEMP", "USD"],
    ]

    asyncio.run(publish_all(PRICE_PAIRS, DECIMALS))
