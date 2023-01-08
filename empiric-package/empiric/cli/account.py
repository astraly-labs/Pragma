import configparser
from pathlib import Path

import typer
from empiric.cli import SUCCESS
from starknet_py.contract import Contract
from starknet_py.net import KeyPair
from starknet_py.net.client import Client
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.models.address import AddressRepresentation

from .compiled_account_contract import COMPILED_ACCOUNT_CONTRACT


async def deploy_account_contract(
    client: Client, public_key: int
) -> AddressRepresentation:
    declare_result = await Contract.declare(
        account=client, compiled_contract=COMPILED_ACCOUNT_CONTRACT, max_fee=int(1e16)
    )
    await client.wait_for_tx(
        tx_hash=declare_result.hash,
        wait_for_accept=True,
    )
    deploy_result = await declare_result.deploy(
        max_fee=int(1e16), constructor_calldata=[public_key]
    )
    await client.wait_for_tx(
        tx_hash=deploy_result.hash,
        wait_for_accept=True,
    )
    return deploy_result.deployed_contract.address


async def create_account(
    client: GatewayClient, config_file: Path, save_to_config: bool = True
):
    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)

    account_private_key = int(config_parser["SECRET"]["private-key"])

    key_pair = KeyPair.from_private_key(account_private_key)
    address = await deploy_account_contract(client, key_pair.public_key)
    typer.echo(f"created address: {address}")

    if save_to_config:
        config_parser["USER"]["address"] = str(address)
        with open(config_file, "w") as f:
            config_parser.write(f)

    return SUCCESS
