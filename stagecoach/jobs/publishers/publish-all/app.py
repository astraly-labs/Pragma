import asyncio
import json
import os

import boto3
from pragma.core import SpotEntry
from pragma.core.logger import get_stream_logger
from pragma.publisher.assets import PRAGMA_ALL_ASSETS
from pragma.publisher.client import PragmaPublisherClient
from pragma.publisher.fetchers import (
    BitstampFetcher,
    CexFetcher,
    CoinbaseFetcher,
    CoingeckoFetcher,
    GeminiFetcher,
)

logger = get_stream_logger()

NETWORK = os.environ["NETWORK"]
SECRET_NAME = os.environ["SECRET_NAME"]


def handler(event, context):
    entries_ = asyncio.run(_handler(PRAGMA_ALL_ASSETS))
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
    return int(
        json.loads(get_secret_value_response["SecretString"])["PUBLISHER_PRIVATE_KEY"]
    )


async def _handler(assets):
    publisher = os.environ.get("PUBLISHER")

    publisher_private_key = _get_pvt_key()

    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = PragmaPublisherClient(
        network=NETWORK,
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )
    publisher_client.add_fetchers(
        [
            fetcher(assets, publisher)
            for fetcher in (
                BitstampFetcher,
                CexFetcher,
                CoinbaseFetcher,
                CoingeckoFetcher,
                GeminiFetcher,
            )
        ]
    )
    _entries = await publisher_client.fetch()
    response = await publisher_client.publish_many(_entries)
    print(
        f"Published data with tx hashes: {', '.join([hex(res.hash) for res in response])}"
    )
    for res in response:
        await res.wait_for_acceptance(wait_for_accept=True)
    return _entries


if __name__ == "__main__":
    handler(None, None)
