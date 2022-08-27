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
            pair_id_ = "ethereum"
        elif pair[0] == "BTC":
            pair_id_ = "bitcoin"
        elif pair[0] == "SOL":
            pair_id_ = "solana"
        elif pair[0] == "AVAX":
            pair_id_ = "avalanche-2"
        elif pair[0] == "DOGE":
            pair_id_ = "dogecoin"
        elif pair[0] == "SHIB":
            pair_id_ = "shiba-inu"
        elif pair[0] == "TEMP":
            pair_id_ = "tempus"
        elif pair[0] == "DAI":
            pair_id_ = "dai"
        elif pair[0] == "USDT":
            pair_id_ = "tether"
        elif pair[0] == "USDC":
            pair_id_ = "usd-coin"
        elif pair[0] == "TUSD":
            pair_id_ = "true-usd"
        elif pair[0] == "BUSD":
            pair_id_ = "binance-usd"
        elif pair[0] == "BNB":
            pair_id_ = "binancecoin"
        elif pair[0] == "ADA":
            pair_id_ = "cardano"
        elif pair[0] == "XRP":
            pair_id_ = "ripple"
        elif pair[0] == "MATIC":
            pair_id_ = "matic-network"
        elif pair[0] == "AAVE":
            pair_id_ = "aave"
        else:
            raise Exception(
                f"Unknown price pair, do not know how to query coingecko for {pair[0]}"
            )

        url = f"https://api.coingecko.com/api/v3/coins/{pair_id_}?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false"

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
