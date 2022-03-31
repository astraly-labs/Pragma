from starkware.crypto.signature.signature import pedersen_hash, sign


def str_to_felt(text):
    b_text = bytes(text, "ascii")
    return int.from_bytes(b_text, "big")


def sign_entry(entry, private_key):
    entry_hash = hash_entry(entry)
    signature_r, signature_s = sign(entry_hash, private_key)
    return signature_r, signature_s


def hash_entry(entry):
    h1 = pedersen_hash(entry.asset, entry.publisher)
    h2 = pedersen_hash(entry.price, h1)
    h3 = pedersen_hash(entry.timestamp, h2)
    return h3
