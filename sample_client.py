import asyncio
from argparse import ArgumentParser
from datetime import datetime

import typing_extensions
from empiric.core.client import EmpiricClient
from empiric.core.config import TestnetConfig
from empiric.core.logger import get_stream_logger
from empiric.core.types import TESTNET, Network
from empiric.core.utils import currency_pair_to_key


async def main(network: Network, throw_if_no_data: bool):
    logger = get_stream_logger()

    asset_pair = ("ETH", "USD")
    pair_id = currency_pair_to_key(*asset_pair)
    aggregation_mode = TestnetConfig.DEFAULT_AGGREGATION_MODE

    client = EmpiricClient(network=network)
    (
        value,
        decimals,
        last_updated_timestamp,
        num_sources_aggregated,
    ) = await client.get_value(pair_id, aggregation_mode)

    logger.info(
        f"""Value of asset pair {asset_pair} is: {float(value) / (10**decimals)}, \
        last updated at {datetime.fromtimestamp(last_updated_timestamp).strftime('%Y-%m-%d, %H:%M:%S')}, \
        based off of aggregating {num_sources_aggregated} sources."""
    )

    if throw_if_no_data and last_updated_timestamp == 0:
        logger.error(f"Couldn't find any data for {asset_pair} on network: {network}.")
        raise Exception


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        "--network",
        default=TESTNET,
        choices=typing_extensions.get_args(Network),
        help="Specify the client's network.",
    )
    parser.add_argument(
        "--throw_if_no_data",
        action="store_true",
        help="Raise exception if no data is found.",
    )
    args = parser.parse_args()
    asyncio.run(main(args.network, args.throw_if_no_data))
