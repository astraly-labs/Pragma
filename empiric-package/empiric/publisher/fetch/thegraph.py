import logging
import time
from typing import List

import requests
from empiric.core.entry import Entry

logger = logging.getLogger(__name__)


def fetch_thegraph(assets, publisher) -> List[Entry]:
    source = "thegraph"

    base_url = "https://api.thegraph.com/subgraphs/name/"

    entries = []

    for asset in assets:
        if asset["type"] != "ONCHAIN":
            logger.debug(f"Skipping The Graph for non-on-chain asset {asset}")
            continue

        if asset["source"] == "AAVE":
            url_slug = "aave/protocol-v2"
            key = asset["key"]
            query = f"query {{reserves(where: {{id: \"{asset['detail']['asset_address']}\"}}) {{name isActive isFrozen {asset['detail']['metric']}}}}}"
            input_decimals = 27
        else:
            raise Exception(
                f"Unknown asset name, do not know how to query The Graph for {asset['name']}"
            )

        response = requests.post(base_url + url_slug, timeout=5, json={"query": query})
        result = response.json()["data"]["reserves"][0]

        assert result["name"] == asset["detail"]["asset_name"]
        assert result["isActive"] is True
        assert result["isFrozen"] is False

        value = float(result[asset["detail"]["metric"]])
        value_int = int(value * (10 ** (asset["decimals"] - input_decimals)))
        timestamp = int(time.time())

        logger.info(f"Fetched data {value_int} for {key} from The Graph")

        entries.append(
            Entry(
                key=key,
                value=value_int,
                timestamp=timestamp,
                source=source,
                publisher=publisher,
            )
        )

    return entries
