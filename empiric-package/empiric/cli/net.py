import configparser
from pathlib import Path

from empiric.core import EmpiricClient
from empiric.core.config import ContractAddresses
from starknet_py.net import AccountClient
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.models.chains import StarknetChainId
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner


def get_gateway_url(config_file: Path) -> str:
    """Return the current url for starknet gateway"""

    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    if config_parser["GENERAL"]["network"] == "testnet":
        return "testnet"
    if config_parser["GENERAL"]["network"] == "mainnet":
        return "mainnet"

    return config_parser["GENERAL"]["gateway-url"]


def get_chain_id(config_file: Path) -> str:
    """Return the current url for starknet gateway"""

    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    return int(config_parser["GENERAL"]["chain-id"])


def init_client(gateway_url: str, chain_id: int) -> int:
    return GatewayClient(gateway_url, chain=StarknetChainId(chain_id))


def init_empiric_client(config_file: Path) -> EmpiricClient:
    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    account_private_key = int(config_parser["SECRET"]["private-key"])
    network = config_parser["GENERAL"]["network"]
    account_contract_address = int(config_parser["USER"]["address"])
    publisher_registry_address = int(
        config_parser["CONTRACTS"].get("publisher-registry", 0)
    )
    oracle_proxy_address = int(config_parser["CONTRACTS"].get("oracle-proxy", 0))

    client = EmpiricClient(
        network,
        account_private_key=account_private_key,
        account_contract_address=account_contract_address,
        contract_addresses_config=ContractAddresses(
            publisher_registry_address, oracle_proxy_address
        ),
    )
    return client


def init_account_client(client: GatewayClient, config_file: Path) -> AccountClient:
    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    account_private_key = int(config_parser["SECRET"]["private-key"])
    account_contract_address = int(config_parser["USER"]["address"])
    chain_id = int(config_parser["GENERAL"]["chain-id"])

    key_pair = KeyPair.from_private_key(account_private_key)
    signer = StarkCurveSigner(
        account_address=account_contract_address,
        key_pair=key_pair,
        chain_id=StarknetChainId(chain_id),
    )

    return AccountClient(
        address=account_contract_address,
        client=client,
        signer=signer,
    )
