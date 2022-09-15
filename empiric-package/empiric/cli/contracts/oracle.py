import configparser
import json
import time
from pathlib import Path
from typing import Dict, List, Tuple, Union

import typer
from empiric.cli import SUCCESS, config, net
from empiric.cli.utils import coro, get_contract
from empiric.core.utils import str_to_felt
from starknet_py.contract import Contract
from starknet_py.net.client import Client
from starkware.starknet.compiler.compile import get_selector_from_name

from .utils import declare_contract

app = typer.Typer(help="Deployment commands for Oracle")
ORACLE_CONFIG = typer.Option(
    "./oracle_constructor_data.json",
    "--deploy-config",
    "-d",
    help="configuration for currency and pair deployment",
)


@app.command()
@coro
async def deploy(cli_config=config.DEFAULT_CONFIG, deploy_config: str = ORACLE_CONFIG):
    """
    Deploy a new proxied instance of the publisher registry.
    This requires a configuration file for the currencies and pairs that the oracle will support.
    There is a sample config called oracle_constructor_data.json that shows the format.

    """
    # TODO (rlkelly): allow setting default path for config lookup in cli config
    deploy_config_path = Path(deploy_config)
    if not deploy_config_path.is_file():
        typer.echo(
            "No valid config path, please provide arg using --deploy_config or create a copy of "
            "cli/sample_config/oracle_constructor_data.json in the current path"
        )
        return 1

    gateway_url, chain_id = config.validate_config(cli_config)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, cli_config)

    await deploy_oracle_proxy(account_client, deploy_config_path, cli_config)

    return SUCCESS


@app.command()
@coro
async def publish_entry(entry: str, config_path=config.DEFAULT_CONFIG):
    gateway_url, chain_id = config.validate_config(config_path)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, config_path)

    pair_id, value, timestamp, source, publisher = entry.split(",")
    if timestamp == "NOW":
        timestamp = int(time.time())

    await _publish_entry(
        account_client, config_path, (pair_id, value, timestamp, source, publisher)
    )

    return SUCCESS


async def deploy_oracle_proxy(
    client: Client, deploy_config_path: Path, config_path: Path
):
    """starknet deploy --contract contracts/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS>"""
    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)

    deploy_config = json.loads(deploy_config_path.read_text("utf-8"))

    currencies = deploy_config["currencies"]
    pairs = deploy_config["pairs"]

    admin_address = int(config_parser["USER"]["address"])
    publisher_registry_address = int(config_parser["CONTRACTS"]["publisher-registry"])

    declared_oracle_class_hash = await declare_contract(client, "Oracle")

    compiled_proxy = (config.COMPILED_CONTRACT_PATH / "Proxy.json").read_text("utf-8")
    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled_proxy,
        constructor_args=[
            declared_oracle_class_hash,
            get_selector_from_name("initializer"),
            [
                admin_address,
                publisher_registry_address,
                len(currencies),
                *_format_currencies(currencies),
                len(pairs),
                *_format_pairs(pairs),
            ],
        ],
    )
    await deployment_result.wait_for_acceptance()
    typer.echo(f"proxy address: {deployment_result.deployed_contract.address}")

    oracle_proxy_address = deployment_result.deployed_contract.address
    config_parser["CONTRACTS"]["oracle-proxy"] = str(oracle_proxy_address)

    with open(config_path, "w") as f:
        config_parser.write(f)


async def _publish_entry(
    account_client: Client, config_path: Path, entry: Tuple[int, int, int, int, int]
):
    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)

    oracle_proxy_address = int(config_parser["CONTRACTS"]["oracle-proxy"])
    contract = get_contract(
        oracle_proxy_address,
        "Oracle",
        account_client,
    )

    invocation = await contract.functions["publish_entry"].invoke(
        {
            "pair_id": int(entry[0]),
            "value": int(entry[1]),
            "timestamp": int(entry[2]),
            "source": int(entry[3]),
            "publisher": int(entry[4]),
        },
        max_fee=int(1e16),
    )

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def get_value(pair_id: str, config_path: Path = config.DEFAULT_CONFIG):
    gateway_url, chain_id = config.validate_config(config_path)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, config_path)

    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)
    oracle_proxy_address = int(config_parser["CONTRACTS"]["oracle-proxy"])
    contract = get_contract(oracle_proxy_address, "Oracle", account_client)

    entry = await contract.functions["get_value"].call(pair_id, 0)
    typer.echo(f"publishers: {entry}")


def _format_currencies(currencies: Dict[str, str]) -> List[str]:
    # TODO (rlkelly): use marshmallow to format
    output = []
    for row in currencies:
        if isinstance(row["id"], str):
            output.append(str_to_felt(row["id"]))
        else:
            output.append(row["id"])

        output.append(row["decimals"])
        output.append(int(row["is_abstract_currency"]))
        output.append(int(row["starknet_address"]))
        output.append(int(row["ethereum_address"]))
    return output


def _format_pairs(pairs: Dict[str, Union[int, str]]) -> List[str]:
    # TODO (rlkelly): use marshmallow to format
    output = []
    for row in pairs:
        for key in ["id", "quoteCurrencyId", "baseCurrencyId"]:
            if isinstance(row["id"], str):
                output.append(str_to_felt(row["id"]))
            else:
                output.append(row["id"])
    return output
