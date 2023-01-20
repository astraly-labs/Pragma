import asyncio
import json
import os

import boto3
from empiric.core.entry import GenericEntry
from empiric.core.logger import get_stream_logger
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.fetchers import MystisFetcher

logger = get_stream_logger()

NETWORK = os.environ["NETWORK"]

def handler(event, context):
    entry_ = asyncio.run(_handler("0x1474c8a6f3e24c25e64f2b11de7077d57a69ee4fff9f17204c4e2af80587a18"))
    serialized_entries_ = GenericEntry.serialize(entry_)
    print(serialized_entries_)
    return {
        "success": len(serialized_entries_),
    }

async def _handler(address):
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"))
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"))
    publisher_client = EmpiricPublisherClient(
        network=NETWORK,
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
    )

    mystis_fetcher = MystisFetcher(address, publisher)
    publisher_client.add_fetcher(mystis_fetcher)

    _entry = await publisher_client.fetch_generic()  
    response = await publisher_client.publish_entry(_entry) # Check error here
    print(f"response", response)
    print(
        f"Published data with tx hashes: {', '.join([hex(res.hash) for res in response])}"
    )
    for res in response:
        await res.wait_for_acceptance(wait_for_accept=True)
    return _entry


if __name__ == "__main__":
    handler(None, None)