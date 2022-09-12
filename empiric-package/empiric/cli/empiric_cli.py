import configparser
from typing import Optional

import typer
from empiric.cli import SUCCESS, __app_name__, account, config, contracts, entry, net
from starkware.crypto.signature.signature import get_random_private_key

from .utils import coro

TESTNET_GATEWAY_URL = "https://alpha4.starknet.io"
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
async def create_account(config_path=config.DEFAULT_CONFIG):
    gateway_url, chain_id = config.validate_config(config_path)

    client = net.init_client(gateway_url, chain_id)
    await account.create_account(client, config.CONFIG_FILE_PATH)
    return SUCCESS


@app.command()
def gen_pvt_key(config_path=config.DEFAULT_CONFIG):
    key = get_random_private_key()
    typer.echo(key)
    # TODO: add to cli-config.ini
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

    from starknet_devnet.server import main

    # import re
    # sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.argv = ["./.venv/bin/starknet-devnet"]
    sys.exit(main())

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
app.add_typer(entry.app, name="entry")
