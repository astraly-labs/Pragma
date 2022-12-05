from dataclasses import dataclass
from enum import Enum
from typing import Literal

from starknet_py.net.models import StarknetChainId
from starkware.python.utils import from_bytes


@dataclass
class Network:
    chain_id: int
    gateway_url: str


class StarknetChainIdExtension(Enum):
    TESTNET2 = from_bytes(b"SN_GOERLI2")


# network configurations
LOCAL = Network(StarknetChainId.TESTNET, "http://127.0.0.1:5050")
TESTNET = Network(StarknetChainId.TESTNET, "https://alpha4.starknet.io")
TESTNET2 = Network(StarknetChainIdExtension.TESTNET2, "https://alpha4-2.starknet.io")
INTEGRATION = Network(
    StarknetChainId.TESTNET, "https://external.integration.starknet.io"
)
MAINNET = Network(StarknetChainId.MAINNET, "https://alpha-mainnet.starknet.io")

NETWORKS = {
    "testnet": TESTNET,
    "testnet2": TESTNET2,
    "integration": INTEGRATION,
    "mainnet": MAINNET,
    "local": LOCAL,
}

NetworkType = Literal[
    "testnet",
    "testnet2",
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
TESTNET2_CONTRACTS = ContractAddresses(
    0x7DCF59E9146DE058CCB740C8D2C5ACADAAFE3766E12D65C5B95607EDE62317D,
    0xC28F8752ABB9ED18F65FED730B8FAA69BDF6128BB730411EFD916284701938,
)
INTEGRATION_CONTRACTS = ContractAddresses(
    0x062F25D256931E058906542CEE48D645996F0D84C98940AE7D2BD6B68ECC2925,
    0x072D2CD06603E0C957F54A4A1909745939FCFD597EA22323672A6EACBF27D02A,
)
MAINNET_CONTRACTS = ContractAddresses(
    0x04746485FA57B49DC992C35D7F12054B5A7D24B0E187021CD8F40BC2517700BC,
    0x346C57F094D641AD94E43468628D8E9C574DCB2803EC372576CCC60A40BE2C4,
)

CONTRACT_ADDRESSES = {
    "testnet": TESTNET_CONTRACTS,
    "testnet2": TESTNET2_CONTRACTS,
    "integration": INTEGRATION_CONTRACTS,
    "mainnet": MAINNET_CONTRACTS,
}

EnvironmentTypes = Literal[
    "testnet",
    "testnet2",
    "integration",
    "mainnet",
]
