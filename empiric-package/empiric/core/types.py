from enum import Enum

from typing_extensions import Literal

ADDRESS = int
HEX_STR = str

# Network Types
STAGING = "staging"
TESTNET = "testnet"
INTEGRATION = "integration"
MAINNET = "mainnet"

Network = Literal["staging", "testnet", "integration", "mainnet"]


class AggregationMode(Enum):
    MEDIAN = 120282243752302  # str_to_felt("median")
