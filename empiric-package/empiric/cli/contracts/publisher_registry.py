import configparser
from pathlib import Path
from typing import List

import typer
from empiric.cli import SUCCESS, config, net
from empiric.cli.utils import coro
from empiric.core.utils import felt_to_str, str_to_felt
from starknet_py.contract import Contract
from starknet_py.net.gateway_client import GatewayClient

app = typer.Typer(help="Deployment commands for Publisher Registry")


@app.command()
@coro
async def deploy(config_path=config.DEFAULT_CONFIG):
    """deploy a new instance of the publisher registry"""
    gateway_url, chain_id = config.validate_config(config_path)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, config_path)

    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)
    compiled_contract_path = Path(
        config_parser["CONFIG"].get("contract-path", config.COMPILED_CONTRACT_PATH)
    )

    await deploy_publisher_registry(account_client, compiled_contract_path, config_path)

    return SUCCESS


@app.command()
@coro
async def add_publisher(
    publisher, publisher_address: int, config_path=config.DEFAULT_CONFIG
):
    client = net.init_empiric_client(config_path)
    invocation = await client.publisher_registry.add_publisher.invoke(
        str_to_felt(publisher), publisher_address, max_fee=int(1e16)
    )

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def update_publisher(
    publisher, publisher_address: int, config_path=config.DEFAULT_CONFIG
):
    client = net.init_empiric_client(config_path)
    invocation = await client.publisher_registry.update_publisher_address.invoke(
        str_to_felt(publisher), publisher_address, max_fee=int(1e16)
    )

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def register_self(publisher: str, config_path=config.DEFAULT_CONFIG):
    client = net.init_empiric_client(config_path)
    publisher_address = client.account_address()
    invocation = await client.add_publisher(publisher, publisher_address)

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def add_source_for_publisher(
    publisher: str, source: str, config_path=config.DEFAULT_CONFIG
):
    client = net.init_empiric_client(config_path)
    invocation = await client.add_source_for_publisher(publisher, source)

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def add_sources_for_publisher(
    publisher: str, sources: List[str], config_path=config.DEFAULT_CONFIG
):
    client = net.init_empiric_client(config_path)
    invocation = await client.add_sources_for_publisher(publisher, sources)

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def update_publisher_address(
    publisher: str, new_address: int, config_path=config.DEFAULT_CONFIG
):
    client = net.init_empiric_client(config_path)
    invocation = await client.update_publisher_address(publisher, new_address)

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def get_all_publishers(config_path: Path = config.DEFAULT_CONFIG):
    client = net.init_empiric_client(config_path)
    publishers = await client.publisher_registry.get_all_publishers.call()
    typer.echo(f"publishers: {[felt_to_str(p) for p in publishers[0]]}")


async def deploy_publisher_registry(
    client: GatewayClient, compiled_contract_path: Path, config_path: Path
):
    """starknet deploy --contract contracts/starknet/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS>"""
    compiled = (compiled_contract_path / "PublisherRegistry.json").read_text("utf-8")

    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)

    admin_address = int(config_parser["USER"]["address"])

    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled,
        constructor_args={"admin_address": admin_address},
    )
    await deployment_result.wait_for_acceptance()
    typer.echo(f"address: {deployment_result.deployed_contract.address}")

    publisher_registry_address = deployment_result.deployed_contract.address
    config_parser["CONTRACTS"]["publisher-registry"] = str(publisher_registry_address)

    with open(config_path, "w") as f:
        config_parser.write(f)


@app.command()
@coro
async def get_metadata(
    publisher: str = "EMPIRIC", config_path: Path = config.DEFAULT_CONFIG
):
    client = net.init_empiric_client(config_path)
    publishers = await client.publisher_registry.get_publisher_sources.call(
        str_to_felt(publisher)
    )
    z = await client.publisher_registry.get_publisher_address.call(
        str_to_felt(publisher)
    )
    typer.echo(f"sources: {[felt_to_str(p) for p in publishers[0]]}")
    typer.echo(f"publisher_address: {z}")
