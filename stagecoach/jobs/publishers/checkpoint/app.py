import asyncio
import json
import os

import boto3
from empiric.core.logger import get_stream_logger
from empiric.core.utils import currency_pair_to_pair_id
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.client import EmpiricPublisherClient

logger = get_stream_logger()


def handler(event, context):
    invocation = asyncio.run(_handler(EMPIRIC_ALL_ASSETS))
    return {
        "result": invocation,
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
    private_key = _get_pvt_key()
    account_address = int(os.environ.get("ACCOUNT_ADDRESS"))
    pairs = [
        currency_pair_to_pair_id(*p["pair"]) for p in assets if p["type"] == "SPOT"
    ]

    publisher_client = EmpiricPublisherClient(
        account_private_key=private_key,
        account_contract_address=account_address,
    )
    invocation = await publisher_client.set_checkpoints(pairs)
    await invocation.wait_for_acceptance(wait_for_accept=True)

    return invocation.hash


if __name__ == "__main__":
    handler(None, None)
