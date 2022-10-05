#!/usr/bin/env python3
import asyncio

from empiric.core import SpotEntry
from empiric.publisher import EMPIRIC_ALL_ASSETS, EmpiricPublisherClient
from empiric.publisher.fetchers import CexFetcher


def handler(event, context):
    entries_ = asyncio.run(_handler(event, context))
    serialized_entries_ = SpotEntry.serialize_entries(entries_)
    print(serialized_entries_)
    return {
        "result": serialized_entries_,
    }


async def _handler(event, context):
    client = EmpiricPublisherClient()
    client.add_fetcher(CexFetcher(EMPIRIC_ALL_ASSETS, "cex"))
    entries_ = await client.fetch()
    return entries_


if __name__ == "__main__":
    handler(None, None)
