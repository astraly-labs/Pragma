import asyncio
import os

from pontis.core.const import NETWORK, ORACLE_ADDRESS
from pontis.core.utils import sign_publisher_registration, str_to_felt
from starknet_py.contract import Contract
from starknet_py.net import Client

publisher = "randomfeedooooor"
PUBLISHER_PUBLIC_KEY = (
    2572892080975153183919763551985742086696653280963444831903803487009075446703
)
signature_r, signature_s = (
    1676555359104446578041405206485849358179741683520023027596297932157252412632,
    3011007128242511895783810643932908825334906810673955305244088081042581133895,
)  # Need signature to ensure the integrity of their publisher ID


PUBLISHER_REGISTRATION_PRIVATE_KEY = int(
    os.environ.get("PUBLISHER_REGISTRATION_PRIVATE_KEY")
)
MAX_FEE = 0


async def main():
    oracle_contract = await Contract.from_address(ORACLE_ADDRESS, Client(NETWORK))

    (registration_signature_r, registration_signature_s) = sign_publisher_registration(
        PUBLISHER_PUBLIC_KEY,
        str_to_felt(publisher),
        PUBLISHER_REGISTRATION_PRIVATE_KEY,
    )

    result = await oracle_contract.functions["register_publisher"].invoke(
        PUBLISHER_PUBLIC_KEY,
        str_to_felt(publisher),
        signature_r,
        signature_s,
        registration_signature_r,
        registration_signature_s,
        max_fee=MAX_FEE,
    )
    print(f"Registered publisher with transaction {result}")


if __name__ == "__main__":

    asyncio.run(main())
