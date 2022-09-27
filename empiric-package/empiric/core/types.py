from enum import IntEnum, unique
from typing import Literal

ADDRESS = int
HEX_STR = str

# Network Types
STAGING = "staging"
TESTNET = "testnet"
INTEGRATION = "integration"
MAINNET = "mainnet"

Network = Literal["staging", "testnet", "integration", "mainnet"]

CHAIN_IDS = {
    INTEGRATION: 1536727068981429685321,
    TESTNET: 1536727068981429685321,
    MAINNET: 23448594291968334,
}

GATEWAY_URLS = {
    TESTNET: "https://alpha4.starknet.io",
    INTEGRATION: "https://external.integration.starknet.io",
    MAINNET: "https://alpha-mainnet.starknet.io",
}


# aggregation mode enum
@unique
class AggregationMode(IntEnum):
    MEDIAN = 84959893733710  # str_to_felt("MEDIAN")
