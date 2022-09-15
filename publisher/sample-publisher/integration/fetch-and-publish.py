import asyncio
import os
import traceback

from empiric.core_.logger import get_stream_logger
from empiric.core_.types import INTEGRATION
from empiric.core_.utils import log_entry
from empiric.publisher.assets import get_spot_asset_spec_for_key
from empiric.publisher_.client import EmpiricPublisherClient
from empiric.publisher_.fetchers import BitstampFetcher, GeminiFetcher

logger = get_stream_logger()


async def publish_all(assets):

    exit_on_error = os.environ.get("__EMPIRIC_PUBLISHER_EXIT_ON_ERROR__") == "TRUE"

    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    publisher_client = EmpiricPublisherClient(
        INTEGRATION,
        publisher_private_key,
        publisher_address,
    )

    bitstamp_fetcher = BitstampFetcher(publisher, assets)
    gemini_fetcher = GeminiFetcher(publisher, assets)

    publisher_client.add_fetcher(gemini_fetcher)
    publisher_client.add_fetcher(bitstamp_fetcher)

    try:
        _entries = await publisher_client.fetch()
        await publisher_client.publish_many(_entries, pagination=20)
    except Exception as e:
        logger.error(f"Error fetching Gemini price: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    logger.info("Publishing the following entries:")
    for entry in _entries:
        log_entry(entry, logger=logger)


if __name__ == "__main__":
    asyncio.run(publish_all([get_spot_asset_spec_for_key("eth/usd")]))
