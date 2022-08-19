from __future__ import annotations

from typing import List, Union

from empiric.core.utils import str_to_felt


class Entry:
    key: int
    value: int
    timestamp: int
    source: int
    publisher: int

    def __init__(
        self,
        key: Union[str, int],
        value: int,
        timestamp: int,
        source: Union[str, int],
        publisher: Union[str, int],
    ) -> None:
        if type(key) == str:
            key = str_to_felt(key)

        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        self.key = (key,)
        self.value = (value,)
        self.timestamp = (timestamp,)
        self.source = (source,)
        self.publisher = (publisher,)

    def serialize(self) -> List[int]:
        return [self.key, self.value, self.timestamp, self.source, self.publisher]

    @staticmethod
    def serialize_entries(entries: List[Entry]) -> List[int]:
        expanded = [entry.serialize() for entry in entries]
        flattened = [x for entry in expanded for x in entry]
        return [len(entries)] + flattened
