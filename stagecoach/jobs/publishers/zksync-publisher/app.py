import asyncio
import json
import os

import boto3
from empiric.core import SpotEntry
from empiric.core.logger import get_stream_logger
from empiric.core.mixins.evm import EvmHelper
from empiric.core.utils import currency_pair_to_pair_id, felt_to_str
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import (
    BitstampFetcher,
    CexFetcher,
    GeminiFetcher,
)

ASSETS = [
    {"type": "SPOT", "pair": ("BTC", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("BTC", "EUR"), "decimals": 8},
    {"type": "SPOT", "pair": ("ETH", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("DAI", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("USDT", "USD"), "decimals": 6},
    {"type": "SPOT", "pair": ("USDC", "USD"), "decimals": 6},
    {"type": "SPOT", "pair": ("BNB", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("MATIC", "USD"), "decimals": 8},
    {"type": "SPOT", "pair": ("AAVE", "USD"), "decimals": 8},
]
PAIRS = [currency_pair_to_pair_id(*p["pair"]).encode() for p in ASSETS]
PROVIDER_URI = "https://zksync2-testnet.zksync.dev"
CHAIN_ID = 280
ORACLE_ADDRESS = "0xEE6Cf2A27e79A8466d5a561ABd355bBE968d5fa3"

logger = get_stream_logger()


def handler(event, context):
    entries_ = asyncio.run(_handler(ASSETS))
    return {
        "success": len(entries_),
    }


def _get_pvt_key():
    secret_name = "zkSyncTestnetPrivateKey"
    region_name = "us-west-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)
    get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    return '0x' + json.loads(get_secret_value_response["SecretString"])["ZKSYNC_PUBLISHER_PRIVATE_KEY"]


async def _handler(assets):
    publisher = os.environ["PUBLISHER"].encode()
    publisher_private_key = _get_pvt_key()
    sender_address = "0x8e0694057A1d313355887639fCDB1e1a128D44BC"
    zksync_publisher_client = EvmHelper(
        publisher,
        sender_address,
        publisher_private_key,
        provider_uri=PROVIDER_URI,
        chain_id=CHAIN_ID,
        oracle_address=ORACLE_ADDRESS,
    )

    publisher_client = EmpiricPublisherClient()
    publisher_client.add_fetchers(
        [
            fetcher(assets, publisher)
            for fetcher in (
                BitstampFetcher,
                CexFetcher,
                GeminiFetcher,
            )
        ]
    )
    _entries = SpotEntry.serialize_entries(await publisher_client.fetch())
    _entries = [
        {
            'base': {
                'timestamp': e['base']['timestamp'],
                'source': felt_to_str(e['base']['source']).encode(),
                'publisher': e['base']['publisher'],
            },
            'pairId': felt_to_str(e['pair_id']).encode(),
            'price': e['price'],
            'volume': e['volume'],
        }
         for e in _entries]
    nonce = zksync_publisher_client.get_nonce()
    print(f'nonce: {nonce}')

    response_hash = zksync_publisher_client.publish_spot_entries(_entries, nonce=nonce)
    print(
        f"Published data with tx hash: {response_hash}."
    )
    response_hash = zksync_publisher_client.setCheckpoints(PAIRS, nonce=nonce + 1)
    print(
        f"Checkpointed data with tx hash: {response_hash}."
    )

    return _entries


if __name__ == "__main__":
    handler(None, None)
