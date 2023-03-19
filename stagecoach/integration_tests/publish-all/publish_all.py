import asyncio
import os

import requests
from pragma.core.logger import get_stream_logger
from pragma.core.utils import log_entry
from pragma.publisher.assets import PRAGMA_ALL_ASSETS
from pragma.publisher.client import PragmaPublisherClient
from pragma.publisher.fetchers import (
    BitstampFetcher,
    CexFetcher,
    CoinbaseFetcher,
    GeminiFetcher,
)

logger = get_stream_logger()


async def publish_all(assets):
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    network = os.environ.get("NETWORK")
    publisher_client = PragmaPublisherClient(
        network=network,
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    logger.info(
        "publisher registry: %s",
        publisher_client.contract_addresses_config.publisher_registry_address,
    )
    logger.info(
        "oracle proxy: %s",
        publisher_client.contract_addresses_config.oracle_proxy_address,
    )
    logger.info(f"publisher: {publisher}")
    logger.info(f"publisher address: {publisher_address}")

    publisher_client.add_fetchers(
        [
            fetcher(assets, publisher)
            for fetcher in (
                BitstampFetcher,
                CexFetcher,
                CoinbaseFetcher,
                GeminiFetcher,
            )
        ]
    )
    _entries = await publisher_client.fetch()
    response = await publisher_client.publish_many(_entries)

    logger.info("Publishing the following entries:")
    for entry in _entries:
        log_entry(entry, logger=logger)

    logger.info(
        f"With transaction hash(es): {' '.join([str(r.hash) for r in response])}"
    )

    for res in response:
        await res.wait_for_acceptance()

    # Post success to Better Uptime
    betteruptime_id = os.environ.get("BETTERUPTIME_ID")
    requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")


if __name__ == "__main__":
    asyncio.run(publish_all(PRAGMA_ALL_ASSETS))
