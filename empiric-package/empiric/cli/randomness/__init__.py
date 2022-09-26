import configparser
import sys
from pathlib import Path
from typing import List

import typer
from empiric.cli import SUCCESS, config, net
from empiric.cli.contracts.utils import declare_contract
from empiric.cli.utils import coro
from starknet_py.contract import Contract
from starknet_py.net.client import Client
from starkware.starknet.compiler.compile import get_selector_from_name

from .utils import (
    create_randomness,
    felt_to_secret_key,
    get_blockhash,
    get_events,
    uint256_to_2_128,
)

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
    account_private_key = int(config_parser["SECRET"]["private-key"])
    vrf_private_key = felt_to_secret_key(account_private_key)
    vrf_pvt_int = int.from_bytes(vrf_private_key, sys.byteorder)
    vrf_uint256 = uint256_to_2_128(vrf_pvt_int)

    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled_proxy,
        constructor_args=[
            declared_randomness_class_hash,
            get_selector_from_name("initializer"),
            [
                admin_address,
                vrf_uint256[0],
                vrf_uint256[1],  # Uint256
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
async def request_random(
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


@app.command()
@coro
async def submit_random(
    request_id: int,
    requestor_address: int,
    seed: int,
    callback_address: int,
    callback_gas_limit: int,  # =1000000
    minimum_block_number: int,
    random_words: str,  # List with 1 item
    block_hash: int,  # block hash of block
    proof: str,  # randomness proof
    cli_config=config.DEFAULT_CONFIG,
):
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)
    randomness_contract_address = int(config_parser["CONTRACTS"]["randomness-proxy"])

    random_words = random_words.split(",")
    proof = proof.split(",")

    client = net.init_empiric_client(cli_config)
    client.init_randomness_contract(randomness_contract_address)

    invocation = await client.submit_random(
        request_id,
        requestor_address,
        seed,
        callback_address,
        callback_gas_limit,
        minimum_block_number,
        random_words,
        block_hash,
        proof,
    )

    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


@app.command()
@coro
async def handle_random(min_block=0, cli_config=config.DEFAULT_CONFIG):
    from starknet_py.net.full_node_client import FullNodeClient

    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)
    network = config_parser["GENERAL"]["network"]
    randomness_contract_address = int(config_parser["CONTRACTS"]["randomness-proxy"])
    node_url = config_parser["SECRET"]["node-url"]
    account_private_key = int(config_parser["SECRET"]["private-key"])

    event_list = get_events(hex(randomness_contract_address), node_url, min_block)

    client = net.init_empiric_client(cli_config)
    client.init_randomness_contract(randomness_contract_address)

    full_node_client = FullNodeClient(node_url=node_url, net=network)
    block_number = (
        await full_node_client.get_block(block_number="latest")
    ).block_number
    sk = felt_to_secret_key(account_private_key)

    for event in event_list:
        if event.minimum_block_number > block_number:
            continue

        block_hash = await get_blockhash(event.minimum_block_number, node_url)

        seed = (
            event.request_id.to_bytes(8, sys.byteorder)
            + block_hash.to_bytes(32, sys.byteorder)
            + event.seed.to_bytes(32, sys.byteorder)
            + event.caller_address.to_bytes(32, sys.byteorder)
        )
        beta_string, pi_string, _pub = create_randomness(sk, seed)
        beta_string = int.from_bytes(beta_string, sys.byteorder)
        proof = [
            int.from_bytes(p, sys.byteorder)
            for p in [pi_string[:31], pi_string[31:62], pi_string[62:]]
        ]
        random_words = [beta_string]
        print("beta_string", beta_string)

        status = await client.get_request_status(event.caller_address, event.request_id)
        print("status:", status)

        if status.status_ == 1:
            invocation = await client.submit_random(
                event.request_id,
                event.caller_address,
                event.seed,
                event.minimum_block_number,
                event.callback_address,
                event.callback_gas_limit,
                random_words,
                block_hash,
                proof,
            )

            await invocation.wait_for_acceptance()
            typer.echo(f"response hash: {invocation.hash}")
