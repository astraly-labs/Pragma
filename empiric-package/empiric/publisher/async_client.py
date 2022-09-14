import asyncio
from typing import List

import aiohttp
from empiric.core.entry import Entry
from empiric.publisher.base import PublisherInterfaceT


class EmpiricAsyncPublisherClient:
    fetchers: List[PublisherInterfaceT] = []

    def add_fetcher(self, fetcher: PublisherInterfaceT):
        self.fetchers.append(fetcher)

    async def fetch(self) -> List[Entry]:
        tasks = []
        async with aiohttp.ClientSession() as session:
            for fetcher in self.fetchers:
                data = fetcher.fetch(session)
                tasks.append(data)
            result = await asyncio.gather(*tasks)
            return [val for subl in result for val in subl]


async def get_entries():
    from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
    from empiric.publisher.async_fetch import (
        BitstampFetcher,
        CexFetcher,
        CryptowatchFetcher,
        GeminiFetcher,
        TheGraphFetcher,
    )

    bitstamp_fetcher = BitstampFetcher(EMPIRIC_ALL_ASSETS, "test1")
    cex_fetcher = CexFetcher(EMPIRIC_ALL_ASSETS, "test2")
    cryptowatch_fetcher = CryptowatchFetcher(EMPIRIC_ALL_ASSETS, "test3")
    gemini_fetcher = GeminiFetcher(EMPIRIC_ALL_ASSETS, "test4")
    the_graph_fetcher = TheGraphFetcher(EMPIRIC_ALL_ASSETS, "test5")
    fetchers = [
        bitstamp_fetcher,
        cex_fetcher,
        cryptowatch_fetcher,
        gemini_fetcher,
        the_graph_fetcher,
    ]
    eapc = EmpiricAsyncPublisherClient()

    for fetcher in fetchers:
        eapc.add_fetcher(fetcher)

    return await eapc.fetch()


if __name__ == "__main__":
    import time

    start = time.time()
    z = asyncio.run(get_entries())
    print(time.time() - start)
