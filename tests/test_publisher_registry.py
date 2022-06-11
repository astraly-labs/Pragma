import pytest
import pytest_asyncio
from pontis.core.utils import str_to_felt
from starkware.starknet.compiler.compile import compile_starknet_files
from starkware.starknet.testing.starknet import Starknet
from starkware.starkware_utils.error_handling import StarkException
from utils import assert_event_emitted, cached_contract, construct_path

CONTRACT_FILE = construct_path("contracts/publisher_registry/PublisherRegistry.cairo")
ACCOUNT_CONTRACT_FILE = construct_path("contracts/account/Account.cairo")


@pytest_asyncio.fixture(scope="module")
async def contract_classes():
    account_class = compile_starknet_files(
        files=[ACCOUNT_CONTRACT_FILE], debug_info=True
    )
    publisher_registry_class = compile_starknet_files(
        files=[CONTRACT_FILE], debug_info=True
    )

    return account_class, publisher_registry_class


@pytest_asyncio.fixture(scope="module")
async def contract_init(
    contract_classes, private_and_public_admin_keys, private_and_public_publisher_keys
):
    _, admin_public_key = private_and_public_admin_keys
    _, publisher_public_key = private_and_public_publisher_keys
    account_class, publisher_registry_class = contract_classes
    starknet = await Starknet.empty()
    admin_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[admin_public_key]
    )
    second_admin_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[admin_public_key]
    )
    publisher_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[publisher_public_key]
    )
    second_publisher_account = await starknet.deploy(
        contract_class=account_class, constructor_calldata=[publisher_public_key]
    )
    publisher_registry = await starknet.deploy(
        contract_class=publisher_registry_class,
        constructor_calldata=[admin_account.contract_address],
    )

    return {
        "starknet": starknet,
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "second_publisher_account": second_publisher_account,
        "publisher_registry": publisher_registry,
    }


@pytest.fixture
def contracts(contract_classes, contract_init):
    account_class, publisher_registry_class = contract_classes
    _state = contract_init["starknet"].state.copy()
    admin_account = cached_contract(
        _state, account_class, contract_init["admin_account"]
    )
    second_admin_account = cached_contract(
        _state,
        account_class,
        contract_init["second_admin_account"],
    )
    publisher_account = cached_contract(
        _state, account_class, contract_init["publisher_account"]
    )
    second_publisher_account = cached_contract(
        _state, account_class, contract_init["second_publisher_account"]
    )
    publisher_registry = cached_contract(
        _state, publisher_registry_class, contract_init["publisher_registry"]
    )
    return {
        "starknet": contract_init["starknet"],
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": publisher_account,
        "second_publisher_account": second_publisher_account,
        "publisher_registry": publisher_registry,
    }


@pytest_asyncio.fixture
async def registered_contracts(
    contracts,
    admin_signer,
    publisher,
):
    admin_account = contracts["admin_account"]
    second_admin_account = contracts["second_admin_account"]
    publisher_account = contracts["publisher_account"]
    publisher_registry = contracts["publisher_registry"]

    tx_exec_info = await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [publisher, publisher_account.contract_address],
    )
    assert_event_emitted(
        tx_exec_info,
        publisher_registry.contract_address,
        "RegisteredPublisher",
        [publisher, publisher_account.contract_address],
    )

    return {
        "starknet": contracts["starknet"],
        "admin_account": admin_account,
        "second_admin_account": second_admin_account,
        "publisher_account": contracts["publisher_account"],
        "second_publisher_account": contracts["second_publisher_account"],
        "publisher_registry": publisher_registry,
    }


@pytest.mark.asyncio
async def test_deploy(contracts):
    return


@pytest.mark.asyncio
async def test_register_non_admin_fail(
    contracts,
    admin_signer,
    publisher,
):
    second_admin_account = contracts["second_admin_account"]
    publisher_account = contracts["publisher_account"]
    publisher_registry = contracts["publisher_registry"]

    try:
        await admin_signer.send_transaction(
            second_admin_account,
            publisher_registry.contract_address,
            "register_publisher",
            [publisher, publisher_account.contract_address],
        )

        raise Exception(
            "Transaction to register publisher with incorrect admin account succeeded, but should not have."
        )
    except StarkException:
        pass

    return


@pytest.mark.asyncio
async def test_register_publisher(registered_contracts, publisher):
    publisher_account = registered_contracts["publisher_account"]
    publisher_registry = registered_contracts["publisher_registry"]

    result = await publisher_registry.get_publisher_address(publisher).invoke()
    assert result.result.publisher_address == publisher_account.contract_address

    return


@pytest.mark.asyncio
async def test_update_publisher_address(
    registered_contracts, publisher, publisher_signer
):
    publisher_account = registered_contracts["publisher_account"]
    second_publisher_account = registered_contracts["second_publisher_account"]
    publisher_registry = registered_contracts["publisher_registry"]

    result = await publisher_registry.get_publisher_address(publisher).invoke()
    assert result.result.publisher_address == publisher_account.contract_address

    tx_exec_info = await publisher_signer.send_transaction(
        publisher_account,
        publisher_registry.contract_address,
        "update_publisher_address",
        [publisher, second_publisher_account.contract_address],
    )

    assert_event_emitted(
        tx_exec_info,
        publisher_registry.contract_address,
        "UpdatedPublisherAddress",
        [
            publisher,
            publisher_account.contract_address,
            second_publisher_account.contract_address,
        ],
    )

    result = await publisher_registry.get_publisher_address(publisher).invoke()
    assert result.result.publisher_address == second_publisher_account.contract_address

    return


@pytest.mark.asyncio
async def test_rotate_fails_for_unregistered_publisher(
    registered_contracts, publisher, publisher_signer
):
    publisher_account = registered_contracts["publisher_account"]
    second_publisher_account = registered_contracts["second_publisher_account"]
    publisher_registry = registered_contracts["publisher_registry"]

    try:
        await publisher_signer.send_transaction(
            second_publisher_account,
            publisher_registry.contract_address,
            "update_publisher_address",
            [publisher, second_publisher_account.contract_address],
        )

        raise Exception(
            "Transaction to rotate key for unregistered publisher succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await publisher_registry.get_publisher_address(publisher).invoke()
    assert result.result.publisher_address == publisher_account.contract_address

    return


@pytest.mark.asyncio
async def test_register_second_publisher(
    registered_contracts,
    admin_signer,
    publisher,
):
    admin_account = registered_contracts["admin_account"]
    publisher_account = registered_contracts["publisher_account"]
    second_publisher_account = registered_contracts["second_publisher_account"]
    publisher_registry = registered_contracts["publisher_registry"]

    second_publisher = str_to_felt("bar")

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [second_publisher, second_publisher_account.contract_address],
    )

    result = await publisher_registry.get_publisher_address(publisher).invoke()
    assert result.result.publisher_address == publisher_account.contract_address

    result = await publisher_registry.get_publisher_address(second_publisher).invoke()
    assert result.result.publisher_address == second_publisher_account.contract_address

    result = await publisher_registry.get_all_publishers().invoke()
    assert result.result.publishers == [publisher, second_publisher]

    return


@pytest.mark.asyncio
async def test_re_register_fail(
    registered_contracts,
    admin_signer,
    publisher,
):
    admin_account = registered_contracts["admin_account"]
    publisher_account = registered_contracts["publisher_account"]
    publisher_registry = registered_contracts["publisher_registry"]

    try:
        await admin_signer.send_transaction(
            admin_account,
            publisher_registry.contract_address,
            "register_publisher",
            [publisher, publisher_account.contract_address],
        )

        raise Exception(
            "Transaction to re-register publisher succeeded, but should not have."
        )
    except StarkException:
        pass

    result = await publisher_registry.get_publisher_address(publisher).invoke()
    assert result.result.publisher_address == publisher_account.contract_address
    return


@pytest.mark.asyncio
async def test_rotate_admin_address(
    contracts,
    admin_signer,
    publisher,
):
    admin_account = contracts["admin_account"]
    second_admin_account = contracts["second_admin_account"]
    publisher_account = contracts["publisher_account"]
    publisher_registry = contracts["publisher_registry"]

    await admin_signer.send_transaction(
        admin_account,
        publisher_registry.contract_address,
        "set_admin_address",
        [second_admin_account.contract_address],
    )

    try:
        await admin_signer.send_transaction(
            admin_account,
            publisher_registry.contract_address,
            "register_publisher_admin_address",
            [publisher],
        )

        raise Exception(
            "Transaction to register with old admin account succeeded, but should not have."
        )
    except StarkException:
        pass

    await admin_signer.send_transaction(
        second_admin_account,
        publisher_registry.contract_address,
        "register_publisher",
        [publisher, publisher_account.contract_address],
    )

    result = await publisher_registry.get_publisher_address(publisher).invoke()
    assert result.result.publisher_address == publisher_account.contract_address
    return
