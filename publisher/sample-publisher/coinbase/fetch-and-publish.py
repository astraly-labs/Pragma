import asyncio
import os

from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetch import fetch_coinbase

DECIMALS = 18


async def main():
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)

    assets = EMPIRIC_ALL_ASSETS

    entries = fetch_coinbase(assets)

    publisher_client = EmpiricPublisherClient(publisher_private_key, publisher_address)
    await publisher_client.publish_many(entries)


if __name__ == "__main__":

    asyncio.run(main())
