import logging
import warnings

logger = logging.getLogger(__name__)


def str_to_felt(text):
    if text.upper() != text:
        warnings.warn(
            "Converting string to felt that has lowercase characters. Converting to uppercase."
        )
        text = text.upper()
    b_text = bytes(text, "utf-8")
    return int.from_bytes(b_text, "big")


def felt_to_str(felt):
    num_bytes = (felt.bit_length() + 7) // 8
    bytes = felt.to_bytes(num_bytes, "big")
    return bytes.decode("utf-8")


def currency_pair_to_pair_id(quote, base):
    return f"{quote}/{base}".upper()


def log_entry(entry, logger=logger):
    logger.info(f"Entry: {entry.serialize()}")


def pair_id_for_asset(asset):
    pair_id = (
        asset["key"] if "key" in asset else currency_pair_to_pair_id(*asset["pair"])
    )
    return pair_id


def key_for_asset(asset):
    return asset["key"] if "key" in asset else currency_pair_to_pair_id(*asset["pair"])
