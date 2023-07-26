import asyncio
import json
import os

import boto3
from empiric.core.entry import FutureEntry
from empiric.core.logger import get_stream_logger
from empiric.publisher.assets import get_future_asset_spec_for_pair_id
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.future_fetchers import OkxFutureFetcher
from empiric.core.utils import currency_pair_to_pair_id

logger = get_stream_logger()

NETWORK = os.environ["NETWORK"]
SECRET_NAME = os.environ["SECRET_NAME"]
ASSETS = os.environ["ASSETS"]
PUBLISHER = os.environ.get("PUBLISHER")
PUBLISHER_ADDRESS = int(os.environ.get("PUBLISHER_ADDRESS"))
PAGINATION = os.environ.get("PAGINATION")
if PAGINATION is not None:
    PAGINATION = int(PAGINATION)


def handler(event, context):
    assets = [get_future_asset_spec_for_pair_id(asset) for asset in ASSETS.split(",")]
    entries_ = asyncio.run(_handler(assets))
    serialized_entries_ = FutureEntry.serialize_entries(entries_)
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
    publisher_private_key = 1
    publisher_client = EmpiricPublisherClient(
        network=NETWORK,
        account_private_key=publisher_private_key,
        account_contract_address=PUBLISHER_ADDRESS,
    )
    publisher_client.add_fetchers(
        [
            OkxFutureFetcher(assets, PUBLISHER)
        ]
    )
    _entries = await publisher_client.fetch()
    print(_entries)
    # response = await publisher_client.publish_many(_entries, pagination=PAGINATION)
    # print(
    #     f"Published data with tx hashes: {', '.join([hex(res.hash) for res in response])}"
    # )
    # for res in response:
    #     await res.wait_for_acceptance()

    # pairs = [
    #     currency_pair_to_pair_id(*p["pair"]) for p in assets if p["type"] == "FUTURE"
    # ]
    # await publisher_client.set_future_checkpoints(pairs)

    # return _entries


if __name__ == "__main__":
    handler(None, None)
