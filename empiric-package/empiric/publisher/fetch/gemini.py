import logging
import time
from typing import List

import requests
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_key

logger = logging.getLogger(__name__)


def fetch_gemini(assets, publisher) -> List[Entry]:
    source = "gemini"

    base_url = "https://api.gemini.com/v1"
    response = requests.get(base_url + "/pricefeed", timeout=20)

    entries = []

    for asset in assets:
        if asset["type"] != "SPOT":
            logger.debug(f"Skipping Gemini for non-spot asset {asset}")
            continue

        pair = asset["pair"]
        key = currency_pair_to_key(*pair)
        timestamp = int(time.time())
        result = [e for e in response.json() if e["pair"] == "".join(pair)]
        if len(result) == 0:
            logger.debug(f"No entry found for {key} from Gemini")
            continue

        assert (
            len(result) == 1
        ), f"Found more than one matching entries for Gemini response and price pair {pair}"
        price = float(result[0]["price"])
        price_int = int(price * (10 ** asset["decimals"]))

        logger.info(f"Fetched price {price} for {key} from Gemini")

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
