import asyncio
import os

import requests
from pontis.core.const import NETWORK, ORACLE_PROXY_ADDRESS
from pontis.core.utils import pprint_entry
from pontis.publisher.binance import fetch_binance
from pontis.publisher.client import PontisPublisherClient
from pontis.publisher.coinapi import fetch_coinapi
from pontis.publisher.coinbase import fetch_coinbase
from pontis.publisher.coingecko import fetch_coingecko
from pontis.publisher.coinmarketcap import fetch_coinmarketcap
from pontis.publisher.ftx import fetch_ftx
from pontis.publisher.gemini import fetch_gemini


async def publish_all(assets):

    entries = []
    private_keys = []

    for i, asset in enumerate(assets):
        """
        key = currency_pair_to_key(*asset["pair"])
        decimals = PontisPublisherClient.get_decimals(
            ORACLE_PROXY_ADDRESS, NETWORK, key
        )
        """
        assets[i]["decimals"] = 18

    try:
        coinapi_entries = fetch_coinapi(assets)
        entries.extend(coinapi_entries)
        coinapi_private_key = int(os.environ.get("COINAPI_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coinapi_private_key] * len(coinapi_entries))
    except Exception as e:
        print(f"Error fetching Coinapi price: {e}")

    try:
        coinmarketcap_entries = fetch_coinmarketcap(assets)
        entries.extend(coinmarketcap_entries)
        coinmarketcap_private_key = int(
            os.environ.get("COINMARKETCAP_PUBLISHER_PRIVATE_KEY")
        )
        private_keys.extend([coinmarketcap_private_key] * len(coinmarketcap_entries))
    except Exception as e:
        print(f"Error fetching Coinmarketcap price: {e}")

    try:
        coingecko_entries = fetch_coingecko(assets)
        entries.extend(coingecko_entries)
        coingecko_private_key = int(os.environ.get("COINGECKO_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coingecko_private_key] * len(coingecko_entries))
    except Exception as e:
        print(f"Error fetching Coingecko price: {e}")

    try:
        coinbase_entries = fetch_coinbase(assets)
        entries.extend(coinbase_entries)
        coinbase_pricate_key = int(os.environ.get("COINBASE_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([coinbase_pricate_key] * len(coinbase_entries))
    except Exception as e:
        print(f"Error fetching Coinbase price: {e}")

    try:
        gemini_entries = fetch_gemini(assets)
        entries.extend(gemini_entries)
        gemini_private_key = int(os.environ.get("GEMINI_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([gemini_private_key] * len(gemini_entries))
    except Exception as e:
        print(f"Error fetching Gemini price: {e}")

    try:
        binance_entries = fetch_binance(assets)
        entries.extend(binance_entries)
        binance_private_key = int(os.environ.get("BINANCE_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([binance_private_key] * len(binance_entries))
    except Exception as e:
        print(f"Error fetching Binance price: {e}")

    try:
        ftx_entries = await fetch_ftx(assets)
        entries.extend(ftx_entries)
        ftx_private_key = int(os.environ.get("FTX_PUBLISHER_PRIVATE_KEY"))
        private_keys.extend([ftx_private_key] * len(ftx_entries))
    except Exception as e:
        print(f"Error fetching FTX price: {e}")

    print("Publishing the following entries:")
    for entry in entries:
        pprint_entry(entry)

    response = await PontisPublisherClient.publish_many(
        ORACLE_PROXY_ADDRESS, NETWORK, entries, private_keys
    )
    print(f"Bulk updated with response {response}")

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
