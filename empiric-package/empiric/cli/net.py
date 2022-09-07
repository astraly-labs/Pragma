import configparser
from pathlib import Path

from cli import STARKNET_READ_ERROR
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.models.chains import StarknetChainId


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
