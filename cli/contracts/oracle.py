import configparser

import typer

from starknet_py.net.gateway_client import GatewayClient
from starknet_py.transactions.declare import make_declare_tx
from starknet_py.transactions.deploy import make_deploy_tx
from starknet_py.contract import Contract

from starkware.starknet.compiler.compile import get_selector_from_name


from cli.config import COMPILED_CONTRACT_PATH, CONFIG_FILE_PATH
from cli.utils import coro

app = typer.Typer(help="Deployment commands for Oracle")


@app.command()
@coro
async def deploy_oracle(client: GatewayClient):
    """ starknet deploy --contract contracts/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS> """
    compiled = (COMPILED_CONTRACT_PATH / "OracleImplementation.json").read_text("utf-8")

    config_parser = configparser.ConfigParser()
    config_parser.read(CONFIG_FILE_PATH)

    admin_address = int(config_parser["USER"]["account-address"])
    controller_address = int(config_parser["USER"]["account-address"])

    declare_tx = make_declare_tx(compilation_source=compiled)

    oracle_implementation = await client.declare(declare_tx)
    print('hash | address:', oracle_implementation.hash, oracle_implementation.address)

    compiled_oracle = (COMPILED_CONTRACT_PATH / "Oracle.json").read_text("utf-8")
    deploy_tx = make_deploy_tx(compiled_contract=compiled_oracle, constructor_calldata=[
        constructor_calldata=[
            oracle_implementation.hash,
            get_selector_from_name("initializer"),
            2,
            controller_address,
            admin_address,
        ],
    ])

    proxy_implementation = await starknet.deploy(
        contract_class=proxy_class,
    )

    # deployment_result = await Contract.deploy(
    #     client, compiled_contract=compiled, constructor_args={'admin_address': admin_address}
    # )
    # await deployment_result.wait_for_acceptance()
    # print('address:', deployment_result.deployed_contract.address)
