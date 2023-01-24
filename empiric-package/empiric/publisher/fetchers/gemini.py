import asyncio
import logging
import time
from typing import List, Union

import requests
from aiohttp import ClientSession
from empiric.core.entry import SpotEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher.types import PublisherInterfaceT, PublisherFetchError

logger = logging.getLogger(__name__)


class GeminiFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://api.gemini.com/v1"
    SOURCE: str = "GEMINI"

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def _fetch_pair(
        self, asset: EmpiricAsset, session: ClientSession
    ) -> Union[SpotEntry, PublisherFetchError]:
        pair = asset["pair"]
        url = self.BASE_URL + "/pricefeed"

        async with session.get(url) as resp:
            if resp.status == 404:
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from CEX"
                )
            result_json = await resp.json()
            result = [e for e in result_json if e["pair"] == "".join(pair)]

            if len(result) == 0:
                return PublisherFetchError(
                    f"No entry found for {'/'.join(pair)} from Gemini"
                )

            if len(result) > 1:
                return PublisherFetchError(
                    f"Found more than one matching entries for Gemini response and price pair {pair}"
                )

            return self._construct(asset, result[0])

    def _fetch_pair_sync(
        self, asset: EmpiricSpotAsset
    ) -> Union[SpotEntry, PublisherFetchError]:
        pair = asset["pair"]
        url = self.BASE_URL + "/pricefeed"

        resp = requests.get(url)
        if resp.status_code == 404:
            return PublisherFetchError(f"No data found for {'/'.join(pair)} from CEX")

        result_json = resp.json()
        result = [e for e in result_json if e["pair"] == "".join(pair)]

        if len(result) == 0:
            return PublisherFetchError(
                f"No entry found for {'/'.join(pair)} from Gemini"
            )

        if len(result) > 1:
            return PublisherFetchError(
                f"Found more than one matching entries for Gemini response and price pair {pair}"
            )

        return self._construct(asset, result[0])

    async def fetch(
        self, session: ClientSession
    ) -> List[Union[SpotEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping Gemini for non-spot asset {asset}")
                continue
            entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
        return await asyncio.gather(*entries, return_exceptions=True)

    def fetch_sync(self) -> List[Union[SpotEntry, PublisherFetchError]]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping Gemini for non-spot asset {asset}")
                continue
            entries.append(self._fetch_pair_sync(asset))
        return entries

    def _construct(self, asset, result) -> SpotEntry:
        pair = asset["pair"]

        timestamp = int(time.time())
        price = float(result["price"])
        price_int = int(price * (10 ** asset["decimals"]))
        pair_id = currency_pair_to_pair_id(*pair)

        logger.info(f"Fetched price {price} for {'/'.join(pair)} from CEX")

        return SpotEntry(
            pair_id=pair_id,
            price=price_int,
            timestamp=timestamp,
            source=self.SOURCE,
            publisher=self.publisher,
        )
