import pytest
import pytest_asyncio
from constants import (
    ACCOUNT_CONTRACT_FILE,
    CAIRO_PATH,
    ORACLE_ABI,
    ORACLE_CONTRACT_FILE,
    PROXY_CONTRACT_FILE,
    PUBLISHER_REGISTRY_CONTRACT_FILE,
    SUMMARY_STATS_FILE,
)
from empiric.core.entry import Entry
from empiric.core.types import AggregationMode
from empiric.core.utils import str_to_felt
from starkware.starknet.business_logic.state.state_api_objects import BlockInfo
from starkware.starknet.compiler.compile import (
    compile_starknet_files,
    get_selector_from_name,
)
from starkware.starknet.testing.starknet import Starknet
from utils import advance_time, cached_contract, transform_calldata

TIMESTAMP_BUFFER = 60
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
    summary_stats_class = compile_starknet_files(
        files=[SUMMARY_STATS_FILE],
        debug_info=True,
        cairo_path=CAIRO_PATH,
    )

    return (
        account_class,
        publisher_registry_class,
        oracle_class,
        proxy_class,
        summary_stats_class,
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
        summary_stats_class,
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
                (
                    [
                        ("decimals-test", 100, 1, 0, 0),
                        ("eth", 18, 1, 0, 0),
                        ("btc", 18, 1, 0, 0),
                        ("usd", 18, 1, 0, 0),
                        ("doge", 18, 1, 0, 0),
                        ("luna", 18, 1, 0, 0),
                        ("sol", 18, 1, 0, 0),
                        ("shib", 18, 1, 0, 0),
                        ("avax", 18, 1, 0, 0),
                    ],
                    [
                        ("usd/decimals-test", "usd", "decimals-test"),
                        ("eth/usd", "eth", "usd"),
                        ("btc/usd", "btc", "usd"),
                        ("luna/usd", "luna", "usd"),
                        ("doge/usd", "doge", "usd"),
                        ("sol/usd", "sol", "usd"),
                        ("shib/usd", "shib", "usd"),
                        ("avax/usd", "avax", "usd"),
                    ],
                ),
            )
        ),
    )
    oracle_proxy = oracle_proxy.replace_abi(ORACLE_ABI)
    summary_stats = await starknet.deploy(
        contract_class=summary_stats_class,
        constructor_calldata=[oracle_proxy.contract_address],
    )

    return {
        "starknet": starknet,
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "additional_publisher_accounts": additional_publisher_accounts,
        "publisher_registry": publisher_registry,
        "oracle_proxy": oracle_proxy,
        "summary_stats": summary_stats,
    }


@pytest.fixture
def contracts(contract_classes, contract_init):
    (
        account_class,
        publisher_registry_class,
        oracle_class,
        proxy_class,
        summary_stats_class,
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
    summary_stats = cached_contract(
        _state, summary_stats_class, contract_init["summary_stats"]
    )
    return {
        "starknet": contract_init["starknet"],
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "additional_publisher_accounts": additional_publisher_accounts,
        "publisher_registry": publisher_registry,
        "oracle_proxy": oracle_proxy,
        "summary_stats": summary_stats,
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

    return contracts


@pytest.mark.asyncio
async def test_summary_stats(
    initialized_contracts, admin_signer, source, publisher, publisher_signer
):
    admin_account = initialized_contracts["admin_account"]
    publisher_account = initialized_contracts["publisher_account"]
    publisher_registry = initialized_contracts["publisher_registry"]
    oracle_proxy = initialized_contracts["oracle_proxy"]
    summary_stats = initialized_contracts["summary_stats"]
    pair_id = str_to_felt("ETH/USD")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "add_source_for_publisher",
        [publisher, source],
    )

    for i, val in enumerate(
        [19413, 10876, 13476, 10918, 16119, 14649, 14790, 13703, 14556, 12999]
    ):
        cur_time = STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER * i
        entry = Entry(
            pair_id=pair_id,
            price=val * 10**18,
            timestamp=cur_time,
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
        cp = await oracle_proxy.get_checkpoint(pair_id, result.result.latest - 1).call()

        # Advance time by TIMESTAMP_BUFFER
        advance_time(admin_account.state.state, TIMESTAMP_BUFFER)

    result = await oracle_proxy.get_latest_checkpoint_index(pair_id).call()

    sum_ = 0
    arr = []
    for idx in range(10):
        cp = await oracle_proxy.get_checkpoint(pair_id, idx).call()
        sum_ += cp.result.checkpoint.value
        arr.append((cp.result.checkpoint.timestamp, cp.result.checkpoint.value))

    res = await summary_stats.calculate_mean(
        pair_id,
        STARKNET_STARTING_TIMESTAMP,
        STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER * 9,
    ).call()
    assert res.result.mean_ == 14013273333333333309006

    res = await summary_stats.calculate_volatility(
        pair_id,
        STARKNET_STARTING_TIMESTAMP,
        STARKNET_STARTING_TIMESTAMP + TIMESTAMP_BUFFER * 9,
    ).call()
    assert res.result.volatility_ == 41261728712333544599900
