import asyncio
import os

from empiric.core.logger import get_stream_logger
from empiric.core.utils import log_entry
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import AscendexFetcher

logger = get_stream_logger()


async def main():
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    network = os.environ.get("NETWORK")
    publisher_client = EmpiricPublisherClient(
        network=network,
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    ascendex_fetcher = AscendexFetcher(EMPIRIC_ALL_ASSETS, publisher)
    publisher_client.add_fetcher(ascendex_fetcher)
    _entries = await publisher_client.fetch()

    response = await publisher_client.publish_many(_entries)

    for (i, res) in enumerate(response):
        print(f"Published data with tx_hash: {hex(res.hash)}")
        await res.wait_for_acceptance()


if __name__ == "__main__":
    asyncio.run(main())
