import asyncio
from typing import List

import aiohttp
from empiric.core_.client import EmpiricClient
from empiric.core_.entry import Entry
from empiric.publisher.base import PublisherInterfaceT


class EmpiricPublisherClient(EmpiricClient):
    """
    This client extends the empiric client with functionality for fetching from our third party sources.
    It can be used to synchronously or asynchronously fetch assets using the Asset format, ie.

    `{"type": "SPOT", "pair": ("BTC", "USD"), "decimals": 18}`

    More to follow on the standardization of this format.

    The client works by setting up fetchers that are provided the assets to fetch and the publisher name.

    ```python
    cryptowatch_fetcher = CryptowatchFetcher(EMPIRIC_ALL_ASSETS, "empiric_fetcher_test")
    gemini_fetcher = GeminiFetcher(EMPIRIC_ALL_ASSETS, "empiric_fetcher_test")
    fetchers = [
        cryptowatch_fetcher,
        gemini_fetcher,
    ]
    eapc = EmpiricPublisherClient('testnet')
    eapc.add_fetchers(fetchers)
    await eapc.fetch()
    eapc.fetch_sync()
    ```
    """

    fetchers: List[PublisherInterfaceT] = []

    def add_fetchers(self, fetchers: List[PublisherInterfaceT]):
        self.fetchers.extend(fetchers)

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

    def fetch_sync(self) -> List[Entry]:
        results = []
        for fetcher in self.fetchers:
            data = fetcher.fetch_sync()
            results.extend(data)
        return results


async def get_entries():
    from empiric.publisher_.assets import EMPIRIC_ALL_ASSETS
    from empiric.publisher_.fetchers import (
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
    eapc = EmpiricPublisherClient("testnet")

    for fetcher in fetchers:
        eapc.add_fetcher(fetcher)

    return await eapc.fetch()


if __name__ == "__main__":
    import time

    start = time.time()
    z = asyncio.run(get_entries())
    print(time.time() - start)