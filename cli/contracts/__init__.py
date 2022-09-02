import typer

from cli import config, net
from cli.utils import coro
from cli.contracts import publisher_registry, oracle

app = typer.Typer(help='contract deployment utilities')

app.add_typer(publisher_registry.app, name="publisher-registry", help="publisher registry contract utils")
app.add_typer(oracle.app, name="oracle", help="Oracle contract utils")


@app.command()
def list():
    """ List all implemented contracts """
    print('publisher_registry')
    print('oracle')
