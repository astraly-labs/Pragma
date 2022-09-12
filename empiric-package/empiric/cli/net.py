import configparser
from pathlib import Path

from empiric.cli import STARKNET_READ_ERROR
from starknet_py.net import AccountClient
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.models.chains import StarknetChainId
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner


def get_gateway_url(config_file: Path) -> str:
    """Return the current url for starknet gateway"""

    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    return config_parser["GENERAL"]["gateway-url"]


def get_chain_id(config_file: Path) -> str:
    """Return the current url for starknet gateway"""

    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    return int(config_parser["GENERAL"]["chain-id"])


def init_client(gateway_url: str, chain_id: int) -> int:
    try:
        return GatewayClient(gateway_url, chain=StarknetChainId(chain_id))
    except Exception:
        return STARKNET_READ_ERROR


def init_account_client(client: GatewayClient, config_file: Path) -> AccountClient:
    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    account_private_key = int(config_parser["SECRET"]["private-key"])
    account_contract_address = int(config_parser["USER"]["address"])
    chain_id = int(config_parser["GENERAL"]["chain-id"])

    signer = StarkCurveSigner(
        account_contract_address,
        KeyPair.from_private_key(account_private_key),
        chain_id,
    )

    return AccountClient(
        account_contract_address,
        client,
        signer,
    )
