from empiric.cli import config
from starknet_py.common import create_compiled_contract
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.transactions.declare import make_declare_tx
from starknet_py.utils.crypto.facade import pedersen_hash
from starkware.starknet.core.os.class_hash import compute_class_hash


async def declare_contract(client: GatewayClient, contract_name: str) -> str:
    compiled_contract = (
        config.COMPILED_CONTRACT_PATH / f"{contract_name}.json"
    ).read_text("utf-8")
    declare_tx = make_declare_tx(compiled_contract=compiled_contract)

    await client.declare(declare_tx)
    compiled_ = create_compiled_contract(None, compiled_contract, None)
    declared_oracle_class_hash = compute_class_hash(compiled_, hash_func=pedersen_hash)
    return declared_oracle_class_hash
