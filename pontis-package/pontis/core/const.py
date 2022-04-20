import os

ORACLE_ADDRESS = "0x0351ab9d236c3e8e42be3b2891f33635327fd4b345779a2079ff4d6356f55ae1"
NETWORK = "testnet"

if os.environ.get("ORACLE_ADDRESS") is None:
    os.environ["ORACLE_ADDRESS"] = ORACLE_ADDRESS

if os.environ.get("NETWORK") is None:
    os.environ["NETWORK"] = NETWORK
