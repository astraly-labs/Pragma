import os

import pytest
import pytest_asyncio
from pontis.core.utils import sign_publisher, sign_publisher_registration, str_to_felt
from starkware.crypto.signature.signature import (
    get_random_private_key,
    private_to_stark_key,
    sign,
)
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException

# The path to the contract source code.
CONTRACT_FILE = os.path.join(os.path.dirname(__file__), "../contracts/Oracle.cairo")


@pytest_asyncio.fixture
async def contract(private_and_public_registration_keys):
    _, registration_public_key = private_and_public_registration_keys

    starknet = await Starknet.empty()
    contract = await starknet.deploy(
        source=CONTRACT_FILE, constructor_calldata=[registration_public_key]
    )

    return contract


@pytest_asyncio.fixture
async def registered_contract(
    contract,
    private_and_public_publisher_keys,
    private_and_public_registration_keys,
    publisher,
):
    _, publisher_public_key = private_and_public_publisher_keys

    registration_private_key, _ = private_and_public_registration_keys
    registration_signature_r, registration_signature_s = sign_publisher_registration(
        publisher_public_key, publisher, registration_private_key
    )

    await contract.register_publisher(
        publisher_public_key,
        publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    return contract


@pytest.mark.asyncio
async def test_deploy(contract):
    return


@pytest.mark.asyncio
async def test_register_bad_signature_fail(
    contract,
    private_and_public_publisher_keys,
    private_and_public_registration_keys,
    publisher,
):
    _, publisher_public_key = private_and_public_publisher_keys

    registration_private_key, _ = private_and_public_registration_keys
    registration_signature_r, registration_signature_s = sign_publisher_registration(
        publisher_public_key, publisher, registration_private_key + 1
    )

    try:
        await contract.register_publisher(
            publisher_public_key,
            publisher,
            registration_signature_r,
            registration_signature_s,
        ).invoke()

        raise Exception(
            "Transaction to register publisher without reigstration key succeeded, but should not have."
        )
    except StarkException:
        pass

    return


@pytest.mark.asyncio
async def test_register_empty_signature_fail(
    contract,
    private_and_public_publisher_keys,
    publisher,
):
    _, publisher_public_key = private_and_public_publisher_keys

    try:
        await contract.register_publisher(
            publisher_public_key,
            publisher,
            0,
            0,
        ).invoke()

        raise Exception(
            "Transaction to register publisher with empty registration signatures succeeded, but should not have."
        )
    except StarkException:
        pass

    return


@pytest.mark.asyncio
async def test_register_publisher(
    registered_contract, private_and_public_publisher_keys, publisher
):
    _, publisher_public_key = private_and_public_publisher_keys
    result = await registered_contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key
    return


@pytest.mark.asyncio
async def test_rotate_publisher_key(
    registered_contract, private_and_public_publisher_keys, publisher
):
    publisher_private_key, publisher_public_key = private_and_public_publisher_keys
    result = await registered_contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key

    new_publisher_private_key = get_random_private_key()
    new_publisher_public_key = private_to_stark_key(new_publisher_private_key)

    new_publisher_signature_r, new_publisher_signature_s = sign(
        new_publisher_public_key, publisher_private_key
    )

    await registered_contract.rotate_publisher_key(
        publisher,
        publisher_public_key,
        new_publisher_public_key,
        new_publisher_signature_r,
        new_publisher_signature_s,
    ).invoke()

    result = await registered_contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == new_publisher_public_key

    return


@pytest.mark.asyncio
async def test_rotate_fails_for_unregistered_publisher(
    registered_contract, private_and_public_publisher_keys, publisher
):
    publisher_private_key, publisher_public_key = private_and_public_publisher_keys
    new_publisher_private_key = get_random_private_key()
    new_publisher_public_key = private_to_stark_key(new_publisher_private_key)

    new_publisher_signature_r, new_publisher_signature_s = sign(
        new_publisher_public_key, publisher_private_key
    )

    try:
        await registered_contract.rotate_publisher_key(
            publisher,
            new_publisher_public_key,
            new_publisher_public_key,
            new_publisher_signature_r,
            new_publisher_signature_s,
        ).invoke()

        raise Exception(
            "Transaction to rotate key for unregistered publisher succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await registered_contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key

    return


@pytest.mark.asyncio
async def test_register_second_publisher(
    registered_contract,
    private_and_public_publisher_keys,
    private_and_public_registration_keys,
    publisher,
):
    _, publisher_public_key = private_and_public_publisher_keys
    second_publisher_private_key = get_random_private_key()
    second_publisher_public_key = private_to_stark_key(second_publisher_private_key)

    second_publisher = str_to_felt("bar")

    registration_private_key, _ = private_and_public_registration_keys
    registration_signature_r, registration_signature_s = sign_publisher_registration(
        second_publisher_public_key, second_publisher, registration_private_key
    )

    await registered_contract.register_publisher(
        second_publisher_public_key,
        second_publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    result = await registered_contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key

    result = await registered_contract.get_publisher_public_key(
        second_publisher
    ).invoke()
    assert result.result.publisher_public_key == second_publisher_public_key

    return


@pytest.mark.asyncio
async def test_re_register_fail(
    registered_contract,
    private_and_public_publisher_keys,
    private_and_public_registration_keys,
    publisher,
):
    _, publisher_public_key = private_and_public_publisher_keys

    registration_private_key, _ = private_and_public_registration_keys
    registration_signature_r, registration_signature_s = sign_publisher_registration(
        publisher_public_key, publisher, registration_private_key
    )
    try:
        await registered_contract.register_publisher(
            publisher_public_key,
            publisher,
            registration_signature_r,
            registration_signature_s,
        ).invoke()

        raise Exception(
            "Transaction to submit stale price succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await registered_contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key
    return


@pytest.mark.asyncio
async def test_rotate_registration_key(
    contract,
    private_and_public_publisher_keys,
    private_and_public_registration_keys,
    publisher,
):
    _, publisher_public_key = private_and_public_publisher_keys

    (
        old_registration_private_key,
        old_registration_public_key,
    ) = private_and_public_registration_keys
    (
        old_registration_signature_r,
        old_registration_signature_s,
    ) = sign_publisher_registration(
        publisher_public_key, publisher, old_registration_private_key
    )

    new_registration_private_key = get_random_private_key()
    new_registration_public_key = private_to_stark_key(new_registration_private_key)

    rotation_signature_r, rotation_signature_s = sign(
        new_registration_public_key, old_registration_private_key
    )

    await contract.rotate_publisher_registration_key(
        old_registration_public_key,
        new_registration_public_key,
        rotation_signature_r,
        rotation_signature_s,
    ).invoke()

    try:
        await contract.register_publisher(
            publisher_public_key,
            publisher,
            old_registration_signature_r,
            old_registration_signature_s,
        ).invoke()

        raise Exception(
            "Transaction to register with old registration key succeeded, but should not have."
        )
    except StarkException:
        pass

    registration_signature_r, registration_signature_s = sign_publisher_registration(
        publisher_public_key, publisher, new_registration_private_key
    )

    await contract.register_publisher(
        publisher_public_key,
        publisher,
        registration_signature_r,
        registration_signature_s,
    ).invoke()

    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key
    return
