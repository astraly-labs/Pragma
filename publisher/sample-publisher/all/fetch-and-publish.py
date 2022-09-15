import asyncio
import os

import requests
from empiric.core_.config import ContractAddresses
from empiric.core_.logger import get_stream_logger
from empiric.core_.utils import log_entry
from empiric.publisher_.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher_.client import EmpiricPublisherClient
from empiric.publisher_.fetchers import (  # CoingeckoFetcher,
    BitstampFetcher,
    CexFetcher,
    CoinbaseFetcher,
    CryptowatchFetcher,
    FtxFetcher,
    GeminiFetcher,
    TheGraphFetcher,
)

logger = get_stream_logger()


async def publish_all(assets):
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    publisher_client = EmpiricPublisherClient(
        network='local',
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
        contract_addresses_config=ContractAddresses(2756386738475413261477141421684344364774760819536870953878747417517432039780, 3220625633324589292531790784257888220189966136260732135803227954141242893538),
    )
    publisher_client.add_fetchers(
        [
            fetcher(assets, publisher)
            for fetcher in (
                BitstampFetcher,
                CexFetcher,
                CoinbaseFetcher,
                CryptowatchFetcher,
                FtxFetcher,
                GeminiFetcher,
                TheGraphFetcher,
            )
        ]
    )
    _entries = await publisher_client.fetch()
    await publisher_client.publish_many(_entries, pagination=10)

    logger.info("Publishing the following entries:")
    for entry in _entries:
        log_entry(entry, logger=logger)

    # Post success to Better Uptime
    betteruptime_id = os.environ.get("BETTERUPTIME_ID")
    requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")


if __name__ == "__main__":
    asyncio.run(publish_all(EMPIRIC_ALL_ASSETS))
