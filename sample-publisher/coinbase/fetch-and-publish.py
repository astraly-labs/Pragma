import asyncio
import os

from pontis.core.client import PontisClient
from pontis.core.utils import currency_pair_to_key
from pontis.publisher.client import PontisPublisherClient
from pontis.publisher.coinbase import fetch_coinbase

DECIMALS = 18


async def main():
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))

    assets = [
        {"type": "SPOT", "pair": ("BTC", "USD")},
        {"type": "SPOT", "pair": ("ETH", "USD")},
    ]

    client = PontisClient()
    for i, asset in enumerate(assets):
        key = currency_pair_to_key(*asset["pair"])
        decimals = await client.get_decimals(key)
        assets[i]["decimals"] = decimals

    entries = fetch_coinbase(assets)

    publisher_client = PontisPublisherClient(publisher_private_key, publisher_address)
    for entry in entries:
        await publisher_client.publish(entry)


if __name__ == "__main__":

    asyncio.run(main())
