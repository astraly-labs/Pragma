import abc
from typing import Any, List

import aiohttp
from aiohttp import ClientSession


class PublisherInterfaceT(abc.ABC):
    @abc.abstractmethod
    async def fetch(self, session: ClientSession) -> List[Any]:
        ...

    @abc.abstractmethod
    def fetch_sync(self) -> List[Any]:
        ...

    async def _fetch(self):
        async with aiohttp.ClientSession() as session:
            data = await self.fetch(session)
            return data


class PublisherFetchError:
    message: str

    def __init__(self, message: str):
        self.message = message

    def serialize(self):
        return self.message
