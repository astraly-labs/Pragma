from __future__ import annotations

from typing import List, Tuple, Union

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

        self.key = key
        self.value = value
        self.timestamp = timestamp
        self.source = source
        self.publisher = publisher

    def __eq__(self, other):
        if isinstance(other, Entry):
            return (
                self.key == other.key
                and self.value == other.value
                and self.timestamp == other.timestamp
                and self.source == other.source
                and self.publisher == other.publisher
            )
        # This supports comparing against entries that are returned by starknet.py,
        # which will be namedtuples.
        if isinstance(other, Tuple) and len(other) == 5:
            return (
                self.key == other[0]
                and self.value == other[1]
                and self.timestamp == other[2]
                and self.source == other[3]
                and self.publisher == other[4]
            )
        return False

    def serialize(self) -> Tuple[int, int, int, int, int]:
        return (self.key, self.value, self.timestamp, self.source, self.publisher)

    @staticmethod
    def serialize_entries(entries: List[Entry]) -> List[int]:
        expanded = [entry.serialize() for entry in entries]
        flattened = [x for entry in expanded for x in entry]
        return [len(entries)] + flattened
