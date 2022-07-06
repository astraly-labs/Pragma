import asyncio
import os

from pontis.publisher.assets import PONTIS_ALL_ASSETS
from pontis.publisher.client import PontisPublisherClient
from pontis.publisher.fetch import fetch_coinbase

DECIMALS = 18


async def main():
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)

    assets = PONTIS_ALL_ASSETS

    entries = fetch_coinbase(assets)

    publisher_client = PontisPublisherClient(publisher_private_key, publisher_address)
    await publisher_client.publish_many(entries)


if __name__ == "__main__":

    asyncio.run(main())
