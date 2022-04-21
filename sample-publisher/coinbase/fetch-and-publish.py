import asyncio
import base64
import datetime
import hmac
import os
from hashlib import sha256

import requests
from pontis.publisher.client import PontisPublisherClient
from pontis.core.const import NETWORK, ORACLE_ADDRESS

DECIMALS = 10


async def main():
    price_pairs = [("USD", "ETH")]

    API_SECRET = os.environ.get("API_SECRET")
    API_KEY = os.environ.get("API_KEY")
    API_PASSPHRASE = os.environ.get("API_PASSPHRASE")
    url = "https://api.exchange.coinbase.com"
    request_path = "/oracle"
    method = "GET"

    PUBLISHER_PRIVATE_KEY = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher = "coinbase"

    for price_pair in price_pairs:
        request_timestamp = str(
            int(
                datetime.datetime.now(datetime.timezone.utc)
                .replace(tzinfo=datetime.timezone.utc)
                .timestamp()
            )
        )

        signature = hmac.new(
            base64.b64decode(API_SECRET),
            (request_timestamp + method + request_path).encode("ascii"),
            sha256,
        )

        headers = {
            "Accept": "application/json",
            "CB-ACCESS-KEY": API_KEY,
            "CB-ACCESS-SIGN": base64.b64encode(signature.digest()),
            "CB-ACCESS-TIMESTAMP": request_timestamp,
            "CB-ACCESS-PASSPHRASE": API_PASSPHRASE,
        }

        response = requests.request(method, url + request_path, headers=headers)

        response.raise_for_status()
        result = response.json()
        price = float(result["prices"][price_pair[1]])
        price_int = int(price * (10**DECIMALS))

        timestamp = int(result["timestamp"])

        client = PontisPublisherClient(
            ORACLE_ADDRESS, PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
        )

        await client.publish("/".join(price_pair), price_int, timestamp)

        print(f"Submitted price {price} for {'/'.join(price_pair)} from Coinbase")


if __name__ == "__main__":

    asyncio.run(main())
