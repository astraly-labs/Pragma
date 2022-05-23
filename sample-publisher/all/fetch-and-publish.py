import asyncio
import os

import requests
from pontis.core.client import PontisClient
from pontis.core.utils import currency_pair_to_key, pprint_entry
from pontis.publisher.client import PontisPublisherClient
from pontis.publisher.fetch import (
    fetch_binance,
    fetch_bitstamp,
    fetch_cex,
    fetch_coinapi,
    fetch_coinbase,
    fetch_coingecko,
    fetch_coinmarketcap,
    fetch_ftx,
    fetch_gemini,
)


async def publish_all(assets):

    entries = []

    client = PontisClient()
    for i, asset in enumerate(assets):
        key = currency_pair_to_key(*asset["pair"])
        decimals = await client.get_decimals(key)
        assets[i]["decimals"] = decimals

    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = PontisPublisherClient(publisher_private_key, publisher_address)

    try:
        coinapi_entries = fetch_coinapi(assets)
        await publisher_client.publish_many(coinapi_entries)
        entries.extend(coinapi_entries)
    except Exception as e:
        print(f"Error fetching Coinapi price: {e}")

    try:
        coinmarketcap_entries = fetch_coinmarketcap(assets)
        await publisher_client.publish_many(coinmarketcap_entries)
        entries.extend(coinmarketcap_entries)
    except Exception as e:
        print(f"Error fetching Coinmarketcap price: {e}")

    try:
        coingecko_entries = fetch_coingecko(assets)
        await publisher_client.publish_many(coingecko_entries)
        entries.extend(coingecko_entries)
    except Exception as e:
        print(f"Error fetching Coingecko price: {e}")

    try:
        coinbase_entries = fetch_coinbase(assets)
        await publisher_client.publish_many(coinbase_entries)
        entries.extend(coinbase_entries)
    except Exception as e:
        print(f"Error fetching Coinbase price: {e}")

    try:
        gemini_entries = fetch_gemini(assets)
        await publisher_client.publish_many(gemini_entries)
        entries.extend(gemini_entries)
    except Exception as e:
        print(f"Error fetching Gemini price: {e}")

    try:
        binance_entries = fetch_binance(assets)
        await publisher_client.publish_many(binance_entries)
        entries.extend(binance_entries)
    except Exception as e:
        print(f"Error fetching Binance price: {e}")

    try:
        ftx_entries = fetch_ftx(assets)
        await publisher_client.publish_many(ftx_entries)
        entries.extend(ftx_entries)
    except Exception as e:
        print(f"Error fetching FTX price: {e}")

    try:
        cex_entries = fetch_cex(assets)
        await publisher_client.publish_many(cex_entries)
        entries.extend(cex_entries)
    except Exception as e:
        print(f"Error fetching CEX price: {e}")

    try:
        bitstamp_entries = fetch_bitstamp(assets)
        await publisher_client.publish_many(bitstamp_entries)
        entries.extend(bitstamp_entries)
    except Exception as e:
        print(f"Error fetching Bitstamp price: {e}")

    print("Publishing the following entries:")
    for entry in entries:
        pprint_entry(entry)

    # Post success to Better Uptime
    requests.get("https://betteruptime.com/api/v1/heartbeat/eLy7zigidGbx5s6jnsfQiqJQ")


if __name__ == "__main__":
    assets = [
        {"type": "SPOT", "pair": ("BTC", "USD")},
        {"type": "SPOT", "pair": ("ETH", "USD")},
        {"type": "SPOT", "pair": ("LUNA", "USD")},
        {"type": "SPOT", "pair": ("SOL", "USD")},
        {"type": "SPOT", "pair": ("AVAX", "USD")},
        {"type": "SPOT", "pair": ("DOGE", "USD")},
        {"type": "SPOT", "pair": ("SHIB", "USD")},
        {"type": "SPOT", "pair": ("TEMP", "USD")},
        {"type": "SPOT", "pair": ("ETH", "MXN")},
        {"type": "FUTURE", "pair": ("BTC", "USD")},
        {"type": "FUTURE", "pair": ("ETH", "USD")},
    ]

    asyncio.run(publish_all(assets))
