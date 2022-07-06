from statistics import median

import pytest
import pytest_asyncio
from pontis.core.entry import construct_entry, serialize_entries, serialize_entry
from pontis.core.utils import str_to_felt
from starkware.starknet.business_logic.state.state import BlockInfo
from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from utils import (
    assert_event_emitted,
    cached_contract,
    construct_path,
    register_new_publisher_and_publish_entries_1,
    register_new_publisher_and_publish_entry,
)

# The path to the contract source code.
PUBLISHER_REGISTRY_CONTRACT_FILE = construct_path(
    "contracts/publisher_registry/PublisherRegistry.cairo"
)
ORACLE_CONTROLLER_CONTRACT_FILE = construct_path(
    "contracts/oracle_controller/OracleController.cairo"
)
ORACLE_IMPLEMENTATION_CONTRACT_FILE = construct_path(
    "contracts/oracle_implementation/OracleImplementation.cairo"
)
ACCOUNT_CONTRACT_FILE = construct_path("contracts/account/Account.cairo")
DEFAULT_DECIMALS = 18
AGGREGATION_MODE = 0
TIMESTAMP_BUFFER = 3600
STARKNET_STARTING_TIMESTAMP = 1650590820


@pytest_asyncio.fixture(scope="module")
async def contract_classes():
    account_class = compile_starknet_files(
        files=[ACCOUNT_CONTRACT_FILE], debug_info=True
    )
    publisher_registry_class = compile_starknet_files(
        files=[PUBLISHER_REGISTRY_CONTRACT_FILE], debug_info=True
    )
    oracle_controller_class = compile_starknet_files(
        files=[ORACLE_CONTROLLER_CONTRACT_FILE], debug_info=True
    )
    oracle_implementation_class = compile_starknet_files(
        files=[ORACLE_IMPLEMENTATION_CONTRACT_FILE], debug_info=True
    )
    return (
        account_class,
        publisher_registry_class,
        oracle_controller_class,
        oracle_implementation_class,
    )


@pytest_asyncio.fixture(scope="module")
async def contract_init(
    contract_classes, private_and_public_admin_keys, private_and_public_publisher_keys
):
    _, admin_public_key = private_and_public_admin_keys
    _, publisher_public_key = private_and_public_publisher_keys
    (
        account_class,
        publisher_registry_class,
        oracle_controller_class,
        oracle_implementation_class,
    ) = contract_classes

    starknet = await Starknet.empty()
    starknet.state.state.block_info = BlockInfo.create_for_testing(
        starknet.state.state.block_info.block_number, STARKNET_STARTING_TIMESTAMP
    )
    # account_declared_class = await starknet.declare(contract_class=account_class)
    admin_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[admin_public_key]
    )
    second_admin_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[admin_public_key]
    )
    publisher_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[publisher_public_key]
    )
    num_additional_publishers = 5
    additional_publisher_accounts = [
        await starknet.deploy(
            contract_class=account_class,
            constructor_calldata=[publisher_public_key],
        )
        for _ in range(num_additional_publishers)
    ]
    publisher_registry = await starknet.deploy(
        contract_class=publisher_registry_class,
        constructor_calldata=[admin_account.contract_address],
    )
    oracle_controller = await starknet.deploy(
        contract_class=oracle_controller_class,
        constructor_calldata=[
            admin_account.contract_address,
            publisher_registry.contract_address,
            1,
            str_to_felt("decimals-test"),
            100,
        ],
    )
    oracle_implementation = await starknet.deploy(
        contract_class=oracle_implementation_class,
        constructor_calldata=[oracle_controller.contract_address],
    )
    second_oracle_implementation = await starknet.deploy(
        contract_class=oracle_implementation_class,
        constructor_calldata=[oracle_controller.contract_address],
    )

    return {
        "starknet": starknet,
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "additional_publisher_accounts": additional_publisher_accounts,
        "publisher_registry": publisher_registry,
        "oracle_controller": oracle_controller,
        "oracle_implementation": oracle_implementation,
        "second_oracle_implementation": second_oracle_implementation,
    }


@pytest.fixture
def contracts(contract_classes, contract_init):
    (
        account_class,
        publisher_registry_class,
        oracle_controller_class,
        oracle_implementation_class,
    ) = contract_classes
    _state = contract_init["starknet"].state.copy()
    admin_account = cached_contract(
        _state, account_class, contract_init["admin_account"]
    )
    second_admin_account = cached_contract(
        _state, account_class, contract_init["second_admin_account"]
    )
    publisher_account = cached_contract(
        _state, account_class, contract_init["publisher_account"]
    )
    additional_publisher_accounts = [
        cached_contract(_state, account_class, x)
        for x in contract_init["additional_publisher_accounts"]
    ]
    publisher_registry = cached_contract(
        _state, publisher_registry_class, contract_init["publisher_registry"]
    )
    oracle_controller = cached_contract(
        _state, oracle_controller_class, contract_init["oracle_controller"]
    )
    oracle_implementation = cached_contract(
        _state, oracle_implementation_class, contract_init["oracle_implementation"]
    )
    second_oracle_implementation = cached_contract(
        _state,
        oracle_implementation_class,
        contract_init["second_oracle_implementation"],
    )
    return {
        "starknet": contract_init["starknet"],
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "additional_publisher_accounts": additional_publisher_accounts,
        "publisher_registry": publisher_registry,
        "oracle_controller": oracle_controller,
        "oracle_implementation": oracle_implementation,
        "second_oracle_implementation": second_oracle_implementation,
    }


@pytest_asyncio.fixture
async def initialized_contracts(
    contracts,
    admin_signer,
    publisher,
):
    admin_account = contracts["admin_account"]
    publisher_account = contracts["publisher_account"]
    publisher_registry = contracts["publisher_registry"]
    oracle_controller = contracts["oracle_controller"]
    oracle_implementation = contracts["oracle_implementation"]

    # Register publisher
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [publisher, publisher_account.contract_address],
    )

    # Add oracle implementation address to controller
    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "add_oracle_implementation_address",
        [oracle_implementation.contract_address],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_controller.contract_address,
        "AddedOracleImplementation",
        [oracle_implementation.contract_address],
    )

    return contracts


@pytest.mark.asyncio
async def test_deploy(initialized_contracts):
    return


@pytest.mark.asyncio
async def test_decimals(initialized_contracts, admin_signer):
    oracle_controller = initialized_contracts["oracle_controller"]

    result = await oracle_controller.get_decimals(str_to_felt("default")).call()
    assert result.result.decimals == DEFAULT_DECIMALS

    result = await oracle_controller.get_decimals(str_to_felt("decimals-test")).call()
    assert result.result.decimals == 100

    return


@pytest.mark.asyncio
async def test_oracle_implementation_addresses(initialized_contracts, admin_signer):
    admin_account = initialized_contracts["admin_account"]
    oracle_controller = initialized_contracts["oracle_controller"]
    oracle_implementation = initialized_contracts["oracle_implementation"]

    result = await oracle_controller.get_active_oracle_implementation_addresses().call()
    assert result.result.oracle_addresses == [oracle_implementation.contract_address]

    result = await oracle_controller.get_primary_oracle_implementation_address().call()
    assert (
        result.result.primary_oracle_implementation_address
        == oracle_implementation.contract_address
    )

    # Add second oracle implementation address
    second_oracle_implementation_address = oracle_implementation.contract_address + 1

    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "add_oracle_implementation_address",
        [second_oracle_implementation_address],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_controller.contract_address,
        "AddedOracleImplementation",
        [second_oracle_implementation_address],
    )

    result = await oracle_controller.get_active_oracle_implementation_addresses().call()
    assert result.result.oracle_addresses == [
        oracle_implementation.contract_address,
        second_oracle_implementation_address,
    ]

    # Ensure that setting first (primary) implementation address to inactive fails
    try:
        await admin_signer.send_transaction(
            admin_account,
            oracle_controller.contract_address,
            "update_oracle_implementation_active_status",
            [oracle_implementation.contract_address, 0],
        )

        raise Exception(
            "Transaction to set oracle implementation status as inactive on primary oracle implementation succeeded, but should not have."
        )
    except StarkException:
        pass

    # Set second oracle implementation to inactive
    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "update_oracle_implementation_active_status",
        [second_oracle_implementation_address, 0],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_controller.contract_address,
        "UpdatedOracleImplementation",
        [second_oracle_implementation_address, 1, 0],
    )

    # Try setting second oracle implementation to primary and fail
    try:
        await admin_signer.send_transaction(
            admin_account,
            oracle_controller.contract_address,
            "set_primary_oracle_implementation_address",
            [second_oracle_implementation_address],
        )

        raise Exception(
            "Transaction to set inactive oracle implementation as primary succeeded, but should not have."
        )
    except StarkException:
        pass

    # Set second oracle implementation back to active
    await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "update_oracle_implementation_active_status",
        [second_oracle_implementation_address, 1],
    )

    # Set second oracle implementation as primary
    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "set_primary_oracle_implementation_address",
        [second_oracle_implementation_address],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_controller.contract_address,
        "UpdatedPrimaryOracleImplementation",
        [oracle_implementation.contract_address, second_oracle_implementation_address],
    )

    result = await oracle_controller.get_primary_oracle_implementation_address().call()
    assert (
        result.result.primary_oracle_implementation_address
        == second_oracle_implementation_address
    )

    return


@pytest.mark.asyncio
async def test_rotate_admin_address(initialized_contracts, admin_signer):
    admin_account = initialized_contracts["admin_account"]
    second_admin_account = initialized_contracts["second_admin_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    result = await oracle_controller.get_admin_address().call()
    assert result.result.admin_address == admin_account.contract_address

    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "set_admin_address",
        [second_admin_account.contract_address],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_controller.contract_address,
        "UpdatedAdminAddress",
        [admin_account.contract_address, second_admin_account.contract_address],
    )

    result = await oracle_controller.get_admin_address().call()
    assert result.result.admin_address == second_admin_account.contract_address

    return


@pytest.mark.asyncio
async def test_update_publisher_registry_address(initialized_contracts, admin_signer):
    admin_account = initialized_contracts["admin_account"]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]

    result = await oracle_controller.get_publisher_registry_address().call()
    assert (
        result.result.publisher_registry_address == publisher_registry.contract_address
    )

    new_publisher_registry_address = publisher_registry.contract_address + 1

    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "update_publisher_registry_address",
        [new_publisher_registry_address],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_controller.contract_address,
        "UpdatedPublisherRegistryAddress",
        [publisher_registry.contract_address, new_publisher_registry_address],
    )

    result = await oracle_controller.get_publisher_registry_address().call()
    assert result.result.publisher_registry_address == new_publisher_registry_address

    return


@pytest.mark.asyncio
async def test_submit(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    entry = construct_entry(
        key=str_to_felt("eth/usd"),
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    tx_exec_info = await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_controller.contract_address,
        "SubmittedEntry",
        serialize_entry(entry),
    )

    result = await oracle_controller.get_value(entry.key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value
    assert result.result.last_updated_timestamp == entry.timestamp
    assert result.result.decimals == DEFAULT_DECIMALS

    source_result = await oracle_controller.get_value_for_sources(
        entry.key, AGGREGATION_MODE, [source]
    ).call()
    assert source_result.result == result.result

    entry_result = await oracle_controller.get_entry(entry.key, source).call()
    assert entry_result.result.entry == entry

    return


@pytest.mark.asyncio
async def test_re_submit(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    result = await oracle_controller.get_value(entry.key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    second_entry = entry = construct_entry(
        key=key,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(second_entry),
    )

    result = await oracle_controller.get_value(
        second_entry.key, AGGREGATION_MODE
    ).call()
    assert result.result.value == second_entry.value

    return


@pytest.mark.asyncio
async def test_re_submit_stale(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    result = await oracle_controller.get_value(entry.key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    source_result = await oracle_controller.get_value_for_sources(
        key, AGGREGATION_MODE, [source]
    ).call()
    assert result.result == source_result.result

    second_entry = construct_entry(
        key=key,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    try:
        await publisher_signer.send_transaction(
            publisher_account,
            oracle_controller.contract_address,
            "publish_entry",
            serialize_entry(second_entry),
        )

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    source_result = await oracle_controller.get_value_for_sources(
        key, AGGREGATION_MODE, [source]
    ).call()
    assert result.result == source_result.result

    return


@pytest.mark.asyncio
async def test_submit_second_asset(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    entry = construct_entry(
        key=str_to_felt("eth/usd"),
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    result = await oracle_controller.get_value(entry.key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    second_entry = construct_entry(
        key=str_to_felt("btc/usd"),
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(second_entry),
    )

    result = await oracle_controller.get_value(
        second_entry.key, AGGREGATION_MODE
    ).call()
    assert result.result.value == second_entry.value

    # Check that first asset is still stored accurately
    result = await oracle_controller.get_value(entry.key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    source_result = await oracle_controller.get_value_for_sources(
        entry.key, AGGREGATION_MODE, [source]
    ).call()
    assert result.result == source_result.result

    return


@pytest.mark.asyncio
async def test_submit_second_publisher(
    initialized_contracts,
    admin_signer,
    source,
    publisher,
    publisher_signer,
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    second_source = str_to_felt("1xdata")
    second_publisher = str_to_felt("bar")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )

    second_entry = construct_entry(
        key=key,
        value=5,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=second_source,
        publisher=second_publisher,
    )

    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(second_entry),
    )

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )
    source_result = await oracle_controller.get_value_for_sources(
        key, AGGREGATION_MODE, [source, second_source]
    ).call()
    assert source_result.result == result.result

    source_result = await oracle_controller.get_value_for_sources(
        key, AGGREGATION_MODE, [source]
    ).call()
    assert source_result.result.value == entry.value
    assert source_result.result.last_updated_timestamp == entry.timestamp

    source_result = await oracle_controller.get_value_for_sources(
        key, AGGREGATION_MODE, [second_source]
    ).call()
    assert source_result.result.value == second_entry.value
    assert source_result.result.last_updated_timestamp == second_entry.timestamp

    result = await oracle_controller.get_entries(key, []).call()
    assert result.result.entries == [entry, second_entry]

    return


@pytest.mark.asyncio
async def test_submit_second_source(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    result = await oracle_controller.get_value(entry.key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    second_source = str_to_felt("1xdata")
    second_entry = construct_entry(
        key=key,
        value=4,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=second_source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(second_entry),
    )

    result = await oracle_controller.get_value(
        second_entry.key, AGGREGATION_MODE
    ).call()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )

    return


@pytest.mark.asyncio
async def test_median_aggregation(
    initialized_contracts,
    admin_signer,
    source,
    publisher,
    publisher_signer,
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("eth/usd")
    prices = [1, 3, 10, 5, 12, 2]
    publishers = ["foo", "bar", "baz", "oof", "rab", "zab"]
    entry = construct_entry(
        key=key,
        value=prices[0],
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    entries = [entry]

    for price, additional_publisher_str, publisher_account in zip(
        prices[1:],
        publishers[1:],
        initialized_contracts["additional_publisher_accounts"],
    ):
        additional_publisher = str_to_felt(additional_publisher_str)
        additional_source = str_to_felt(additional_publisher_str + "-source")
        additional_entry = construct_entry(
            key=key,
            value=price,
            timestamp=STARKNET_STARTING_TIMESTAMP,
            source=additional_source,
            publisher=additional_publisher,
        )
        entries.append(additional_entry)
        await register_new_publisher_and_publish_entry(
            admin_account,
            publisher_account,
            publisher_registry,
            oracle_controller,
            admin_signer,
            publisher_signer,
            additional_publisher,
            additional_entry,
        )

        result = await oracle_controller.get_entries(key, []).call()
        assert result.result.entries == entries

        result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
        assert result.result.value == int(median(prices[: len(entries)]))

        print(f"Succeeded for {len(entries)} entries")

    return


@pytest.mark.asyncio
async def test_submit_many(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    keys = [str_to_felt("eth/usd"), str_to_felt("btc/usd"), str_to_felt("doge/usd")]
    prices = [1, 3, 10]
    publisher = "foo"
    entries = [
        construct_entry(
            key=keys[i],
            value=prices[i],
            timestamp=STARKNET_STARTING_TIMESTAMP,
            source=source,
            publisher=publisher,
        )
        for i in range(len(keys))
    ]

    tx_exec_info = await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entries",
        serialize_entries(entries),
    )
    for entry in entries:
        assert_event_emitted(
            tx_exec_info,
            oracle_controller.contract_address,
            "SubmittedEntry",
            serialize_entry(entry),
        )

    for i, key in enumerate(keys):
        result = await oracle_controller.get_entries(key, []).call()
        assert result.result.entries == [entries[i]]

        result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
        assert result.result.value == prices[i]

    return


@pytest.mark.asyncio
async def test_subset_publishers(
    initialized_contracts,
    admin_signer,
    source,
    publisher,
    publisher_signer,
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("luna/usd")
    entry = construct_entry(
        key=key,
        value=1,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    additional_publisher = str_to_felt("bar")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [additional_publisher, second_publisher_account.contract_address],
    )

    result = await oracle_controller.get_entries(key, []).call()
    assert result.result.entries == [entry]

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_unknown_source(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    result = await oracle_controller.get_value_for_sources(
        key, AGGREGATION_MODE, [str_to_felt("unknown")]
    ).call()
    assert result.result.num_sources_aggregated == 0


@pytest.mark.asyncio
async def test_unknown_key(initialized_contracts):
    oracle_controller = initialized_contracts["oracle_controller"]

    unknown_key = str_to_felt("answertolife")
    result = await oracle_controller.get_entries(unknown_key, []).call()
    assert len(result.result.entries) == 0

    result = await oracle_controller.get_value(unknown_key, AGGREGATION_MODE).call()
    assert result.result.value == 0
    assert result.result.last_updated_timestamp == 0


@pytest.mark.asyncio
async def test_real_data(
    initialized_contracts,
    admin_signer,
    publisher_signer,
    publisher,
):
    admin_account = initialized_contracts["admin_account"]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]

    entries = [
        construct_entry(
            "eth/usd", 29898560234403, 1650590880, "cryptowatch", "cryptowatch"
        ),
        construct_entry(
            "btc/usd", 404308601528970, 1650590880, "cryptowatch", "cryptowatch"
        ),
        construct_entry(
            "luna/usd", 922793061826, 1650590880, "cryptowatch", "cryptowatch"
        ),
        construct_entry(
            "sol/usd", 1023379113474, 1650590880, "cryptowatch", "cryptowatch"
        ),
        construct_entry(
            "avax/usd", 759878999010, 1650590880, "cryptowatch", "cryptowatch"
        ),
        construct_entry(
            "doge/usd", 1365470994, 1650590880, "cryptowatch", "cryptowatch"
        ),
        construct_entry("shib/usd", 244844, 1650590880, "cryptowatch", "cryptowatch"),
        construct_entry(
            "eth/usd", 29902600000000, 1650590935, "coingecko", "coingecko"
        ),
        construct_entry(
            "btc/usd", 404070000000000, 1650590889, "coingecko", "coingecko"
        ),
        construct_entry("luna/usd", 922099999999, 1650590883, "coingecko", "coingecko"),
        construct_entry("sol/usd", 1023600000000, 1650590886, "coingecko", "coingecko"),
        construct_entry("avax/usd", 759800000000, 1650590853, "coingecko", "coingecko"),
        construct_entry("doge/usd", 1365780000, 1650590845, "coingecko", "coingecko"),
        construct_entry("shib/usd", 245100, 1650590865, "coingecko", "coingecko"),
        construct_entry("eth/usd", 29924650000000, 1650590820, "coinbase", "coinbase"),
        construct_entry("btc/usd", 404057899999999, 1650590820, "coinbase", "coinbase"),
        construct_entry("eth/usd", 29920000000000, 1650590986, "gemini", "gemini"),
        construct_entry("btc/usd", 404047800000000, 1650590986, "gemini", "gemini"),
        construct_entry("luna/usd", 924700000000, 1650590986, "gemini", "gemini"),
        construct_entry("sol/usd", 1023610000000, 1650590986, "gemini", "gemini"),
        construct_entry("doge/usd", 1364400000, 1650590986, "gemini", "gemini"),
        construct_entry("shib/usd", 245270, 1650590986, "gemini", "gemini"),
    ]
    publishers_str = ["cryptowatch", "coingecko", "coinbase", "gemini"]
    publishers = [str_to_felt(p) for p in publishers_str]
    for i, publisher in enumerate(publishers):
        publisher_entries = [e for e in entries if e.publisher == publisher]
        publisher_account = initialized_contracts["additional_publisher_accounts"][i]
        await register_new_publisher_and_publish_entries_1(
            admin_account,
            publisher_account,
            publisher_registry,
            oracle_controller,
            admin_signer,
            publisher_signer,
            publisher,
            publisher_entries,
        )

    keys = [
        "eth/usd",
        "btc/usd",
        "luna/usd",
        "sol/usd",
        "avax/usd",
        "doge/usd",
        "shib/usd",
    ]
    for key in keys:
        result = await oracle_controller.get_value(
            str_to_felt(key), AGGREGATION_MODE
        ).call()
        assert result.result.value != 0
        assert result.result.last_updated_timestamp != 0

    result = await oracle_controller.get_value_for_sources(
        str_to_felt("eth/usd"),
        AGGREGATION_MODE,
        [str_to_felt("gemini"), str_to_felt("coinbase")],
    ).call()
    assert result.result.value == (29920000000000 + 29924650000000) / 2
    assert result.result.last_updated_timestamp == 1650590986

    result = await oracle_controller.get_value_for_sources(
        str_to_felt("eth/usd"),
        AGGREGATION_MODE,
        [str_to_felt("gemini"), str_to_felt("unknown")],
    ).call()
    assert result.result.value == 29920000000000
    assert result.result.last_updated_timestamp == 1650590986
    assert result.result.num_sources_aggregated == 1


@pytest.mark.asyncio
async def test_multiple_oracle_implementations(
    initialized_contracts, admin_signer, source, publisher, publisher_signer
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]
    second_oracle_implementation = initialized_contracts["second_oracle_implementation"]

    # Submit entry
    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=1,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    result = await oracle_controller.get_entries(key, []).call()
    assert result.result.entries == [entry]

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == entry.value

    # Add second oracle implementation address to controller
    await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "add_oracle_implementation_address",
        [second_oracle_implementation.contract_address],
    )

    # Submit second entry from second publisher
    second_publisher = str_to_felt("bar")
    second_source = str_to_felt("1xdata")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )

    second_entry = construct_entry(
        key=key,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=second_source,
        publisher=second_publisher,
    )
    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(second_entry),
    )

    # Verify that we can get both entries from the first oracle implementation
    result = await oracle_controller.get_entries(key, []).call()
    assert result.result.entries == [entry, second_entry]

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == (entry.value + second_entry.value) / 2
    assert result.result.num_sources_aggregated == 2

    # Verify that only the second entry is present in the second oracle implementation
    await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "set_primary_oracle_implementation_address",
        [second_oracle_implementation.contract_address],
    )

    result = await oracle_controller.get_primary_oracle_implementation_address().call()
    assert (
        result.result.primary_oracle_implementation_address
        == second_oracle_implementation.contract_address
    )

    result = await oracle_controller.get_entries(key, []).call()
    assert result.result.entries == [second_entry]

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == second_entry.value

    return


@pytest.mark.asyncio
async def test_rotate_primary_oracle_implementation_address(
    initialized_contracts, admin_signer, source, publisher, publisher_signer
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]
    oracle_implementation = initialized_contracts["oracle_implementation"]
    second_oracle_implementation = initialized_contracts["second_oracle_implementation"]

    # Add second oracle implementation address to controller
    await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "add_oracle_implementation_address",
        [second_oracle_implementation.contract_address],
    )

    # Submit entry
    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=1,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    # Update primary oracle and deactivate old primary oracle
    await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "set_primary_oracle_implementation_address",
        [second_oracle_implementation.contract_address],
    )

    result = await oracle_controller.get_primary_oracle_implementation_address().call()
    assert (
        result.result.primary_oracle_implementation_address
        == second_oracle_implementation.contract_address
    )

    await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "update_oracle_implementation_active_status",
        [oracle_implementation.contract_address, 0],
    )

    result = await oracle_controller.get_oracle_implementation_status(
        oracle_implementation.contract_address
    ).call()
    assert result.result.oracle_implementation_status.was_registered == 1
    assert result.result.oracle_implementation_status.is_active == 0

    result = await oracle_controller.get_oracle_implementation_status(
        second_oracle_implementation.contract_address
    ).call()
    assert result.result.oracle_implementation_status.was_registered == 1
    assert result.result.oracle_implementation_status.is_active == 1

    result = await oracle_controller.get_active_oracle_implementation_addresses().call()
    assert result.result.oracle_addresses == [
        second_oracle_implementation.contract_address
    ]

    # Submit second entry from second publisher
    second_publisher = str_to_felt("bar")
    second_source = str_to_felt("1xdata")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )

    second_entry = construct_entry(
        key=key,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=second_source,
        publisher=second_publisher,
    )
    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(second_entry),
    )

    result = await oracle_controller.get_entries(key, []).call()
    assert result.result.entries == [entry, second_entry]

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == (entry.value + second_entry.value) / 2

    # Add third (fake) oracle implementation address to controller
    await admin_signer.send_transaction(
        admin_account,
        oracle_controller.contract_address,
        "add_oracle_implementation_address",
        [second_oracle_implementation.contract_address + 1],
    )

    result = await oracle_controller.get_active_oracle_implementation_addresses().call()
    assert result.result.oracle_addresses == [
        second_oracle_implementation.contract_address,
        second_oracle_implementation.contract_address + 1,
    ]

    return


@pytest.mark.asyncio
async def test_ignore_future_entry(
    initialized_contracts,
    source,
    publisher,
    publisher_signer,
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_controller = initialized_contracts["oracle_controller"]
    key = str_to_felt("eth/usd")

    entry = construct_entry(
        key=key,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER + 1,
        source=source,
        publisher=publisher,
    )

    try:
        await publisher_signer.send_transaction(
            publisher_account,
            oracle_controller.contract_address,
            "publish_entry",
            serialize_entry(entry),
        )

        raise Exception(
            "Transaction to submit price too far in the future succeeded, but should not have."
        )
    except StarkException:
        pass

    return


@pytest.mark.asyncio
async def test_ignore_stale_entries(
    initialized_contracts, admin_signer, source, publisher, publisher_signer
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_controller = initialized_contracts["oracle_controller"]

    key = str_to_felt("eth/usd")
    entry = construct_entry(
        key=key,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(entry),
    )

    second_publisher = str_to_felt("bar")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )

    # Advance time by TIMESTAMP_BUFFER
    admin_account.state.state.block_info = BlockInfo.create_for_testing(
        admin_account.state.state.block_info.block_number,
        admin_account.state.state.block_info.block_timestamp + TIMESTAMP_BUFFER,
    )

    second_entry = construct_entry(
        key=key,
        value=5,
        timestamp=STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER,
        source=source,
        publisher=second_publisher,
    )

    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_controller.contract_address,
        "publish_entry",
        serialize_entry(second_entry),
    )

    result = await oracle_controller.get_value(key, AGGREGATION_MODE).call()
    assert result.result.value == second_entry.value
    assert result.result.last_updated_timestamp == second_entry.timestamp

    result = await oracle_controller.get_entries(key, []).call()
    assert result.result.entries == [second_entry]

    return
