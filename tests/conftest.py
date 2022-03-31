import pytest

from starkware.crypto.signature.signature import (
    get_random_private_key,
    private_to_stark_key,
)
from utils import str_to_felt


@pytest.fixture
def private_and_public_publisher_keys():
    private_key = get_random_private_key()
    publisher_key = private_to_stark_key(private_key)
    return private_key, publisher_key


@pytest.fixture
def publisher():
    return str_to_felt("foo")
