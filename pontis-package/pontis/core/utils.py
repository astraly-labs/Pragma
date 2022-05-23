import warnings


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


def currency_pair_to_key(quote, base):
    return f"{quote}/{base}".lower()


def pprint_entry(entry):
    print(
        f"Entry: key={felt_to_str(entry.key)}, value={entry.value}, timestamp={entry.timestamp}, publisher={felt_to_str(entry.publisher)}"
    )
