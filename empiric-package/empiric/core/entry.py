from __future__ import annotations

from typing import Dict, List, Optional, Tuple, Union

from empiric.core.utils import felt_to_str, str_to_felt


class Entry:
    pair_id: int
    value: int
    timestamp: int
    source: int
    publisher: int

    def __init__(
        self,
        pair_id: Union[str, int],
        price: int,
        timestamp: int,
        source: Union[str, int],
        publisher: Union[str, int],
        volume: Optional[int] = 0,
    ) -> None:
        if type(pair_id) == str:
            pair_id = str_to_felt(pair_id)

        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        self.pair_id = pair_id
        self.price = price
        self.timestamp = timestamp
        self.source = source
        self.publisher = publisher
        self.volume = volume

    def __eq__(self, other):
        if isinstance(other, Entry):
            return (
                self.pair_id == other.pair_id
                and self.price == other.price
                and self.timestamp == other.timestamp
                and self.source == other.source
                and self.publisher == other.publisher
                and self.colume == other.volume
            )
        # This supports comparing against entries that are returned by starknet.py,
        # which will be namedtuples.
        if isinstance(other, Tuple) and len(other) == 4:
            return (
                self.pair_id == other.pair_id
                and self.price == other.price
                and self.timestamp == other.base.timestamp
                and self.source == other.base.source
                and self.publisher == other.base.publisher
                and self.volume == other.volume
            )
        return False

    def to_tuple(self):
        return (
            self.timestamp,
            self.source,
            self.publisher,
            self.pair_id,
            self.price,
            self.volume,
        )

    def serialize(self) -> Dict[str, str]:
        return {
            "base": {
                "timestamp": self.timestamp,
                "source": self.source,
                "publisher": self.publisher,
            },
            "pair_id": self.pair_id,
            "price": self.price,
            "volume": self.volume,
        }

    @staticmethod
    def from_dict(entry_dict: Dict[str, str]) -> "Entry":
        return Entry(
            entry_dict["base"]["pair_id"],
            entry_dict["price"],
            entry_dict["timestamp"],
            entry_dict["base"]["source"],
            entry_dict["base"]["publisher"],
        )

    @staticmethod
    def serialize_entries(entries: List[Entry]) -> List[Dict[str, int]]:
        """serialize entries to a List of dictionaries"""
        # TODO (rlkelly): log errors
        serialized_entries = [
            entry.serialize()
            for entry in entries
            # TODO (rlkelly): This needs to be much more resilient to publish errors
            if isinstance(entry, Entry)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))

    @staticmethod
    def flatten_entries(entries: List[Entry]) -> List[int]:
        """This flattens entriees to tuples.  Useful when you need the raw felt array"""
        expanded = [entry.to_tuple() for entry in entries]
        flattened = [x for entry in expanded for x in entry]
        return [len(entries)] + flattened

    def __repr__(self):
        return f'Entry(pair_id="{felt_to_str(self.pair_id)}", value={self.value}, timestamp={self.timestamp}, source="{felt_to_str(self.source)}", publisher="{felt_to_str(self.publisher)}")'
