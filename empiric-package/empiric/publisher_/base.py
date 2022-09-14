import abc
from typing import List

import aiohttp
from aiohttp import ClientSession
from empiric.core_.entry import Entry


class PublisherInterfaceT(abc.ABC):
    @abc.abstractmethod
    async def fetch(self, session: ClientSession) -> List[Entry]:
        ...

    @abc.abstractmethod
    def fetch_sync(self) -> List[Entry]:
        ...

    async def _fetch(self):
        async with aiohttp.ClientSession() as session:
            data = await self.fetch(session)
            return data


class PublisherFetchError:
    message: str

    def __init__(self, message: str):
        self.message = message
