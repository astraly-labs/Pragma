import asyncio
import os
import traceback

import requests
from pontis.core.utils import pprint_entry
from pontis.publisher.assets import PONTIS_ALL_ASSETS
from pontis.publisher.client import PontisPublisherClient
from pontis.publisher.fetch import (
    fetch_bitstamp,
    fetch_cex,
    fetch_coinbase,
    fetch_coingecko,
    fetch_cryptowatch,
    fetch_ftx,
    fetch_gemini,
)
from pontis.publisher.fetch.thegraph import fetch_thegraph


async def publish_all(assets):

    exit_on_error = os.environ.get("__PONTIS_PUBLISHER_EXIT_ON_ERROR__") == "TRUE"

    entries = []

    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = PontisPublisherClient(publisher_private_key, publisher_address)

    try:
        coingecko_entries = fetch_coingecko(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(coingecko_entries)
        entries.extend(coingecko_entries)
    except Exception as e:
        print(f"Error fetching Coingecko price: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        coinbase_entries = fetch_coinbase(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(coinbase_entries)
        entries.extend(coinbase_entries)
    except Exception as e:
        print(f"Error fetching Coinbase price: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        gemini_entries = fetch_gemini(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(gemini_entries)
        entries.extend(gemini_entries)
    except Exception as e:
        print(f"Error fetching Gemini price: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        ftx_entries = fetch_ftx(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(ftx_entries)
        entries.extend(ftx_entries)
    except Exception as e:
        print(f"Error fetching FTX price: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        cex_entries = fetch_cex(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(cex_entries)
        entries.extend(cex_entries)
    except Exception as e:
        print(f"Error fetching CEX price: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        bitstamp_entries = fetch_bitstamp(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(bitstamp_entries)
        entries.extend(bitstamp_entries)
    except Exception as e:
        print(f"Error fetching Bitstamp price: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        thegraph_entries = fetch_thegraph(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(thegraph_entries)
        entries.extend(thegraph_entries)
    except Exception as e:
        print(f"Error fetching The Graph data: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    try:
        cryptowatch_entries = fetch_cryptowatch(assets, publisher)
        tx_exec_info = await publisher_client.publish_many(cryptowatch_entries)
        entries.extend(cryptowatch_entries)
    except Exception as e:
        print(f"Error fetching Cryptowatch price: {e}")
        print(traceback.format_exc())
        if exit_on_error:
            raise e

    print("Publishing the following entries:")
    for entry in entries:
        pprint_entry(entry)

    # Post success to Better Uptime
    betteruptime_id = os.environ.get("BETTERUPTIME_ID")
    requests.get(f"https://betteruptime.com/api/v1/heartbeat/{betteruptime_id}")

    # Wait for the last transaction we sent (tx_exec_info is overwritten) to be confirmed
    print("Waiting for last tx to be confirmed...")
    await publisher_client.wait_for_tx(tx_exec_info.hash, wait_for_accept=True)
    print("Completed, exiting")


if __name__ == "__main__":
    asyncio.run(publish_all(PONTIS_ALL_ASSETS))
