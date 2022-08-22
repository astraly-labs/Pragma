import asyncio
import logging
from typing import List, Union

from aiohttp import ClientSession
from empiric.core.entry import Entry
from empiric.core.utils import currency_pair_to_key
from empiric.publisher.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher.base import PublisherFetchError, PublisherInterfaceT

logger = logging.getLogger(__name__)


class CexFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://cex.io/api/ticker"
    SOURCE: str = "cex"

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def _fetch_pair(
        self, asset: EmpiricSpotAsset, session: ClientSession
    ) -> Union[Entry, PublisherFetchError]:
        pair = asset["pair"]
        url = f"{self.BASE_URL}/{pair[0]}/{pair[1]}"

        async with session.get(url) as resp:
            if resp.status == 404:
                logger.info(f"No data found for {'/'.join(pair)} from CEX")
                return PublisherFetchError(pair)
            result = await resp.json(content_type="text/json")
            if "error" in result and result["error"] == "Invalid Symbols Pair":
                logger.info(f"No data found for {'/'.join(pair)} from CEX")
                return PublisherFetchError(pair)

            return self._construct(asset, result)

    async def fetch(self, session: ClientSession) -> List[Entry]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.info(f"Skipping CEX for non-spot asset {asset}")
                continue
            entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
        return await asyncio.gather(*entries)

    def _construct(self, asset, result) -> Entry:
        pair = asset["pair"]

        timestamp = int(result["timestamp"])
        price = float(result["last"])
        price_int = int(price * (10 ** asset["decimals"]))
        key = currency_pair_to_key(*pair)

        logger.info(f"Fetched price {price} for {'/'.join(pair)} from CEX")

        return Entry(
            key=key,
            value=price_int,
            timestamp=timestamp,
            source=self.SOURCE,
            publisher=self.publisher,
        )
