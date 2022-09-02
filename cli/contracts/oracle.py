import configparser

import typer

from starknet_py.net.gateway_client import GatewayClient
from starknet_py.contract import Contract

from cli.config import COMPILED_CONTRACT_PATH, CONFIG_FILE_PATH
from cli.utils import coro

app = typer.Typer(help="Deployment commands for Oracle")


async def deploy_oracle(client: GatewayClient):
    """ starknet deploy --contract contracts/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS> """
    compiled = (COMPILED_CONTRACT_PATH / "Oracle.json").read_text("utf-8")

    config_parser = configparser.ConfigParser()
    config_parser.read(CONFIG_FILE_PATH)

    admin_address = int(config_parser["USER"]["account-address"])

    deployment_result = await Contract.deploy(
        client, compiled_contract=compiled, constructor_args={'admin_address': admin_address}
    )
    await deployment_result.wait_for_acceptance()
    print('address:', deployment_result.deployed_contract.address)

