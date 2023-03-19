import asyncio
import json
import os

import boto3
from pragma.core.logger import get_stream_logger
from pragma.core.utils import currency_pair_to_pair_id
from pragma.publisher.assets import PRAGMA_ALL_ASSETS
from pragma.publisher.client import PragmaPublisherClient

logger = get_stream_logger()

SECRET_NAME = os.environ["SECRET_NAME"]


def handler(event, context):
    invocation = asyncio.run(_handler(PRAGMA_ALL_ASSETS))
    return {
        "result": invocation,
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
    private_key = _get_pvt_key()
    account_address = int(os.environ.get("ACCOUNT_ADDRESS"))
    pairs = [
        currency_pair_to_pair_id(*p["pair"]) for p in assets if p["type"] == "SPOT"
    ]

    publisher_client = PragmaPublisherClient(
        account_private_key=private_key,
        account_contract_address=account_address,
    )
    invocation = await publisher_client.set_checkpoints(pairs, pagination=40)
    await invocation.wait_for_acceptance(wait_for_accept=True)

    return invocation.hash


if __name__ == "__main__":
    handler(None, None)
