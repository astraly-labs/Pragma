import asyncio
import os
import traceback

import requests
from dotenv import load_dotenv
from empiric.core.logger import get_stream_logger
from empiric.core.utils import log_entry
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetch import (
    fetch_bitstamp,
    fetch_cex,
    fetch_coinbase,
    fetch_coingecko,
    fetch_cryptowatch,
    fetch_ftx,
    fetch_gemini,
)
from empiric.publisher.fetch.thegraph import fetch_thegraph

logger = get_stream_logger()


async def publish_all(assets):
    # load environment variables from .env
    load_dotenv()

    exit_on_error = os.environ.get("__EMPIRIC_PUBLISHER_EXIT_ON_ERROR__") == "TRUE"

    entries = []

    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    publisher_client = EmpiricPublisherClient(publisher_private_key, publisher_address)

    try:
        coingecko_entries = fetch_coingecko(assets, publisher)
        await publisher_client.publish_many(coingecko_entries)
        entries.extend(coingecko_entries)
    except Exception as e:
        logger.error(f"Error fetching Coingecko price: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        coinbase_entries = fetch_coinbase(assets, publisher)
        await publisher_client.publish_many(coinbase_entries)
        entries.extend(coinbase_entries)
    except Exception as e:
        logger.error(f"Error fetching Coinbase price: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

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
        ftx_entries = fetch_ftx(assets, publisher)
        await publisher_client.publish_many(ftx_entries)
        entries.extend(ftx_entries)
    except Exception as e:
        logger.error(f"Error fetching FTX price: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        cex_entries = fetch_cex(assets, publisher)
        await publisher_client.publish_many(cex_entries)
        entries.extend(cex_entries)
    except Exception as e:
        logger.error(f"Error fetching CEX price: {e}")
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

    try:
        thegraph_entries = fetch_thegraph(assets, publisher)
        await publisher_client.publish_many(thegraph_entries)
        entries.extend(thegraph_entries)
    except Exception as e:
        logger.error(f"Error fetching The Graph data: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        cryptowatch_entries = fetch_cryptowatch(assets, publisher)
        await publisher_client.publish_many(cryptowatch_entries)
        entries.extend(cryptowatch_entries)
    except Exception as e:
        logger.error(f"Error fetching Cryptowatch price: {e}")
        logger.error(traceback.format_exc())
        if exit_on_error:
            raise e

    logger.info("Publishing the following entries:")
    for entry in entries:
        log_entry(entry, logger=logger)

    # Post success to Better Uptime
    betteruptime_id = os.environ.get("BETTERUPTIME_ID")
    requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")


if __name__ == "__main__":
    asyncio.run(publish_all(EMPIRIC_ALL_ASSETS))
