import asyncio
import base64
import datetime
import hmac
import logging
import os
from hashlib import sha256
from typing import List, Union

import requests
from aiohttp import ClientSession
from empiric.core.entry import SpotEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher.types import PublisherFetchError, PublisherInterfaceT

logger = logging.getLogger(__name__)


class CoinbaseFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://api.exchange.coinbase.com"
    SOURCE: str = "COINBASE"
    REQUEST_PATH = "/oracle"
    METHOD = "GET"

    COINBASE_API_SECRET: str
    COINBASE_API_KEY: str
    COINBASE_API_PASSPHRASE: str
    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        # TODO (rlkelly): migrate from using environment variables
        self.COINBASE_API_SECRET = os.environ.get("COINBASE_API_SECRET")
        self.COINBASE_API_KEY = os.environ.get("COINBASE_API_KEY")
        self.COINBASE_API_PASSPHRASE = os.environ.get("COINBASE_API_PASSPHRASE")

        self.assets = assets
        self.publisher = publisher

    async def _fetch_pair(
        self, asset: EmpiricSpotAsset, session: ClientSession
    ) -> Union[SpotEntry, PublisherFetchError]:
        pair = asset["pair"]
        if pair[1] != "USD":
            return PublisherFetchError(
                f"Unable to fetch Coinbase price for non-USD denomination {pair[1]}"
            )

        request_timestamp = str(
            int(
                datetime.datetime.now(datetime.timezone.utc)
                .replace(tzinfo=datetime.timezone.utc)
                .timestamp()
            )
        )

        signature = hmac.new(
            base64.b64decode(self.COINBASE_API_SECRET),
            (request_timestamp + self.METHOD + self.REQUEST_PATH).encode("ascii"),
            sha256,
        )

        headers = {
            "Accept": "application/json",
            "CB-ACCESS-KEY": self.COINBASE_API_KEY,
            "CB-ACCESS-SIGN": base64.b64encode(signature.digest()).decode("utf8"),
            "CB-ACCESS-TIMESTAMP": request_timestamp,
            "CB-ACCESS-PASSPHRASE": self.COINBASE_API_PASSPHRASE,
        }

        async with session.get(
            self.BASE_URL + self.REQUEST_PATH, headers=headers
        ) as resp:
            result = await resp.json()
            return self._construct(asset, result)

    def _fetch_pair_sync(
        self, asset: EmpiricSpotAsset
    ) -> Union[SpotEntry, PublisherFetchError]:
        pair = asset["pair"]
        if pair[1] != "USD":
            return PublisherFetchError(
                f"Unable to fetch Coinbase price for non-USD denomination {pair[1]}"
            )

        request_timestamp = str(
            int(
                datetime.datetime.now(datetime.timezone.utc)
                .replace(tzinfo=datetime.timezone.utc)
                .timestamp()
            )
        )

        signature = hmac.new(
            base64.b64decode(self.COINBASE_API_SECRET),
            (request_timestamp + self.METHOD + self.REQUEST_PATH).encode("ascii"),
            sha256,
        )

        headers = {
            "Accept": "application/json",
            "CB-ACCESS-KEY": self.COINBASE_API_KEY,
            "CB-ACCESS-SIGN": base64.b64encode(signature.digest()),
            "CB-ACCESS-TIMESTAMP": request_timestamp,
            "CB-ACCESS-PASSPHRASE": self.COINBASE_API_PASSPHRASE,
        }

        resp = requests.get(self.BASE_URL + self.REQUEST_PATH, headers=headers)
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

        if pair[0] in result["prices"]:
            price = float(result["prices"][pair[0]])
            price_int = int(price * (10 ** asset["decimals"]))

            timestamp = int(result["timestamp"])

            logger.info(f"Fetched price {price} for {pair_id} from Coinbase")

            return SpotEntry(
                pair_id=pair_id,
                price=price_int,
                timestamp=timestamp,
                source=self.SOURCE,
                publisher=self.publisher,
            )

        return PublisherFetchError(f"No entry found for {pair_id} from Coinbase")
