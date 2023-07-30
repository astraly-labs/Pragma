from typing import Dict, List, Tuple, Union

from empiric.core.utils import key_for_asset
from empiric.core.types import AssetType
from typing_extensions import TypedDict
from empiric.publisher.types import UnsupportedAssetError


class EmpiricSpotAsset(TypedDict):
    type: str
    pair: Tuple[str, str]
    decimals: int

class EmpiricFutureAsset(TypedDict):
    type: str
    pair: Tuple[str, str]
    expiry_timestamp: str
    decimals: int

class EmpiricOnchainDetail(TypedDict):
    asset_name: str
    asset_address: str
    metric: str


class EmpiricOnchainAsset(TypedDict):
    type: str
    source: str
    key: str
    detail: EmpiricOnchainDetail
    decimals: int


EmpiricAsset = Union[EmpiricSpotAsset, EmpiricOnchainAsset]


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
    {"type": "FUTURE", "pair": ("BTC", "USDT"), "decimals": 8},
    {"type": "FUTURE", "pair": ("ETH", "USD"), "decimals": 8},
    {"type": "FUTURE", "pair": ("ETH", "USDT"), "decimals": 8},
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

_EMPIRIC_ASSET_BY_KEY: Dict[str, EmpiricSpotAsset] = {
    key_for_asset(asset): asset
    for asset in EMPIRIC_ALL_ASSETS
    if asset["type"] == "SPOT"
}

_EMPIRIC_FUTURE_ASSET_BY_KEY: Dict[str, EmpiricFutureAsset] = {
    key_for_asset(asset): asset
    for asset in EMPIRIC_ALL_ASSETS
    if asset["type"] == "FUTURE"
}

_EMPIRIC_ALL_ASSET_BY_KEY: Dict[str, EmpiricAsset] ={
    key_for_asset(asset): asset
    for asset in EMPIRIC_ALL_ASSETS
}

# TODO: Add support for option asset type
def get_asset_spec_for_pair_id_by_type(pair_id: str, asset_type: AssetType) -> EmpiricAsset:
    if asset_type == "SPOT":
        return get_spot_asset_spec_for_pair_id(pair_id)
    elif asset_type == "FUTURE":
        return get_future_asset_spec_for_pair_id(pair_id)
    else:
        raise UnsupportedAssetError("Only SPOT & FUTURE are supported for now.")


def get_spot_asset_spec_for_pair_id(pair_id: str) -> EmpiricSpotAsset:
    if pair_id not in _EMPIRIC_ASSET_BY_KEY:
        raise ValueError(f"Pair ID not found: {pair_id}")
    return _EMPIRIC_ASSET_BY_KEY[pair_id]

def get_future_asset_spec_for_pair_id(pair_id: str) -> EmpiricFutureAsset:
    if pair_id not in _EMPIRIC_FUTURE_ASSET_BY_KEY:
        raise ValueError(f"Pair ID not found: {pair_id}")
    return _EMPIRIC_FUTURE_ASSET_BY_KEY[pair_id]

def get_asset_spec_for_pair_id(pair_id: str) -> EmpiricAsset:
    if pair_id not in _EMPIRIC_ALL_ASSET_BY_KEY:
        raise ValueError(f"Pair ID not found: {pair_id}")
    return _EMPIRIC_ALL_ASSET_BY_KEY[pair_id]