import asyncio
import os

from empiric.publisher_.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher_.client import EmpiricPublisherClient
from empiric.publisher_.fetchers import CoinbaseFetcher


async def main():
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)

    publisher_client = EmpiricPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    coinbase_fetcher = CoinbaseFetcher(EMPIRIC_ALL_ASSETS, publisher)
    publisher_client.add_fetcher(coinbase_fetcher)
    _entries = await publisher_client.fetch()

    await publisher_client.publish_many(_entries, pagination=20)


if __name__ == "__main__":
    asyncio.run(main())
