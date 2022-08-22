import logging
from typing import List

import requests
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_key

logger = logging.getLogger(__name__)


def fetch_cex(assets, publisher) -> List[Entry]:
    source = "cex"
    base_url = "https://cex.io/api/ticker"

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            logger.debug(f"Skipping CEX for non-spot asset {asset}")
            continue

        pair = asset["pair"]
        response = requests.get(f"{base_url}/{pair[0]}/{pair[1]}", timeout=10)
        result = response.json()

        if "error" in result and result["error"] == "Invalid Symbols Pair":
            logger.debug(f"No data found for {'/'.join(pair)} from CEX")
            continue

        timestamp = int(result["timestamp"])
        price = float(result["last"])
        price_int = int(price * (10 ** asset["decimals"]))
        key = currency_pair_to_key(*pair)

        logger.info(f"Fetched price {price} for {'/'.join(pair)} from CEX")

        entries.append(
            Entry(
                key=key,
                value=price_int,
                timestamp=timestamp,
                source=source,
                publisher=publisher,
            )
        )

    return entries
