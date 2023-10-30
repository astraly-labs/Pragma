import asyncio
import json
import os

import boto3
from pragma.core.logger import get_stream_logger
from pragma.core.assets import get_spot_asset_spec_for_pair_id, get_future_asset_spec_for_pair_id
from pragma.publisher.client import PragmaPublisherClient
from pragma.publisher.fetchers import (
    BitstampFetcher,
    CexFetcher,
    CoinbaseFetcher,
    AscendexFetcher,
    KaikoFetcher,
    DefillamaFetcher,
    GeckoTerminalFetcher,
    OkxFetcher,
    AvnuFetcher
)
from pragma.publisher.future_fetchers import (BinanceFutureFetcher, OkxFutureFetcher, ByBitFutureFetcher)

logger = get_stream_logger()

SECRET_NAME = os.environ["SECRET_NAME"]
SPOT_ASSETS = os.environ["SPOT_ASSETS"]
PUBLISHER = os.environ.get("PUBLISHER")
PUBLISHER_ADDRESS = int(os.environ.get("PUBLISHER_ADDRESS"))
KAIKO_API_KEY = os.environ.get("KAIKO_API_KEY")
PAGINATION = os.environ.get("PAGINATION")
API_URL = os.environ.get("API_URL", "https://api.dev.pragma.build/node")
if PAGINATION is not None:
    PAGINATION = int(PAGINATION)


def handler(event, context):
    spot_assets = [get_spot_asset_spec_for_pair_id(asset) for asset in SPOT_ASSETS.split(",")]
    response = asyncio.run(_handler(spot_assets))
    return {
        "success": response,
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
    publisher_private_key = _get_pvt_key()
    # publisher_private_key = int(os.environ["PUBLISHER_PRIVATE_KEY"], 10)

    publisher_client = PragmaPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=PUBLISHER_ADDRESS,
        api_url=API_URL
    )

    publisher_client.add_fetchers(
        [
            fetcher(assets, PUBLISHER)
            for fetcher in (
                BitstampFetcher,
                CexFetcher,
                CoinbaseFetcher,
                AscendexFetcher,
                DefillamaFetcher,
                OkxFetcher,
                GeckoTerminalFetcher,
            )
        ]
    )
    
    publisher_client.add_fetcher(KaikoFetcher(assets, PUBLISHER, KAIKO_API_KEY))
    
    _entries = await publisher_client.fetch()
    print(f"Got {_entries} entries")
    response = await publisher_client.publish_data(_entries)
    
    print(f"Successfuly published data with response {response}")

    return response


if __name__ == "__main__":
    handler(None, None)
