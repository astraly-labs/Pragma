import os

ORACLE_ADDRESS = "0x037f6eb00ae24c94e401ac729ca297727a19b8c85d5c7fc201452e892689b9b1"
NETWORK = "testnet"

if os.environ.get("ORACLE_ADDRESS") is None:
    os.environ["ORACLE_ADDRESS"] = ORACLE_ADDRESS

if os.environ.get("NETWORK") is None:
    os.environ["NETWORK"] = NETWORK
