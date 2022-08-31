from statistics import median

import pytest
import pytest_asyncio
from constants import (
    ACCOUNT_CONTRACT_FILE,
    CAIRO_PATH,
    ORACLE_CONTRACT_FILE,
    PROXY_CONTRACT_FILE,
    PUBLISHER_REGISTRY_CONTRACT_FILE,
)
from empiric.core.entry import Entry
from empiric.core.types import AggregationMode
from empiric.core.utils import str_to_felt
from starkware.starknet.business_logic.state.state import BlockInfo
from starkware.starknet.compiler.compile import (
    compile_starknet_files,
    get_selector_from_name,
)
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from utils import (
    assert_event_emitted,
    cached_contract,
    register_new_publisher_and_publish_entries_1,
    register_new_publisher_and_publish_entry,
)

TIMESTAMP_BUFFER = 3600
STARKNET_STARTING_TIMESTAMP = 1650590820


@pytest_asyncio.fixture(scope="module")
async def contract_classes():
    account_class = compile_starknet_files(
        files=[ACCOUNT_CONTRACT_FILE], debug_info=True, cairo_path=CAIRO_PATH
    )
    publisher_registry_class = compile_starknet_files(
        files=[PUBLISHER_REGISTRY_CONTRACT_FILE],
        debug_info=True,
        cairo_path=CAIRO_PATH,
    )
    oracle_class = compile_starknet_files(
        files=[ORACLE_CONTRACT_FILE],
        debug_info=True,
        cairo_path=CAIRO_PATH,
    )
    proxy_class = compile_starknet_files(
        files=[PROXY_CONTRACT_FILE],
        debug_info=True,
        cairo_path=CAIRO_PATH,
    )

    return (
        account_class,
        publisher_registry_class,
        oracle_class,
        proxy_class,
    )


@pytest_asyncio.fixture(scope="module")
async def contract_init(
    contract_classes,
    private_and_public_admin_keys,
    private_and_public_publisher_keys,
):
    _, admin_public_key = private_and_public_admin_keys
    _, publisher_public_key = private_and_public_publisher_keys
    (
        account_class,
        publisher_registry_class,
        oracle_class,
        proxy_class,
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

    declared_oracle_class = await starknet.declare(
        contract_class=oracle_class,
    )

    oracle_proxy = await starknet.deploy(
        contract_class=proxy_class,
        constructor_calldata=[
            declared_oracle_class.class_hash,
            get_selector_from_name("initializer"),
            73,
            admin_account.contract_address,
            publisher_registry.contract_address,
            9,
            str_to_felt("decimals-test"),
            100,
            1,
            0,
            0,
            str_to_felt("eth"),
            18,
            1,
            0,
            0,
            str_to_felt("btc"),
            18,
            1,
            0,
            0,
            str_to_felt("usd"),
            8,
            1,
            0,
            0,
            str_to_felt("doge"),
            18,
            1,
            0,
            0,
            str_to_felt("luna"),
            18,
            1,
            0,
            0,
            str_to_felt("sol"),
            18,
            1,
            0,
            0,
            str_to_felt("shib"),
            18,
            1,
            0,
            0,
            str_to_felt("avax"),
            18,
            1,
            0,
            0,
            8,
            str_to_felt("usd/decimals-test"),
            str_to_felt("usd"),
            str_to_felt("decimals-test"),
            str_to_felt("eth/usd"),
            str_to_felt("eth"),
            str_to_felt("usd"),
            str_to_felt("btc/usd"),
            str_to_felt("btc"),
            str_to_felt("usd"),
            str_to_felt("luna/usd"),
            str_to_felt("luna"),
            str_to_felt("usd"),
            str_to_felt("doge/usd"),
            str_to_felt("doge"),
            str_to_felt("usd"),
            str_to_felt("sol/usd"),
            str_to_felt("sol"),
            str_to_felt("usd"),
            str_to_felt("shib/usd"),
            str_to_felt("shib"),
            str_to_felt("usd"),
            str_to_felt("avax/usd"),
            str_to_felt("avax"),
            str_to_felt("usd"),
        ],
    )

    return {
        "starknet": starknet,
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "additional_publisher_accounts": additional_publisher_accounts,
        "publisher_registry": publisher_registry,
        "oracle_proxy": oracle_proxy,
    }


@pytest.fixture
def contracts(contract_classes, contract_init):
    (account_class, publisher_registry_class, proxy_class) = contract_classes
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
    oracle_proxy = cached_contract(_state, proxy_class, contract_init["oracle_proxy"])
    return {
        "starknet": contract_init["starknet"],
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "additional_publisher_accounts": additional_publisher_accounts,
        "publisher_registry": publisher_registry,
        "oracle_proxy": oracle_proxy,
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

    # Register publisher
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [publisher, publisher_account.contract_address],
    )

    return contracts


@pytest.mark.asyncio
async def test_deploy(initialized_contracts):
    return


@pytest.mark.asyncio
async def test_decimals(initialized_contracts):
    oracle_proxy = initialized_contracts["oracle_proxy"]

    result = await oracle_proxy.get_decimals(str_to_felt("nonexistant")).call()
    assert result.result.decimals == 0

    result = await oracle_proxy.get_decimals(str_to_felt("usd/decimals-test")).call()
    assert result.result.decimals == 100


@pytest.mark.asyncio
async def test_rotate_admin_address(initialized_contracts, admin_signer):
    admin_account = initialized_contracts["admin_account"]
    second_admin_account = initialized_contracts["second_admin_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    result = await oracle_proxy.get_admin_address().call()
    assert result.result.admin_address == admin_account.contract_address

    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_proxy.contract_address,
        "set_admin_address",
        [second_admin_account.contract_address],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_proxy.contract_address,
        "AdminAddressChanged",
        [admin_account.contract_address, second_admin_account.contract_address],
    )

    result = await oracle_proxy.get_admin_address().call()
    assert result.result.admin_address == second_admin_account.contract_address


@pytest.mark.asyncio
async def test_update_publisher_registry_address(initialized_contracts, admin_signer):
    admin_account = initialized_contracts["admin_account"]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    result = await oracle_proxy.get_publisher_registry_address().call()
    assert (
        result.result.publisher_registry_address == publisher_registry.contract_address
    )

    new_publisher_registry_address = publisher_registry.contract_address + 1

    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        oracle_proxy.contract_address,
        "update_publisher_registry_address",
        [new_publisher_registry_address],
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_proxy.contract_address,
        "UpdatedPublisherRegistryAddress",
        [publisher_registry.contract_address, new_publisher_registry_address],
    )

    result = await oracle_proxy.get_publisher_registry_address().call()
    assert result.result.publisher_registry_address == new_publisher_registry_address


@pytest.mark.asyncio
async def test_submit(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    entry = Entry(
        pair_id=str_to_felt("eth/usd"),
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    tx_exec_info = await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_proxy.contract_address,
        "SubmittedEntry",
        list(entry.serialize()),
    )

    result = await oracle_proxy.get_value(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == entry.value
    assert result.result.last_updated_timestamp == entry.timestamp
    assert result.result.decimals == 8

    source_result = await oracle_proxy.get_value_for_sources(
        entry.pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert source_result.result == result.result

    entry_result = await oracle_proxy.get_entry(entry.pair_id, source).call()
    assert entry_result.result.entry == entry


@pytest.mark.asyncio
async def test_re_submit(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    result = await oracle_proxy.get_value(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == entry.value

    second_entry = entry = Entry(
        pair_id=pair_id,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        second_entry.serialize(),
    )

    result = await oracle_proxy.get_value(
        second_entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == second_entry.value


@pytest.mark.asyncio
async def test_re_submit_stale(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    result = await oracle_proxy.get_value(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == entry.value

    source_result = await oracle_proxy.get_value_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert result.result == source_result.result

    second_entry = Entry(
        pair_id=pair_id,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    try:
        await publisher_signer.send_transaction(
            publisher_account,
            oracle_proxy.contract_address,
            "publish_entry",
            second_entry.serialize(),
        )

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await oracle_proxy.get_value(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.value == entry.value

    source_result = await oracle_proxy.get_value_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert result.result == source_result.result


@pytest.mark.asyncio
async def test_submit_second_asset(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    entry = Entry(
        pair_id=str_to_felt("eth/usd"),
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    result = await oracle_proxy.get_value(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == entry.value

    second_entry = Entry(
        pair_id=str_to_felt("btc/usd"),
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        second_entry.serialize(),
    )

    result = await oracle_proxy.get_value(
        second_entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == second_entry.value

    # Check that first asset is still stored accurately
    result = await oracle_proxy.get_value(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == entry.value

    source_result = await oracle_proxy.get_value_for_sources(
        entry.pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert result.result == source_result.result


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
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    second_source = str_to_felt("1xdata")
    second_publisher = str_to_felt("bar")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )

    second_entry = Entry(
        pair_id=pair_id,
        value=5,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=second_source,
        publisher=second_publisher,
    )

    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        second_entry.serialize(),
    )

    result = await oracle_proxy.get_value(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )
    source_result = await oracle_proxy.get_value_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source, second_source]
    ).call()
    assert source_result.result == result.result

    source_result = await oracle_proxy.get_value_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert source_result.result.value == entry.value
    assert source_result.result.last_updated_timestamp == entry.timestamp

    source_result = await oracle_proxy.get_value_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [second_source]
    ).call()
    assert source_result.result.value == second_entry.value
    assert source_result.result.last_updated_timestamp == second_entry.timestamp

    result = await oracle_proxy.get_entries(pair_id, []).call()
    assert result.result.entries == [entry, second_entry]


@pytest.mark.asyncio
async def test_submit_second_source(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    result = await oracle_proxy.get_value(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == entry.value

    second_source = str_to_felt("1xdata")
    second_entry = Entry(
        pair_id=pair_id,
        value=4,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=second_source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        second_entry.serialize(),
    )

    result = await oracle_proxy.get_value(
        second_entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )


@pytest.mark.asyncio
async def test_mean_aggregation(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    second_source = str_to_felt("1xdata")
    second_entry = Entry(
        pair_id=pair_id,
        value=5,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=second_source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        second_entry.serialize(),
    )

    # median is equivalent to mean if only 2 values
    result = await oracle_proxy.get_value(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )

    result = await oracle_proxy.get_entries(pair_id, []).call()
    assert result.result.entries == [entry, second_entry]

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
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    prices = [1, 3, 10, 5, 12, 2]
    publishers = ["foo", "bar", "baz", "oof", "rab", "zab"]
    entry = Entry(
        pair_id=pair_id,
        value=prices[0],
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    entries = [entry]

    for price, additional_publisher_str, publisher_account in zip(
        prices[1:],
        publishers[1:],
        initialized_contracts["additional_publisher_accounts"],
    ):
        additional_publisher = str_to_felt(additional_publisher_str)
        additional_source = str_to_felt(additional_publisher_str + "-source")
        additional_entry = Entry(
            pair_id=pair_id,
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
            oracle_proxy,
            admin_signer,
            publisher_signer,
            additional_publisher,
            additional_entry,
        )

        result = await oracle_proxy.get_entries(pair_id, []).call()
        assert result.result.entries == entries

        result = await oracle_proxy.get_value(
            pair_id, AggregationMode.MEDIAN.value
        ).call()
        assert result.result.value == int(median(prices[: len(entries)]))

        print(f"Succeeded for {len(entries)} entries")


@pytest.mark.asyncio
async def test_submit_many(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_ids = [str_to_felt("eth/usd"), str_to_felt("btc/usd"), str_to_felt("doge/usd")]
    prices = [1, 3, 10]
    publisher = "foo"
    entries = [
        Entry(
            pair_id=pair_ids[i],
            value=prices[i],
            timestamp=STARKNET_STARTING_TIMESTAMP,
            source=source,
            publisher=publisher,
        )
        for i in range(len(pair_ids))
    ]

    tx_exec_info = await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entries",
        Entry.serialize_entries(entries),
    )
    for entry in entries:
        assert_event_emitted(
            tx_exec_info,
            oracle_proxy.contract_address,
            "SubmittedEntry",
            list(entry.serialize()),
        )

    for i, pair_id in enumerate(pair_ids):
        result = await oracle_proxy.get_entries(pair_id, []).call()
        assert result.result.entries == [entries[i]]

        result = await oracle_proxy.get_value(
            pair_id, AggregationMode.MEDIAN.value
        ).call()
        assert result.result.value == prices[i]


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
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("doge/usd")
    entry = Entry(
        pair_id=pair_id,
        value=1,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    additional_publisher = str_to_felt("bar")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [additional_publisher, second_publisher_account.contract_address],
    )

    result = await oracle_proxy.get_entries(pair_id, []).call()
    assert result.result.entries == [entry]

    result = await oracle_proxy.get_value(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.value == entry.value


@pytest.mark.asyncio
async def test_unknown_source(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id,
        value=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
    )

    result = await oracle_proxy.get_value_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [str_to_felt("unknown")]
    ).call()
    assert result.result.num_sources_aggregated == 0


@pytest.mark.asyncio
async def test_unknown_key(initialized_contracts):
    oracle_proxy = initialized_contracts["oracle_proxy"]

    unknown_pair_id = str_to_felt("answertolife")

    result = await oracle_proxy.get_entries(unknown_pair_id, []).call()
    assert len(result.result.entries) == 0


@pytest.mark.asyncio
async def test_real_data(
    initialized_contracts,
    admin_signer,
    publisher_signer,
    publisher,
):
    admin_account = initialized_contracts["admin_account"]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    entries = [
        Entry("eth/usd", 29898560234403, 1650590880, "cryptowatch", "cryptowatch"),
        Entry("btc/usd", 404308601528970, 1650590880, "cryptowatch", "cryptowatch"),
        Entry("luna/usd", 922793061826, 1650590880, "cryptowatch", "cryptowatch"),
        Entry("sol/usd", 1023379113474, 1650590880, "cryptowatch", "cryptowatch"),
        Entry("avax/usd", 759878999010, 1650590880, "cryptowatch", "cryptowatch"),
        Entry("doge/usd", 1365470994, 1650590880, "cryptowatch", "cryptowatch"),
        Entry("shib/usd", 244844, 1650590880, "cryptowatch", "cryptowatch"),
        Entry("eth/usd", 29902600000000, 1650590935, "coingecko", "coingecko"),
        Entry("btc/usd", 404070000000000, 1650590889, "coingecko", "coingecko"),
        Entry("luna/usd", 922099999999, 1650590883, "coingecko", "coingecko"),
        Entry("sol/usd", 1023600000000, 1650590886, "coingecko", "coingecko"),
        Entry("avax/usd", 759800000000, 1650590853, "coingecko", "coingecko"),
        Entry("doge/usd", 1365780000, 1650590845, "coingecko", "coingecko"),
        Entry("shib/usd", 245100, 1650590865, "coingecko", "coingecko"),
        Entry("eth/usd", 29924650000000, 1650590820, "coinbase", "coinbase"),
        Entry("btc/usd", 404057899999999, 1650590820, "coinbase", "coinbase"),
        Entry("eth/usd", 29920000000000, 1650590986, "gemini", "gemini"),
        Entry("btc/usd", 404047800000000, 1650590986, "gemini", "gemini"),
        Entry("luna/usd", 924700000000, 1650590986, "gemini", "gemini"),
        Entry("sol/usd", 1023610000000, 1650590986, "gemini", "gemini"),
        Entry("doge/usd", 1364400000, 1650590986, "gemini", "gemini"),
        Entry("shib/usd", 245270, 1650590986, "gemini", "gemini"),
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
            oracle_proxy,
            admin_signer,
            publisher_signer,
            publisher,
            publisher_entries,
        )

    pair_ids = [
        "eth/usd",
        "btc/usd",
        "luna/usd",
        "sol/usd",
        "avax/usd",
        "doge/usd",
        "shib/usd",
    ]
    for pair_id in pair_ids:
        result = await oracle_proxy.get_value(
            str_to_felt(pair_id), AggregationMode.MEDIAN.value
        ).call()
        assert result.result.value != 0
        assert result.result.last_updated_timestamp != 0

    result = await oracle_proxy.get_value_for_sources(
        str_to_felt("eth/usd"),
        AggregationMode.MEDIAN.value,
        [str_to_felt("gemini"), str_to_felt("coinbase")],
    ).call()
    assert result.result.value == (29920000000000 + 29924650000000) / 2
    assert result.result.last_updated_timestamp == 1650590986

    result = await oracle_proxy.get_value_for_sources(
        str_to_felt("eth/usd"),
        AggregationMode.MEDIAN.value,
        [str_to_felt("gemini"), str_to_felt("unknown")],
    ).call()
    assert result.result.value == 29920000000000
    assert result.result.last_updated_timestamp == 1650590986
    assert result.result.num_sources_aggregated == 1


@pytest.mark.asyncio
async def test_ignore_future_entry(
    initialized_contracts,
    source,
    publisher,
    publisher_signer,
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]
    pair_id = str_to_felt("eth/usd")

    entry = Entry(
        pair_id=pair_id,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER + 1,
        source=source,
        publisher=publisher,
    )

    try:
        await publisher_signer.send_transaction(
            publisher_account,
            oracle_proxy.contract_address,
            "publish_entry",
            entry.serialize(),
        )

        raise Exception(
            "Transaction to submit price too far in the future succeeded, but should not have."
        )
    except StarkException:
        pass


@pytest.mark.asyncio
async def test_ignore_stale_entries(
    initialized_contracts, admin_signer, source, publisher, publisher_signer
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("eth/usd")
    entry = Entry(
        pair_id=pair_id,
        value=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        entry.serialize(),
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

    second_entry = Entry(
        pair_id=pair_id,
        value=5,
        timestamp=STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER,
        source=source,
        publisher=second_publisher,
    )

    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_proxy.contract_address,
        "publish_entry",
        second_entry.serialize(),
    )

    result = await oracle_proxy.get_value(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.value == second_entry.value
    assert result.result.last_updated_timestamp == second_entry.timestamp

    result = await oracle_proxy.get_entries(pair_id, []).call()
    assert result.result.entries == [second_entry]
