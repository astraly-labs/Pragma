import configparser
import sys
import time
from pathlib import Path
from typing import List

import requests
import typer
from empiric.cli import SUCCESS, config, net
from empiric.cli.contracts.utils import declare_contract
from empiric.cli.randomness.utils import (
    create_randomness,
    ecvrf_verify,
    felt_to_secret_key,
    get_blockhash,
    get_blocknumber,
    get_events,
    uint256_to_2_128,
    verify_randomness,
)
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


@app.command()
@coro
async def upgrade(cli_config=config.DEFAULT_CONFIG):
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)
    compiled_contract_path = Path(
        config_parser["CONFIG"].get("contract-path", config.COMPILED_CONTRACT_PATH)
    )
    client = net.init_empiric_client(cli_config)

    declared_randomness_class_hash = await declare_contract(
        client.client, compiled_contract_path, "Randomness"
    )

    randomness_contract_address = int(config_parser["CONTRACTS"]["randomness-proxy"])
    client.init_randomness_contract(randomness_contract_address)

    invocation = await client.randomness.functions["upgrade"].invoke(
        declared_randomness_class_hash,
        max_fee=int(1e18),
    )
    await invocation.wait_for_acceptance()
    typer.echo(f"response hash: {invocation.hash}")


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
    typer.echo(f"hash: {invocation.hash}")
    response = await invocation.wait_for_acceptance()

    typer.echo(f"response hash: {response.hash}")


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
async def handle_random(min_block: int = 0, cli_config=config.DEFAULT_CONFIG):
    # TODO (rlkelly): this is hardcoded for testnet currently
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)
    randomness_contract_address = int(config_parser["CONTRACTS"]["randomness-proxy"])
    node_url = config_parser["SECRET"]["node-url"]
    account_private_key = int(config_parser["SECRET"]["private-key"])

    client = net.init_empiric_client(cli_config)
    client.init_randomness_contract(randomness_contract_address)

    block_number = await get_blocknumber(node_url)
    sk = felt_to_secret_key(account_private_key)

    more_pages = True
    page_number = 0

    while more_pages:
        event_list = get_events(
            hex(randomness_contract_address), node_url, min_block, page_number
        )
        page_number += 1
        more_pages = not event_list["is_last_page"]

        for event in event_list["events"]:
            if event.minimum_block_number > block_number:
                continue
            status = await client.get_request_status(
                event.caller_address, event.request_id
            )
            if status.status_ != 1:
                continue

            typer.echo(f"event {event}")

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

            typer.echo(f"submitted: {invocation.hash}\n\n")
        while client.nonce_status:
            typer.echo(str(client.nonce_status))
            typer.echo("...\n\n")
            await client.update_nonce_dict()
            client.cleanup_nonce_dict()
            time.sleep(5)


@app.command()
@coro
async def verify_random(transaction_hash: str, cli_config=config.DEFAULT_CONFIG):
    """provide the hex transaction number to verify the proof for that transaction.  If no event is found will alert the user"""
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)
    node_url = config_parser["SECRET"]["node-url"]
    # TODO (rlkelly): fetch public key from vrf
    pub_key = b"\xeb\xc1~\xdb\xe9\x00\x9cJ,\xe9\xb1Z`\xee\xe9\xc5\xaf\xb9\xa4\x19+\xd5\x1b6F\x00`\x19\x86\xc3\x1e\xfe"

    url = "https://starknet-archive.hasura.app/v1/graphql"
    request_json = {
        "query": (
            """
                query {
                    event(
                        where: {name:{_eq:"Randomness__proof"}, transaction_hash: {_eq: "{}"}}
                    ) {
                        name
                        arguments {
                        name
                        value
                        }
                    }
                }
            """.replace(
                "{}", transaction_hash
            )
        ),
    }
    r = requests.post(url=url, json=request_json)
    event = r.json()["data"]["event"][0]["arguments"]
    event_dict = {e["name"]: e["value"] for e in event}
    block_hash = await get_blockhash(
        int(event_dict["minimum_block_number"], 16), node_url
    )
    seed = int(event_dict["seed"], 16)
    request_id = int(event_dict["request_id"], 16)
    requestor_address = int(event_dict["requestor_address"], 16)

    seed = (
        request_id.to_bytes(8, sys.byteorder)
        + block_hash.to_bytes(32, sys.byteorder)
        + seed.to_bytes(32, sys.byteorder)
        + requestor_address.to_bytes(32, sys.byteorder)
    )
    proof_ = event_dict["proof"]
    p0 = int(proof_[0], 16).to_bytes(31, sys.byteorder)
    p1 = int(proof_[1], 16).to_bytes(31, sys.byteorder)
    p2 = int(proof_[2], 16).to_bytes(18, sys.byteorder)
    _proof = p0 + p1 + p2

    status, val = ecvrf_verify(pub_key, _proof, seed)
    random_word = int(event_dict["random_words"][0], 16)

    typer.echo(f"status: {status}")
    typer.echo(f"verified random value: {int.from_bytes(val, sys.byteorder)}")
    typer.echo(f"onchain random value:  {random_word}")
