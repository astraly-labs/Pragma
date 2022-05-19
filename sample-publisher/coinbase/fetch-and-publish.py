import asyncio
import os

from pontis.core.const import NETWORK, ORACLE_CONTROLLER_ADDRESS
from pontis.core.utils import currency_pair_to_key
from pontis.publisher.client import PontisPublisherClient
from pontis.publisher.coinbase import fetch_coinbase

DECIMALS = 18


async def main():
    PUBLISHER_PRIVATE_KEY = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    PUBLISHER_PREFIX = os.environ.get("PUBLISHER_PREFIX")
    publisher = PUBLISHER_PREFIX + "-coinbase"

    assets = [
        {"type": "SPOT", "pair": ("BTC", "USD")},
        {"type": "SPOT", "pair": ("ETH", "USD")},
    ]

    for i, asset in enumerate(assets):
        key = currency_pair_to_key(*asset["pair"])
        decimals = PontisPublisherClient.get_decimals(
            ORACLE_CONTROLLER_ADDRESS, NETWORK, key
        )
        assets[i]["decimals"] = decimals

    entries = fetch_coinbase(assets)

    client = PontisPublisherClient(
        ORACLE_CONTROLLER_ADDRESS, PUBLISHER_PRIVATE_KEY, publisher, network=NETWORK
    )
    for entry in entries:
        await client.publish(entry.key, entry.value, entry.timestamp)


if __name__ == "__main__":

    asyncio.run(main())
