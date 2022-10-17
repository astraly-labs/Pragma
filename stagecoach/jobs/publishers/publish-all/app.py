import asyncio
import json
import os

import boto3
from empiric.core import SpotEntry
from empiric.core.logger import get_stream_logger
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import (
    BitstampFetcher,
    CexFetcher,
    CoinbaseFetcher,
    FtxFetcher,
    TheGraphFetcher,
)

logger = get_stream_logger()


def handler(event, context):
    entries_ = asyncio.run(_handler(EMPIRIC_ALL_ASSETS))
    serialized_entries_ = SpotEntry.serialize_entries(entries_)
    print(serialized_entries_)
    return {
        "result": serialized_entries_,
    }


def _get_pvt_key():
    secret_name = "publisherPrivateKey"
    region_name = "us-west-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)
    get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    return int(
        json.loads(get_secret_value_response["SecretString"])["PUBLISHER_PRIVATE_KEY"]
    )


async def _handler(assets):
    publisher = os.environ.get("PUBLISHER")

    publisher_private_key = _get_pvt_key()

    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = EmpiricPublisherClient(
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
                FtxFetcher,
                TheGraphFetcher,
            )
        ]
    )
    _entries = await publisher_client.fetch()
    response = await publisher_client.publish_many(_entries, pagination=50)
    for res in response:
        await res.wait_for_acceptance(wait_for_accept=True)

    invocation = await publisher_client.set_checkpoints(
        list(
            set(
                [
                    int(entry.pair_id)
                    for entry in _entries
                    if isinstance(entry, SpotEntry)
                ]
            )
        )
    )
    await invocation.wait_for_acceptance(wait_for_accept=True)

    return _entries


if __name__ == "__main__":
    handler(None, None)
