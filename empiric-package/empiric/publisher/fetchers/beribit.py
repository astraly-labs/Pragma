import asyncio
import requests
import logging
import json
import pandas as pd
from typing import List, Union
from empiric.core.entry import OptionEntry
from aiohttp import ClientSession
from empiric.publisher.assets import EmpiricAsset, EmpiricSpotAsset
from empiric.publisher.types import PublisherFetchError, PublisherInterfaceT

logger = logging.getLogger(__name__)

# class BeribitFetcher(PublisherInterfaceT):
#     BASE_NAME_URL = "https://test.deribit.com/api/v2/public/get_instruments?currency="
#     BASE_DATA_URL = "https://test.deribit.com/api/v2/public/get_book_summary_by_instrument?instrument_name="

#     def __init__(self, assets: List[EmpiricAsset], publisher):
#         self.assets = assets
#         self.publisher = publisher

#     async def _fetch_pair(
#         self, asset: EmpiricSpotAsset, session: ClientSession
#     ) -> Union[OptionEntry, PublisherFetchError]:
#         pair = asset["pair"]
#         name_url = f"{self.BASE_NAME_URL}{pair[0].lower()}&kind=option"
#         async with session.get(name_url) as resp:
#             if resp.status == 404:
#                 return PublisherFetchError(
#                     f"No data found for {'/'.join(pair)} from Beribit"
#                 )
#             result= await resp.json()
#             names = list(result['result']["instrument_name"])
#             print(names)
#             settlement_period  = list (result['result']["settlement_period"])
#             strike = list(result['result']["strike"])
#             option_type = list(result['result']["option_type"])
#             print(settlement_period)
#             creation_timestamp = list(result['result']["creation_timestamp"])
#             expiration_timestamp = list(result['result']["expiration_timestamp"])

        
#         for i in range(len(names)):
#             data_url = f"{self.BASE_DATA_URL}{names[i]}"
#             async with session.get(data_url) as resp:
#                 if resp.status == 404:
#                     return PublisherFetchError(
#                         f"No data found for {'/'.join(pair)} from Beribit"
#                     )
#                 result = await resp.json()
#                 return self._construct(asset, result, settlement_period[i], strike[i], option_type[i], creation_timestamp[i], expiration_timestamp[i])

    # def _fetch_pair_sync(
    #     self, asset: EmpiricSpotAsset
    # ) -> Union[OptionEntry, PublisherFetchError]:
    #     pair = asset["pair"]
    #     name_url = f"{self.BASE_NAME_URL}{pair[0].lower()}&kind=option"
    #     resp = requests.get(name_url)
    #     if resp.status_code == 404:
    #         return PublisherFetchError(
    #             f"No data found for {'/'.join(pair)} from Beribit"
    #         )
    #     result = json.loads(resp.text)
    #     name = pd.json_normalize(result['result'])['instrument_name']
    #     name = list(name)
    #     settlement_period = pd.json_normalize(result['result'])['settlement_period']
    #     settlement_period = list(settlement_period)
    #     strike = pd.json_normalize(result['result'])['strike']
    #     strike = list(strike)
    #     option_type = pd.json_normalize(result['result'])['option_type']
    #     option_type = list(option_type)
    #     creation_timestamp = pd.json_normalize(result['result'])['creation_timestamp']
    #     creation_timestamp = list(creation_timestamp)
    #     expiration_timestamp = pd.json_normalize(result['result'])['expiration_timestamp']
    #     expiration_timestamp = list(expiration_timestamp)

    #     for i in range(len(name)):
    #         data_url = f"{self.BASE_DATA_URL}{name[i]}"
    #         resp = requests.get(data_url)
    #         if resp.status_code == 404:
    #             return PublisherFetchError(
    #                 f"No data found for {'/'.join(pair)} from Bitstamp"
    #             )
    #         result = json.loads(resp.text)
    #         return self._construct(asset, result, settlement_period[i], strike[i], option_type[i], creation_timestamp[i], expiration_timestamp[i])
            

#     async def fetch(
#         self, session: ClientSession
#     ) -> List[Union[OptionEntry, PublisherFetchError]]:
#         entries = []
#         for asset in self.assets:
#             if asset["type"] != "OPTION":
#                 logger.debug(f"Skipping Beribit for non-option asset {asset}")
#                 continue
#             entries.append(asyncio.ensure_future(self._fetch_pair(asset, session)))
#         return await asyncio.gather(*entries, return_exceptions=True)

#     async def fetch_sync(self) -> List[Union[OptionEntry, PublisherFetchError]]:
#         entries = []
#         for asset in self.assets:
#             if asset["type"] != "OPTION":
#                 logger.debug(f"Skipping Beribit for non-option asset {asset}")
#                 continue
#             entries.append(self._fetch_pair_sync(asset))
#         return entries

#     def _construct(self, asset, result, new_settlement_period, new_strike, new_option_type, new_creation_timestamp, new_expiration_timestamp) ->OptionEntry:
#         underlying_index = asset["underlying_index"]
#         underlying_price = int(asset['underlying_price']* (10 ** asset["decimals"]))
#         open_interest = int(result["open_interest"]* (10 ** asset["decimals"]))
#         settlement_period = int(new_settlement_period* (10 ** asset["decimals"]))
#         mark_iv = int(result["mark_iv"]* (10 ** asset["decimals"]))
#         bid_iv = int(result["bid_iv"]* (10 ** asset["decimals"]))
#         ask_iv = int(result["ask_iv"]* (10 ** asset["decimals"]))

#         logger.info(f"Fetched options infos for {'/'.join(underlying_index)} from Beribit")

#         return OptionEntry(
#             underlying_index = underlying_index,
#             underlying_price = underlying_price,
#             strike  = int(new_strike* (10 ** asset["decimals"])),
#             option_type = new_option_type,
#             creation_timestamp = new_creation_timestamp,
#             expiration_timestamp = new_expiration_timestamp,
#             open_interest = open_interest,
#             settlement_period = settlement_period,
#             mark_iv = mark_iv,
#             bid_iv = bid_iv,
#             ask_iv = ask_iv,
#             source=self.SOURCE,
#             publisher=self.publisher,
#         )
   
BASE_NAME_URL = "https://test.deribit.com/api/v2/public/get_instruments?currency="
BASE_DATA_URL = "https://test.deribit.com/api/v2/public/get_book_summary_by_instrument?instrument_name="


EMPIRIC_ALL_ASSETS: List[EmpiricAsset] = [
    {"type": "SPOT", "pair": ("BTC", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("WBTC", "BTC"), "decimals": 8},
    {"type": "SPOT", "pair": ("WBTC", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("BTC", "EUR"), "decimals": 8},
    {"type": "SPOT", "pair": ("ETH", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("SOL", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("AVAX", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("DOGE", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("SHIB", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("TEMP", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("DAI", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("USDT", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("USDC", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("TUSD", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("BUSD", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("ETH", "MXN"), "decimals": 8},
    {"type": "SPOT", "pair": ("BNB", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("ADA", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("XRP", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("MATIC", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("AAVE", "USD"), "decimals": 8},
    {"type": "FUTURE", "pair": ("BTC", "USD"), "decimals": 8},
    {"type": "FUTURE", "pair": ("ETH", "USD"), "decimals": 8},
    {"type" : "OPTION", "pair": ("BTC", "USD"), "decimals": 8},
    {"type" : "OPTION", "pair": ("ETH", "USD"), "decimals": 8},
    {
        "type": "ONCHAIN",
        "source": "AAVE",
        "key": "AAVE-ON-BORROW",
        "detail": {
            "asset_name": "USD Coin",
            "asset_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
            "metric": "variableBorrowRate",
        },
        "decimals": 18,
    },
]

def fetch_sync() -> List[Union[OptionEntry, PublisherFetchError]]:
        entries = []
        assets = EMPIRIC_ALL_ASSETS
        for asset in assets:
            if asset["type"] != "OPTION":
                logger.debug(f"Skipping Beribit for non-option asset {asset}")
                continue
            entries.append(_fetch_pair_sync(asset))
        return entries
def _fetch_pair_sync(
        asset: EmpiricSpotAsset
    ) -> Union[OptionEntry, PublisherFetchError]:
        pair = asset["pair"]
        name_url = f"{BASE_NAME_URL}{pair[0].lower()}&kind=option"
        resp = requests.get(name_url)
        if resp.status_code == 404:
            return PublisherFetchError(
                f"No data found for {'/'.join(pair)} from Beribit"
            )
        result = json.loads(resp.text)
        name = pd.json_normalize(result['result'])['instrument_name']
        name = list(name)
        settlement_period = pd.json_normalize(result['result'])['settlement_period']
        settlement_period = list(settlement_period)
        strike = pd.json_normalize(result['result'])['strike']
        strike = list(strike)
        option_type = pd.json_normalize(result['result'])['option_type']
        option_type = list(option_type)
        creation_timestamp = pd.json_normalize(result['result'])['creation_timestamp']
        creation_timestamp = list(creation_timestamp)
        expiration_timestamp = pd.json_normalize(result['result'])['expiration_timestamp']
        expiration_timestamp = list(expiration_timestamp)
        print(strike)
        for i in range(len(name)):
            data_url = f"{BASE_DATA_URL}{name[i]}"
            resp = requests.get(data_url)
            if resp.status_code == 404:
                return PublisherFetchError(
                    f"No data found for {'/'.join(pair)} from Bitstamp"
                )
            result = json.loads(resp.text)
            # return _construct(asset, result, settlement_period[i], strike[i], option_type[i], creation_timestamp[i], expiration_timestamp[i])
        return


def _construct(asset, result, new_settlement_period, new_strike, new_option_type, new_creation_timestamp, new_expiration_timestamp) ->OptionEntry:
        underlying_index = result["underlying_index"]
        underlying_price = int(result['underlying_price']* (10 ** asset["decimals"]))
        open_interest = int(result["open_interest"]* (10 ** asset["decimals"]))
        settlement_period = int(new_settlement_period* (10 ** asset["decimals"]))
        mark_iv = int(result["mark_iv"]* (10 ** asset["decimals"]))
        bid_iv = int(result["bid_iv"]* (10 ** asset["decimals"]))
        ask_iv = int(result["ask_iv"]* (10 ** asset["decimals"]))

        logger.info(f"Fetched options infos for {'/'.join(underlying_index)} from Beribit")

        return OptionEntry(
            underlying_index = underlying_index,
            underlying_price = underlying_price,
            strike  = int(new_strike* (10 ** asset["decimals"])),
            option_type = new_option_type,
            creation_timestamp = new_creation_timestamp,
            expiration_timestamp = new_expiration_timestamp,
            open_interest = open_interest,
            settlement_period = settlement_period,
            mark_iv = mark_iv,
            bid_iv = bid_iv,
            ask_iv = ask_iv,
            source=self.SOURCE,
            publisher=self.publisher,
        )
entries = fetch_sync()
print(entries)