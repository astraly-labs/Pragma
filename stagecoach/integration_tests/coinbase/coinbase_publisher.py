import asyncio
import os

from pragma.core.logger import get_stream_logger
from pragma.core.utils import log_entry
from pragma.publisher.assets import PRAGMA_ALL_ASSETS
from pragma.publisher.client import PragmaPublisherClient
from pragma.publisher.fetchers import CoinbaseFetcher

logger = get_stream_logger()


async def main():
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    network = os.environ.get("NETWORK")
    publisher_client = PragmaPublisherClient(
        network=network,
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    coinbase_fetcher = CoinbaseFetcher(PRAGMA_ALL_ASSETS, publisher)
    publisher_client.add_fetcher(coinbase_fetcher)
    _entries = await publisher_client.fetch()

    response = await publisher_client.publish_many(_entries)
    for res in response:
        await res.wait_for_acceptance()

    for entry in _entries:
        log_entry(entry, logger=logger)


if __name__ == "__main__":
    asyncio.run(main())
