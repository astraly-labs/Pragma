import asyncio
import logging
from typing import List, Union

import requests
from aiohttp import ClientSession
from empiric.core.entry import FutureEntry
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EmpiricAsset, EmpiricFutureAsset
from empiric.publisher.types import PublisherFetchError, PublisherInterfaceT
from datetime import datetime, timezone, timedelta

logger = logging.getLogger(__name__)


class BinanceFutureFetcher(PublisherInterfaceT):
    BASE_URL: str = "https://fapi.binance.com/fapi/v1/premiumIndex"
    VOLUME_URL: str = "https://fapi.binance.com/fapi/v1/ticker/24hr"
    SOURCE: str = "BINANCE"

    publisher: str

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        self.publisher = publisher

    async def fetch_volume(self, asset, session):
        pair = asset["pair"]
        url = f"{self.VOLUME_URL}"
        selection = f"{pair[0]}{pair[1]}"
        volume_arr = []
        async with session.get(url) as resp:
            if resp.status == 404:
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from Binance"
                )
            result = await resp.json(content_type="application/json")
            for element in result: 
                if selection in element['symbol']:
                    volume_arr.append((element['symbol'],element['volume']))
            return volume_arr
    
    def fetch_volume_sync(self, asset):
        pair = asset["pair"]
        url = f"{self.VOLUME_URL}"
        selection = f"{pair[0]}{pair[1]}"
        volume_arr = []
        resp = requests.get(url)
        if resp.status_code == 404:
            return PublisherFetchError(
                f"No data found for {'/'.join(pair)} from Binance"
            )
        result = resp.json()
        for element in result: 
            if selection in element['symbol']:
                volume_arr.append((element['symbol'],element['volume']))
        return volume_arr
    
    async def _fetch_pair(
        self, asset: EmpiricFutureAsset, session: ClientSession
    ) -> Union[FutureEntry, PublisherFetchError]:
        pair = asset["pair"]
        filtered_data = []
        url = f"{self.BASE_URL}"
        selection = f"{pair[0]}{pair[1]}"
        async with session.get(url) as resp:
            if resp.status == 404:
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from Binance"
                )
            result = await resp.json(content_type="application/json")
            for element in result:
                if selection in element['symbol']:
                    filtered_data.append(element)
            volume_arr = await self.fetch_volume(asset, session)
            return self._construct(asset, filtered_data, volume_arr)

    def _fetch_pair_sync(
        self, asset: EmpiricFutureAsset
    ) -> Union[FutureEntry, PublisherFetchError]:
        pair = asset["pair"]
        url = f"{self.BASE_URL}"
        selection = f"{pair[0]}{pair[1]}"
        resp = requests.get(url)
        filtered_data = []
        if resp.status_code == 404:
            return PublisherFetchError(f"No data found for {'/'.join(pair)} from Binance")
        result = resp.json(content_type="application/json")
        if result["code"] == "51001" or result["msg"] == "Instrument ID does not exist":
            return PublisherFetchError(f"No data found for {'/'.join(pair)} from Binance")
        data_arr = result['symbols']
        for element in data_arr:
            if selection in element['symbol']:
                filtered_data.append(element)
        volume_arr = self.fetch_volume_sync(asset)
        return self._construct(asset, filtered_data, volume_arr)

    def fetch_sync(self):
        entries = []
        for asset in self.assets:
            if asset["type"] != "FUTURE":
                logger.debug(f"Skipping Binance for non-future asset {asset}")
                continue
            future_entries = self._fetch_pair_sync(asset)
            if isinstance(future_entries, list):
                entries.extend(future_entries)
            else:
                entries.append(future_entries)
        return entries

    async def fetch(self, session: ClientSession):
        entries = []
        for asset in self.assets:
            if asset["type"] != "FUTURE":
                logger.debug(f"Skipping Binance for non-future asset {asset}")
                continue
            future_entries = await self._fetch_pair(asset, session)
            if isinstance(future_entries, list):
                entries.extend(future_entries)
            else:
                entries.append(future_entries)
        return entries

    def retreive_volume(self,asset, volume_arr): 
        for list_asset, list_vol in volume_arr: 
            if asset == list_asset: 
                return list_vol
        return 0
    
    def _construct(self, asset, result, volume_arr) -> List[FutureEntry]:
        pair = asset["pair"]
        result_len = len(result)
        selection = f"{pair[0]}{pair[1]}"
        result_arr = []
        for i in range(0, result_len): 
            data = result[i]
            timestamp = int(data["time"])
            price = float(data["markPrice"])
            price_int = int(price * (10 ** asset["decimals"]))
            pair_id = currency_pair_to_pair_id(*pair)
            volume = float(self.retreive_volume(data['symbol'], volume_arr))
            volume_int = int(volume)
            if data['symbol']==selection: 
                expiry_timestamp = 0
            else:
                date_part = data['symbol'].split('_')[1]
                expiry_date = datetime.strptime(date_part, '%y%m%d')
                expiry_date = expiry_date.replace(hour=8, minute=0, second=0, tzinfo=timezone.utc)
                expiry_timestamp = int(expiry_date.timestamp())
            result_arr.append(FutureEntry(
                pair_id=pair_id,
                price=price_int,
                volume=volume_int,
                timestamp=int(timestamp/1000),
                source=self.SOURCE,
                publisher=self.publisher,
                expiry_timestamp=expiry_timestamp*1000,
            ))
        return result_arr
