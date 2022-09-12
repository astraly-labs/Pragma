import configparser
from pathlib import Path

import typer
from empiric.cli import config, net
from empiric.cli.utils import coro
from empiric.core.utils import str_to_felt
from starknet_py.contract import Contract
from starknet_py.net.gateway_client import GatewayClient
from starkware.starknet.compiler.compile import get_selector_from_name

from .utils import declare_contract

app = typer.Typer(help="Deployment commands for Oracle")


@app.command()
@coro
async def deploy(config_path=config.DEFAULT_CONFIG):
    """deploy a new proxied instance of the publisher registry"""
    gateway_url, chain_id = config.validate_config(config_path)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, config_path)

    await deploy_oracle_proxy(account_client, config_path)


async def deploy_oracle_proxy(client: GatewayClient, config_path: Path):
    """starknet deploy --contract contracts/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS>"""
    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)

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
                2,
                str_to_felt("btc"),
                18,
                1,
                0,
                0,
                str_to_felt("usd"),
                8,
                1,
                0,
                0,
                1,
                str_to_felt("btc/usd"),
                str_to_felt("btc"),
                str_to_felt("usd"),
            ],
        ],
    )
    await deployment_result.wait_for_acceptance()
    typer.echo(f"proxy address: {deployment_result.deployed_contract.address}")

    oracle_proxy_address = deployment_result.deployed_contract.address
    config_parser["CONTRACTS"]["oracle-proxy"] = str(oracle_proxy_address)

    with open(config_path, "w") as f:
        config_parser.write(f)
