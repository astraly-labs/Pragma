import asyncio
import base64
import datetime
import hmac
import os
import re
import time
from hashlib import sha256

import requests
from pontis.core.const import NETWORK, ORACLE_PROXY_ADDRESS
from pontis.core.utils import construct_entry
from pontis.publisher.client import PontisPublisherClient


async def fetch_coinapi(spot_price_pairs, derivatives, decimals):
    publisher = ("pontis-coinapi",)
    COINAPI_KEY = os.environ.get("COINAPI_KEY")
    headers = {"X-CoinAPI-Key": COINAPI_KEY}

    entries = []

    for price_pair in spot_price_pairs:
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


async def fetch_coinmarketcap(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-coinmarketcap"

    COINMARKETCAP_KEY = os.environ.get("COINMARKETCAP_KEY")
    headers = {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
        "Accepts": "application/json",
    }

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

    entries = []

    for price_pair in spot_price_pairs:
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


async def fetch_coingecko(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-coingecko"

    headers = {
        "Accepts": "application/json",
    }

    entries = []

    for price_pair in spot_price_pairs:
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


async def fetch_coinbase(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-coinbase"
    COINBASE_API_SECRET = os.environ.get("COINBASE_API_SECRET")
    COINBASE_API_KEY = os.environ.get("COINBASE_API_KEY")
    COINBASE_API_PASSPHRASE = os.environ.get("COINBASE_API_PASSPHRASE")
    URL = "https://api.exchange.coinbase.com"
    REQUEST_PATH = "/oracle"
    METHOD = "GET"

    entries = []

    for price_pair in spot_price_pairs:

        if price_pair[1] != "USD":
            print(
                f"Unable to fetch Coinbase price for non-USD denomination {price_pair[1]}"
            )
            continue

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


async def fetch_gemini(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-gemini"
    base_url = "https://api.gemini.com/v1"
    response = requests.get(base_url + "/pricefeed")

    entries = []

    for price_pair in spot_price_pairs:
        timestamp = int(time.time())
        result = [e for e in response.json() if e["pair"] == "".join(price_pair)]
        if len(result) == 0:
            print(f"No entry found for {'/'.join(price_pair)} from Gemini")
            continue

        assert (
            len(result) == 1
        ), f"Found more than one matching entries for Gemini response and price pair {price_pair}"
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


async def fetch_binance(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-binance"

    entries = []

    # Don't fetch spot data because Binance only has crypto/crypto spot price pairs

    base_url = "https://dapi.binance.com/dapi/v1"
    response = requests.get(base_url + "/premiumIndex")

    for deriv in derivatives:
        if deriv[0] != "FUTURE":
            print(
                f"Unable to fetch price from Binance for non-future derivative {deriv}"
            )
            continue

        result = [
            e
            for e in response.json()
            if re.match(rf"{deriv[1]}{deriv[2]}_[0-9]+", e["symbol"])
        ]
        if len(result) == 0:
            print(f"No entry found for {'/'.join(deriv)} from Binance")
            continue

        for future in result:
            timestamp = int(future["time"] / 1000)
            price = float(future["markPrice"])
            price_int = int(price * (10**decimals))

            future_expiration_date = int(
                datetime.datetime.strptime(
                    future["symbol"],
                    f"{deriv[1]}{deriv[2]}_%y%m%d",
                ).strftime("%Y%m%d")
            )
            key = f"{deriv[1]}/{deriv[2]}-{future_expiration_date}"

            print(f"Fetched futures price {price} for {key} from Binance")

            entries.append(
                construct_entry(
                    key=key.lower(),
                    value=price_int,
                    timestamp=timestamp,
                    publisher=publisher,
                )
            )

    return entries


async def fetch_ftx(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-ftx"

    base_url = "https://ftx.com/api"
    endpoint = "/markets"

    FTX_API_KEY = os.environ.get("FTX_API_KEY")
    FTX_API_SECRET = os.environ.get("FTX_API_SECRET")

    timestamp = int(time.time() * 1000)
    signature = hmac.new(
        FTX_API_SECRET.encode(),
        (str(timestamp) + "GET" + endpoint).encode("ascii"),
        "sha256",
    ).hexdigest()

    headers = {
        "FTX-KEY": FTX_API_KEY,
        "FTX-SIGN": signature,
        "FTX-TS": str(timestamp),
    }

    response = requests.get(base_url + endpoint, headers=headers)

    entries = []

    for price_pair in spot_price_pairs:
        result = [
            e for e in response.json()["result"] if e["name"] == "/".join(price_pair)
        ]
        if len(result) == 0:
            print(f"No entry found for {'/'.join(price_pair)} from FTX")
            continue

        assert (
            len(result) == 1
        ), f"Found more than one matching entries for FTX response and price pair {price_pair}"
        price = float(result[0]["price"])
        price_int = int(price * (10**decimals))
        timestamp = int(time.time())

        print(f"Fetched price {price} for {'/'.join(price_pair)} from FTX")

        entries.append(
            construct_entry(
                key="/".join(price_pair).lower(),
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )

    endpoint = "/futures"
    timestamp = int(time.time() * 1000)
    signature = hmac.new(
        FTX_API_SECRET.encode(),
        (str(timestamp) + "GET" + endpoint).encode("ascii"),
        "sha256",
    ).hexdigest()

    headers = {
        "FTX-KEY": FTX_API_KEY,
        "FTX-SIGN": signature,
        "FTX-TS": str(timestamp),
    }

    response = requests.get(base_url + endpoint, headers=headers)

    for deriv in derivatives:
        if deriv[0] != "FUTURE":
            print(f"Unable to fetch price from FTX for non-future derivative {deriv}")
            continue
        if deriv[2] != "USD":
            print(f"Unable to fetch price from FTX for non-USD derivative {deriv}")
            continue

        result = [
            e
            for e in response.json()["result"]
            if re.match(rf"{deriv[1]}-[0-9]+", e["name"])
        ]
        if len(result) == 0:
            print(f"No entry found for {'/'.join(price_pair)} from FTX")
            continue

        for future in result:
            timestamp = int(time.time())
            price = float(future["mark"])
            price_int = int(price * (10**decimals))

            future_expiration_date = int(
                datetime.datetime.strptime(
                    future["expiry"],
                    "%Y-%m-%dT%H:%M:%S%z",
                ).strftime("%Y%m%d")
            )
            key = f"{deriv[1]}/{deriv[2]}-{future_expiration_date}"

            print(f"Fetched futures price {price} for {key} from FTX")

            entries.append(
                construct_entry(
                    key=key.lower(),
                    value=price_int,
                    timestamp=timestamp,
                    publisher=publisher,
                )
            )

    return entries


async def fetch_cex(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-cex"
    base_url = "https://cex.io/api/ticker"

    entries = []

    for price_pair in spot_price_pairs:
        response = requests.get(f"{base_url}/{price_pair[0]}/{price_pair[1]}")
        result = response.json()

        timestamp = int(result["timestamp"])
        price = float(result["last"])
        price_int = int(price * (10**decimals))

        print(f"Fetched price {price} for {'/'.join(price_pair)} from CEX")

        entries.append(
            construct_entry(
                key="/".join(price_pair).lower(),
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )
    return entries


async def fetch_bitstamp(spot_price_pairs, derivatives, decimals):
    publisher = "pontis-bitstamp"
    base_url = "https://www.bitstamp.net/api/v2/ticker"

    entries = []

    for price_pair in spot_price_pairs:
        response = requests.get(f"{base_url}/{price_pair[0].lower()}{price_pair[1].lower()}")

        result = response.json()

        timestamp = int(result["timestamp"])
        price = float(result["last"])
        price_int = int(price * (10**decimals))

        print(f"Fetched price {price} for {'/'.join(price_pair)} from Bitstamp")

        entries.append(
            construct_entry(
                key="/".join(price_pair).lower(),
                value=price_int,
                timestamp=timestamp,
                publisher=publisher,
            )
        )
    return entries

async def publish_all(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS):

    entries = []
    private_keys = []

    try:
        coinapi_entries = await fetch_coinapi(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS)
        entries.extend(coinapi_entries)
        coinapi_private_key = int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coinapi_private_key] * len(coinapi_entries))
    except Exception as e:
        print(f"Error fetching Coinapi price: {e}")

    try:
        coinmarketcap_entries = await fetch_coinmarketcap(
            SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS
        )
        entries.extend(coinmarketcap_entries)
        coinmarketcap_private_key = int(
            os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")
        )
        private_keys.extend([coinmarketcap_private_key] * len(coinmarketcap_entries))
    except Exception as e:
        print(f"Error fetching Coinmarketcap price: {e}")

    try:
        coingecko_entries = await fetch_coingecko(
            SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS
        )
        entries.extend(coingecko_entries)
        coingecko_private_key = int(os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coingecko_private_key] * len(coingecko_entries))
    except Exception as e:
        print(f"Error fetching Coingecko price: {e}")

    try:
        coinbase_entries = await fetch_coinbase(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS)
        entries.extend(coinbase_entries)
        coinbase_pricate_key = int(os.environ.get("COINBASE_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coinbase_pricate_key] * len(coinbase_entries))
    except Exception as e:
        print(f"Error fetching Coinbase price: {e}")

    try:
        gemini_entries = await fetch_gemini(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS)
        entries.extend(gemini_entries)
        gemini_private_key = int(os.environ.get("GEMINI_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([gemini_private_key] * len(gemini_entries))
    except Exception as e:
        print(f"Error fetching Gemini price: {e}")

    try:
        binance_entries = await fetch_binance(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS)
        entries.extend(binance_entries)
        binance_private_key = int(os.environ.get("BINANCE_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([binance_private_key] * len(binance_entries))
    except Exception as e:
        print(f"Error fetching Binance price: {e}")

    try:
        ftx_entries = await fetch_ftx(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS)
        entries.extend(ftx_entries)
        ftx_private_key = int(os.environ.get("FTX_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([ftx_private_key] * len(ftx_entries))
    except Exception as e:
        print(f"Error fetching FTX price: {e}")

    try:
        cex_entries = await fetch_cex(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS)
        entries.extend(cex_entries)
        cex_private_key = int(os.environ.get("CEX_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([cex_private_key] * len(cex_entries))
    except Exception as e:
        print(f"Error fetching CEX price: {e}")

    try:
        bitstamp_entries = await fetch_bitstamp(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS)
        entries.extend(bitstamp_entries)
        bitstamp_private_key = int(os.environ.get("BITSTAMP_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([bitstamp_private_key] * len(bitstamp_entries))
    except Exception as e:
        print(f"Error fetching Bitstamp price: {e}")

    response = await PontisPublisherClient.publish_many(
        ORACLE_PROXY_ADDRESS, NETWORK, entries, private_keys
    )
    print(f"Bulk updated with response {response}")

    # Post success to Better Uptime
    requests.get("https://betteruptime.com/api/v1/heartbeat/eLy7zigidGbx5s6jnsfQiqJQ")


if __name__ == "__main__":
    DECIMALS = 18
    SPOT_PRICE_PAIRS = [
        ("ETH", "USD"),
        ("BTC", "USD"),
        ("LUNA", "USD"),
        ("SOL", "USD"),
        ("AVAX", "USD"),
        ("DOGE", "USD"),
        ("SHIB", "USD"),
        ("TEMP", "USD"),
        ("ETH", "MXN"),
    ]
    DERIVATIVES = [("FUTURE", "BTC", "USD"), ("FUTURE", "ETH", "USD")]

    asyncio.run(publish_all(SPOT_PRICE_PAIRS, DERIVATIVES, DECIMALS))
