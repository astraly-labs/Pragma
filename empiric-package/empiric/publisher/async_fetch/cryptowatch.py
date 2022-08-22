import logging
import time
from typing import List

from aiohttp import ClientSession
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_key
from empiric.publisher.assets import EmpiricAsset
from empiric.publisher.base import PublisherInterfaceT

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
        entries = []
        async with session.get(self.BASE_URL) as resp:
            result_json = await resp.json()
            result = result_json["result"]
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
                    key = currency_pair_to_key(*pair)

                    try:
                        price = source_results["".join(pair).lower()]
                    except KeyError:
                        logger.debug(
                            f"No entry found for {key} from Cryptowatch-{cryptowatch_source}"
                        )
                        continue

                    timestamp = int(time.time())
                    price_int = int(price * (10 ** asset["decimals"]))

                    logger.info(
                        f"Fetched price {price} for {'/'.join(pair)} from Cryptowatch-{cryptowatch_source}"
                    )

                    entries.append(
                        Entry(
                            key=key,
                            value=price_int,
                            timestamp=timestamp,
                            source=source,
                            publisher=self.publisher,
                        )
                    )
            return entries
