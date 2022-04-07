import os

from starknet_py.contract import Contract
from starknet_py.net import Client
from starkware.crypto.signature.signature import sign

from tests.utils import hash_entry, sign_publisher_registration

STARKNET_URL = f"https://{os.environ.get('STARKNET_NETWORK')}.starknet.io"
MAX_FEE = 0


async def register_publisher_if_not_registered(
    oracle_contract, publisher, publisher_private_key, publisher_public_key
):
    PUBLISHER_REGISTRATION_PRIVATE_KEY = os.environ.get(
        "PUBLISHER_REGISTRATION_PRIVATE_KEY"
    )
    result = await oracle_contract.functions["get_publisher_public_key"].call(publisher)

    if result.publisher_public_key == 0:
        signature_r, signature_s = sign(publisher, publisher_private_key)

        (
            registration_signature_r,
            registration_signature_s,
        ) = sign_publisher_registration(
            publisher_public_key, publisher, PUBLISHER_REGISTRATION_PRIVATE_KEY
        )

        result = await oracle_contract.functions["register_publisher"].invoke(
            publisher_public_key,
            publisher,
            signature_r,
            signature_s,
            registration_signature_r,
            registration_signature_s,
            max_fee=MAX_FEE,
        )
        print(f"Registered publisher with transaction {result}")


async def try_publish(publisher_entries):
    """
    publisher_entries is a list of publisher_entry elements.
    publisher_entry is a tuple of (entry, (publisher_private_key, publisher_public_key))
    """
    oracle_contract = await Contract.from_address(
        os.environ.get("ORACLE_ADDRESS"), Client("testnet")
    )

    for entry, (publisher_private_key, publisher_public_key) in publisher_entries:
        try:
            await register_publisher_if_not_registered(
                oracle_contract,
                entry.publisher,
                publisher_private_key,
                publisher_public_key,
            )

            signature_r, signature_s = sign(hash_entry(entry), publisher_private_key)
            result = await oracle_contract.functions["submit_entry"].invoke(
                entry._asdict(), signature_r, signature_s, max_fee=MAX_FEE
            )
            print(f"Updated price with transaction {result}")
        except Exception as e:
            print(f"Unable to update price for entry {entry}")
            print(e)
