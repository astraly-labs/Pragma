import os
import time
from typing import List

from empiric.core.entry import Entry
from nile.signer import Signer
from starkware.starknet.business_logic.execution.objects import Event
from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.public.abi import get_selector_from_name
from starkware.starknet.testing.starknet import StarknetContract


def construct_path(path):
    return os.path.join(os.path.dirname(__file__), "../", path)


def get_contract_def(path):
    """Returns the contract definition from the contract path"""
    complete_path = construct_path(path)
    contract_def = compile_starknet_files(files=[complete_path], debug_info=True)
    return contract_def


def cached_contract(state, contract_class, deployed):
    """Returns the cached contract"""
    contract = StarknetContract(
        state=state,
        abi=contract_class.abi,
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
            nonce = int(time.time())

            # Tests are fast enough that sometimes we get race conditions (many tx sub-second)
            # handle that special case here by auto-incrementing
            execution_info = await account.get_nonce().call()
            (on_chain_nonce,) = execution_info.result
            if nonce <= on_chain_nonce:
                nonce = on_chain_nonce + 1

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


# From OZ: https://github.com/OpenZeppelin/cairo-contracts/blob/main/tests/utils.py
def assert_event_emitted(tx_exec_info, from_address, name, data):
    assert (
        Event(
            from_address=from_address,
            keys=[get_selector_from_name(name)],
            data=data,
        )
        in tx_exec_info.raw_events
    )


async def register_new_publisher_and_publish_entries_1(
    admin_account,
    publisher_account,
    publisher_registry,
    oracle_controller,
    admin_signer,
    publisher_signer,
    publisher,
    entries: List[Entry],
):
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [publisher, publisher_account.contract_address],
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entries",
        Entry.serialize_entries(entries),
    )

    return


async def register_new_publisher_and_publish_entry(
    admin_account,
    publisher_account,
    publisher_registry,
    oracle_controller,
    admin_signer,
    publisher_signer,
    publisher,
    entry: Entry,
):
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [publisher, publisher_account.contract_address],
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    return
