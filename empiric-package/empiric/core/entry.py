from typing import List, NamedTuple

from empiric.core.utils import str_to_felt

Entry = NamedTuple(
    "Entry",
    [
        ("key", int),
        ("value", int),
        ("timestamp", int),
        ("source", int),
        ("publisher", int),
    ],
)


def serialize_entry(entry) -> List[int]:
    return [entry.key, entry.value, entry.timestamp, entry.source, entry.publisher]


def serialize_entries(entries) -> List[int]:
    expanded = [serialize_entry(entry) for entry in entries]
    flattened = [x for entry in expanded for x in entry]
    return [len(entries)] + flattened


def construct_entry(key, value, timestamp, source, publisher) -> Entry:
    if type(key) == str:
        key = str_to_felt(key)

    if type(publisher) == str:
        publisher = str_to_felt(publisher)

    if type(source) == str:
        source = str_to_felt(source)

    return Entry(
        key=key,
        value=value,
        timestamp=timestamp,
        source=source,
        publisher=publisher,
    )
