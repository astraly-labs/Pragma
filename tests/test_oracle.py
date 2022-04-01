import os
import pytest
from collections import namedtuple
import pytest_asyncio

from starkware.starknet.testing.starknet import Starknet
from utils import str_to_felt, sign_entry
from starkware.crypto.signature.signature import sign
from starkware.starkware_utils.error_handling import StarkException

# The path to the contract source code.
CONTRACT_FILE = os.path.join(os.path.dirname(__file__), "../contracts/oracle.cairo")

Entry = namedtuple("Entry", ["timestamp", "price", "asset", "publisher"])


@pytest_asyncio.fixture
async def contract():
    starknet = await Starknet.empty()
    contract = await starknet.deploy(
        source=CONTRACT_FILE,
    )

    return contract


@pytest_asyncio.fixture
async def publisher_signature(private_and_public_publisher_keys, publisher):
    private_key, _ = private_and_public_publisher_keys
    signature = sign(publisher, private_key)

    return signature


@pytest_asyncio.fixture
async def registered_contract(
    private_and_public_publisher_keys, publisher, publisher_signature
):
    _, publisher_key = private_and_public_publisher_keys
    publisher_signature_r, publisher_signature_s = publisher_signature
    starknet = await Starknet.empty()
    contract = await starknet.deploy(
        source=CONTRACT_FILE,
    )

    await contract.register_publisher(
        publisher_key, publisher, publisher_signature_r, publisher_signature_s
    ).invoke()

    return contract


@pytest.mark.asyncio
async def test_deploy(contract):
    return


@pytest.mark.asyncio
async def test_register_publisher(
    registered_contract, private_and_public_publisher_keys, publisher
):
    _, publisher_key = private_and_public_publisher_keys
    result = await registered_contract.get_publisher_key(publisher).invoke()
    assert result.result.publisher_key == publisher_key
    return


@pytest.mark.asyncio
async def test_publish(
    registered_contract, private_and_public_publisher_keys, publisher
):
    private_key, _ = private_and_public_publisher_keys
    entry = Entry(
        timestamp=1, price=2, asset=str_to_felt("BTCUSD"), publisher=publisher
    )

    signature_r, signature_s = sign_entry(entry, private_key)

    await registered_contract.update_price(entry, signature_r, signature_s).invoke()

    result = await registered_contract.get_price(entry.asset).invoke()
    assert result.result.entry == entry

    return


@pytest.mark.asyncio
async def test_republish(
    registered_contract, private_and_public_publisher_keys, publisher
):
    private_key, _ = private_and_public_publisher_keys
    asset = str_to_felt("BTCUSD")
    entry = Entry(timestamp=1, price=2, asset=asset, publisher=publisher)

    signature_r, signature_s = sign_entry(entry, private_key)

    await registered_contract.update_price(entry, signature_r, signature_s).invoke()

    result = await registered_contract.get_price(entry.asset).invoke()
    assert result.result.entry == entry

    second_entry = Entry(timestamp=2, price=3, asset=asset, publisher=publisher)

    signature_r, signature_s = sign_entry(second_entry, private_key)

    await registered_contract.update_price(
        second_entry, signature_r, signature_s
    ).invoke()

    result = await registered_contract.get_price(second_entry.asset).invoke()
    assert result.result.entry == second_entry

    return


@pytest.mark.asyncio
async def test_republish_stale(
    registered_contract, private_and_public_publisher_keys, publisher
):
    private_key, _ = private_and_public_publisher_keys
    asset = str_to_felt("BTCUSD")
    entry = Entry(timestamp=2, price=2, asset=asset, publisher=publisher)

    signature_r, signature_s = sign_entry(entry, private_key)

    await registered_contract.update_price(entry, signature_r, signature_s).invoke()

    result = await registered_contract.get_price(entry.asset).invoke()
    assert result.result.entry == entry

    second_entry = Entry(timestamp=1, price=3, asset=asset, publisher=publisher)

    signature_r, signature_s = sign_entry(second_entry, private_key)

    try:
        await registered_contract.update_price(
            second_entry, signature_r, signature_s
        ).invoke()

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await registered_contract.get_price(second_entry.asset).invoke()
    assert result.result.entry == entry

    return
