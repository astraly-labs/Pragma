import configparser

import typer
from cli import config, net
from cli.utils import coro
from starknet_py.contract import Contract
from starknet_py.net.gateway_client import GatewayClient

app = typer.Typer(help="Deployment commands for Publisher Registry")


@app.command()
@coro
async def deploy():
    """deploy a new instance of the publisher registry"""
    gateway_url, chain_id = config.validate_config()
    client = net.init_client(gateway_url, chain_id)

    await deploy_publisher_registry(client)


@app.command()
def read():
    """test command"""
    print("reading")


async def deploy_publisher_registry(client: GatewayClient):
    """starknet deploy --contract contracts/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS>"""
    compiled = (config.COMPILED_CONTRACT_PATH / "PublisherRegistry.json").read_text(
        "utf-8"
    )

    config_parser = configparser.ConfigParser()
    config_parser.read(config.CONFIG_FILE_PATH)

    admin_address = int(config_parser["USER"]["account-address"])

    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled,
        constructor_args={"admin_address": admin_address},
    )
    await deployment_result.wait_for_acceptance()
    print("address:", deployment_result.deployed_contract.address)
