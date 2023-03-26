from __future__ import annotations

import abc
from typing import Dict, List, Optional, Tuple, Union

from empiric.core.utils import felt_to_str, str_to_felt
from web3 import Web3

class Entry(abc.ABC):
    @abc.abstractmethod
    def serialize(self) -> Dict[str, str]:
        ...

    @abc.abstractmethod
    def to_tuple(self) -> Dict[str, str]:
        ...

    def serialize_entries(self, entries: List[Entry]):
        serialized_entries = [
            entry.serialize() for entry in entries if issubclass(entry, Entry)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))

    @staticmethod
    def flatten_entries(entries: List[SpotEntry]) -> List[int]:
        """This flattens entriees to tuples.  Useful when you need the raw felt array"""
        expanded = [entry.to_tuple() for entry in entries]
        flattened = [x for entry in expanded for x in entry]
        return [len(entries)] + flattened


class BaseEntry:
    timestamp: int
    source: int
    publisher: int

    def __init__(
        self, timestamp: int, source: Union[str, int], publisher: Union[str, int]
    ):
        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        self.timestamp = timestamp
        self.source = source
        self.publisher = publisher


class GenericEntry(Entry):
    base: BaseEntry
    key: int
    value: int

    def __init__(
        self,
        timestamp: int,
        source: Union[str, int],
        publisher: Union[str, int],
        key: Union[str, int],
        value: int,
    ):
        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        if type(key) == str:
            key = str_to_felt(key)

        self.base = BaseEntry(timestamp, source, publisher)
        self.key = key
        self.value = value

    def serialize(self) -> Dict[str, str]:
        return {
            "base": {
                "timestamp": self.base.timestamp,
                "source": self.base.source,
                "publisher": self.base.publisher,
            },
            "key": self.key,
            "value": self.value,
        }

    def to_tuple(self):
        return (
            self.base.timestamp,
            self.base.source,
            self.base.publisher,
            self.key,
            self.value,
        )

    def __repr__(self):
        return f'GenericEntry(key="{felt_to_str(self.key)}", value={self.value}, timestamp={self.base.timestamp}, source="{felt_to_str(self.base.source)}", publisher="{felt_to_str(self.base.publisher)}")'


class SpotEntry(Entry):
    base: BaseEntry
    pair_id: int
    price: int
    volume: int

    def __init__(
        self,
        pair_id: Union[str, int],
        price: int,
        timestamp: int,
        source: Union[str, int],
        publisher: Union[str, int],
        volume: Optional[int] = 0,
    ) -> None:
        # TODO: This should be network agnostic
        if type(pair_id) == str:
            pair_id = str_to_felt(pair_id)

        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        self.base = BaseEntry(timestamp, source, publisher)
        self.pair_id = pair_id
        self.price = price
        self.volume = volume

    def __eq__(self, other):
        if isinstance(other, SpotEntry):
            return (
                self.pair_id == other.pair_id
                and self.price == other.price
                and self.base.timestamp == other.base.timestamp
                and self.base.source == other.base.source
                and self.base.publisher == other.base.publisher
                and self.volume == other.volume
            )
        # This supports comparing against entries that are returned by starknet.py,
        # which will be namedtuples.
        if isinstance(other, Tuple) and len(other) == 4:
            return (
                self.pair_id == other.pair_id
                and self.price == other.price
                and self.base.timestamp == other.base.timestamp
                and self.base.source == other.base.source
                and self.base.publisher == other.base.publisher
                and self.volume == other.volume
            )
        return False

    def to_tuple(self):
        return (
            self.base.timestamp,
            self.base.source,
            self.base.publisher,
            self.pair_id,
            self.price,
            self.volume,
        )

    def serialize(self) -> Dict[str, str]:
        return {
            "base": {
                "timestamp": self.base.timestamp,
                "source": self.base.source,
                "publisher": self.base.publisher,
            },
            "pair_id": self.pair_id,
            "price": self.price,
            "volume": self.volume,
        }

    def serialize_evm(self) -> Dict[str, str]:
        return {
            "base": {
                "timestamp": self.base.timestamp,
                "source": Web3.toBytes(text=felt_to_str(self.base.source)),
                "publisher": Web3.toBytes(text=felt_to_str(self.base.publisher)),
            },
            "pairId": Web3.toBytes(text=felt_to_str(self.pair_id)),
            "price": self.price,
            "volume": self.volume,
        }

    @staticmethod
    def from_dict(entry_dict: Dict[str, str]) -> "SpotEntry":
        return SpotEntry(
            entry_dict["base"]["pair_id"],
            entry_dict["price"],
            entry_dict["timestamp"],
            entry_dict["base"]["source"],
            entry_dict["base"]["publisher"],
        )

    @staticmethod
    def serialize_entries(entries: List[SpotEntry]) -> List[Dict[str, int]]:
        """serialize entries to a List of dictionaries"""
        # TODO (rlkelly): log errors
        serialized_entries = [
            entry.serialize()
            for entry in entries
            # TODO (rlkelly): This needs to be much more resilient to publish errors
            if isinstance(entry, SpotEntry)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))

    @staticmethod
    def serialize_entries_evm(entries: List[SpotEntry]) -> List[Dict[str, int]]:
        """serialize entries to a List of dictionaries"""
        # TODO (rlkelly): log errors
        serialized_entries = [
            entry.serialize_evm()
            for entry in entries
            # TODO (rlkelly): This needs to be much more resilient to publish errors
            if isinstance(entry, SpotEntry)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))

    def __repr__(self):
        return f'SpotEntry(pair_id="{felt_to_str(self.pair_id)}", price={self.price}, timestamp={self.base.timestamp}, source="{felt_to_str(self.base.source)}", publisher="{felt_to_str(self.base.publisher)}, volume={self.volume})")'



class OptionEntry (Entry):
    base: BaseEntry
    underlying_index : str
    underlying_price : int
    strike  : int
    option_type : str
    expiration_timestamp : int
    open_interest : int
    settlement_period : int
    mark_iv : int
    bid_iv : int
    ask_iv : int

    def __init__(
        self,
        underlying_index : str,
        underlying_price : int,
        strike  : int,
        option_type : str, 
        creation_timestamp : int,
        expiration_timestamp : int,
        open_interest : int,
        settlement_period : int,
        mark_iv : int,
        bid_iv : int,
        ask_iv : int,
        source: Union[str, int],
        publisher: Union[str, int],
    ) -> None:
        if type(option_type) == str:
            option_type = str_to_felt(option_type)

        if type(underlying_index) == str:
            underlying_index = str_to_felt(underlying_index)

        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        self.base = BaseEntry(creation_timestamp, source, publisher)
        self.underlying_index = underlying_index
        self.underlying_price = underlying_price
        self.strike  = strike
        self.option_type = option_type
        self.expiration_timestamp = expiration_timestamp
        self.open_interest = open_interest
        self.settlement_period = settlement_period
        self.mark_iv = mark_iv
        self.bid_iv = bid_iv
        self.ask_iv = ask_iv

    def __eq__(self, other):
        if isinstance(other, SpotEntry):
            return (
                self.underlying_index == other.underlying_index
                and self.underlying_price == other.underlying_price
                and self.strike == other.strike
                and self.option_type == other.option_type
                and self.expiration_timestamp == other.expiration_timestamp
                and self.open_interest == other.open_interest
                and self.settlement_period == other.settlement_period
                and self.mark_iv == other.mark_iv
                and self.bid_iv == other.bid_iv
                and self.ask_iv == other.ask_iv
                and self.base.timestamp == other.base.timestamp
                and self.base.source == other.base.source
                and self.base.publisher == other.base.publisher
            )
        # This supports comparing against entries that are returned by starknet.py,
        # which will be namedtuples.


        # if isinstance(other, Tuple) and len(other) == 4:
        #     return (
        #         self.pair_id == other.pair_id
        #         and self.price == other.price
        #         and self.base.timestamp == other.base.timestamp
        #         and self.base.source == other.base.source
        #         and self.base.publisher == other.base.publisher
        #         and self.volume == other.volume
        #     )
        return False
    def to_tuple(self):
        return (
            self.base.timestamp,
            self.base.source,
            self.base.publisher,
            self.underlying_index,
            self.underlying_price,
            self.strike,
            self.option_type,
            self.expiration_timestamp,
            self.open_interest,
            self.settlement_period,
            self.mark_iv,
            self.bid_iv,
            self.ask_iv,
        )

    def serialize(self) -> Dict[str, str]:
        return {
            "base": {
                "timestamp": self.base.timestamp,
                "source": self.base.source,
                "publisher": self.base.publisher,
            },
            "underlying_index": self.underlying_index,
            "underlying_price": self.underlying_price,
            "strike": self.strike,
            "option_type": self.option_type,
            "expiration_timestamp": self.expiration_timestamp,
            "open_interest": self.open_interest,
            "settlement_period": self.settlement_period,
            "mark_iv": self.mark_iv,
            "bid_iv": self.bid_iv,
            "ask_iv": self.ask_iv,
        }

    def serialize_evm(self) -> Dict[str, str]:
        return {
            "base": {
                "timestamp": self.base.timestamp,
                "source": Web3.toBytes(text=felt_to_str(self.base.source)),
                "publisher": Web3.toBytes(text=felt_to_str(self.base.publisher)),
            },
            "underlying_index": Web3.toBytes(text=felt_to_str(self.underlying_index)),
            "underlying_price": self.underlying_price,
            "strike": self.strike,
            "option_type": Web3.toBytes(text=felt_to_str(self.option_type)),
            "expiration_timestamp": self.expiration_timestamp,
            "open_interest": self.open_interest,
            "settlement_period": self.settlement_period,
            "mark_iv": self.mark_iv,
            "bid_iv": self.bid_iv,
            "ask_iv": self.ask_iv,
        }

    @staticmethod
    def from_dict(entry_dict: Dict[str, str]) -> "SpotEntry":
        return SpotEntry(
            entry_dict["underlying_index"],
            entry_dict["underlying_price"],
            entry_dict["strike"],
            entry_dict["option_type"],
            entry_dict["expiration_timestamp"],
            entry_dict["open_interest"],
            entry_dict["settlement_period"],
            entry_dict["mark_iv"],
            entry_dict["bid_iv"],
            entry_dict["ask_iv"],
            entry_dict["base"]["source"],
            entry_dict["base"]["publisher"],
            entry_dict["base"]["timestamp"],
        )

    @staticmethod
    def serialize_entries(entries: List[OptionEntry]) -> List[Dict[str, int]]:
        """serialize entries to a List of dictionaries"""
        # TODO (rlkelly): log errors
        serialized_entries = [
            entry.serialize()
            for entry in entries
            if isinstance(entry, OptionEntry)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))

    @staticmethod
    def serialize_entries_evm(entries: List[OptionEntry]) -> List[Dict[str, int]]:
        """serialize entries to a List of dictionaries"""
        # TODO (rlkelly): log errors
        serialized_entries = [
            entry.serialize_evm()
            for entry in entries
            # TODO (rlkelly): This needs to be much more resilient to publish errors
            if isinstance(entry, OptionEntry)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))

    def __repr__(self):
        return f'OptionEntry(underlying_index="{felt_to_str(self.underlying_index)}", price={self.underlying_price}, timestamp={self.base.creation_timestamp}, source="{felt_to_str(self.base.source)}", publisher="{felt_to_str(self.base.publisher)})")'

    

class FutureEntry(Entry):
    timestamp: int
    source: int
    publisher: int
    pair_id: int
    price: int
    expiry_timestamp: int

    def __init__(self, timestamp, source, publisher, pair_id, price, expiry_timestamp):
        if type(pair_id) == str:
            pair_id = str_to_felt(pair_id)

        if type(publisher) == str:
            publisher = str_to_felt(publisher)

        if type(source) == str:
            source = str_to_felt(source)

        if type(expiry_timestamp) == str:
            expiry_timestamp = str_to_felt(expiry_timestamp)

        self.base = BaseEntry(timestamp, source, publisher)
        self.pair_id = pair_id
        self.price = price
        self.expiry_timestamp = expiry_timestamp

    def __eq__(self, other):
        if isinstance(other, FutureEntry):
            return (
                self.pair_id == other.pair_id
                and self.price == other.price
                and self.base.timestamp == other.base.timestamp
                and self.base.source == other.base.source
                and self.base.publisher == other.base.publisher
                and self.expiry_timestamp == other.expiry_timestamp
            )
        # This supports comparing against entries that are returned by starknet.py,
        # which will be namedtuples.
        if isinstance(other, Tuple) and len(other) == 4:
            return (
                self.pair_id == other.pair_id
                and self.price == other.price
                and self.base.timestamp == other.base.timestamp
                and self.base.source == other.base.source
                and self.base.publisher == other.base.publisher
                and self.expiry_timestamp == other.expiry_timestamp
            )
        return False

    def to_tuple(self):
        return (
            self.base.timestamp,
            self.base.source,
            self.base.publisher,
            self.pair_id,
            self.price,
            self.expiry_timestamp,
        )

    def serialize(self) -> Dict[str, str]:
        return {
            "base": {
                "timestamp": self.base.timestamp,
                "source": self.base.source,
                "publisher": self.base.publisher,
            },
            "pair_id": self.pair_id,
            "price": self.price,
            "expiry_timestamp": self.expiry_timestamp,
        }

    @staticmethod
    def serialize_entries(entries: List[FutureEntry]) -> List[Dict[str, int]]:
        """serialize entries to a List of dictionaries"""
        # TODO (rlkelly): log errors
        serialized_entries = [
            entry.serialize()
            for entry in entries
            # TODO (rlkelly): This needs to be much more resilient to publish errors
            if isinstance(entry, FutureEntry)
        ]
        return list(filter(lambda item: item is not None, serialized_entries))
