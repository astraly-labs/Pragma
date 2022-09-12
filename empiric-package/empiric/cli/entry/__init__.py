import typer
from empiric.cli import config, net

app = typer.Typer(help="contract deployment utilities")


@app.command()
def list():
    """List all implemented contracts"""
    typer.echo("UNIMPLEMENTED")
