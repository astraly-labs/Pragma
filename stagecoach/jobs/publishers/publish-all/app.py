import asyncio
import os

import requests
from empiric.core import SpotEntry
from empiric.core.logger import get_stream_logger
from empiric.core.utils import log_entry
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import (
    CexFetcher,
    TheGraphFetcher,
)

logger = get_stream_logger()


def handler(event, context):
    entries_ = asyncio.run(_handler(EMPIRIC_ALL_ASSETS))
    serialized_entries_ = SpotEntry.serialize_entries(entries_)
    print(serialized_entries_)
    return {
        "result": serialized_entries_,
    }

async def _handler(assets):
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = EmpiricPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    publisher_client.add_fetchers(
        [
            fetcher(assets, publisher)
            for fetcher in (
                CexFetcher,
                TheGraphFetcher,
            )
        ]
    )
    _entries = await publisher_client.fetch()
    response = await publisher_client.publish_many(_entries, pagination=50)
    for res in response:
        await res.wait_for_acceptance()

    logger.info("Publishing the following entries:")
    return _entries


if __name__ == "__main__":
    handler(None, None)
