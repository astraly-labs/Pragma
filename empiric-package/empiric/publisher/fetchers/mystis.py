import asyncio
import logging
import time

import requests
from aiohttp import ClientSession
from empiric.core.entry import GenericEntry
from empiric.publisher.types import PublisherInterfaceT, PublisherFetchError

logger = logging.getLogger(__name__)


class MystisFetcher(PublisherInterfaceT):
    BASE_URL: str = (
        "https://firestore.googleapis.com/v1/mystis-58531"
        "/databases/(default)/documents/users"
        "/{address}"
    )
    
    SOURCE: str = "MYSTIS"
    headers = {
        "Accepts": "application/json",
    }

    publisher: str

    def __init__(self, address: str, publisher):
        self.address = address
        self.publisher = publisher

    async def _fetch_amount_token(
        self, address: str, session: ClientSession
    ) -> GenericEntry:
        if address is None:
            return PublisherFetchError(
                f"Unknown wallet address on Mystis API, do not know how to query Mystis API for {address}"
            )

        url = self.BASE_URL.format(address=address)

        async with session.get(
            url, headers=self.headers, raise_for_status=True
        ) as resp:
            result = await resp.json()
            return self._construct(address, result)

    async def _fetch_amount_token_sync(
        self, address: str
    ) -> GenericEntry:
        if address is None:
            return PublisherFetchError(
                f"Unknown wallet address on Mystis, do not know how to query Mystis for {address}"
            )

        url = self.BASE_URL.format(address=address)

        resp = requests.get(url)
        resp.raise_for_status()
        result = resp.json()
        return self._construct(address, result)

    async def fetch(self, session: ClientSession) -> GenericEntry:
        entry = entry.append(asyncio.ensure_future(self._fetch_amount_token(self.wallet_address, session)))
        return await asyncio.gather(*entry, return_exceptions=True)

    async def fetch_sync(self) -> GenericEntry:
        entry = entry.append(self._fetch_amount_token_sync(self.wallet_address))
        return entry

    def _construct(self, address, result) -> GenericEntry:
        value = result["amountToken"]
        value_int = int(value)
        timestamp = int(time.time())

        logger.info(f"Fetched claimable amount {value_int} for {address} from Mystis")

        return GenericEntry(
            key=address,
            value=value_int,
            timestamp=timestamp,
            source=self.SOURCE,
            publisher=self.publisher,
        )