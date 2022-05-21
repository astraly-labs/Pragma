from collections import namedtuple

from pontis.core.utils import str_to_felt

Entry = namedtuple("Entry", ["key", "value", "timestamp", "publisher"])


def serialize_entry(entry):
    return [entry.key, entry.value, entry.timestamp, entry.publisher]


def serialize_entries(entries):
    expanded = [
        [entry.key, entry.value, entry.timestamp, entry.publisher] for entry in entries
    ]
    flattened = [x for entry in expanded for x in entry]
    return [len(entries)] + flattened


def construct_entry(key, value, timestamp, publisher):
    if type(key) == str:
        key = str_to_felt(key)

    if type(publisher) == str:
        publisher = str_to_felt(publisher)

    return Entry(
        key=key,
        value=value,
        timestamp=timestamp,
        publisher=publisher,
    )
