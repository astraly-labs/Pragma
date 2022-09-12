from typing import Optional

import typer

from empiric.cli import SUCCESS, __app_name__, account, config, contracts, net
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
async def create_account():
    gateway_url, chain_id = config.validate_config()

    client = net.init_client(gateway_url, chain_id)
    await account.create_account(client, config.CONFIG_FILE_PATH)
    return SUCCESS


@app.command()
def get_block(val: str = "NONE"):
    gateway_url, chain_id = config.validate_config()

    client = net.init_client(gateway_url, chain_id)
    typer.echo(client.get_block_sync())
    return SUCCESS


@app.command()
def devnet():
    """ start a local devnet instance """
    import asyncio
    from starknet_devnet import server as starknet_devserver
    from starknet_devnet.server import DevnetConfig, DumpOn, GunicornServer, StarknetWrapper, StarknetDevnetException, parse_args, state

    args = parse_args([])
    try:
        state.set_starknet_wrapper(StarknetWrapper(DevnetConfig(args)))
        state.set_dump_options(args.dump_path, args.dump_on)
    except StarknetDevnetException as error:
        sys.exit(error.message)

    asyncio.run(state.starknet_wrapper.initialize())
    try:
        typer.echo(f" * Listening on http://{args.host}:{args.port}/ (Press CTRL+C to quit)")
        GunicornServer(app, args).run()
    except KeyboardInterrupt:
        pass
    finally:
        if args.dump_on == DumpOn.EXIT:
            state.dumper.dump()
            sys.exit(0)

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
