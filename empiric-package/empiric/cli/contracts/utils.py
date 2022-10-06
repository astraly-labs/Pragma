import json
from pathlib import Path
from typing import Dict, List, Union

from empiric.cli import config
from empiric.core.utils import str_to_felt
from starknet_py.common import create_compiled_contract
from starknet_py.contract import Contract
from starknet_py.net.client import Client
from starknet_py.transactions.declare import make_declare_tx
from starknet_py.utils.crypto.facade import pedersen_hash
from starkware.starknet.core.os.class_hash import compute_class_hash

DEFAULT_MAX_FEE = int(1e18)


async def declare_contract(
    client: Client, compiled_contract_path: str, contract_name: str
) -> str:
    compiled_contract = (
        Path(compiled_contract_path) / f"{contract_name}.json"
    ).read_text("utf-8")
    declare_tx = make_declare_tx(compiled_contract=compiled_contract)

    await client.declare(declare_tx)
    compiled_ = create_compiled_contract(None, compiled_contract, None)
    declared_class_hash = compute_class_hash(compiled_, hash_func=pedersen_hash)
    return declared_class_hash


def get_contract(
    contract_address: int,
    contract_name: str,
    client: Client,
    compiled_contract_path: Path = config.COMPILED_CONTRACT_PATH,
):
    abi = json.loads(
        (compiled_contract_path / f"{contract_name}_abi.json").read_text("utf-8")
    )
    return Contract(
        address=contract_address,
        abi=abi,
        client=client,
    )


def _format_currencies(currencies: Dict[str, str]) -> List[str]:
    # TODO (rlkelly): use marshmallow to format
    output = []
    for row in currencies:
        if isinstance(row["id"], str):
            output.append(str_to_felt(row["id"]))
        else:
            output.append(row["id"])

        output.append(row["decimals"])
        output.append(int(row["is_abstract_currency"]))
        output.append(int(row["starknet_address"]))
        output.append(int(row["ethereum_address"]))
    return output


def _format_pairs(pairs: Dict[str, Union[int, str]]) -> List[str]:
    # TODO (rlkelly): use marshmallow to format
    output = []
    for row in pairs:
        for key in ["id", "quote_currency_id", "base_currency_id"]:
            if isinstance(row[key], str):
                output.append(str_to_felt(row[key]))
            else:
                output.append(row[key])
    return output


async def deploy_contract(cli_config, contract_name):
    import configparser

    from empiric.cli import net

    config_parser = configparser.ConfigParser()
    config_parser.read(cli_config)

    gateway_url, chain_id = config.validate_config(cli_config)
    client = net.init_client(gateway_url, chain_id)
    account_client = net.init_account_client(client, cli_config)

    compiled_contract_path = Path(
        config_parser["CONFIG"].get("contract-path", config.COMPILED_CONTRACT_PATH)
    )
    compiled_contract = (compiled_contract_path / f"{contract_name}.json").read_text(
        "utf-8"
    )

    deployment_result = await Contract.deploy(
        account_client,
        compiled_contract=compiled_contract,
        constructor_args=[],
    )
    await deployment_result.wait_for_acceptance()

    contract_address = deployment_result.deployed_contract.address
    return contract_address
