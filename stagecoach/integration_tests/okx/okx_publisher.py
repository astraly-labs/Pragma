import asyncio
import os

from pragma.core.logger import get_stream_logger
from pragma.core.utils import log_entry
from pragma.publisher.assets import PRAGMA_ALL_ASSETS
from pragma.publisher.client import PragmaPublisherClient
from pragma.publisher.fetchers import OkxFetcher

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
    okx_fetcher = OkxFetcher(PRAGMA_ALL_ASSETS, publisher)
    publisher_client.add_fetcher(okx_fetcher)
    _entries = await publisher_client.fetch()
    print(_entries)

    response = await publisher_client.publish_many(_entries)

    for (i, res) in enumerate(response):
        print(f"Published data with tx_hash: {hex(res.hash)}")
        await res.wait_for_acceptance()


if __name__ == "__main__":
    asyncio.run(main())
