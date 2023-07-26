from statistics import median

import pytest
import pytest_asyncio
from constants import (
    ACCOUNT_CONTRACT_FILE,
    CAIRO_PATH,
    ORACLE_ABI,
    ORACLE_CONTRACT_FILE,
    PROXY_CONTRACT_FILE,
    PUBLISHER_REGISTRY_CONTRACT_FILE,
)
from empiric.core.entry import SpotEntry
from empiric.core.types import AggregationMode
from empiric.core.utils import str_to_felt
from starkware.starknet.business_logic.state.state_api_objects import BlockInfo
from starkware.starknet.compiler.compile import (
    compile_starknet_files,
    get_selector_from_name,
)
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from utils import (
    advance_time,
    assert_event_emitted,
    cached_contract,
    register_new_publisher_and_publish_spot_entries_1,
    register_new_publisher_and_publish_spot_entry,
    transform_calldata,
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
        constructor_calldata=transform_calldata(
            (
                declared_oracle_class.class_hash,
                get_selector_from_name("initializer"),
                73,
                admin_account.contract_address,
                publisher_registry.contract_address,
                [
                    ("DECIMALS-TEST", 100, 1, 0, 0),
                    ("ETH", 18, 1, 0, 0),
                    ("BTC", 18, 1, 0, 0),
                    ("USD", 8, 1, 0, 0),
                    ("DOGE", 18, 1, 0, 0),
                    ("LUNA", 18, 1, 0, 0),
                    ("SOL", 18, 1, 0, 0),
                    ("SHIB", 18, 1, 0, 0),
                    ("AVAX", 18, 1, 0, 0),
                ],
                [
                    ("USD/DECIMALS-TEST", "USD", "DECIMALS-TEST"),
                    ("ETH/USD", "ETH", "USD"),
                    ("BTC/USD", "BTC", "USD"),
                    ("LUNA/USD", "LUNA", "USD"),
                    ("DOGE/USD", "DOGE", "USD"),
                    ("SOL/USD", "SOL", "USD"),
                    ("SHIB/USD", "SHIB", "USD"),
                    ("AVAX/USD", "AVAX", "USD"),
                ],
            )
        ),
    )
    oracle_proxy = oracle_proxy.replace_abi(ORACLE_ABI)

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
    (
        account_class,
        publisher_registry_class,
        oracle_class,
        proxy_class,
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
    contracts["oracle_proxy"] = contracts["oracle_proxy"].replace_abi(ORACLE_ABI)

    # Register publisher
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
        [publisher, str_to_felt("0xdata")],
    )
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_source_for_publisher",
        [publisher, str_to_felt("1xdata")],
    )

    return contracts


@pytest.mark.asyncio
async def test_deploy(initialized_contracts):
    return


@pytest.mark.asyncio
async def test_decimals(initialized_contracts):
    oracle_proxy = initialized_contracts["oracle_proxy"]

    result = await oracle_proxy.get_spot_decimals(str_to_felt("NONEXISTANT")).call()
    assert result.result.decimals == 0

    result = await oracle_proxy.get_spot_decimals(
        str_to_felt("USD/DECIMALS-TEST")
    ).call()
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

    entry = SpotEntry(
        pair_id=str_to_felt("ETH/USD"),
        price=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    tx_exec_info = await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )
    assert_event_emitted(
        tx_exec_info,
        oracle_proxy.contract_address,
        "SubmittedSpotEntry",
        list(entry.to_tuple()),
    )

    result = await oracle_proxy.get_spot(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == entry.price
    assert result.result.last_updated_timestamp == entry.base.timestamp
    assert result.result.decimals == 8

    source_result = await oracle_proxy.get_spot_for_sources(
        entry.pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert source_result.result == result.result

    entry_result = await oracle_proxy.get_spot_entry(entry.pair_id, source).call()
    assert entry_result.result.entry.price == entry.price


@pytest.mark.asyncio
async def test_re_submit(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == entry.price

    second_entry = entry = SpotEntry(
        pair_id=pair_id,
        price=3,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        second_entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(
        second_entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == second_entry.price


@pytest.mark.asyncio
async def test_re_submit_stale(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=2,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == entry.price

    source_result = await oracle_proxy.get_spot_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert result.result == source_result.result

    second_entry = SpotEntry(
        pair_id=pair_id,
        price=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    try:
        await publisher_signer.send_transaction(
            publisher_account,
            oracle_proxy.contract_address,
            "publish_spot_entry",
            second_entry.to_tuple(),
        )

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await oracle_proxy.get_spot(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.price == entry.price

    source_result = await oracle_proxy.get_spot_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert result.result == source_result.result


@pytest.mark.asyncio
async def test_submit_second_asset(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    entry = SpotEntry(
        pair_id=str_to_felt("ETH/USD"),
        price=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == entry.price

    second_entry = SpotEntry(
        pair_id=str_to_felt("BTC/USD"),
        price=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        second_entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(
        second_entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == second_entry.price

    # Check that first asset is still stored accurately
    result = await oracle_proxy.get_spot(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == entry.price

    source_result = await oracle_proxy.get_spot_for_sources(
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

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    second_source = str_to_felt("1xDATA")
    second_publisher = str_to_felt("BAR")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_source_for_publisher",
        [second_publisher, second_source],
    )

    second_entry = SpotEntry(
        pair_id=pair_id,
        price=5,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=second_source,
        publisher=second_publisher,
    )

    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        second_entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.price == (second_entry.price + entry.price) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.base.timestamp, entry.base.timestamp
    )
    source_result = await oracle_proxy.get_spot_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source, second_source]
    ).call()
    assert source_result.result == result.result

    source_result = await oracle_proxy.get_spot_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [source]
    ).call()
    assert source_result.result.price == entry.price
    assert source_result.result.last_updated_timestamp == entry.base.timestamp

    source_result = await oracle_proxy.get_spot_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [second_source]
    ).call()
    assert source_result.result.price == second_entry.price
    assert source_result.result.last_updated_timestamp == second_entry.base.timestamp

    result = await oracle_proxy.get_spot_entries(pair_id).call()
    assert [r.price for r in result.result.entries] == [entry.price, second_entry.price]
    assert [r.base.timestamp for r in result.result.entries] == [
        entry.base.timestamp,
        second_entry.base.timestamp,
    ]


@pytest.mark.asyncio
async def test_submit_second_source(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(
        entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == entry.price

    second_source = str_to_felt("1xdata")
    second_entry = SpotEntry(
        pair_id=pair_id,
        price=4,
        timestamp=STARKNET_STARTING_TIMESTAMP + 2,
        source=second_source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        second_entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(
        second_entry.pair_id, AggregationMode.MEDIAN.value
    ).call()
    assert result.result.price == (second_entry.price + entry.price) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.base.timestamp, entry.base.timestamp
    )


@pytest.mark.asyncio
async def test_mean_aggregation(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    second_source = str_to_felt("1xdata")
    second_entry = SpotEntry(
        pair_id=pair_id,
        price=5,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=second_source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        second_entry.to_tuple(),
    )

    # median is equivalent to mean if only 2 values
    result = await oracle_proxy.get_spot(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.price == (second_entry.price + entry.price) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.base.timestamp, entry.base.timestamp
    )

    result = await oracle_proxy.get_spot_entries(pair_id).call()
    assert [r.price for r in result.result.entries] == [entry.price, second_entry.price]
    assert [r.base.timestamp for r in result.result.entries] == [
        entry.base.timestamp,
        second_entry.base.timestamp,
    ]

    return


@pytest.mark.asyncio
async def test_get_median_spot

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

    pair_id = str_to_felt("ETH/USD")
    prices = [1, 3, 10, 5, 12, 2]
    publishers = ["foo", "bar", "baz", "oof", "rab", "zab"]
    entry = SpotEntry(
        pair_id=pair_id,
        price=prices[0],
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    entries = [entry]

    for price, additional_publisher_str, publisher_account in zip(
        prices[1:],
        publishers[1:],
        initialized_contracts["additional_publisher_accounts"],
    ):
        additional_publisher = str_to_felt(additional_publisher_str)
        additional_source = str_to_felt(additional_publisher_str + "-source")
        additional_entry = SpotEntry(
            pair_id=pair_id,
            price=price,
            timestamp=STARKNET_STARTING_TIMESTAMP,
            source=additional_source,
            publisher=additional_publisher,
        )
        entries.append(additional_entry)
        await register_new_publisher_and_publish_spot_entry(
            admin_account,
            publisher_account,
            publisher_registry,
            oracle_proxy,
            admin_signer,
            publisher_signer,
            additional_publisher,
            additional_entry,
        )

        result = await oracle_proxy.get_spot_entries(pair_id).call()
        assert [r.price for r in result.result.entries] == [
            entry.price for entry in entries
        ]
        assert [r.base.timestamp for r in result.result.entries] == [
            entry.base.timestamp for entry in entries
        ]

        result = await oracle_proxy.get_spot(
            pair_id, AggregationMode.MEDIAN.value
        ).call()
        assert result.result.price == int(median(prices[: len(entries)]))

        print(f"Succeeded for {len(entries)} entries")


@pytest.mark.asyncio
async def test_submit_many(initialized_contracts, source, publisher, publisher_signer):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_ids = [str_to_felt("ETH/USD"), str_to_felt("BTC/USD"), str_to_felt("DOGE/USD")]
    prices = [1, 3, 10]
    publisher = "foo"
    entries = [
        SpotEntry(
            pair_id=pair_ids[i],
            price=prices[i],
            timestamp=STARKNET_STARTING_TIMESTAMP,
            source=source,
            publisher=publisher,
        )
        for i in range(len(pair_ids))
    ]

    tx_exec_info = await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entries",
        SpotEntry.flatten_entries(entries),
    )
    for entry in entries:
        assert_event_emitted(
            tx_exec_info,
            oracle_proxy.contract_address,
            "SubmittedSpotEntry",
            list(entry.to_tuple()),
        )

    for i, pair_id in enumerate(pair_ids):
        result = await oracle_proxy.get_spot_entries(pair_id).call()
        assert result.result.entries[0].price == entries[i].price
        assert result.result.entries[0].base.timestamp == entries[i].base.timestamp

        result = await oracle_proxy.get_spot(
            pair_id, AggregationMode.MEDIAN.value
        ).call()
        assert result.result.price == prices[i]


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

    pair_id = str_to_felt("DOGE/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=1,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    additional_publisher = str_to_felt("BAR")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_publisher",
        [additional_publisher, second_publisher_account.contract_address],
    )

    result = await oracle_proxy.get_spot_entries(pair_id).call()
    assert [r.price for r in result.result.entries] == [entry.price]
    assert [r.base.timestamp for r in result.result.entries] == [entry.base.timestamp]

    result = await oracle_proxy.get_spot(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.price == entry.price


@pytest.mark.asyncio
async def test_unknown_source(
    initialized_contracts, source, publisher, publisher_signer
):
    publisher_account = initialized_contracts["publisher_account"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=2,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot_for_sources(
        pair_id, AggregationMode.MEDIAN.value, [str_to_felt("UNKNOWN")]
    ).call()
    assert result.result.num_sources_aggregated == 0


@pytest.mark.asyncio
async def test_unknown_key(initialized_contracts):
    oracle_proxy = initialized_contracts["oracle_proxy"]

    unknown_pair_id = str_to_felt("ANSWERTOLIFE")

    result = await oracle_proxy.get_spot_entries(unknown_pair_id).call()
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
        SpotEntry("ETH/USD", 29902600000000, 1650590935, "CEX", "CEX"),
        SpotEntry("BTC/USD", 404070000000000, 1650590889, "CEX", "CEX"),
        SpotEntry("LUNA/USD", 922099999999, 1650590883, "CEX", "CEX"),
        SpotEntry("SOL/USD", 1023600000000, 1650590886, "CEX", "CEX"),
        SpotEntry("AVAX/USD", 759800000000, 1650590853, "CEX", "CEX"),
        SpotEntry("DOGE/USD", 1365780000, 1650590845, "CEX", "CEX"),
        SpotEntry("SHIB/USD", 245100, 1650590865, "CEX", "CEX"),
        SpotEntry("ETH/USD", 29924650000000, 1650590820, "COINBASE", "COINBASE"),
        SpotEntry("BTC/USD", 404057899999999, 1650590820, "COINBASE", "COINBASE"),
        SpotEntry("ETH/USD", 29920000000000, 1650590986, "GEMINI", "GEMINI"),
        SpotEntry("BTC/USD", 404047800000000, 1650590986, "GEMINI", "GEMINI"),
        SpotEntry("LUNA/USD", 924700000000, 1650590986, "GEMINI", "GEMINI"),
        SpotEntry("SOL/USD", 1023610000000, 1650590986, "GEMINI", "GEMINI"),
        SpotEntry("DOGE/USD", 1364400000, 1650590986, "GEMINI", "GEMINI"),
        SpotEntry("SHIB/USD", 245270, 1650590986, "GEMINI", "GEMINI"),
    ]
    publishers_str = ["CEX", "COINBASE", "GEMINI"]
    publishers = [str_to_felt(p) for p in publishers_str]
    for i, publisher in enumerate(publishers):
        publisher_entries = [e for e in entries if e.base.publisher == publisher]
        publisher_account = initialized_contracts["additional_publisher_accounts"][i]
        await register_new_publisher_and_publish_spot_entries_1(
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
        "ETH/USD",
        "BTC/USD",
        "LUNA/USD",
        "SOL/USD",
        "AVAX/USD",
        "DOGE/USD",
        "SHIB/USD",
    ]
    for pair_id in pair_ids:
        result = await oracle_proxy.get_spot(
            str_to_felt(pair_id), AggregationMode.MEDIAN.value
        ).call()
        assert result.result.price != 0
        assert result.result.last_updated_timestamp != 0

    result = await oracle_proxy.get_spot_for_sources(
        str_to_felt("ETH/USD"),
        AggregationMode.MEDIAN.value,
        [str_to_felt("GEMINI"), str_to_felt("COINBASE")],
    ).call()
    assert result.result.price == (29920000000000 + 29924650000000) / 2
    assert result.result.last_updated_timestamp == 1650590986

    result = await oracle_proxy.get_spot_for_sources(
        str_to_felt("ETH/USD"),
        AggregationMode.MEDIAN.value,
        [str_to_felt("GEMINI"), str_to_felt("UNKNOWN")],
    ).call()
    assert result.result.price == 29920000000000
    assert result.result.last_updated_timestamp == 1650590986
    assert result.result.num_sources_aggregated == 1


@pytest.mark.asyncio
async def test_ignore_stale_entries(
    initialized_contracts, admin_signer, source, publisher, publisher_signer
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    second_publisher = str_to_felt("BAR")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_source_for_publisher",
        [second_publisher, source],
    )

    # Advance time by TIMESTAMP_BUFFER
    advance_time(admin_account.state.state, TIMESTAMP_BUFFER)

    second_entry = SpotEntry(
        pair_id=pair_id,
        price=5,
        timestamp=STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER,
        source=source,
        publisher=second_publisher,
    )

    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        second_entry.to_tuple(),
    )

    result = await oracle_proxy.get_spot(pair_id, AggregationMode.MEDIAN.value).call()
    assert result.result.price == second_entry.price
    assert result.result.last_updated_timestamp == second_entry.base.timestamp

    result = await oracle_proxy.get_spot_entries(pair_id).call()
    assert [r.price for r in result.result.entries] == [second_entry.price]
    assert [r.base.timestamp for r in result.result.entries] == [
        second_entry.base.timestamp
    ]


@pytest.mark.asyncio
async def test_checkpointing(
    initialized_contracts, admin_signer, source, publisher, publisher_signer
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    second_publisher_account = initialized_contracts["additional_publisher_accounts"][0]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_proxy = initialized_contracts["oracle_proxy"]

    second_publisher = str_to_felt("BAR")
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_source_for_publisher",
        [second_publisher, source],
    )

    pair_id = str_to_felt("ETH/USD")
    entry = SpotEntry(
        pair_id=pair_id,
        price=3,
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        entry.to_tuple(),
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "set_checkpoint",
        (pair_id, AggregationMode.MEDIAN.value),
    )

    result = await oracle_proxy.get_latest_checkpoint_index(pair_id).call()
    assert result.result.latest == 1

    result = await oracle_proxy.get_checkpoint(pair_id, 0).call()
    assert result.result.checkpoint.value == 3
    assert result.result.checkpoint.num_sources_aggregated == 1

    # Advance time by TIMESTAMP_BUFFER
    advance_time(admin_account.state.state, TIMESTAMP_BUFFER)

    second_entry = SpotEntry(
        pair_id=pair_id,
        price=5,
        timestamp=STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER,
        source=source,
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        second_entry.to_tuple(),
    )

    second_source = str_to_felt("1xdata")
    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_source_for_publisher",
        [second_publisher, second_source],
    )

    third_entry = SpotEntry(
        pair_id=pair_id,
        price=7,
        timestamp=STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER,
        source=second_source,
        publisher=second_publisher,
    )
    await publisher_signer.send_transaction(
        second_publisher_account,
        oracle_proxy.contract_address,
        "publish_spot_entry",
        third_entry.to_tuple(),
    )

    await publisher_signer.send_transaction(
        publisher_account,
        oracle_proxy.contract_address,
        "set_checkpoint",
        (pair_id, AggregationMode.MEDIAN.value),
    )

    result = await oracle_proxy.get_latest_checkpoint_index(pair_id).call()
    assert result.result.latest == 2

    result = await oracle_proxy.get_spot_entries(pair_id).call()

    result = await oracle_proxy.get_checkpoint(pair_id, 1).call()
    assert result.result.checkpoint.value == 6
    assert result.result.checkpoint.num_sources_aggregated == 2
