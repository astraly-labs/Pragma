from typing import Dict, List, Tuple, Union

from empiric.core.utils import key_for_asset
from typing_extensions import TypedDict


class EmpiricSpotAsset(TypedDict):
    type: str
    pair: Tuple[str, str]
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
    {"type": "SPOT", "pair": ("BTC", "EUR"), "decimals": 8},
    {"type": "SPOT", "pair": ("ETH", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("SOL", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("AVAX", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("DOGE", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("SHIB", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("TEMP", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("DAI", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("USDT", "USD"), "decimals": 6},
    {"type": "SPOT", "pair": ("USDC", "USD"), "decimals": 6},
    {"type": "SPOT", "pair": ("TUSD", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("BUSD", "USD"), "decimals": 6},
    {"type": "SPOT", "pair": ("ETH", "MXN"), "decimals": 8},
    {"type": "SPOT", "pair": ("BNB", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("ADA", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("XRP", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("MATIC", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("AAVE", "USD"), "decimals": 8},
    {"type": "FUTURE", "pair": ("BTC", "USD"), "decimals": 8},
    {"type": "FUTURE", "pair": ("ETH", "USD"), "decimals": 8},
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


def get_spot_asset_spec_for_key(key: str) -> EmpiricSpotAsset:
    if key not in _EMPIRIC_ASSET_BY_KEY:
        raise ValueError(f"key not found: {key}")
    return _EMPIRIC_ASSET_BY_KEY[key]
