import logging
import time
from typing import List

import requests
from aiohttp import ClientSession
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset
from empiric.publisher.types import PublisherInterfaceT

logger = logging.getLogger(__name__)


class CryptowatchFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://api.cryptowat.ch/markets/prices"
    SOURCES = [
        "cryptowatch-coinbase-pro",
        "cryptowatch-kraken",
        "cryptowatch-binance",
        "cryptowatch-bitfinex",
    ]

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def fetch(self, session: ClientSession) -> List[Entry]:
        async with session.get(self.BASE_URL) as resp:
            result_json = await resp.json()
            return self._parse_result_json(result_json)

    def fetch_sync(self) -> List[Entry]:
        resp = requests.get(self.BASE_URL)
        result_json = resp.json()
        return self._parse_result_json(result_json)

    def _parse_result_json(self, result_json):
        result = result_json["result"]
        entries = []
        for source in self.SOURCES:
            cryptowatch_source = source.split("-", 1)[1]
            source_results = {
                k.split(":")[2]: v
                for k, v in result.items()
                if k.startswith(f"market:{cryptowatch_source}")
            }
            for asset in self.assets:
                if asset["type"] != "SPOT":
                    logger.debug(f"Skipping Cryptowatch for non-spot asset {asset}")
                    continue

                pair = asset["pair"]
                pair_id = currency_pair_to_pair_id(*pair)

                try:
                    price = source_results["".join(pair).lower()]
                except KeyError:
                    logger.debug(
                        f"No entry found for {pair_id} from Cryptowatch-{cryptowatch_source}"
                    )
                    continue

                timestamp = int(time.time())
                price_int = int(price * (10 ** asset["decimals"]))

                logger.info(
                    f"Fetched price {price} for {'/'.join(pair)} from Cryptowatch-{cryptowatch_source}"
                )

                entries.append(
                    Entry(
                        pair_id=pair_id,
                        value=price_int,
                        timestamp=timestamp,
                        source=source,
                        publisher=self.publisher,
                    )
                )
        return entries
