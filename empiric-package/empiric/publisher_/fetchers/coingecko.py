import asyncio
import datetime
import logging
from typing import Dict, List

import requests
from aiohttp import ClientSession
from empiric.core_.entry import Entry
from empiric.core_.utils import currency_pair_to_pair_id
from empiric.publisher_.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher_.base import PublisherInterfaceT

logger = logging.getLogger(__name__)

ASSET_MAPPING: Dict[str, str] = {
    "ETH": "ethereum",
    "BTC": "bitcoin",
    "SOL": "solana",
    "AVAX": "avalanche-2",
    "DOGE": "dogecoin",
    "SHIB": "shiba-inu",
    "TEMP": "tempus",
    "DAI": "dai",
    "USDT": "tether",
    "USDC": "usd-coin",
    "TUSD": "true-usd",
    "BUSD": "binance-usd",
    "BNB": "binancecoin",
    "ADA": "cardano",
    "XRP": "ripple",
    "MATIC": "matic-network",
    "AAVE": "aave",
}


class CoingeckoFetcher(PublisherInterfaceT):
    BASE_URL: str = (
        "https://api.coingecko.com/api/v3/coins/{pair_id}"
        "?localization=false&market_data=true&community_data=false"
        "&developer_data=false&sparkline=false"
    )

    SOURCE: str = "coingecko"
    headers = {
        "Accepts": "application/json",
    }

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def _fetch_pair(
        self, asset: EmpiricSpotAsset, session: ClientSession
    ) -> Entry:
        pair = asset["pair"]
        pair_id = ASSET_MAPPING.get(pair[0])
        if pair_id is None:
            raise ValueError(
                f"Unknown price pair, do not know how to query Coingecko for {pair[0]}"
            )
        url = self.BASE_URL.format(pair_id=pair_id)

        async with session.get(
            url, headers=self.headers, raise_for_status=True
        ) as resp:
            result = await resp.json()
            return self._construct(asset, result)

    def _fetch_pair_sync(self, asset: EmpiricSpotAsset) -> Entry:
        pair = asset["pair"]
        pair_id = ASSET_MAPPING.get(pair[0])
        if pair_id is None:
            raise ValueError(
                f"Unknown price pair, do not know how to query Coingecko for {pair[0]}"
            )
        url = self.BASE_URL.format(pair_id=pair_id)

        resp = requests.get(url, headers=self.headers, raise_for_status=True)
        result = resp.json()
        return self._construct(asset, result)

    async def fetch(self, session: ClientSession) -> List[Entry]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping {self.SOURCE} for non-spot asset {asset}")
                continue
            entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
        return await asyncio.gather(*entries)

    def fetch_sync(self) -> List[Entry]:
        entries = []
        for asset in self.assets:
            if asset["type"] != "SPOT":
                logger.debug(f"Skipping {self.SOURCE} for non-spot asset {asset}")
                continue
            entries.append(self._fetch_pair_sync(asset))
        return entries

    def _construct(self, asset, result) -> Entry:
        pair = asset["pair"]
        pair_id = currency_pair_to_pair_id(*pair)
        price = result["market_data"]["current_price"][pair[1].lower()]
        price_int = int(price * (10 ** asset["decimals"]))
        timestamp = int(
            datetime.datetime.strptime(
                result["last_updated"],
                "%Y-%m-%dT%H:%M:%S.%f%z",
            ).timestamp()
        )

        logger.info(f"Fetched price {price} for {pair_id} from Coingecko")

        return Entry(
            pair_id=pair_id,
            value=price_int,
            timestamp=timestamp,
            source=self.SOURCE,
            publisher=self.publisher,
        )