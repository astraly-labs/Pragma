import asyncio
import os
import traceback

from empiric.core.logger import get_stream_logger
from empiric.core.types import INTEGRATION
from empiric.core.utils import log_entry
from empiric.publisher.assets import get_spot_asset_spec_for_key
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetch import fetch_bitstamp, fetch_gemini

logger = get_stream_logger()


async def publish_all(assets):

    exit_on_error = os.environ.get("__EMPIRIC_PUBLISHER_EXIT_ON_ERROR__") == "TRUE"

    entries = []

    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    publisher_client = EmpiricPublisherClient(
        publisher_private_key, publisher_address, network=INTEGRATION
    )
    try:
        gemini_entries = fetch_gemini(assets, publisher)
        await publisher_client.publish_many(gemini_entries)
        entries.extend(gemini_entries)
    except Exception as e:
        logger.error(f"Error fetching Gemini price: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        bitstamp_entries = fetch_bitstamp(assets, publisher)
        await publisher_client.publish_many(bitstamp_entries)
        entries.extend(bitstamp_entries)
    except Exception as e:
        logger.error(f"Error fetching Bitstamp price: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    logger.info("Publishing the following entries:")
    for entry in entries:
        log_entry(entry)


if __name__ == "__main__":
    asyncio.run(publish_all([get_spot_asset_spec_for_key("eth/usd")]))
