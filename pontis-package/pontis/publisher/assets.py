DEFAULT_DECIMALS = 18
PONTIS_ALL_ASSETS = [
    {"type": "SPOT", "pair": ("BTC", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("ETH", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("LUNA", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("SOL", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("AVAX", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("DOGE", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("SHIB", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("TEMP", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("DAI", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("USDT", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("USDC", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("TUSD", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "SPOT", "pair": ("ETH", "MXN"), "decimals": DEFAULT_DECIMALS},
    {"type": "FUTURE", "pair": ("BTC", "USD"), "decimals": DEFAULT_DECIMALS},
    {"type": "FUTURE", "pair": ("ETH", "USD"), "decimals": DEFAULT_DECIMALS},
    {
        "type": "ONCHAIN",
        "source": "AAVE",
        "key": "aave-on-borrow",
        "detail": {
            "asset_name": "USD Coin",
            "asset_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
            "metric": "variableBorrowRate",
        },
        "decimals": DEFAULT_DECIMALS,
    },
]
