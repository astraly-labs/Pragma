from __future__ import annotations

from typing import Dict, List, Tuple, Union

from empiric.core.utils import str_to_felt
from empiric.publisher.base import PublisherFetchError


class Entry:
    pair_id: int
    value: int
    timestamp: int
    source: int
    publisher: int

    def __init__(
        self,
        pair_id: Union[str, int],
        value: int,
        timestamp: int,
        source: Union[str, int],
        publisher: Union[str, int],
    ) -> None:
        if type(pair_id) == str:
            pair_id = str_to_felt(pair_id)

        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        self.pair_id = pair_id
        self.value = value
        self.timestamp = timestamp
        self.source = source
        self.publisher = publisher

    def __eq__(self, other):
        if isinstance(other, Entry):
            return (
                self.pair_id == other.pair_id
                and self.value == other.value
                and self.timestamp == other.timestamp
                and self.source == other.source
                and self.publisher == other.publisher
            )
        # This supports comparing against entries that are returned by starknet.py,
        # which will be namedtuples.
        if isinstance(other, Tuple) and len(other) == 5:
            return (
                self.pair_id == other[0]
                and self.value == other[1]
                and self.timestamp == other[2]
                and self.source == other[3]
                and self.publisher == other[4]
            )
        return False

    def serialize(self) -> Dict[str, str]:
        return {
            "pair_id": self.pair_id,
            "value": self.value,
            "timestamp": self.timestamp,
            "source": self.source,
            "publisher": self.publisher,
        }

    @staticmethod
    def from_dict(entry_dict: Dict[str, str]) -> "Entry":
        return Entry(
            entry_dict["pair_id"],
            entry_dict["value"],
            entry_dict["timestamp"],
            entry_dict["source"],
            entry_dict["publisher"],
        )

    @staticmethod
    def serialize_entries(entries: List[Entry]) -> List[int]:
        # TODO (rlkelly): log errors
        serialized_entries = [
            entry.serialize()
            for entry in entries
            if not isinstance(entry, PublisherFetchError)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))
