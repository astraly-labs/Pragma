import pytest
import pytest_asyncio
from constants import (
    ACCOUNT_CONTRACT_FILE,
    CAIRO_PATH,
    DEFAULT_DECIMALS,
    ORACLE_ABI,
    ORACLE_CONTRACT_FILE,
    PROXY_CONTRACT_FILE,
    PUBLISHER_REGISTRY_CONTRACT_FILE,
    YIELD_CURVE_CONTRACT_FILE,
)
from empiric.core.entry import Entry
from empiric.core.utils import str_to_felt
from starkware.starknet.business_logic.state.state_api_objects import BlockInfo
from starkware.starknet.compiler.compile import (
    compile_starknet_files,
    get_selector_from_name,
)
from starkware.starknet.testing.starknet import Starknet
from test_compute_engines.yield_curve import (
    calculate_future_spot_yield_point,
    calculate_on_yield_point,
)
from utils import cached_contract

STARKNET_STARTING_TIMESTAMP = 1650590820
ON_KEY = "AAVE-ON-BORROW"
FUTURES_SPOT = {
    "btc/usd": {
        "value": 100,
        "timestamp": STARKNET_STARTING_TIMESTAMP,
        "futures": {
            "btc/usd-20220624": {
                "timestamp": STARKNET_STARTING_TIMESTAMP,
                "expiry_timestamp": 1656039600,
                "value": 90,
            },  # backwardation, expect floor at 0
            "btc/usd-20220930": {
                "timestamp": STARKNET_STARTING_TIMESTAMP,
                "expiry_timestamp": 1664506800,
                "value": 110,
            },
            "btc/usd-20221230": {
                "timestamp": STARKNET_STARTING_TIMESTAMP - 20,
                "expiry_timestamp": 1672369200,
                "value": 110,
            },  # too much time between spot and futures (spot more recent); expect to ignore
            "btc/usd-20230330": {
                "timestamp": STARKNET_STARTING_TIMESTAMP + 20,
                "expiry_timestamp": 1680145200,
                "value": 110,
            },  # too much time between spot and futures (future more recent); expect to ignore
        },
    }
}


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
    yield_curve_class = compile_starknet_files(
        files=[YIELD_CURVE_CONTRACT_FILE],
        debug_info=True,
        disable_hint_validation=True,
        cairo_path=CAIRO_PATH,
    )
    return (
        account_class,
        publisher_registry_class,
        oracle_class,
        yield_curve_class,
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
        oracle_class,
        yield_curve_class,
    ) = contract_classes

    starknet = await Starknet.empty()
    starknet.state.state.block_info = BlockInfo.create_for_testing(
        starknet.state.state.block_info.block_number, STARKNET_STARTING_TIMESTAMP
    )
    admin_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[admin_public_key]
    )
    publisher_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[publisher_public_key]
    )
    publisher_registry = await starknet.deploy(
        contract_class=publisher_registry_class,
        constructor_calldata=[admin_account.contract_address],
    )
    declared_oracle_class = await starknet.declare(
        contract_class=oracle_class,
    )
    proxy_class = compile_starknet_files(
        files=[PROXY_CONTRACT_FILE],
        debug_info=True,
        cairo_path=CAIRO_PATH,
    )
    oracle_proxy = await starknet.deploy(
        contract_class=proxy_class,
        constructor_calldata=[
            declared_oracle_class.class_hash,
            get_selector_from_name("initializer"),
            25,
            admin_account.contract_address,
            publisher_registry.contract_address,
            3,
            str_to_felt("BTC"),
            18,
            1,
            0,
            0,
            str_to_felt("USD"),
            18,
            1,
            0,
            0,
            str_to_felt("AAVE-ON-BORROW"),
            18,
            1,
            0,
            0,
            2,
            str_to_felt("BTC/USD"),
            str_to_felt("BTC"),
            str_to_felt("USD"),
            str_to_felt(ON_KEY),
            str_to_felt("AAVE-ON-BORROW"),
            str_to_felt("USD"),
        ],
    )
    oracle = oracle_proxy.replace_abi(ORACLE_ABI)

    yield_curve = await starknet.deploy(
        contract_class=yield_curve_class,
        constructor_calldata=[
            admin_account.contract_address,
            oracle.contract_address,
        ],
    )

    return {
        "starknet": starknet,
        "admin_account": admin_account,
        "publisher_account": publisher_account,
        "publisher_registry": publisher_registry,
        "oracle": oracle,
        "yield_curve": yield_curve,
    }


@pytest.fixture
def contracts(contract_classes, contract_init):
    (
        account_class,
        publisher_registry_class,
        oracle_class,
        yield_curve_class,
    ) = contract_classes
    _state = contract_init["starknet"].state.copy()
    admin_account = cached_contract(
        _state, account_class, contract_init["admin_account"]
    )
    publisher_account = cached_contract(
        _state, account_class, contract_init["publisher_account"]
    )
    publisher_registry = cached_contract(
        _state, publisher_registry_class, contract_init["publisher_registry"]
    )
    oracle = cached_contract(_state, oracle_class, contract_init["oracle"])
    yield_curve = cached_contract(
        _state,
        yield_curve_class,
        contract_init["yield_curve"],
    )
    return {
        "starknet": contract_init["starknet"],
        "admin_account": admin_account,
        "publisher_account": publisher_account,
        "publisher_registry": publisher_registry,
        "oracle": oracle,
        "yield_curve": yield_curve,
    }


@pytest_asyncio.fixture
async def initialized_contracts(contracts, admin_signer, source, publisher):
    admin_account = contracts["admin_account"]
    publisher_account = contracts["publisher_account"]
    publisher_registry = contracts["publisher_registry"]
    yield_curve = contracts["yield_curve"]

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
        [publisher, str_to_felt("thegraph")],
    )

    await admin_signer.send_transaction(
        admin_account,
        yield_curve.contract_address,
        "add_on_key",
        [str_to_felt(ON_KEY), 1],
    )

    await admin_signer.send_transaction(
        admin_account,
        yield_curve.contract_address,
        "set_future_spot_empiric_source_key",
        [source],
    )

    for spot_key in FUTURES_SPOT.keys():
        await admin_signer.send_transaction(
            admin_account,
            yield_curve.contract_address,
            "add_spot_key",
            [str_to_felt(spot_key), 1],
        )

        futures = FUTURES_SPOT[spot_key]["futures"]
        for future_key, future_data in futures.items():
            await admin_signer.send_transaction(
                admin_account,
                yield_curve.contract_address,
                "add_future_key",
                [
                    str_to_felt(spot_key),
                    str_to_felt(future_key),
                    1,
                    future_data["expiry_timestamp"],
                ],
            )

    return contracts


@pytest.mark.asyncio
async def test_deploy(initialized_contracts):
    yield_curve = initialized_contracts["yield_curve"]

    on_keys = await yield_curve.get_on_keys().call()
    assert [str_to_felt(ON_KEY)] == on_keys.result.on_keys

    on_key_is_active = await yield_curve.get_on_key_is_active(
        str_to_felt(ON_KEY)
    ).call()
    assert on_key_is_active.result.on_key_is_active == 1

    for spot_key in FUTURES_SPOT.keys():
        spot_keys = await yield_curve.get_spot_keys().call()
        assert [str_to_felt(spot_key)] == spot_keys.result.spot_keys

        spot_key_is_active = await yield_curve.get_spot_key_is_active(
            str_to_felt(spot_key)
        ).call()
        assert spot_key_is_active.result.spot_key_is_active == 1

        future_keys = await yield_curve.get_future_keys(str_to_felt(spot_key)).call()
        assert [
            str_to_felt(k) for k in FUTURES_SPOT[spot_key]["futures"].keys()
        ] == future_keys.result.future_keys


@pytest.mark.asyncio
async def test_empty_yield_curve(initialized_contracts, publisher_signer, publisher):
    yield_curve = initialized_contracts["yield_curve"]

    # Call get_yield_curve and check result
    result = await yield_curve.get_yield_points(10).call()
    assert len(result.result.yield_points) == 0


@pytest.mark.asyncio
async def test_yield_curve(initialized_contracts, publisher_signer, source, publisher):
    publisher_account = initialized_contracts["publisher_account"]
    oracle = initialized_contracts["oracle"]
    yield_curve = initialized_contracts["yield_curve"]

    output_decimals = 10

    # Submit data (on, spot, futures)
    on_entry = Entry(
        pair_id=ON_KEY,
        value=1 * (10**15),  # 0.1% at 18 decimals (default),
        timestamp=STARKNET_STARTING_TIMESTAMP,
        source=str_to_felt("THEGRAPH"),
        publisher=publisher,
    )
    await publisher_signer.send_transaction(
        publisher_account,
        oracle.contract_address,
        "publish_spot_entry",
        on_entry.to_tuple(),
    )

    for spot_key in FUTURES_SPOT.keys():
        spot_entry = Entry(
            pair_id=spot_key,
            value=FUTURES_SPOT[spot_key]["value"],
            timestamp=FUTURES_SPOT[spot_key]["timestamp"],
            source=source,
            publisher=publisher,
        )
        await publisher_signer.send_transaction(
            publisher_account,
            oracle.contract_address,
            "publish_spot_entry",
            spot_entry.to_tuple(),
        )

        yield_points = [
            calculate_on_yield_point(
                on_entry.value, on_entry.timestamp, DEFAULT_DECIMALS, output_decimals
            ),
        ]

        futures = FUTURES_SPOT[spot_key]["futures"]
        for future_key, future_data in futures.items():
            future_entry = Entry(
                pair_id=future_key,
                value=future_data["value"],
                timestamp=future_data["timestamp"],
                source=source,
                publisher=publisher,
            )
            print("entry:", future_entry.source)
            await publisher_signer.send_transaction(
                publisher_account,
                oracle.contract_address,
                "publish_spot_entry",
                future_entry.to_tuple(),
            )
            future_spot_yield_point = calculate_future_spot_yield_point(
                future_entry.value,
                future_entry.timestamp,
                future_data["expiry_timestamp"],
                spot_entry.value,
                spot_entry.timestamp,
                DEFAULT_DECIMALS,
                DEFAULT_DECIMALS,
                output_decimals,
                current_timestamp=STARKNET_STARTING_TIMESTAMP,
            )
            print("future:", future_spot_yield_point and future_spot_yield_point.source)
            if future_spot_yield_point is not None:
                yield_points.append(future_spot_yield_point)

    # Call get_yield_curve and check result
    result = await yield_curve.get_yield_points(output_decimals).call()
    assert result.result.yield_points == yield_points
