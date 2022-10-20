import datetime
import hmac
import logging
import os
import re
import time
from typing import Dict, List

import requests
from aiohttp import ClientSession
from empiric.core.entry import FutureEntry, SpotEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset
from empiric.publisher.types import PublisherInterfaceT

logger = logging.getLogger(__name__)


class FtxFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://ftx.com/api"
    SOURCE: str = "FTX"
    endpoint: str = "/markets"

    FTX_API_KEY: str
    FTX_API_SECRET: str

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

        self.FTX_API_KEY = os.environ.get("FTX_API_KEY")
        self.FTX_API_SECRET = os.environ.get("FTX_API_SECRET")

    async def fetch(self, session: ClientSession) -> List[SpotEntry]:
        market_endpoint = "/markets"
        headers = self.generate_ftx_headers(market_endpoint)

        async with session.get(
            self.BASE_URL + market_endpoint, headers=headers
        ) as resp:
            response_json = await resp.json()
            spot_data = response_json["result"]

        futures_endpoint = "/futures"
        headers = self.generate_ftx_headers(futures_endpoint)
        async with session.get(
            self.BASE_URL + futures_endpoint, headers=headers
        ) as resp:
            response_json = await resp.json()
            future_data = response_json["result"]

        return self._handle_assets(spot_data, future_data)

    def fetch_sync(self) -> List[SpotEntry]:
        market_endpoint = "/markets"
        headers = self.generate_ftx_headers(market_endpoint)

        resp = requests.get(self.BASE_URL + market_endpoint, headers=headers)
        response_json = resp.json()
        spot_data = response_json["result"]

        futures_endpoint = "/futures"
        headers = self.generate_ftx_headers(futures_endpoint)
        resp = requests.get(self.BASE_URL + futures_endpoint, headers=headers)
        response_json = resp.json()
        future_data = response_json["result"]

        return self._handle_assets(spot_data, future_data)

    def generate_ftx_headers(self, endpoint: str) -> Dict[str, str]:
        timestamp = int(time.time() * 1000)
        signature = hmac.new(
            self.FTX_API_SECRET.encode(),
            (str(timestamp) + "GET" + endpoint).encode("ascii"),
            "sha256",
        ).hexdigest()
        headers = {
            "FTX-KEY": self.FTX_API_KEY,
            "FTX-SIGN": signature,
            "FTX-TS": str(timestamp),
        }
        return headers

    def parse_ftx_spot(self, asset, data, source, publisher, timestamp) -> SpotEntry:
        pair = asset["pair"]
        pair_id = currency_pair_to_pair_id(*pair)

        result = [e for e in data if e["name"] == "/".join(pair)]
        if len(result) == 0:
            logger.debug(f"No entry found for {'/'.join(pair)} from FTX")
            return

        if len(result) != 1:
            raise ValueError(
                f"Found more than one matching entries for FTX response and price pair {pair}"
            )

        price = float(result[0]["price"])
        price_int = int(price * (10 ** asset["decimals"]))

        logger.info(f"Fetched price {price} for {'/'.join(pair)} from FTX")

        return SpotEntry(
            pair_id=pair_id,
            price=price_int,
            timestamp=timestamp,
            source=source,
            publisher=publisher,
        )

    def parse_ftx_futures(
        self, asset, data, source, publisher, timestamp
    ) -> List[FutureEntry]:
        pair = asset["pair"]
        pair_id = currency_pair_to_pair_id(*pair)
        if pair[1] != "USD":
            logger.debug(
                f"Unable to fetch price from FTX for non-USD derivative {pair}"
            )
            return

        result = [e for e in data if re.match(rf"{pair[0]}-[0-9]+", e["name"])]
        if len(result) == 0:
            logger.debug(f"No entry found for {'/'.join(pair)} from FTX")
            return

        entries = []

        for future in result:
            price = float(future["mark"])
            price_int = int(price * (10 ** asset["decimals"]))

            expiry_timestamp = int(
                datetime.datetime.strptime(
                    future["expiry"],
                    "%Y-%m-%dT%H:%M:%S%z",
                ).timestamp()
            )

            logger.info(
                f"Fetched futures price {price} for {pair_id}-{expiry_timestamp} from FTX"
            )

            entries.append(
                FutureEntry(
                    pair_id=pair_id,
                    price=price_int,
                    timestamp=timestamp,
                    source=source,
                    publisher=publisher,
                    expiry_timestamp=expiry_timestamp,
                )
            )

        return entries

    def _handle_assets(self, spot_data, future_data):
        entries = []

        timestamp = int(time.time())
        for asset in self.assets:
            if asset["type"] == "SPOT":
                entry = self.parse_ftx_spot(
                    asset, spot_data, self.SOURCE, self.publisher, timestamp
                )
                if entry is not None:
                    entries.append(entry)
                continue
            elif asset["type"] == "FUTURE":
                future_entries = self.parse_ftx_futures(
                    asset, future_data, self.SOURCE, self.publisher, timestamp
                )
                if len(future_entries) > 0:
                    entries.extend(future_entries)
                continue
            else:
                logger.debug(f"Unable to fetch FTX for un-supported asset type {asset}")

        return entries
