import os
from typing import List, Union

from empiric.core.entry import SpotEntry
from empiric.core.utils import str_to_felt
from nile.signer import TRANSACTION_VERSION, Signer, from_call_to_call_array
from starkware.starknet.business_logic.execution.objects import Event
from starkware.starknet.business_logic.fact_state.state import CarriedState
from starkware.starknet.business_logic.state.state_api_objects import BlockInfo
from starkware.starknet.business_logic.transaction.objects import InternalTransaction
from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.public.abi import get_selector_from_name
from starkware.starknet.services.api.gateway.transaction import InvokeFunction
from starkware.starknet.testing.starknet import StarknetContract

CAIRO_PATH = ["contracts/src", "contracts/lib"]


def construct_path(path):
    return os.path.join(os.path.dirname(__file__), "../", path)


def get_contract_def(path):
    """Returns the contract definition from the contract path"""
    complete_path = construct_path(path)
    contract_def = compile_starknet_files(
        files=[complete_path], debug_info=True, cairo_path=CAIRO_PATH
    )
    return contract_def


def cached_contract(state, contract_class, deployed):
    """Returns the cached contract"""
    contract = StarknetContract(
        state=state,
        abi=contract_class.abi,
        contract_address=deployed.contract_address,
        deploy_call_info=deployed.deploy_call_info,
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
        build_calls = []
        for call in calls:
            build_call = list(call)
            build_call[0] = hex(build_call[0])
            build_calls.append(build_call)
        raw_invocation = get_raw_invoke(account, build_calls)
        state = raw_invocation.state

        if nonce is None:
            nonce = await state.state.get_nonce_at(account.contract_address)

        # get signature
        calldata, sig_r, sig_s = self.signer.sign_transaction(
            account.contract_address, build_calls, nonce, max_fee
        )

        # craft invoke and execute tx
        external_tx = InvokeFunction(
            contract_address=account.contract_address,
            calldata=calldata,
            entry_point_selector=None,
            signature=[sig_r, sig_s],
            max_fee=max_fee,
            version=TRANSACTION_VERSION,
            nonce=nonce,
        )

        tx = InternalTransaction.from_external(
            external_tx=external_tx, general_config=state.general_config
        )
        execution_info = await state.execute_tx(tx=tx)
        return execution_info


def get_raw_invoke(sender, calls):
    """Construct and return StarkNet's internal raw_invocation."""
    call_array, calldata = from_call_to_call_array(calls)
    raw_invocation = sender.__execute__(call_array, calldata)
    return raw_invocation


# From OZ: https://github.com/OpenZeppelin/cairo-contracts/blob/main/tests/utils.py
def assert_event_emitted(tx_exec_info, from_address: int, name: str, data: List[int]):
    assert (
        Event(
            from_address=from_address,
            keys=[get_selector_from_name(name)],
            data=data,
        )
        in tx_exec_info.get_sorted_events()
    )


async def register_new_publisher_and_publish_spot_entries_1(
    admin_account,
    publisher_account,
    publisher_registry,
    oracle,
    admin_signer,
    publisher_signer,
    publisher,
    entries: List[SpotEntry],
):
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_publisher",
        [publisher, publisher_account.contract_address],
    )

    sources = set([entry.base.source for entry in entries])

    for source in sources:
        await admin_signer.send_transaction(
            admin_account,
            publisher_registry.contract_address,
            "add_source_for_publisher",
            [publisher, source],
        )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle.contract_address,
        "publish_spot_entries",
        SpotEntry.flatten_entries(entries),
    )


async def register_new_publisher_and_publish_spot_entry(
    admin_account,
    publisher_account,
    publisher_registry,
    oracle,
    admin_signer,
    publisher_signer,
    publisher,
    entry: SpotEntry,
):
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_publisher",
        [publisher, publisher_account.contract_address],
    )
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_source_for_publisher",
        [publisher, entry.base.source],
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )


def advance_time(state: CarriedState, buffer: int):
    state.block_info = BlockInfo.create_for_testing(
        state.block_info.block_number,
        state.block_info.block_timestamp + buffer,
    )


def transform_calldata(calldata: List[Union[int, str, List[int]]]):
    """Transforms a list to a calldata format that can be used in starknet constructor_calldata"""
    output = []

    # TODO (rlkelly: recursively calculate list length. transform_calldata([1, [2, 3]])) should be [4, 1, 2, 2 3]
    def build_cons(calldata):
        for item in calldata:
            if type(item) == int:
                output.append(item)
            elif type(item) == list:
                output.append(len(item))
                output.extend(transform_calldata(item))
            elif type(item) == str:
                output.append(str_to_felt(item))
            elif type(item) == tuple:
                output.extend(transform_calldata(list(item)))
            else:
                raise TypeError("invalid input")
        return output

    return build_cons(calldata)
