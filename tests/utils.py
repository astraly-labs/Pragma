import os

from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.testing.starknet import StarknetContract
from nile.signer import Signer


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


# From OZ: https://github.com/OpenZeppelin/cairo-contracts/blob/main/tests/utils.py
class TestSigner:
    def __init__(self, private_key):
        self.signer = Signer(private_key)
        self.public_key = self.signer.public_key

    async def send_transaction(
        self, account, to, selector_name, calldata, nonce=None, max_fee=0
    ):
        return await self.send_transactions(
            account, [(to, selector_name, calldata)], nonce, max_fee
        )

    async def send_transactions(self, account, calls, nonce=None, max_fee=0):
        if nonce is None:
            execution_info = await account.get_nonce().call()
            (nonce,) = execution_info.result

        build_calls = []
        for call in calls:
            build_call = list(call)
            build_call[0] = hex(build_call[0])
            build_calls.append(build_call)

        (call_array, calldata, sig_r, sig_s) = self.signer.sign_transaction(
            hex(account.contract_address), build_calls, nonce, max_fee
        )
        return await account.__execute__(call_array, calldata, nonce).invoke(
            signature=[sig_r, sig_s]
        )
