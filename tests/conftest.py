import asyncio

import pytest
from pontis.core.utils import str_to_felt
from starkware.crypto.signature.signature import (
    get_random_private_key,
    private_to_stark_key,
)
from utils import TestSigner


@pytest.fixture(scope="module")
def event_loop():
    return asyncio.new_event_loop()


@pytest.fixture(scope="module")
def private_and_public_publisher_keys():
    publisher_private_key = get_random_private_key()
    publisher_public_key = private_to_stark_key(publisher_private_key)
    return publisher_private_key, publisher_public_key


@pytest.fixture(scope="module")
def publisher():
    return str_to_felt("foo")


@pytest.fixture(scope="module")
def private_and_public_admin_keys():
    admin_private_key = get_random_private_key()
    admin_public_key = private_to_stark_key(admin_private_key)
    return admin_private_key, admin_public_key


@pytest.fixture(scope="module")
def admin_signer(private_and_public_admin_keys):
    admin_private_key, _ = private_and_public_admin_keys
    signer = TestSigner(admin_private_key)
    return signer


@pytest.fixture(scope="module")
def publisher_signer(private_and_public_publisher_keys):
    publisher_private_key, _ = private_and_public_publisher_keys
    signer = TestSigner(publisher_private_key)
    return signer
