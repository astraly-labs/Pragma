import logging
import time
from typing import List

import requests
from aiohttp import ClientSession
from empiric.core.entry import SpotEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset
from empiric.publisher.types import PublisherInterfaceT

logger = logging.getLogger(__name__)


class GeminiFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://api.gemini.com/v1"
    SOURCE: str = "GEMINI"

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def fetch(self, session: ClientSession) -> List[SpotEntry]:
        entries = []
        async with session.get(self.BASE_URL + "/pricefeed") as resp:
            result_json = await resp.json()
            for asset in self.assets:
                if asset["type"] != "SPOT":
                    logger.debug(f"Skipping Gemini for non-spot asset {asset}")
                    continue

                pair = asset["pair"]
                pair_id = currency_pair_to_pair_id(*pair)
                timestamp = int(time.time())
                result = [e for e in result_json if e["pair"] == "".join(pair)]

                if len(result) == 0:
                    logger.debug(f"No entry found for {pair_id} from Gemini")
                    continue

                if len(result) > 1:
                    raise ValueError(
                        f"Found more than one matching entries for Gemini response and price pair {pair}"
                    )

                price = float(result[0]["price"])
                price_int = int(price * (10 ** asset["decimals"]))

                logger.info(f"Fetched price {price} for {pair_id} from Gemini")

                entries.append(
                    SpotEntry(
                        pair_id=pair_id,
                        price=price_int,
                        timestamp=timestamp,
                        source=self.SOURCE,
                        publisher=self.publisher,
                    )
                )
            return entries

    def fetch_sync(self) -> List[SpotEntry]:
        entries = []
        resp = requests.get(self.BASE_URL + "/pricefeed")
        result_json = resp.json()
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping Gemini for non-spot asset {asset}")
                continue

            pair = asset["pair"]
            pair_id = currency_pair_to_pair_id(*pair)
            timestamp = int(time.time())
            result = [e for e in result_json if e["pair"] == "".join(pair)]

            if len(result) == 0:
                logger.debug(f"No entry found for {pair_id} from Gemini")
                continue

            if len(result) > 1:
                raise ValueError(
                    f"Found more than one matching entries for Gemini response and price pair {pair}"
                )

            price = float(result[0]["price"])
            price_int = int(price * (10 ** asset["decimals"]))

            logger.info(f"Fetched price {price} for {pair_id} from Gemini")

            entries.append(
                SpotEntry(
                    pair_id=pair_id,
                    price=price_int,
                    timestamp=timestamp,
                    source=self.SOURCE,
                    publisher=self.publisher,
                )
            )
        return entries
