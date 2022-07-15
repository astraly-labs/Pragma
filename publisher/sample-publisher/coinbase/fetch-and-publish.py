import asyncio
import os

from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetch import fetch_coinbase


async def main():
    publisher = int(os.environ.get("PUBLISHER"), 0)
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)

    entries = fetch_coinbase(EMPIRIC_ALL_ASSETS, publisher)

    publisher_client = EmpiricPublisherClient(publisher_private_key, publisher_address)
    await publisher_client.publish_many(entries)


if __name__ == "__main__":

    asyncio.run(main())
