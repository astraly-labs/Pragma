import asyncio
import os

from pontis.core.client import PontisClient
from pontis.core.utils import key_for_asset
from pontis.publisher.assets import PONTIS_ALL_ASSETS
from pontis.publisher.client import PontisPublisherClient
from pontis.publisher.fetch import fetch_coinbase

DECIMALS = 18


async def main():
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))

    assets = PONTIS_ALL_ASSETS

    client = PontisClient()
    for i, asset in enumerate(assets):
        key = key_for_asset(asset)
        decimals = await client.get_decimals(key)
        assets[i]["decimals"] = decimals

    entries = fetch_coinbase(assets)

    publisher_client = PontisPublisherClient(publisher_private_key, publisher_address)
    await publisher_client.publish_many(entries)


if __name__ == "__main__":

    asyncio.run(main())
