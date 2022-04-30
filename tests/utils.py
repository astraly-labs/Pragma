import os

from starkware.starknet.testing.starknet import StarknetContract
from starkware.starknet.compiler.compile import compile_starknet_files

def construct_path(path):
    return os.path.join(os.path.dirname(__file__), "../", path)

def get_contract_def(path):
    """Returns the contract definition from the contract path"""
    complete_path = construct_path(path)
    contract_def = compile_starknet_files(files=[complete_path], debug_info=True)
    return contract_def


def cached_contract(state, definition, deployed):
    """Returns the cached contract"""
    contract = StarknetContract(
        state=state,
        abi=definition.abi,
        contract_address=deployed.contract_address,
        deploy_execution_info=deployed.deploy_execution_info,
    )
    return contract
