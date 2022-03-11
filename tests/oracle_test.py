import os
import pytest
from collections import namedtuple

from starkware.starknet.testing.starknet import Starknet
from utils import str_to_felt

# The path to the contract source code.
CONTRACT_FILE = os.path.join(
    os.path.dirname(__file__), "../contracts/", "oracle.cairo")

Entry = namedtuple("Entry", ["timestamp", "price", "asset_name", "oracle_name"])

# The testing library uses python's asyncio. So the following
# decorator and the ``async`` keyword are needed.
@pytest.mark.asyncio
async def test_increase_balance():
    # Create a new Starknet class that simulates the StarkNet
    # system.
    starknet = await Starknet.empty()

    # Deploy the contract.
    contract = await starknet.deploy(
        source=CONTRACT_FILE,
    )

    # Invoke add_entry
    entry = Entry(timestamp=1, price=2, asset_name=str_to_felt("BTCUSD"), oracle_name=str_to_felt("Jonas"))
    await contract.add_entry(new_entry=entry, oracle_signature=123).invoke()
    entry = Entry(timestamp=2, price=2, asset_name=str_to_felt("BTCUSD"), oracle_name=str_to_felt("Jonas"))
    await contract.add_entry(new_entry=entry, oracle_signature=123).invoke()

    # Check the result of get_balance().
    entry_info = await contract.get_entry(str_to_felt("BTCUSD")).call()
    assert entry_info.result.entry_res == Entry(timestamp=2, price=2, asset_name=str_to_felt("BTCUSD"), oracle_name=str_to_felt("Jonas"))