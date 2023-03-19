import asyncio
import os

from pragma.core.logger import get_stream_logger
from pragma.core.utils import log_entry
from pragma.publisher.assets import PRAGMA_ALL_ASSETS
from pragma.publisher.client import PragmaPublisherClient
from pragma.publisher.fetchers import CexFetcher

logger = get_stream_logger()


async def main():
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))

    publisher_client = PragmaPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    cex_fetcher = CexFetcher(PRAGMA_ALL_ASSETS, publisher)
    publisher_client.add_fetcher(cex_fetcher)
    _entries = await publisher_client.fetch()

    response = await publisher_client.publish_many(_entries, pagination=20)
    for res in response:
        logger.info(f"hash: {res.hash}")
        await res.wait_for_acceptance()

    for entry in _entries:
        log_entry(entry, logger=logger)


if __name__ == "__main__":
    asyncio.run(main())
