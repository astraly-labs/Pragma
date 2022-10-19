import configparser
import time
from pathlib import Path

import typer
from empiric.cli import SUCCESS, config, net
from empiric.cli.utils import coro
from starknet_py.contract import Contract
from starknet_py.net.client import Client

app = typer.Typer(help="Deployment commands for SummaryStats")


@app.command()
@coro
async def deploy(cli_config=config.DEFAULT_CONFIG):
    """
    Deploy a new proxied instance of the publisher registry.
    This requires a configuration file for the currencies and pairs that the oracle will support.
    There is a sample config called oracle_constructor_data.json that shows the format.

    """
    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)

    gateway_url, chain_id = config.validate_config(cli_config)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, cli_config)

    await _deploy_summary_stats(account_client, cli_config)

    return SUCCESS


async def _deploy_summary_stats(client: Client, config_path: Path):
    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)
    oracle_proxy_address = int(config_parser["CONTRACTS"]["oracle-proxy"])

    compiled_contract_path = Path(
        config_parser["CONFIG"].get("contract-path", config.COMPILED_CONTRACT_PATH)
    )
    compiled_contract = (compiled_contract_path / "SummaryStats.json").read_text(
        "utf-8"
    )

    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled_contract,
        constructor_args=[
            oracle_proxy_address,
        ],
    )
    await deployment_result.wait_for_acceptance()
    typer.echo(f"summary stats address: {deployment_result.deployed_contract.address}")

    summary_stats_address = deployment_result.deployed_contract.address
    config_parser["CONTRACTS"]["summary-stats"] = str(summary_stats_address)

    with open(config_path, "w") as f:
        config_parser.write(f)


@app.command()
@coro
async def volatility(
    pair_id: str,
    start: int = int(time.time() - 3600),
    end: int = int(time.time()),
    config_path: Path = config.DEFAULT_CONFIG,
):
    config_parser = configparser.ConfigParser()
    config_parser.read(config_path)

    client = net.init_empiric_client(config_path)
    client.init_stats_contract(int(config_parser["CONTRACTS"]["summary-stats"]))

    response = await client.stats.calculate_volatility.call(pair_id, start, end)
    typer.echo(f"VOLATILITY: {response}")

    return SUCCESS
