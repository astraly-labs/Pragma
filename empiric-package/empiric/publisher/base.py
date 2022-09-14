import abc
from typing import List

from aiohttp import ClientSession
from empiric.core.entry import Entry


class PublisherInterfaceT(abc.ABC):
    @abc.abstractmethod
    async def fetch(self, session: ClientSession) -> List[Entry]:
        ...


class PublisherFetchError:
    message: str

    def __init__(self, message: str):
        self.message = message
