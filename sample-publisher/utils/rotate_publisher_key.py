import asyncio

from pontis.core.const import NETWORK, ORACLE_ADDRESS
from pontis.core.utils import str_to_felt
from starknet_py.contract import Contract
from starknet_py.net import Client
from starkware.crypto.signature.signature import private_to_stark_key, sign

publisher = "randomfeedooooor"
NEW_PUBLISHER_PUBLIC_KEY = (
    2572892080975153183919763551985742086696653280963444831903803487009075446703
)
OLD_PUBLISHER_PRIVATE_KEY = (
    2572892080975153183919763551985742086696653280963444831903803487009075446703
)
# Can alternatively provide their signatures of the new key and public key
# In this case, their public key had accidentally been registered as though it were their private key


OLD_PUBLISHER_PUBLIC_KEY = private_to_stark_key(OLD_PUBLISHER_PRIVATE_KEY)
MAX_FEE = 0


async def main():
    oracle_contract = await Contract.from_address(ORACLE_ADDRESS, Client(NETWORK))

    (signature_r, signature_s) = sign(
        NEW_PUBLISHER_PUBLIC_KEY, OLD_PUBLISHER_PRIVATE_KEY
    )

    result = await oracle_contract.functions["rotate_publisher_key"].invoke(
        str_to_felt(publisher),
        OLD_PUBLISHER_PUBLIC_KEY,
        NEW_PUBLISHER_PUBLIC_KEY,
        signature_r,
        signature_s,
        max_fee=MAX_FEE,
    )
    print(f"Rotated key for publisher with transaction {result}")


if __name__ == "__main__":

    asyncio.run(main())
