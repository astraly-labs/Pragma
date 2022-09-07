import configparser

import typer
from cli import config, net
from cli.utils import coro
from empiric.core.utils import str_to_felt
from starknet_py.common import create_compiled_contract
from starknet_py.contract import Contract
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.transactions.declare import make_declare_tx
from starknet_py.utils.crypto.facade import pedersen_hash
from starkware.starknet.compiler.compile import get_selector_from_name
from starkware.starknet.core.os.class_hash import compute_class_hash

app = typer.Typer(help="Deployment commands for Oracle")


@app.command()
@coro
async def deploy():
    """deploy a new proxied instance of the publisher registry"""
    gateway_url, chain_id = config.validate_config()
    client = net.init_client(gateway_url, chain_id)

    await deploy_oracle_proxy(client)


async def deploy_oracle_proxy(client: GatewayClient):
    """starknet deploy --contract contracts/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS>"""
    config_parser = configparser.ConfigParser()
    config_parser.read(config.CONFIG_FILE_PATH)

    admin_address = int(config_parser["USER"]["account-address"])
    publisher_registry_address = int(config_parser["CONTRACTS"]["publisher-registry"])

    compiled_oracle = (config.COMPILED_CONTRACT_PATH / "Oracle.json").read_text("utf-8")
    declare_tx = make_declare_tx(compiled_contract=compiled_oracle)

    await client.declare(declare_tx)
    compiled_ = create_compiled_contract(None, compiled_oracle, None)
    declared_oracle_class_hash = compute_class_hash(compiled_, hash_func=pedersen_hash)

    compiled_proxy = (config.COMPILED_CONTRACT_PATH / "Proxy.json").read_text("utf-8")
    deployment_result = await Contract.deploy(
        client,
        compiled_contract=compiled_proxy,
        constructor_args=[
            declared_oracle_class_hash,
            get_selector_from_name("initializer"),
            [
                admin_address,
                publisher_registry_address,
                2,
                str_to_felt("btc"),
                18,
                1,
                0,
                0,
                str_to_felt("usd"),
                8,
                1,
                0,
                0,
                1,
                str_to_felt("btc/usd"),
                str_to_felt("btc"),
                str_to_felt("usd"),
            ],
        ],
    )
    await deployment_result.wait_for_acceptance()
    print("proxy address:", deployment_result.deployed_contract.address)
