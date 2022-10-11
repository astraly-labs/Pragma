from dataclasses import dataclass
from typing import Literal

from starknet_py.net.models import StarknetChainId


@dataclass
class Network:
    chain_id: int
    gateway_url: str


# network configurations
LOCAL = Network(StarknetChainId.TESTNET, "http://127.0.0.1:5050")
TESTNET = Network(StarknetChainId.TESTNET, "https://alpha4.starknet.io")
INTEGRATION = Network(
    StarknetChainId.TESTNET, "https://external.integration.starknet.io"
)
MAINNET = Network(StarknetChainId.MAINNET, "https://alpha-mainnet.starknet.io")

NETWORKS = {
    "testnet": TESTNET,
    "integration": INTEGRATION,
    "mainnet": MAINNET,
    "local": LOCAL,
}

NetworkType = Literal[
    "testnet",
    "integration",
    "mainnet",
    "local",
]


# contract address configuration
@dataclass
class ContractAddresses:
    publisher_registry_address: int
    oracle_proxy_address: int


TESTNET_CONTRACTS = ContractAddresses(
    0x5CB0AFA98435DE7DA6DA7FAD3B40C9D17E747A57BCA28FEB1C41F05E391F54E,
    0x446812BAC98C08190DEE8967180F4E3CDCD1DB9373CA269904ACB17F67F7093,
)
INTEGRATION_CONTRACTS = ContractAddresses(
    0x062F25D256931E058906542CEE48D645996F0D84C98940AE7D2BD6B68ECC2925,
    0x072D2CD06603E0C957F54A4A1909745939FCFD597EA22323672A6EACBF27D02A,
)
""" Uncomment when redeployed
MAINNET_CONTRACTS = ContractAddresses(
    0x051949605AB53FCC2C0ADC1D53A72DD0FBCBF83E52399A8B05552F675B1DB4E9,
    0x00225A37DE623DBD4D2287DDED4E0CB0EB4A5D7D9051D0E89A1321D4BCF9FDB2,
)
"""

CONTRACT_ADDRESSES = {
    "testnet": TESTNET_CONTRACTS,
    "integration": INTEGRATION_CONTRACTS,
    # "mainnet": MAINNET_CONTRACTS,
}

EnvironmentTypes = Literal[
    "testnet",
    "integration",
    "mainnet",
]
