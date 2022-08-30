import datetime
import logging
from typing import List

import requests
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_key

logger = logging.getLogger(__name__)


def fetch_coingecko(assets, publisher) -> List[Entry]:
    source = "coingecko"

    headers = {
        "Accepts": "application/json",
    }

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            logger.debug(f"Skipping Coingecko for non-spot asset {asset}")
            continue

        pair = asset["pair"]
        pair_id = currency_pair_to_key(*pair)

        if pair[0] == "ETH":
            coingecko_quote_currency_name = "ethereum"
        elif pair[0] == "BTC":
            coingecko_quote_currency_name = "bitcoin"
        elif pair[0] == "SOL":
            coingecko_quote_currency_name = "solana"
        elif pair[0] == "AVAX":
            coingecko_quote_currency_name = "avalanche-2"
        elif pair[0] == "DOGE":
            coingecko_quote_currency_name = "dogecoin"
        elif pair[0] == "SHIB":
            coingecko_quote_currency_name = "shiba-inu"
        elif pair[0] == "TEMP":
            coingecko_quote_currency_name = "tempus"
        elif pair[0] == "DAI":
            coingecko_quote_currency_name = "dai"
        elif pair[0] == "USDT":
            coingecko_quote_currency_name = "tether"
        elif pair[0] == "USDC":
            coingecko_quote_currency_name = "usd-coin"
        elif pair[0] == "TUSD":
            coingecko_quote_currency_name = "true-usd"
        elif pair[0] == "BUSD":
            coingecko_quote_currency_name = "binance-usd"
        elif pair[0] == "BNB":
            coingecko_quote_currency_name = "binancecoin"
        elif pair[0] == "ADA":
            coingecko_quote_currency_name = "cardano"
        elif pair[0] == "XRP":
            coingecko_quote_currency_name = "ripple"
        elif pair[0] == "MATIC":
            coingecko_quote_currency_name = "matic-network"
        elif pair[0] == "AAVE":
            coingecko_quote_currency_name = "aave"
        else:
            raise Exception(
                f"Unknown price pair, do not know how to query coingecko for {pair[0]}"
            )

        url = f"https://api.coingecko.com/api/v3/coins/{coingecko_quote_currency_name}?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false"

        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        price = response.json()["market_data"]["current_price"][pair[1].lower()]
        timestamp = int(
            datetime.datetime.strptime(
                response.json()["last_updated"],
                "%Y-%m-%dT%H:%M:%S.%f%z",
            ).timestamp()
        )
        price_int = int(price * (10 ** asset["decimals"]))

        logger.info(f"Fetched price {price} for {pair_id} from Coingecko")

        entries.append(
            Entry(
                pair_id=pair_id,
                value=price_int,
                timestamp=timestamp,
                source=source,
                publisher=publisher,
            )
        )

    return entries
