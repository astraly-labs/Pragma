import functools
import warnings

from pontis.core.entry import Entry
from starkware.crypto.signature.signature import pedersen_hash, sign


def str_to_felt(text):
    if text.lower() != text:
        warnings.warn(
            "Converting string to felt that has uppercase characters. Converting to lowercase."
        )
        text = text.lower()
    b_text = bytes(text, "utf-8")
    return int.from_bytes(b_text, "big")


def felt_to_str(felt):
    num_bytes = (felt.bit_length() + 7) // 8
    bytes = felt.to_bytes(num_bytes, "big")
    return bytes.decode("utf-8")


def sign_entry(entry, private_key):
    entry_hash = hash_entry(entry)
    signature_r, signature_s = sign(entry_hash, private_key)
    return signature_r, signature_s


def hash_entry(entry):
    h1 = pedersen_hash(entry.key, entry.value)
    h2 = pedersen_hash(h1, entry.timestamp)
    h3 = pedersen_hash(h2, entry.publisher)
    return h3


def sign_publisher_registration(publisher_public_key, publisher, admin_private_key):
    publisher_hash = hash_publisher(publisher_public_key, publisher)
    signature_r, signature_s = sign(publisher_hash, admin_private_key)
    return signature_r, signature_s


def admin_hash_and_sign_with_nonce(arg, nonce, admin_private_key):
    if type(arg) == list:
        arg = functools.reduce(pedersen_hash, arg)
    signature_r, signature_s = sign(pedersen_hash(arg, nonce), admin_private_key)
    return signature_r, signature_s


def admin_hash_and_sign_active_status_with_nonce(
    address, is_active, nonce, admin_private_key
):
    h1 = pedersen_hash(address, is_active)
    h2 = pedersen_hash(h1, nonce)
    signature_r, signature_s = sign(h2, admin_private_key)
    return signature_r, signature_s


def hash_publisher(publisher_public_key, publisher):
    publisher_hash = pedersen_hash(publisher_public_key, publisher)
    return publisher_hash


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
