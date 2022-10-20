import configparser
from typing import Optional

import typer
from empiric.cli import (
    SUCCESS,
    __app_name__,
    account,
    config,
    contracts,
    net,
    publisher,
    randomness,
)
from starkware.crypto.signature.signature import get_random_private_key

from .contracts.utils import deploy_contract
from .utils import coro

# TESTNET_GATEWAY_URL = "https://alpha4.starknet.io"
TESTNET_GATEWAY_URL = "http://127.0.0.1:5050"
app = typer.Typer()


def _version_callback(value: bool) -> None:
    if value:
        typer.echo(f"{__app_name__}")
        raise typer.Exit()


@app.command()
def init(gateway_url=TESTNET_GATEWAY_URL, chain_id: int = 1536727068981429685321):
    config.init_app(gateway_url, chain_id)
    return SUCCESS


@app.command()
@coro
async def create_account(
    config_path=config.DEFAULT_CONFIG, save_to_config: bool = True
):
    gateway_url, chain_id = config.validate_config(config_path)

    client = net.init_client(gateway_url, chain_id)
    await account.create_account(
        client, config.CONFIG_FILE_PATH, save_to_config=save_to_config
    )
    return SUCCESS


@app.command()
@coro
async def deploy_by_name(contract_name: str, config_path=config.DEFAULT_CONFIG):
    contract_address = await deploy_contract(config_path, contract_name)
    typer.echo(f"address: {contract_address}")
    return SUCCESS


@app.command()
def gen_pvt_key(config_file=config.DEFAULT_CONFIG):
    key = get_random_private_key()

    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)
    try:
        config_parser["SECRET"]["private-key"] = str(key)
    except KeyError:
        config_parser["SECRET"] = {"private-key": str(key)}

    with open(config_file, "w") as f:
        config_parser.write(f)

    return SUCCESS


@app.command()
def local_faucet(config_file=config.DEFAULT_CONFIG):
    """request tokens from the devnet faucet"""
    import requests

    config_parser = configparser.ConfigParser()
    config_parser.read(config_file)
    account_address = int(config_parser["USER"]["address"])

    r = requests.post(
        "http://127.0.0.1:5050/mint",
        json={"address": hex(account_address), "amount": 1e22},
    )
    typer.echo(f"{r.json()}, {r.status_code}")


@app.command()
def get_block(config_path=config.DEFAULT_CONFIG):
    gateway_url, chain_id = config.validate_config(config_path)

    client = net.init_client(gateway_url, chain_id)
    typer.echo(client.get_block_sync())
    return SUCCESS


@app.command()
def devnet():
    """start a local devnet instance"""

    import sys

    import starknet_devnet
    from starknet_devnet.server import main

    sys.argv = [starknet_devnet.__file__]
    sys.exit(main())

    return SUCCESS


@app.command()
def account_address(config_path=config.DEFAULT_CONFIG):
    client = net.init_empiric_client(config_path)
    typer.echo(client.account_address())
    return SUCCESS


@app.command()
@coro
async def balance_of(account: int, config_path=config.DEFAULT_CONFIG):
    client = net.init_empiric_client(config_path)
    typer.echo(f"BALANCE: {await client.get_balance(account)}")
    return SUCCESS


@app.command()
def quickstart(
    ctx: typer.Context,
    config_file=config.DEFAULT_CONFIG,
    faucet: Optional[bool] = typer.Option(False, "--faucet", "-f"),
):
    typer.echo("creating config")
    ctx.invoke(init)
    typer.echo("generating private key")
    ctx.invoke(gen_pvt_key, config_file)
    typer.echo("deploying account contract")
    ctx.invoke(create_account, config_file)
    if faucet:
        typer.echo("getting funds from testnet faucet")
        ctx.invoke(local_faucet, config_file)

    return SUCCESS


@app.callback()
def main(
    version: Optional[bool] = typer.Option(
        None,
        "--version",
        "-v",
        help="Show the application's version and exit.",
        callback=_version_callback,
        is_eager=True,
    )
) -> None:
    return


app.add_typer(contracts.app, name="contracts")
app.add_typer(publisher.app, name="publisher")
app.add_typer(randomness.app, name="random")
