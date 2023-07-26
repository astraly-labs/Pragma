import asyncio
import logging
from typing import List, Union

import requests
from aiohttp import ClientSession
from empiric.core.entry import FutureEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset, EmpiricFutureAsset
from empiric.publisher.types import PublisherFetchError, PublisherInterfaceT

logger = logging.getLogger(__name__)


class ByBitFutureFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://api.bybit.com/derivatives/v3/public/tickers?category=linear&symbol="
    SOURCE: str = "BYBIT"

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def _fetch_pair(
        self, asset: EmpiricFutureAsset, session: ClientSession
    ) -> Union[FutureEntry, PublisherFetchError]:
        pair = asset["pair"]
        url = f"{self.BASE_URL}{pair[0]}{pair[1]}"

        async with session.get(url) as resp:
            if resp.status == 404:
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from BYBIT"
                )
            result = await resp.json(content_type="application/json")
            if (
                result["retCode"] == "51001"
                or result["retMsg"] == "Instrument ID does not exist"
            ):
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from BYBIT"
                )

            return self._construct(asset, result)

    def _fetch_pair_sync(
        self, asset: EmpiricFutureAsset
    ) -> Union[FutureEntry, PublisherFetchError]:
        pair = asset["pair"]
        url = f"{self.BASE_URL}{pair[0]}{pair[1]}"

        resp = requests.get(url)
        if resp.status_code == 404:
            return PublisherFetchError(f"No data found for {'/'.join(pair)} from BYBIT")
        result = resp.json(content_type="application/json")
        if result["retCode"] == "51001" or result["retMsg"] == "Instrument ID does not exist":
            return PublisherFetchError(f"No data found for {'/'.join(pair)} from BYBIT")

        return self._construct(asset, result)

    async def fetch(
        self, session: ClientSession
    ) -> List[Union[FutureEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "FUTURE":
                logger.debug(f"Skipping BYBIT for non-spot asset {asset}")
                continue
            entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
        return await asyncio.gather(*entries, return_exceptions=True)

    def fetch_sync(self) -> List[Union[FutureEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "FUTURE":
                logger.debug(f"Skipping BYBIT for non-spot asset {asset}")
                continue
            entries.append(self._fetch_pair_sync(asset))
        return entries

    def _construct(self, asset, result) -> FutureEntry:
        pair = asset["pair"]
        data = result["result"]["list"][0]
        timestamp = int(int(result["time"]) / 1000)
        price = float(data["lastPrice"])
        price_int = int(price * (10 ** asset["decimals"]))
        pair_id = currency_pair_to_pair_id(*pair)
        volume = float(data["volume24h"])
        volume_int = int(volume)
        expiry_timestamp = int(data["deliveryTime"])
        logger.info(f"Fetched future for {'/'.join(pair)} from BYBIT")

        return FutureEntry(
        pair_id=pair_id,
        price=price_int,
        volume=volume_int,
        timestamp=timestamp,
        source=self.SOURCE,
        publisher=self.publisher,
        expiry_timestamp=expiry_timestamp,
    )