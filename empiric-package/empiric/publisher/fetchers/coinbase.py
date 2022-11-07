import asyncio
import logging
import time
from typing import List, Union

import requests
from aiohttp import ClientSession
from empiric.core.entry import SpotEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher.types import PublisherFetchError, PublisherInterfaceT

logger = logging.getLogger(__name__)


class CoinbaseFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://api.coinbase.com/v2/exchange-rates?currency="
    SOURCE: str = "COINBASE"

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def _fetch_pair(
        self, asset: EmpiricSpotAsset, session: ClientSession
    ) -> Union[SpotEntry, PublisherFetchError]:
        currency = asset["pair"][1]

        async with session.get(self.BASE_URL + currency) as resp:
            result = await resp.json()
            return self._construct(asset, result)

    def _fetch_pair_sync(
        self, asset: EmpiricSpotAsset
    ) -> Union[SpotEntry, PublisherFetchError]:
        currency = asset["pair"][1]

        resp = requests.get(self.BASE_URL + currency)
        resp.raise_for_status()

        result = resp.json()
        return self._construct(asset, result)

    async def fetch(
        self, session: ClientSession
    ) -> List[Union[SpotEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping Coinbase for non-spot asset {asset}")
                continue

            entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
        return await asyncio.gather(*entries, return_exceptions=True)

    def fetch_sync(self) -> List[Union[SpotEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping Coinbase for non-spot asset {asset}")
                continue

            entries.append(self._fetch_pair_sync(asset))
        return entries

    def _construct(self, asset, result) -> Union[SpotEntry, PublisherFetchError]:
        pair = asset["pair"]
        pair_id = currency_pair_to_pair_id(*pair)

        if pair[0] in result["data"]["rates"]:
            rate = float(result["data"]["rates"][pair[0]])
            price = 1 / rate
            price_int = int(price * (10 ** asset["decimals"]))
            timestamp = int(time.time())

            logger.info(f"Fetched price {price} for {pair_id} from Coinbase")

            return SpotEntry(
                pair_id=pair_id,
                price=price_int,
                timestamp=timestamp,
                source=self.SOURCE,
                publisher=self.publisher,
            )

        return PublisherFetchError(f"No entry found for {pair_id} from Coinbase")
