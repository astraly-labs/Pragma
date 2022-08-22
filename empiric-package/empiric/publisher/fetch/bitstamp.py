import logging
from typing import List

import requests
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_key

logger = logging.getLogger(__name__)


def fetch_bitstamp(assets, publisher) -> List[Entry]:
    source = "bitstamp"
    base_url = "https://www.bitstamp.net/api/v2/ticker"

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            logger.debug(f"Skipping Bitstamp for non-spot asset {asset}")
            continue

        pair = asset["pair"]
        response = requests.get(
            f"{base_url}/{pair[0].lower()}{pair[1].lower()}", timeout=10
        )
        if response.status_code == 404:
            logger.debug(f"No data found for {'/'.join(pair)} from Bitstamp")
            continue

        result = response.json()

        timestamp = int(result["timestamp"])
        price = float(result["last"])
        price_int = int(price * (10 ** asset["decimals"]))
        key = currency_pair_to_key(*pair)

        logger.info(f"Fetched price {price} for {'/'.join(pair)} from Bitstamp")

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
