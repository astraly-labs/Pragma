import configparser
from pathlib import Path

import typer
from empiric.cli import SUCCESS, config, net
from empiric.cli.contracts.utils import declare_contract
from empiric.cli.utils import coro
from starknet_py.contract import Contract
from starknet_py.net.client import Client
from starkware.starknet.compiler.compile import get_selector_from_name

app = typer.Typer(help="randomness utilities")
RANDOMNESS_CONFIG = typer.Option(
    "",
    "--deploy-config",
    "-d",
    help="configuration for randomness",
)


@app.command()
@coro
async def deploy(cli_config=config.DEFAULT_CONFIG):
    """
    Deploy a new proxied instance of the randomness contract
    """
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)

    gateway_url, chain_id = config.validate_config(cli_config)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, cli_config)

    await deploy_randomness_proxy(account_client, cli_config)

    return SUCCESS


@app.command()
@coro
async def deploy_tester(cli_config=config.DEFAULT_CONFIG):
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)

    gateway_url, chain_id = config.validate_config(cli_config)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, cli_config)

    await _deploy_tester(account_client, cli_config)

    return SUCCESS


async def deploy_randomness_proxy(client: Client, config_path: Path):
    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)
    compiled_contract_path = Path(
        config_parser["CONFIG"].get("contract-path", config.COMPILED_CONTRACT_PATH)
    )

    admin_address = int(config_parser["USER"]["address"])

    declared_randomness_class_hash = await declare_contract(
        client, compiled_contract_path, "Randomness"
    )
    compiled_proxy = (compiled_contract_path / "Proxy.json").read_text("utf-8")

    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled_proxy,
        constructor_args=[
            declared_randomness_class_hash,
            get_selector_from_name("initializer"),
            [
                admin_address,
            ],
        ],
    )
    await deployment_result.wait_for_acceptance()
    typer.echo(f"proxy address: {deployment_result.deployed_contract.address}")

    randomness_proxy_address = deployment_result.deployed_contract.address
    config_parser["CONTRACTS"]["randomness-proxy"] = str(randomness_proxy_address)

    with open(config_path, "w") as f:
        config_parser.write(f)


async def _deploy_tester(client: Client, config_path: Path):
    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)
    compiled_contract_path = Path(
        config_parser["CONFIG"].get("contract-path", config.COMPILED_CONTRACT_PATH)
    )
    compiled_example = (compiled_contract_path / "ExampleRandomness.json").read_text(
        "utf-8"
    )

    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled_example,
        constructor_args=[],
    )
    await deployment_result.wait_for_acceptance()
    typer.echo(f"tester address: {deployment_result.deployed_contract.address}")

    example_address = deployment_result.deployed_contract.address
    config_parser["CONTRACTS"]["example-randomness"] = str(example_address)

    with open(config_path, "w") as f:
        config_parser.write(f)


@app.command()
@coro
async def request_randomness(
    seed: int, callback_address: int, cli_config=config.DEFAULT_CONFIG
):
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)
    randomness_contract_address = int(config_parser["CONTRACTS"]["randomness-proxy"])

    client = net.init_empiric_client(cli_config)
    client.init_randomness_contract(randomness_contract_address)

    invocation = await client.request_random(
        seed=seed,
        callback_address=callback_address,
    )

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")
