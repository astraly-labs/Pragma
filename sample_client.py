import asyncio
from datetime import datetime

from empiric.core.client import EmpiricClient
from empiric.core.config import TestnetConfig
from empiric.core.utils import currency_pair_to_key


async def main():
    asset_pair = ("ETH", "USD")
    key = currency_pair_to_key(*asset_pair)
    aggregation_mode = TestnetConfig.DEFAULT_AGGREGATION_MODE

    client = EmpiricClient()
    (
        value,
        decimals,
        last_updated_timestamp,
        num_sources_aggregated,
    ) = await client.get_value(key, aggregation_mode)

    print(
        f"""Value of asset pair {asset_pair} is: {float(value) / (10**decimals)}, \
        last updated at {datetime.fromtimestamp(last_updated_timestamp).strftime('%Y-%m-%d, %H:%M:%S')}, \
        based off of aggregating {num_sources_aggregated} sources."""
    )


if __name__ == "__main__":
    asyncio.run(main())
