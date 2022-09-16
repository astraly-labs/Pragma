import configparser
import os
from pathlib import Path

import typer
from empiric.cli import DIR_ERROR, FILE_ERROR, OS_ERROR, SUCCESS, net

CONFIG_DIR_PATH = Path(os.getcwd())
COMPILED_CONTRACT_PATH = Path(os.getcwd()) / "contracts" / "build"
CONFIG_FILE_PATH = CONFIG_DIR_PATH / "cli-config.ini"
DEFAULT_CONFIG = typer.Option(
    CONFIG_FILE_PATH, "--config-path", "-c", help="optional path to cli config"
)


def init_app(gateway_url: str, chain_id: int) -> int:
    """Initialize the application."""
    config_code = _init_config_file()
    if config_code != SUCCESS:
        return config_code
    _create_config_file(gateway_url, chain_id)

    return SUCCESS


def validate_config(config_path):
    if type(config_path) == str:
        config_path = Path(config_path)
    if config_path.exists():
        gateway_url = net.get_gateway_url(config_path)
        chain_id = net.get_chain_id(config_path)
    else:
        typer.secho(
            'Config file not found. Please, run "python3 -m cli init"',
            fg=typer.colors.RED,
        )
        raise typer.Exit(1)
    return gateway_url, chain_id


def _init_config_file() -> int:
    try:
        CONFIG_DIR_PATH.mkdir(exist_ok=True)
    except OSError:
        return DIR_ERROR

    try:
        CONFIG_FILE_PATH.touch(exist_ok=True)
    except OSError:
        return FILE_ERROR

    return SUCCESS


def _create_config_file(gateway_url: str, chain_id: int) -> int:
    config_parser = configparser.ConfigParser()
    config_parser["GENERAL"] = {
        "network": "local",
        "gateway-url": gateway_url,
        "chain-id": chain_id,
    }
    config_parser["SECRET"] = {}
    config_parser["USER"] = {}
    config_parser["CONTRACTS"] = {}
    config_parser["CONFIG"] = {
        "contract-path": str(COMPILED_CONTRACT_PATH),
        "oracle-config-path": "./oracle_constructor_data.json",
    }

    try:
        with CONFIG_FILE_PATH.open("w") as file:
            config_parser.write(file)

    except OSError:
        return OS_ERROR

    return SUCCESS
