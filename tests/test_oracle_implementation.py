from statistics import median

import pytest
import pytest_asyncio
from constants import AGGREGATION_MODE, CAIRO_PATH, CONTRACT_FILE, PROXY_CONTRACT_FILE
from empiric.core.entry import Entry
from empiric.core.utils import felt_to_str, str_to_felt
from starkware.starknet.compiler.compile import (
    compile_starknet_files,
    get_selector_from_name,
)
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from utils import cached_contract

ORACLE_CONTROLLER_ADDRESS = 1771898182094063035988424170791013279488407100660629279080401671638225029234  # random number


@pytest_asyncio.fixture(scope="module")
async def contract_class():
    contract_class = compile_starknet_files(
        files=[CONTRACT_FILE], debug_info=True, cairo_path=CAIRO_PATH
    )
    return contract_class


@pytest_asyncio.fixture(scope="module")
async def contract_init(contract_class):
    starknet = await Starknet.empty()
    oracle_implementation = await starknet.declare(
        contract_class=contract_class,
    )
    proxy_class = compile_starknet_files(
        files=[PROXY_CONTRACT_FILE],
        debug_info=True,
        cairo_path=CAIRO_PATH,
    )

    proxy_contract = await starknet.deploy(
        contract_class=proxy_class,
        constructor_calldata=[
            oracle_implementation.class_hash,
            get_selector_from_name("initializer"),
            2,
            ORACLE_CONTROLLER_ADDRESS,
            ORACLE_CONTROLLER_ADDRESS,
        ],
    )

    return starknet.state, proxy_contract


@pytest.fixture
def contract(contract_class, contract_init):
    state, contract = contract_init
    _state = state.copy()
    contract = cached_contract(_state, contract_class, contract)
    return contract


@pytest.mark.asyncio
async def test_deploy(contract):
    return


@pytest.mark.asyncio
async def test_update_oracle_controller_address(contract):
    new_oracle_controller_address = ORACLE_CONTROLLER_ADDRESS + 1
    await contract.set_oracle_controller_address(new_oracle_controller_address).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    try:
        await contract.set_oracle_controller_address(
            new_oracle_controller_address
        ).invoke(caller_address=ORACLE_CONTROLLER_ADDRESS)

        raise Exception(
            "Transaction to update oracle controller address from incorrect address succeeded, but should not have."
        )
    except StarkException:
        pass

    await contract.set_oracle_controller_address(ORACLE_CONTROLLER_ADDRESS).invoke(
        caller_address=new_oracle_controller_address
    )

    return


@pytest.mark.asyncio
async def test_submit_entries(contract, source, publisher):
    entry = Entry(
        pair_id="eth/usd", value=2, timestamp=1, source=source, publisher=publisher
    )

    await contract.publish_entry(entry.serialize()).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    result = await contract.get_value(entry.pair_id, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    second_entry = Entry(
        pair_id="btc/usd", value=3, timestamp=2, source=source, publisher=publisher
    )

    await contract.publish_entry(second_entry.serialize()).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    result = await contract.get_value(second_entry.pair_id, AGGREGATION_MODE, []).call()
    assert result.result.value == second_entry.value

    # Check that first asset is still stored accurately
    result = await contract.get_value(entry.pair_id, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_republish_stale(contract, source, publisher):
    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id, value=2, timestamp=2, source=source, publisher=publisher
    )

    await contract.publish_entry(entry.serialize()).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    result = await contract.get_value(entry.pair_id, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    second_entry = Entry(
        pair_id=pair_id, value=3, timestamp=1, source=source, publisher=publisher
    )

    try:
        await contract.publish_entry(second_entry.serialize()).invoke(
            caller_address=ORACLE_CONTROLLER_ADDRESS
        )

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await contract.get_value(pair_id, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_mean_aggregation(
    contract,
    source,
    publisher,
):
    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id, value=3, timestamp=1, source=source, publisher=publisher
    )

    await contract.publish_entry(entry.serialize()).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    second_publisher = str_to_felt("bar")
    second_source = str_to_felt("1xdata")
    second_entry = Entry(
        pair_id=pair_id,
        value=5,
        timestamp=1,
        source=second_source,
        publisher=second_publisher,
    )

    await contract.publish_entry(second_entry.serialize()).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    result = await contract.get_value(pair_id, AGGREGATION_MODE, []).call()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )

    result = await contract.get_entries(pair_id, []).call()
    assert result.result.entries == [entry, second_entry]

    return


@pytest.mark.asyncio
async def test_median_aggregation(
    contract,
    source,
):
    pair_id = str_to_felt("eth/usd")
    prices = [1, 3, 10, 5, 12, 2]
    publishers_str = ["foo", "bar", "baz", "oof", "rab", "zab"]
    publishers = [str_to_felt(p) for p in publishers_str]
    entry = Entry(
        pair_id=pair_id,
        value=prices[0],
        timestamp=1,
        source=source,
        publisher=publishers[0],
    )

    await contract.publish_entry(entry.serialize()).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    entries = [entry]

    for price, additional_publisher in zip(prices[1:], publishers[1:]):
        additional_source = str_to_felt(felt_to_str(additional_publisher) + "-source")
        additional_entry = Entry(
            pair_id=pair_id,
            value=price,
            timestamp=1,
            source=additional_source,
            publisher=additional_publisher,
        )
        entries.append(additional_entry)

        await contract.publish_entry(additional_entry.serialize()).invoke(
            caller_address=ORACLE_CONTROLLER_ADDRESS
        )

        result = await contract.get_entries(pair_id, []).call()
        assert result.result.entries == entries

        result = await contract.get_value(pair_id, AGGREGATION_MODE, []).call()
        assert result.result.value == int(median(prices[: len(entries)]))

        print(f"Succeeded for {len(entries)} entries")

    result = await contract.get_all_sources(pair_id).call()
    assert len(result.result.sources) == len(publishers)

    return
