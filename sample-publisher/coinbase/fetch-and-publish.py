import asyncio
import base64
import datetime
import hmac
import os
from hashlib import sha256

import requests
from pontis.admin.client import PontisAdminClient
from pontis.core.const import NETWORK, ORACLE_PROXY_ADDRESS, PUBLISHER_REGISTRY_ADDRESS
from pontis.publisher.client import PontisPublisherClient
from starkware.crypto.signature.signature import private_to_stark_key

DECIMALS = 18


async def main():
    PUBLISHER_PRIVATE_KEY = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    PUBLISHER_PUBLIC_KEY = private_to_stark_key(PUBLISHER_PRIVATE_KEY)
    publisher = "pontis-coinbase"

    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        ORACLE_PROXY_ADDRESS,
        PUBLISHER_REGISTRY_ADDRESS,
        admin_private_key,
        network=NETWORK,
    )
    await admin_client.register_publisher_if_not_registered(
        PUBLISHER_PUBLIC_KEY, publisher
    )

    price_pairs = [("ETH", "USD"), ("BTC", "USD")]

    API_SECRET = os.environ.get("API_SECRET")
    API_KEY = os.environ.get("API_KEY")
    API_PASSPHRASE = os.environ.get("API_PASSPHRASE")
    url = "https://api.exchange.coinbase.com"
    request_path = "/oracle"
    method = "GET"

    client = PontisPublisherClient(
        ORACLE_PROXY_ADDRESS, PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
    )

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
        price = float(result["prices"][price_pair[0]])
        price_int = int(price * (10**DECIMALS))
        timestamp = int(result["timestamp"])

        await client.publish("/".join(price_pair).lower(), price_int, timestamp)

        print(f"Submitted price {price} for {'/'.join(price_pair)} from Coinbase")


if __name__ == "__main__":

    asyncio.run(main())
