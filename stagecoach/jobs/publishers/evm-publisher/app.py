import asyncio
import json
import os

import boto3
from empiric.core import SpotEntry
from empiric.core.logger import get_stream_logger
from empiric.publisher.assets import get_spot_asset_spec_for_pair_id
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import (
    BitstampFetcher,
    CexFetcher,
    CoinbaseFetcher,
    AscendexFetcher,
    DefillamaFetcher,
    KaikoFetcher
)
from empiric.core.mixins.evm import EvmHelper

logger = get_stream_logger()

NETWORK = os.environ["NETWORK"]
SECRET_NAME = os.environ["SECRET_NAME"]
ASSETS = os.environ["ASSETS"]
PUBLISHER = os.environ.get("PUBLISHER")
PUBLISHER_ADDRESS = os.environ.get("PUBLISHER_ADDRESS")
KAIKO_API_KEY = os.environ.get("KAIKO_API_KEY")
PAGINATION = os.environ.get("PAGINATION")
if PAGINATION is not None:
    PAGINATION = int(PAGINATION)


def handler(event, context):
    assets = [get_spot_asset_spec_for_pair_id(asset) for asset in ASSETS.split(",")]
    entries_ = asyncio.run(_handler(assets))
    serialized_entries_ = SpotEntry.serialize_entries(entries_)
    print(serialized_entries_)
    return {
        "success": len(serialized_entries_),
    }


def _get_pvt_key():
    region_name = "eu-west-3"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)
    get_secret_value_response = client.get_secret_value(SecretId=SECRET_NAME)
    return json.loads(get_secret_value_response["SecretString"])["PUBLISHER_PRIVATE_KEY"]


async def _handler(assets):
    publisher_private_key = _get_pvt_key()
    publisher_client = EmpiricPublisherClient()

    publisher_client.add_fetchers(
        [
            fetcher(assets, PUBLISHER)
            for fetcher in (
                BitstampFetcher,
                CexFetcher,
                CoinbaseFetcher,
                AscendexFetcher,
                DefillamaFetcher
            )
        ]
    )
    publisher_client.add_fetcher(KaikoFetcher(assets, PUBLISHER, KAIKO_API_KEY))

    _entries = await publisher_client.fetch()
    # Create an instance of the EvmHelper class
    evm_helper = EvmHelper(PUBLISHER, PUBLISHER_ADDRESS, publisher_private_key, NETWORK)
    # Publish the data to the smart contract
    response = evm_helper.publish_spot_entries(
        _entries, gas_price=os.environ['GAS_PRICE'] or int(1e6), gas=os.environ['GAS'] or 1e6
    )
    print(f"Published data with tx hash: {response}")

    return _entries


if __name__ == "__main__":
    handler(None, None)
