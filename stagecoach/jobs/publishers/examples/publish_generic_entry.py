import asyncio
import os
import traceback
import time

from empiric.core.utils import log_entry
from empiric.core.logger import get_stream_logger
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import MystisFetcher
from empiric.core.utils import str_to_felt

logger = get_stream_logger()

NETWORK = os.environ["NETWORK"]

async def publish_generic_entry(address):

    exit_on_error = os.environ.get("__EMPIRIC_PUBLISHER_EXIT_ON_ERROR__") == "TRUE"

    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = EmpiricPublisherClient(
        network=NETWORK,
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )

    mystis_fetcher = MystisFetcher(publisher, address)
    publisher_client.add_fetcher(mystis_fetcher)

    try:
        _entry = await publisher_client.fetch()
        await publisher_client.publish_entry(
            key=address,
            value=_entry,
            timestamp=int(time.time()),
            source=str_to_felt("MYSTIS"),
            publisher=publisher
        )
    except Exception as e:
        logger.error(f"Error fetching Mystis amount token: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    logger.info("Publishing the following entry:")
    log_entry(_entry, logger=logger)


if __name__ == "__main__":
    asyncio.run(publish_generic_entry("0x04d36F93A1Ce6ee095Ab9FE6D5F516C8c316810f51FA29A18E92b6EC77Cf1687"))