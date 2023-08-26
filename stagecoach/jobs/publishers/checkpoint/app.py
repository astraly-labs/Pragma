import asyncio
import json
import os

import boto3
from pragma.core.logger import get_stream_logger
from pragma.core.utils import currency_pair_to_pair_id
from pragma.publisher.assets import get_asset_spec_for_pair_id_by_type
from pragma.publisher.client import PragmaPublisherClient

logger = get_stream_logger()

SECRET_NAME = os.environ["SECRET_NAME"]
NETWORK = os.environ["NETWORK"]
ASSETS = os.environ["ASSETS"]
ASSET_TYPE = os.environ.get("ASSET_TYPE", "SPOT")    
ACCOUNT_ADDRESS = int(os.environ.get("ACCOUNT_ADDRESS"))



def handler(event, context):
    assets = [get_asset_spec_for_pair_id_by_type(asset, ASSET_TYPE) for asset in ASSETS.split(",")]
    invocation = asyncio.run(_handler(assets))
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
    # private_key = int(os.environ["PRIVATE_KEY"])

    pairs = [
        currency_pair_to_pair_id(*p["pair"]) for p in assets if p["type"] == ASSET_TYPE 
    ]

    publisher_client = PragmaPublisherClient(
        account_private_key=private_key,
        account_contract_address=ACCOUNT_ADDRESS,
        network=NETWORK,
    )

    if ASSET_TYPE == "SPOT":
        invocation = await publisher_client.set_checkpoints(pairs, pagination=40)
    else:
        invocation = await publisher_client.set_future_checkpoints(pairs, pagination=40)

    print(f"Set checkpoints for pairs {pairs} at tx hash : {hex(invocation.hash)}")

    return invocation.hash


if __name__ == "__main__":
    handler(None, None)
