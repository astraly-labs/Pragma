from statistics import median

import pytest
import pytest_asyncio
from empiric.core.entry import Entry
from empiric.core.utils import felt_to_str, str_to_felt
from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from utils import cached_contract, construct_path

CONTRACT_FILE = construct_path(
    "contracts/oracle_implementation/OracleImplementation.cairo"
)
DEFAULT_DECIMALS = 18
ORACLE_CONTROLLER_ADDRESS = 1771898182094063035988424170791013279488407100660629279080401671638225029234  # random number
AGGREGATION_MODE = 0


@pytest_asyncio.fixture(scope="module")
async def contract_class():
    contract_class = compile_starknet_files(files=[CONTRACT_FILE], debug_info=True)
    return contract_class


@pytest_asyncio.fixture(scope="module")
async def contract_init(contract_class):
    starknet = await Starknet.empty()
    contract = await starknet.deploy(
        contract_class=contract_class, constructor_calldata=[ORACLE_CONTROLLER_ADDRESS]
    )

    return starknet.state, contract


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
        key="eth/usd", value=2, timestamp=1, source=source, publisher=publisher
    )

    await contract.publish_entry(entry).invoke(caller_address=ORACLE_CONTROLLER_ADDRESS)

    result = await contract.get_value(entry.key, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    second_entry = Entry(
        key="btc/usd", value=3, timestamp=2, source=source, publisher=publisher
    )

    await contract.publish_entry(second_entry).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    result = await contract.get_value(second_entry.key, AGGREGATION_MODE, []).call()
    assert result.result.value == second_entry.value

    # Check that first asset is still stored accurately
    result = await contract.get_value(entry.key, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_republish_stale(contract, source, publisher):
    key = str_to_felt("eth/usd")
    entry = Entry(key=key, value=2, timestamp=2, source=source, publisher=publisher)

    await contract.publish_entry(entry).invoke(caller_address=ORACLE_CONTROLLER_ADDRESS)

    result = await contract.get_value(entry.key, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    second_entry = Entry(
        key=key, value=3, timestamp=1, source=source, publisher=publisher
    )

    try:
        await contract.publish_entry(second_entry).invoke(
            caller_address=ORACLE_CONTROLLER_ADDRESS
        )

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await contract.get_value(key, AGGREGATION_MODE, []).call()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_mean_aggregation(
    contract,
    source,
    publisher,
):
    key = str_to_felt("eth/usd")
    entry = Entry(key=key, value=3, timestamp=1, source=source, publisher=publisher)

    await contract.publish_entry(entry).invoke(caller_address=ORACLE_CONTROLLER_ADDRESS)

    second_publisher = str_to_felt("bar")
    second_source = str_to_felt("1xdata")
    second_entry = Entry(
        key=key, value=5, timestamp=1, source=second_source, publisher=second_publisher
    )

    await contract.publish_entry(second_entry).invoke(
        caller_address=ORACLE_CONTROLLER_ADDRESS
    )

    result = await contract.get_value(key, AGGREGATION_MODE, []).call()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )

    result = await contract.get_entries(key, []).call()
    assert result.result.entries == [entry, second_entry]

    return


@pytest.mark.asyncio
async def test_median_aggregation(
    contract,
    source,
):
    key = str_to_felt("eth/usd")
    prices = [1, 3, 10, 5, 12, 2]
    publishers_str = ["foo", "bar", "baz", "oof", "rab", "zab"]
    publishers = [str_to_felt(p) for p in publishers_str]
    entry = Entry(
        key=key, value=prices[0], timestamp=1, source=source, publisher=publishers[0]
    )

    await contract.publish_entry(entry).invoke(caller_address=ORACLE_CONTROLLER_ADDRESS)

    entries = [entry]

    for price, additional_publisher in zip(prices[1:], publishers[1:]):
        additional_source = str_to_felt(felt_to_str(additional_publisher) + "-source")
        additional_entry = Entry(
            key=key,
            value=price,
            timestamp=1,
            source=additional_source,
            publisher=additional_publisher,
        )
        entries.append(additional_entry)

        await contract.publish_entry(additional_entry).invoke(
            caller_address=ORACLE_CONTROLLER_ADDRESS
        )

        result = await contract.get_entries(key, []).call()
        assert result.result.entries == entries

        result = await contract.get_value(key, AGGREGATION_MODE, []).call()
        assert result.result.value == int(median(prices[: len(entries)]))

        print(f"Succeeded for {len(entries)} entries")

    result = await contract.get_all_sources(key).call()
    assert len(result.result.sources) == len(publishers)

    return
