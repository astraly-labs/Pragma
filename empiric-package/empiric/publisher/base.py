import abc
from typing import Any, List

from aiohttp import ClientSession


class PublisherInterfaceT(abc.ABC):
    @abc.abstractmethod
    async def fetch(self, session: ClientSession) -> List[Any]:
        ...


class PublisherFetchError:
    message: str

    def __init__(self, message: str):
        self.message = message
