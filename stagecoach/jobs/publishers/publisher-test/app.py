#!/usr/bin/env python3
import asyncio
import sys

from empiric.core import Entry
from empiric.publisher import EmpiricPublisherClient, EMPIRIC_ALL_ASSETS
from empiric.publisher.fetchers import CexFetcher


def handler(event, context):
    entries_ = asyncio.run(_handler(event, context))
    serialized_entries_ = Entry.serialize_entries(entries_)
    print(serialized_entries_)
    return {
        'result': serialized_entries_,
    }


async def _handler(event, context):
    client = EmpiricPublisherClient()
    client.add_fetcher(CexFetcher(EMPIRIC_ALL_ASSETS, 'cex'))
    entries_ = await client.fetch()
    return entries_


if __name__ == '__main__':
    handler(None, None)
