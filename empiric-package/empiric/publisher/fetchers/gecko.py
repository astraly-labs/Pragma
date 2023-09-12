import asyncio
import logging
import time
from typing import Dict, List

import requests
from aiohttp import ClientSession

from empiric.core.entry import SpotEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher.types import PublisherFetchError, PublisherInterfaceT

logger = logging.getLogger(__name__)


ASSET_MAPPING: Dict[str, any] = {
    "LORDS": (
        "starknet-alpha",
        "0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49",
    ),
    "R": ("eth", "0x183015a9ba6ff60230fdeadc3f43b3d788b13e21"),
    "WBTC": ("eth", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"),
    "WSTETH": ("eth", "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0"),
}


class GeckoTerminalFetcher(PublisherInterfaceT):
    BASE_URL: str = (
        "https://api.geckoterminal.com/api/v2/networks/{network}/tokens/{token_address}"
    )

    SOURCE: str = "GECKOTERMINAL"
    headers = {
        "Accepts": "application/json",
    }

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def _fetch_pair(
        self, asset: EmpiricSpotAsset, session: ClientSession
    ) -> SpotEntry:
        pair = asset["pair"]
        pool = ASSET_MAPPING.get(pair[0])
        if pool is None:
            return PublisherFetchError(
                f"Unknown price pair, do not know how to query GeckoTerminal for {pair[0]}"
            )
        if pair[1] != "USD":
            return PublisherFetchError(f"Base asset not supported : {pair[1]}")
        url = self.BASE_URL.format(network=pool[0], token_address=pool[1])

        async with session.get(url, headers=self.headers) as resp:
            if resp.status == 404:
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from GeckoTerminal"
                )
            result = await resp.json()
            if (
                result.get("errors") is not None
                and result["errors"][0]["title"] == "Not Found"
            ):
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from GeckoTerminal"
                )
            return self._construct(asset, result)

    def _fetch_pair_sync(self, asset: EmpiricSpotAsset) -> SpotEntry:
        pair = asset["pair"]
        pool = ASSET_MAPPING.get(pair[0])
        if pool is None:
            return PublisherFetchError(
                f"Unknown price pair, do not know how to query GeckoTerminal for {pair[0]}"
            )
        if pair[1] != "USD":
            return PublisherFetchError(f"Base asset not supported : {pair[1]}")
        url = self.BASE_URL.format(network=pool[0], token_address=pool[1])

        resp = requests.get(url, headers=self.headers)
        if resp.status_code == 404:
            return PublisherFetchError(
                f"No data found for {'/'.join(pair)} from GeckoTerminal"
            )
        result = resp.json()
        if (
            result.get("errors") is not None
            and result["errors"][0]["title"] == "Not Found"
        ):
            return PublisherFetchError(
                f"No data found for {'/'.join(pair)} from GeckoTerminal"
            )
        return self._construct(asset, result)

    async def fetch(self, session: ClientSession) -> List[SpotEntry]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping {self.SOURCE} for non-spot asset {asset}")
                continue
            entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
        return await asyncio.gather(*entries, return_exceptions=True)

    def fetch_sync(self) -> List[SpotEntry]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping {self.SOURCE} for non-spot asset {asset}")
                continue
            entries.append(self._fetch_pair_sync(asset))
        return entries

    def _construct(self, asset, result) -> SpotEntry:
        pair = asset["pair"]
        data = result["data"]["attributes"]

        price = float(data["price_usd"])
        price_int = int(price * (10 ** asset["decimals"]))
        volume = float(data["volume_usd"]["h24"])

        timestamp = int(time.time())

        pair_id = currency_pair_to_pair_id(*pair)
        logger.info(f"Fetched price {price} for {pair_id} from GeckoTerminal")

        return SpotEntry(
            pair_id=pair_id,
            price=price_int,
            timestamp=timestamp,
            source=self.SOURCE,
            publisher=self.publisher,
            volume=int(volume),
        )
