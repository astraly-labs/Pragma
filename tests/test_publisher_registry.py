import pytest
import pytest_asyncio
from pontis.core.utils import sign_publisher_registration, str_to_felt
from starkware.crypto.signature.signature import (
    get_random_private_key,
    private_to_stark_key,
    sign,
)
from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from utils import cached_contract, construct_path

CONTRACT_FILE = construct_path("contracts/publisher_registry/PublisherRegistry.cairo")
ACCOUNT_CONTRACT_FILE = construct_path("contracts/account/Account.cairo")


@pytest_asyncio.fixture(scope="module")
async def contract_defs():
    account_contract_def = compile_starknet_files(
        files=[ACCOUNT_CONTRACT_FILE], debug_info=True
    )
    contract_def = compile_starknet_files(files=[CONTRACT_FILE], debug_info=True)
    return account_contract_def, contract_def


@pytest_asyncio.fixture(scope="module")
async def contract_init(contract_defs, private_and_public_admin_keys):
    _, admin_public_key = private_and_public_admin_keys
    account_contract_def, contract_def = contract_defs
    starknet = await Starknet.empty()
    account_contract = await starknet.deploy(
        contract_def=account_contract_def, constructor_calldata=[admin_public_key]
    )
    second_account_contract = await starknet.deploy(
        contract_def=account_contract_def, constructor_calldata=[admin_public_key]
    )
    contract = await starknet.deploy(
        contract_def=contract_def,
        constructor_calldata=[account_contract.contract_address],
    )

    return starknet, account_contract, second_account_contract, contract


@pytest.fixture
def contracts(contract_defs, contract_init):
    account_contract_def, contract_def = contract_defs
    starknet, account_contract, second_account_contract, contract = contract_init
    _state = starknet.state.copy()
    account_contract = cached_contract(_state, account_contract_def, account_contract)
    second_account_contract = cached_contract(
        _state, account_contract_def, second_account_contract
    )
    contract = cached_contract(_state, contract_def, contract)
    return account_contract, second_account_contract, contract


@pytest_asyncio.fixture
async def registered_contracts(
    contracts,
    private_and_public_publisher_keys,
    signer,
    publisher,
):
    account_contract, second_account_contract, contract = contracts
    _, publisher_public_key = private_and_public_publisher_keys

    await signer.send_transaction(
        account_contract,
        contract.contract_address,
        "register_publisher",
        [publisher_public_key, publisher],
    )

    return account_contract, second_account_contract, contract


@pytest.mark.asyncio
async def test_deploy(contracts):
    return


@pytest.mark.asyncio
async def test_register_non_admin_fail(
    contracts,
    private_and_public_publisher_keys,
    signer,
    publisher,
):
    _, second_account_contract, contract = contracts
    _, publisher_public_key = private_and_public_publisher_keys

    try:
        await signer.send_transaction(
            second_account_contract,
            contract.contract_address,
            "register_publisher",
            [publisher_public_key, publisher],
        )

        raise Exception(
            "Transaction to register publisher with incorrect admin account succeeded, but should not have."
        )
    except StarkException:
        pass

    return


@pytest.mark.asyncio
async def test_register_publisher(
    registered_contracts, private_and_public_publisher_keys, publisher
):
    _, _, contract = registered_contracts
    _, publisher_public_key = private_and_public_publisher_keys
    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key
    return


@pytest.mark.asyncio
async def test_rotate_publisher_public_key(
    registered_contracts, private_and_public_publisher_keys, publisher
):
    _, _, contract = registered_contracts
    publisher_private_key, publisher_public_key = private_and_public_publisher_keys
    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key

    new_publisher_private_key = get_random_private_key()
    new_publisher_public_key = private_to_stark_key(new_publisher_private_key)

    new_publisher_signature_r, new_publisher_signature_s = sign(
        new_publisher_public_key, publisher_private_key
    )

    await contract.rotate_publisher_public_key(
        publisher,
        new_publisher_public_key,
        new_publisher_signature_r,
        new_publisher_signature_s,
    ).invoke()

    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == new_publisher_public_key

    return


@pytest.mark.asyncio
async def test_rotate_fails_for_unregistered_publisher(
    registered_contracts, private_and_public_publisher_keys, publisher
):
    _, _, contract = registered_contracts
    publisher_private_key, publisher_public_key = private_and_public_publisher_keys
    new_publisher_private_key = get_random_private_key()
    new_publisher_public_key = private_to_stark_key(new_publisher_private_key)

    new_publisher_signature_r, new_publisher_signature_s = sign(
        new_publisher_public_key, publisher_private_key
    )

    try:
        await contract.rotate_publisher_public_key(
            publisher,
            new_publisher_public_key + 1,
            new_publisher_signature_r,
            new_publisher_signature_s,
        ).invoke()

        raise Exception(
            "Transaction to rotate key for unregistered publisher succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key

    return


@pytest.mark.asyncio
async def test_register_second_publisher(
    registered_contracts,
    private_and_public_publisher_keys,
    signer,
    publisher,
):
    account_contract, _, contract = registered_contracts
    _, publisher_public_key = private_and_public_publisher_keys
    second_publisher_private_key = get_random_private_key()
    second_publisher_public_key = private_to_stark_key(second_publisher_private_key)

    second_publisher = str_to_felt("bar")

    await signer.send_transaction(
        account_contract,
        contract.contract_address,
        "register_publisher",
        [second_publisher_public_key, second_publisher],
    )

    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key

    result = await contract.get_publisher_public_key(second_publisher).invoke()
    assert result.result.publisher_public_key == second_publisher_public_key

    result = await contract.get_all_publishers().invoke()
    assert result.result.publishers == [publisher, second_publisher]

    return


@pytest.mark.asyncio
async def test_re_register_fail(
    registered_contracts,
    private_and_public_publisher_keys,
    signer,
    publisher,
):
    account_contract, _, contract = registered_contracts
    _, publisher_public_key = private_and_public_publisher_keys

    try:
        await signer.send_transaction(
            account_contract,
            contract.contract_address,
            "register_publisher",
            [publisher_public_key, publisher],
        )

        raise Exception(
            "Transaction to re-register publisher succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key
    return


@pytest.mark.asyncio
async def test_rotate_admin_address(
    contracts,
    private_and_public_publisher_keys,
    signer,
    publisher,
):
    account_contract, second_account_contract, contract = contracts
    _, publisher_public_key = private_and_public_publisher_keys

    await signer.send_transaction(
        account_contract,
        contract.contract_address,
        "set_admin_address",
        [second_account_contract.contract_address],
    )

    try:
        await signer.send_transaction(
            account_contract,
            contract.contract_address,
            "register_publisher_admin_address",
            [publisher_public_key, publisher],
        )

        raise Exception(
            "Transaction to register with old admin account succeeded, but should not have."
        )
    except StarkException:
        pass

    await signer.send_transaction(
        second_account_contract,
        contract.contract_address,
        "register_publisher",
        [publisher_public_key, publisher],
    )

    result = await contract.get_publisher_public_key(publisher).invoke()
    assert result.result.publisher_public_key == publisher_public_key
    return
