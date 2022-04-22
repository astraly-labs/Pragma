import os

ORACLE_ADDRESS = "0x064bae34a4709661b0cc02d7e6b7851481034f65cef4c77193b44a7f2d10bcd8"
NETWORK = "testnet"

if os.environ.get("ORACLE_ADDRESS") is None:
    os.environ["ORACLE_ADDRESS"] = ORACLE_ADDRESS

if os.environ.get("NETWORK") is None:
    os.environ["NETWORK"] = NETWORK
