import asyncio
from typing import List

import aiohttp
from empiric.core.client import EmpiricClient
from empiric.core.entry import SpotEntry
from empiric.publisher.types import PublisherInterfaceT


class EmpiricPublisherClient(EmpiricClient):
    """
    This client extends the empiric client with functionality for fetching from our third party sources.
    It can be used to synchronously or asynchronously fetch assets using the Asset format, ie.

    `{"type": "SPOT", "pair": ("BTC", "USD"), "decimals": 18}`

    More to follow on the standardization of this format.

    The client works by setting up fetchers that are provided the assets to fetch and the publisher name.

    ```python
    cex_fetcher = CexFetcher(EMPIRIC_ALL_ASSETS, "empiric_fetcher_test")
    gemini_fetcher = GeminiFetcher(EMPIRIC_ALL_ASSETS, "empiric_fetcher_test")
    fetchers = [
        cex_fetcher,
        gemini_fetcher,
    ]
    eapc = EmpiricPublisherClient('testnet')
    eapc.add_fetchers(fetchers)
    await eapc.fetch()
    eapc.fetch_sync()
    ```
    """

    fetchers: List[PublisherInterfaceT] = []

    @staticmethod
    def convert_to_publisher(client: EmpiricClient):
        client.__class__ = EmpiricPublisherClient
        return client

    def add_fetchers(self, fetchers: List[PublisherInterfaceT]):
        self.fetchers.extend(fetchers)

    def add_fetcher(self, fetcher: PublisherInterfaceT):
        self.fetchers.append(fetcher)

    async def fetch(self, filter_exceptions=True) -> List[SpotEntry]:
        tasks = []
        timeout = aiohttp.ClientTimeout(total=10)  # 10 seconds per request
        async with aiohttp.ClientSession(timeout=timeout) as session:
            for fetcher in self.fetchers:
                data = fetcher.fetch(session)
                tasks.append(data)
            result = await asyncio.gather(*tasks, return_exceptions=True)
            if filter_exceptions:
                return [
                    val
                    for subl in result
                    for val in subl
                    if not isinstance(val, Exception)
                ]
            return [val for subl in result for val in subl]

    def fetch_sync(self) -> List[SpotEntry]:
        results = []
        for fetcher in self.fetchers:
            data = fetcher.fetch_sync()
            results.extend(data)
        return results
