import asyncio
import logging
from typing import List, Union

import requests
from aiohttp import ClientSession
from empiric.core.entry import SpotEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher.types import PublisherFetchError, PublisherInterfaceT

logger = logging.getLogger(__name__)


class KaikoFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://us.market-api.kaiko.io/v2/data/trades.v1/spot_direct_exchange_rate"
    SOURCE: str = "KAIKO"
    payload = {
        'interval': '2m',
        'page_size': '1',
    }

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher, api_key: str):
        self.assets = assets
        self.publisher = publisher
        self.headers = {"X-Api-Key": api_key}

    async def _fetch_pair(
        self, asset: EmpiricSpotAsset, session: ClientSession
    ) -> Union[SpotEntry, PublisherFetchError]:
        pair = asset["pair"]
        url = f"{self.BASE_URL}/{pair[0].lower()}/{pair[1].lower()}"
        async with session.get(url, headers=self.headers, params=self.payload) as resp:
            if resp.status == 404:
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from Kaiko"
                )
            result = await resp.json(content_type="application/json")
            if "error" in result and result["error"] == "Invalid Symbols Pair":
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from Kaiko"
                )

            return self._construct(asset, result)

    def _fetch_pair_sync(
        self, asset: EmpiricSpotAsset
    ) -> Union[SpotEntry, PublisherFetchError]:
        pair = asset["pair"]
        url = f"{self.BASE_URL}/{pair[0].lower()}/{pair[1].lower()}"

        resp = requests.get(url, headers=self.headers, params=self.payload)
        if resp.status_code == 404:
            return PublisherFetchError(f"No data found for {'/'.join(pair)} from Kaiko")
        result = resp.json(content_type="application/json")
        if "error" in result and result["error"] == "Invalid Symbols Pair":
            return PublisherFetchError(f"No data found for {'/'.join(pair)} from Kaiko")

        return self._construct(asset, result)

    async def fetch(
        self, session: ClientSession
    ) -> List[Union[SpotEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping Kaiko for non-spot asset {asset}")
                continue
            entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
        return await asyncio.gather(*entries, return_exceptions=True)

    def fetch_sync(self) -> List[Union[SpotEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping Kaiko for non-spot asset {asset}")
                continue
            entries.append(self._fetch_pair_sync(asset))
        return entries

    def _construct(self, asset, result) -> SpotEntry:
        data = result["data"][0]
        pair = asset["pair"]

        timestamp = int(int(data["timestamp"]) / 1000)
        price = float(data["price"])
        price_int = int(price * (10 ** asset["decimals"]))
        pair_id = currency_pair_to_pair_id(*pair)

        logger.info(f"Fetched price {price} for {'/'.join(pair)} from Kaiko")

        return SpotEntry(
            pair_id=pair_id,
            price=price_int,
            timestamp=timestamp,
            source=self.SOURCE,
            publisher=self.publisher,
        )
