import os

ORACLE_ADDRESS = "0x039d1bb4904cef28755c59f081cc88a576ecdf42240fb73dd44ddd003848ce33"
NETWORK = "testnet"

if os.environ.get("ORACLE_ADDRESS") is None:
    os.environ["ORACLE_ADDRESS"] = ORACLE_ADDRESS

if os.environ.get("NETWORK") is None:
    os.environ["NETWORK"] = NETWORK
