import time

import typer
from empiric.cli import config, net
from empiric.cli.utils import coro
from empiric.core import Entry
from empiric.core.utils import str_to_felt
from empiric.publisher import EmpiricPublisherClient
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS
from empiric.publisher.fetchers import CexFetcher

app = typer.Typer(help="contract deployment utilities")


@app.command()
@coro
async def run(publisher: str = "empiric", config_path=config.DEFAULT_CONFIG):
    """run a publisher locally"""
    client = net.init_empiric_client(config_path)
    EmpiricPublisherClient.convert_to_publisher(client)
    client.add_fetcher(CexFetcher(EMPIRIC_ALL_ASSETS, publisher))
    while True:
        _entries = await client.fetch()
        print(f"publishing {len(_entries)} entries")
        await client.publish_many(_entries, pagination=10)
        # TODO (rlkelly): make checkpoint_entries endpoint
        for entry in _entries:
            if isinstance(entry, Entry):
                await client.set_checkpoint(int(entry.pair_id))
        time.sleep(30)
