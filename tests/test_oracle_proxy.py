import os
from statistics import median
from sys import implementation

import pytest
import pytest_asyncio
from pontis.core.entry import Entry
from pontis.core.utils import (
    admin_hash_and_sign_active_status_with_nonce,
    construct_entry,
    sign_entry,
    admin_hash_and_sign_with_nonce,
    sign_publisher_registration,
    str_to_felt,
)
from starkware.crypto.signature.signature import (
    get_random_private_key,
    private_to_stark_key,
)
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from starkware.starknet.compiler.compile import compile_starknet_files

from utils import cached_contract, construct_path

# The path to the contract source code.
PUBLISHER_REGISTRY_CONTRACT_FILE = construct_path(
    "contracts/publisher_registry/PublisherRegistry.cairo"
)
ORACLE_PROXY_CONTRACT_FILE = construct_path("contracts/oracle_proxy/OracleProxy.cairo")
ORACLE_IMPLEMENTATION_CONTRACT_FILE = construct_path(
    "contracts/oracle_implementation/OracleImplementation.cairo"
)
DECIMALS = 18


@pytest_asyncio.fixture(scope="module")
async def contract_defs():
    publisher_registry_def = compile_starknet_files(
        files=[PUBLISHER_REGISTRY_CONTRACT_FILE], debug_info=True
    )
    oracle_proxy_def = compile_starknet_files(
        files=[ORACLE_PROXY_CONTRACT_FILE], debug_info=True
    )
    oracle_implementation_def = compile_starknet_files(
        files=[ORACLE_IMPLEMENTATION_CONTRACT_FILE], debug_info=True
    )
    return publisher_registry_def, oracle_proxy_def, oracle_implementation_def


@pytest_asyncio.fixture(scope="module")
async def contract_init(contract_defs, private_and_public_admin_keys):
    _, admin_public_key = private_and_public_admin_keys
    publisher_registry_def, oracle_proxy_def, oracle_implementation_def = contract_defs

    starknet = await Starknet.empty()
    publisher_registry = await starknet.deploy(
        contract_def=publisher_registry_def, constructor_calldata=[admin_public_key]
    )
    oracle_proxy = await starknet.deploy(
        contract_def=oracle_proxy_def,
        constructor_calldata=[admin_public_key, publisher_registry.contract_address],
    )
    oracle_implementation = await starknet.deploy(
        contract_def=oracle_implementation_def,
        constructor_calldata=[oracle_proxy.contract_address],
    )
    second_oracle_implementation = await starknet.deploy(
        contract_def=oracle_implementation_def,
        constructor_calldata=[oracle_proxy.contract_address],
    )

    return (
        starknet.state,
        publisher_registry,
        oracle_proxy,
        oracle_implementation,
        second_oracle_implementation,
    )


@pytest.fixture
def contracts(contract_defs, contract_init):
    publisher_registry_def, oracle_proxy_def, oracle_implementation_def = contract_defs
    (
        state,
        publisher_registry,
        oracle_proxy,
        oracle_implementation,
        second_oracle_implementation,
    ) = contract_init
    _state = state.copy()
    publisher_registry = cached_contract(
        _state, publisher_registry_def, publisher_registry
    )
    oracle_proxy = cached_contract(_state, oracle_proxy_def, oracle_proxy)
    oracle_implementation = cached_contract(
        _state, oracle_implementation_def, oracle_implementation
    )
    second_oracle_implementation = cached_contract(
        _state, oracle_implementation_def, second_oracle_implementation
    )
    return (
        publisher_registry,
        oracle_proxy,
        oracle_implementation,
        second_oracle_implementation,
    )


@pytest_asyncio.fixture
async def initialized_contracts(
    contracts,
    private_and_public_publisher_keys,
    private_and_public_admin_keys,
    publisher,
):
    (
        publisher_registry,
        oracle_proxy,
        oracle_implementation,
        second_oracle_implementation,
    ) = contracts
    _, publisher_public_key = private_and_public_publisher_keys
    admin_private_key, _ = private_and_public_admin_keys

    # Register publisher
    registration_signature_r, registration_signature_s = sign_publisher_registration(
        publisher_public_key, publisher, admin_private_key
    )

    await publisher_registry.register_publisher(
        publisher_public_key,
        publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    # Add oracle implementation address to proxy
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(
        oracle_implementation.contract_address, nonce, admin_private_key
    )

    await oracle_proxy.add_oracle_implementation_address(
        oracle_implementation.contract_address,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    return (
        publisher_registry,
        oracle_proxy,
        oracle_implementation,
        second_oracle_implementation,
    )


@pytest.mark.asyncio
async def test_deploy(initialized_contracts):
    return


@pytest.mark.asyncio
async def test_get_decimals(initialized_contracts):
    _, oracle_proxy, _, _ = initialized_contracts
    result = await oracle_proxy.get_decimals().invoke()
    assert result.result.decimals == DECIMALS

    return


@pytest.mark.asyncio
async def test_oracle_implementation_addresses(
    initialized_contracts, private_and_public_admin_keys
):
    _, oracle_proxy, oracle_implementation, _ = initialized_contracts
    admin_private_key, _ = private_and_public_admin_keys
    result = await oracle_proxy.get_oracle_implementation_addresses().invoke()
    assert result.result.oracle_addresses == [oracle_implementation.contract_address]

    result = await oracle_proxy.get_primary_oracle_implementation_address().invoke()
    assert (
        result.result.primary_oracle_implementation_address
        == oracle_implementation.contract_address
    )

    # Add second oracle implementation address
    second_oracle_implementation_address = oracle_implementation.contract_address + 1

    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(
        second_oracle_implementation_address, nonce, admin_private_key
    )

    await oracle_proxy.add_oracle_implementation_address(
        second_oracle_implementation_address,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    result = await oracle_proxy.get_oracle_implementation_addresses().invoke()
    assert result.result.oracle_addresses == [
        oracle_implementation.contract_address,
        second_oracle_implementation_address,
    ]

    # Ensure that setting first (primary) implementation address to inactive fails
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_active_status_with_nonce(
        oracle_implementation.contract_address, 0, nonce, admin_private_key
    )

    try:
        await oracle_proxy.update_oracle_implementation_active_status(
            oracle_implementation.contract_address,
            0,
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
        ).invoke()

        raise Exception(
            "Transaction to set oracle implementation status as inactive on primary oracle implementation succeeded, but should not have."
        )
    except StarkException:
        pass

    # Set second oracle implementation to inactive
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_active_status_with_nonce(
        second_oracle_implementation_address, 0, nonce, admin_private_key
    )

    await oracle_proxy.update_oracle_implementation_active_status(
        second_oracle_implementation_address,
        0,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    # Try setting second oracle implementation to primary and fail
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(
        second_oracle_implementation_address, nonce, admin_private_key
    )

    try:
        await oracle_proxy.set_primary_oracle(
            second_oracle_implementation_address,
            oracle_implementation_address_signature_r,
            oracle_implementation_address_signature_s,
        ).invoke()

        raise Exception(
            "Transaction to set inactive oracle implementation as primary succeeded, but should not have."
        )
    except StarkException:
        pass

    # Set second oracle implementation back to active
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_active_status_with_nonce(
        second_oracle_implementation_address, 1, nonce, admin_private_key
    )

    await oracle_proxy.update_oracle_implementation_active_status(
        second_oracle_implementation_address,
        1,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    # Set second oracle implementation as primary
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(
        second_oracle_implementation_address, nonce, admin_private_key
    )

    await oracle_proxy.set_primary_oracle(
        second_oracle_implementation_address,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    result = await oracle_proxy.get_primary_oracle_implementation_address().invoke()
    assert (
        result.result.primary_oracle_implementation_address
        == second_oracle_implementation_address
    )

    return


@pytest.mark.asyncio
async def test_rotate_admin_public_key(
    initialized_contracts, private_and_public_admin_keys
):
    _, oracle_proxy, _, _ = initialized_contracts
    admin_private_key, admin_public_key = private_and_public_admin_keys

    result = await oracle_proxy.get_admin_public_key().invoke()
    assert result.result.admin_public_key == admin_public_key

    new_admin_private_key = get_random_private_key()
    new_admin_public_key = private_to_stark_key(new_admin_private_key)

    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(new_admin_public_key, nonce, admin_private_key)

    await oracle_proxy.rotate_admin_public_key(
        new_admin_public_key,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    result = await oracle_proxy.get_admin_public_key().invoke()
    assert result.result.admin_public_key == new_admin_public_key

    return


@pytest.mark.asyncio
async def test_update_publisher_registry_address(
    initialized_contracts, private_and_public_admin_keys
):
    publisher_registry, oracle_proxy, _, _ = initialized_contracts
    admin_private_key, _ = private_and_public_admin_keys
    result = await oracle_proxy.get_publisher_registry_address().invoke()
    assert (
        result.result.publisher_registry_address == publisher_registry.contract_address
    )

    new_publisher_registry_address = publisher_registry.contract_address + 1

    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(
        new_publisher_registry_address, nonce, admin_private_key
    )

    await oracle_proxy.update_publisher_registry_address(
        new_publisher_registry_address,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    result = await oracle_proxy.get_publisher_registry_address().invoke()
    assert result.result.publisher_registry_address == new_publisher_registry_address

    return


@pytest.mark.asyncio
async def test_publish(
    initialized_contracts, private_and_public_publisher_keys, publisher
):
    _, oracle_proxy, _, _ = initialized_contracts
    private_key, _ = private_and_public_publisher_keys
    entry = Entry(key=str_to_felt("eth/usd"), value=2, timestamp=1, publisher=publisher)

    signature_r, signature_s = sign_entry(entry, private_key)

    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_value(entry.key).invoke()
    assert result.result.value == entry.value
    assert result.result.last_updated_timestamp == entry.timestamp

    return


@pytest.mark.asyncio
async def test_republish(
    initialized_contracts, private_and_public_publisher_keys, publisher
):
    _, oracle_proxy, _, _ = initialized_contracts
    private_key, _ = private_and_public_publisher_keys
    key = str_to_felt("eth/usd")
    entry = Entry(key=key, value=2, timestamp=1, publisher=publisher)

    signature_r, signature_s = sign_entry(entry, private_key)

    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_value(entry.key).invoke()
    assert result.result.value == entry.value

    second_entry = entry = Entry(key=key, value=3, timestamp=2, publisher=publisher)

    signature_r, signature_s = sign_entry(second_entry, private_key)

    await oracle_proxy.submit_entry(second_entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_value(second_entry.key).invoke()
    assert result.result.value == second_entry.value

    return


@pytest.mark.asyncio
async def test_republish_stale(
    initialized_contracts, private_and_public_publisher_keys, publisher
):
    _, oracle_proxy, _, _ = initialized_contracts
    private_key, _ = private_and_public_publisher_keys
    key = str_to_felt("eth/usd")
    entry = Entry(key=key, value=2, timestamp=2, publisher=publisher)

    signature_r, signature_s = sign_entry(entry, private_key)

    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_value(entry.key).invoke()
    assert result.result.value == entry.value

    second_entry = Entry(key=key, value=3, timestamp=1, publisher=publisher)

    signature_r, signature_s = sign_entry(second_entry, private_key)

    try:
        await oracle_proxy.submit_entry(second_entry, signature_r, signature_s).invoke()

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    await oracle_proxy.submit_many_entries(
        [second_entry], [signature_r], [signature_s]
    ).invoke()  # should not fail and also not update state

    result = await oracle_proxy.get_value(key).invoke()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_publish_second_asset(
    initialized_contracts, private_and_public_publisher_keys, publisher
):
    _, oracle_proxy, _, _ = initialized_contracts
    private_key, _ = private_and_public_publisher_keys
    entry = Entry(key=str_to_felt("eth/usd"), value=2, timestamp=1, publisher=publisher)

    signature_r, signature_s = sign_entry(entry, private_key)

    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_value(entry.key).invoke()
    assert result.result.value == entry.value

    second_entry = Entry(
        key=str_to_felt("btc/usd"), value=2, timestamp=1, publisher=publisher
    )

    signature_r, signature_s = sign_entry(second_entry, private_key)

    await oracle_proxy.submit_entry(second_entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_value(second_entry.key).invoke()
    assert result.result.value == second_entry.value

    # Check that first asset is still stored accurately
    result = await oracle_proxy.get_value(entry.key).invoke()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_publish_second_publisher(
    initialized_contracts,
    private_and_public_publisher_keys,
    private_and_public_admin_keys,
    publisher,
):
    publisher_registry, oracle_proxy, _, _ = initialized_contracts
    key = str_to_felt("eth/usd")
    private_key, _ = private_and_public_publisher_keys
    entry = Entry(key=key, value=3, timestamp=1, publisher=publisher)
    signature_r, signature_s = sign_entry(entry, private_key)

    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    second_publisher_private_key = get_random_private_key()
    second_publisher_public_key = private_to_stark_key(second_publisher_private_key)

    second_publisher = str_to_felt("bar")
    admin_private_key, _ = private_and_public_admin_keys
    registration_signature_r, registration_signature_s = sign_publisher_registration(
        second_publisher_public_key, second_publisher, admin_private_key
    )

    await publisher_registry.register_publisher(
        second_publisher_public_key,
        second_publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    second_entry = Entry(key=key, value=5, timestamp=1, publisher=second_publisher)

    signature_r, signature_s = sign_entry(second_entry, second_publisher_private_key)

    await oracle_proxy.submit_entry(second_entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_value(key).invoke()
    assert result.result.value == (second_entry.value + entry.value) / 2
    assert result.result.last_updated_timestamp == max(
        second_entry.timestamp, entry.timestamp
    )

    result = await oracle_proxy.get_entries_for_key(key).invoke()
    assert result.result.entries == [entry, second_entry]

    return


async def register_new_publisher_and_submit_entry(
    publisher_registry, oracle_proxy, admin_private_key, publisher, entry
):
    publisher_private_key = get_random_private_key()
    publisher_public_key = private_to_stark_key(publisher_private_key)

    registration_signature_r, registration_signature_s = sign_publisher_registration(
        publisher_public_key, publisher, admin_private_key
    )

    await publisher_registry.register_publisher(
        publisher_public_key,
        publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    signature_r, signature_s = sign_entry(entry, publisher_private_key)

    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    return


@pytest.mark.asyncio
async def test_median_aggregation(
    initialized_contracts,
    private_and_public_publisher_keys,
    private_and_public_admin_keys,
    publisher,
):
    publisher_registry, oracle_proxy, _, _ = initialized_contracts
    key = str_to_felt("eth/usd")
    prices = [1, 3, 10, 5, 12, 2]
    publishers = ["foo", "bar", "baz", "oof", "rab", "zab"]
    private_key, _ = private_and_public_publisher_keys
    entry = Entry(key=key, value=prices[0], timestamp=1, publisher=publisher)
    signature_r, signature_s = sign_entry(entry, private_key)

    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    entries = [entry]

    admin_private_key, _ = private_and_public_admin_keys

    for price, additional_publisher_str in zip(prices[1:], publishers[1:]):
        additional_publisher = str_to_felt(additional_publisher_str)
        additional_entry = Entry(
            key=key, value=price, timestamp=1, publisher=additional_publisher
        )
        entries.append(additional_entry)
        await register_new_publisher_and_submit_entry(
            publisher_registry,
            oracle_proxy,
            admin_private_key,
            additional_publisher,
            additional_entry,
        )

        result = await oracle_proxy.get_entries_for_key(key).invoke()
        assert result.result.entries == entries

        result = await oracle_proxy.get_value(key).invoke()
        assert result.result.value == int(median(prices[: len(entries)]))

        print(f"Succeeded for {len(entries)} entries")

    return


@pytest.mark.asyncio
async def test_submit_many(
    initialized_contracts,
    private_and_public_publisher_keys,
    private_and_public_admin_keys,
    publisher,
):
    publisher_registry, oracle_proxy, _, _ = initialized_contracts
    key = str_to_felt("eth/usd")
    prices = [1, 3, 10, 5, 12, 2]
    publishers = ["foo", "bar", "baz", "oof", "rab", "zab"]
    private_key, _ = private_and_public_publisher_keys
    entries = [Entry(key=key, value=prices[0], timestamp=1, publisher=publisher)]
    signature_r, signature_s = sign_entry(entries[0], private_key)
    signatures_r = [signature_r]
    signatures_s = [signature_s]

    admin_private_key, _ = private_and_public_admin_keys

    for price, additional_publisher_str in zip(prices[1:], publishers[1:]):
        additional_publisher = str_to_felt(additional_publisher_str)

        publisher_private_key = get_random_private_key()
        publisher_public_key = private_to_stark_key(publisher_private_key)

        (
            registration_signature_r,
            registration_signature_s,
        ) = sign_publisher_registration(
            publisher_public_key, additional_publisher, admin_private_key
        )

        await publisher_registry.register_publisher(
            publisher_public_key,
            additional_publisher,
            registration_signature_r,
            registration_signature_s,
        ).invoke()

        additional_entry = Entry(
            key=key, value=price, timestamp=1, publisher=additional_publisher
        )
        entries.append(additional_entry)
        signature_r, signature_s = sign_entry(additional_entry, publisher_private_key)
        signatures_r.append(signature_r)
        signatures_s.append(signature_s)

    await oracle_proxy.submit_many_entries(entries, signatures_r, signatures_s).invoke()

    result = await oracle_proxy.get_entries_for_key(key).invoke()
    assert result.result.entries == entries

    result = await oracle_proxy.get_value(key).invoke()
    assert result.result.value == int(median(prices[: len(entries)]))

    print(f"Succeeded batch updating for {len(entries)} entries")

    return


@pytest.mark.asyncio
async def test_subset_publishers(
    initialized_contracts,
    private_and_public_publisher_keys,
    private_and_public_admin_keys,
    publisher,
):
    publisher_registry, oracle_proxy, _, _ = initialized_contracts
    key = str_to_felt("luna/usd")
    private_key, _ = private_and_public_publisher_keys
    entry = Entry(key=key, value=1, timestamp=1, publisher=publisher)
    signature_r, signature_s = sign_entry(entry, private_key)
    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    admin_private_key, _ = private_and_public_admin_keys

    additional_publisher = str_to_felt("bar")

    publisher_private_key = get_random_private_key()
    publisher_public_key = private_to_stark_key(publisher_private_key)

    (registration_signature_r, registration_signature_s,) = sign_publisher_registration(
        publisher_public_key, additional_publisher, admin_private_key
    )

    await publisher_registry.register_publisher(
        publisher_public_key,
        additional_publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    result = await oracle_proxy.get_entries_for_key(key).invoke()
    assert result.result.entries == [entry]

    result = await oracle_proxy.get_value(key).invoke()
    assert result.result.value == entry.value

    return


@pytest.mark.asyncio
async def test_unknown_key(initialized_contracts):
    _, oracle_proxy, _, _ = initialized_contracts

    unknown_key = str_to_felt("answertolife")
    result = await oracle_proxy.get_entries_for_key(unknown_key).invoke()
    assert len(result.result.entries) == 0

    result = await oracle_proxy.get_value(unknown_key).invoke()
    assert result.result.value == 0
    assert result.result.last_updated_timestamp == 0


@pytest.mark.asyncio
async def test_real_data(initialized_contracts, private_and_public_admin_keys):
    publisher_registry, oracle_proxy, _, _ = initialized_contracts
    admin_private_key, _ = private_and_public_admin_keys
    entries = [
        construct_entry("eth/usd", 29898560234403, 1650590880, "coinmarketcap"),
        construct_entry("btc/usd", 404308601528970, 1650590880, "coinmarketcap"),
        construct_entry("luna/usd", 922793061826, 1650590880, "coinmarketcap"),
        construct_entry("sol/usd", 1023379113474, 1650590880, "coinmarketcap"),
        construct_entry("avax/usd", 759878999010, 1650590880, "coinmarketcap"),
        construct_entry("doge/usd", 1365470994, 1650590880, "coinmarketcap"),
        construct_entry("shib/usd", 244844, 1650590880, "coinmarketcap"),
        construct_entry("eth/usd", 29902600000000, 1650590935, "coingecko"),
        construct_entry("btc/usd", 404070000000000, 1650590889, "coingecko"),
        construct_entry("luna/usd", 922099999999, 1650590883, "coingecko"),
        construct_entry("sol/usd", 1023600000000, 1650590886, "coingecko"),
        construct_entry("avax/usd", 759800000000, 1650590853, "coingecko"),
        construct_entry("doge/usd", 1365780000, 1650590845, "coingecko"),
        construct_entry("shib/usd", 245100, 1650590865, "coingecko"),
        construct_entry("eth/usd", 29924650000000, 1650590820, "coinbase"),
        construct_entry("btc/usd", 404057899999999, 1650590820, "coinbase"),
        construct_entry("eth/usd", 29920000000000, 1650590986, "gemini"),
        construct_entry("btc/usd", 404047800000000, 1650590986, "gemini"),
        construct_entry("luna/usd", 924700000000, 1650590986, "gemini"),
        construct_entry("sol/usd", 1023610000000, 1650590986, "gemini"),
        construct_entry("doge/usd", 1364400000, 1650590986, "gemini"),
        construct_entry("shib/usd", 245270, 1650590986, "gemini"),
    ]
    publishers_str = ["coinmarketcap", "coingecko", "coinbase", "gemini"]
    publishers = [str_to_felt(p) for p in publishers_str]
    publisher_keys = {}
    for publisher in publishers:
        publisher_private_key = get_random_private_key()
        publisher_public_key = private_to_stark_key(publisher_private_key)

        (
            registration_signature_r,
            registration_signature_s,
        ) = sign_publisher_registration(
            publisher_public_key, publisher, admin_private_key
        )

        await publisher_registry.register_publisher(
            publisher_public_key,
            publisher,
            registration_signature_r,
            registration_signature_s,
        ).invoke()

        publisher_keys[publisher] = publisher_private_key

    signatures = [
        sign_entry(entry, publisher_keys[entry.publisher]) for entry in entries
    ]
    signatures_r = [s[0] for s in signatures]
    signatures_s = [s[1] for s in signatures]

    await oracle_proxy.submit_many_entries(entries, signatures_r, signatures_s).invoke()

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
        result = await oracle_proxy.get_value(str_to_felt(key)).invoke()
        assert result.result.value != 0
        assert result.result.last_updated_timestamp != 0


@pytest.mark.asyncio
async def test_multiple_oracle_implementations(
    initialized_contracts,
    private_and_public_admin_keys,
    private_and_public_publisher_keys,
    publisher,
):
    (
        publisher_registry,
        oracle_proxy,
        _,
        second_oracle_implementation,
    ) = initialized_contracts
    admin_private_key, _ = private_and_public_admin_keys

    # Submit entry
    key = str_to_felt("eth/usd")
    publisher_private_key, _ = private_and_public_publisher_keys
    entry = Entry(key=key, value=1, timestamp=1, publisher=publisher)
    signature_r, signature_s = sign_entry(entry, publisher_private_key)
    await oracle_proxy.submit_entry(entry, signature_r, signature_s).invoke()

    result = await oracle_proxy.get_entries_for_key(key).invoke()
    assert result.result.entries == [entry]

    result = await oracle_proxy.get_value(key).invoke()
    assert result.result.value == entry.value

    # Add second oracle implementation address to proxy
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(
        second_oracle_implementation.contract_address, nonce, admin_private_key
    )

    await oracle_proxy.add_oracle_implementation_address(
        second_oracle_implementation.contract_address,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    # Submit second entry from second publisher
    admin_private_key, _ = private_and_public_admin_keys
    second_publisher = str_to_felt("bar")
    second_publisher_private_key = get_random_private_key()
    second_publisher_public_key = private_to_stark_key(second_publisher_private_key)

    (registration_signature_r, registration_signature_s,) = sign_publisher_registration(
        second_publisher_public_key, second_publisher, admin_private_key
    )

    await publisher_registry.register_publisher(
        second_publisher_public_key,
        second_publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    second_entry = Entry(key=key, value=3, timestamp=1, publisher=second_publisher)
    signature_r, signature_s = sign_entry(second_entry, second_publisher_private_key)
    await oracle_proxy.submit_entry(second_entry, signature_r, signature_s).invoke()

    # Verify that we can get both entries from the first oracle implementation
    result = await oracle_proxy.get_entries_for_key(key).invoke()
    assert result.result.entries == [entry, second_entry]

    result = await oracle_proxy.get_value(key).invoke()
    assert result.result.value == (entry.value + second_entry.value) / 2

    # Verify that only the second entry is present in the second oracle implementation
    result = await oracle_proxy.get_nonce().invoke()
    nonce = result.result.nonce

    (
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ) = admin_hash_and_sign_with_nonce(
        second_oracle_implementation.contract_address, nonce, admin_private_key
    )

    await oracle_proxy.set_primary_oracle(
        second_oracle_implementation.contract_address,
        oracle_implementation_address_signature_r,
        oracle_implementation_address_signature_s,
    ).invoke()

    result = await oracle_proxy.get_primary_oracle_implementation_address().invoke()
    assert (
        result.result.primary_oracle_implementation_address
        == second_oracle_implementation.contract_address
    )

    result = await oracle_proxy.get_entries_for_key(key).invoke()
    assert result.result.entries == [second_entry]

    result = await oracle_proxy.get_value(key).invoke()
    assert result.result.value == second_entry.value

    return
