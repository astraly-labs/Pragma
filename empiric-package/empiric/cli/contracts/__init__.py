import typer
from empiric.cli import config, net
from empiric.cli.contracts import oracle, publisher_registry, summary_stats
from empiric.cli.utils import coro

app = typer.Typer(help="contract deployment utilities")

app.add_typer(
    publisher_registry.app,
    name="publisher-registry",
    help="publisher registry contract utils",
)
app.add_typer(
    publisher_registry.app,
    name="pr",
    help="publisher registry contract utils",
)
app.add_typer(oracle.app, name="oracle", help="Oracle contract utils")
app.add_typer(
    summary_stats.app, name="summary_stats", help="SummaryStats contract utils"
)


@app.command()
def list():
    """List all implemented contracts"""
    typer.echo("publisher_registry")
    typer.echo("oracle")


@app.command()
def deploy(
    ctx: typer.Context,
    config_file: str = config.DEFAULT_CONFIG,
    oracle_config: str = oracle.ORACLE_CONFIG,
):
    """List all implemented contracts"""
    typer.echo("deploy Publisher Registry")
    ctx.invoke(publisher_registry.deploy, config_file)
    typer.echo("oracle")
    ctx.invoke(oracle.deploy, config_file, oracle_config)
