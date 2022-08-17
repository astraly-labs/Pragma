from typing_extensions import Literal

ADDRESS = int
HEX_STR = str

# Network Types
STAGING = "staging"
TESTNET = "testnet"
INTEGRATION = "integration"
MAINNET = "mainnet"

Network = Literal["staging", "testnet", "integration", "mainnet"]
