import asyncio
import os

import requests
from empiric.core.logger import get_stream_logger
from empiric.core.utils import log_entry
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import (
    BitstampFetcher,
    CexFetcher,
    CoinbaseFetcher,
    FtxFetcher,
    TheGraphFetcher,
)

logger = get_stream_logger()


async def publish_all(assets):
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = EmpiricPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    logger.info(f"publisher address: {publisher_address}")

    publisher_client.add_fetchers(
        [
            fetcher(assets, publisher)
            for fetcher in (
                BitstampFetcher,
                CexFetcher,
                CoinbaseFetcher,
                FtxFetcher,
                TheGraphFetcher,
            )
        ]
    )
    _entries = await publisher_client.fetch()
    response = await publisher_client.publish_many(_entries, pagination=100)
    for res in response:
        await res.wait_for_acceptance()

    logger.info("Publishing the following entries:")
    for entry in _entries:
        log_entry(entry, logger=logger)

    # Post success to Better Uptime
    betteruptime_id = os.environ.get("BETTERUPTIME_ID")
    requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")


if __name__ == "__main__":
    asyncio.run(publish_all(EMPIRIC_ALL_ASSETS))
