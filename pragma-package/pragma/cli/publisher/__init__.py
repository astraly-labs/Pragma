import time

import typer
from pragma.cli import config, net
from pragma.cli.utils import coro
from pragma.core import SpotEntry
from pragma.core.contract import wait_for_received
from pragma.core.utils import str_to_felt
from pragma.publisher import PragmaPublisherClient
from pragma.publisher.assets import PRAGMA_ALL_ASSETS
from pragma.publisher.fetchers import CexFetcher

app = typer.Typer(help="contract deployment utilities")


@app.command()
@coro
async def run(
    publisher: str = "pragma", delay: int = 30, config_path=config.DEFAULT_CONFIG
):
    """run a publisher locally"""
    client = net.init_pragma_client(config_path)
    PragmaPublisherClient.convert_to_publisher(client)
    client.add_fetcher(CexFetcher(PRAGMA_ALL_ASSETS, publisher))
    while True:
        start = time.time()
        _entries = await client.fetch()
        typer.echo(f"publishing {len(_entries)} entries")
        invocations = await client.publish_many(_entries, pagination=100)
        await invocations[0].wait_for_acceptance()

        typer.echo("setting checkpoint")
        res = await client.set_checkpoints(
            [int(entry.pair_id) for entry in _entries if isinstance(entry, SpotEntry)],
        )

        typer.echo(str(res.hash))
        typer.echo(str(await res.wait_for_acceptance()))
        now = time.time()
        if now - start < delay:
            time.sleep(delay - (now - start))
