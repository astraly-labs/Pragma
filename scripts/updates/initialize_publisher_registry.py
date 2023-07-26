import asyncio
import os

from empiric.core.client import EmpiricClient

NETWORK = "testnet"

publishers = ["SKYNET"]
publisher_address = [0x1d8e01188c4c8984fb19f00156491787e64fd2de1c3ce4eb9571924c540cf3b]
publisher_sources = [["SKYNET"]]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_contract_address = (
        # 0x029E7D00D0142EB684D6B010DDFE59348D892E5F8FF94F1B77CD372645DF4B77
        0x21D6F33C00D3657D7EC6F9322399729AFDF21533B77CF0512AC583B4755F011
    )
    admin_client = EmpiricClient(
        network=NETWORK,
        account_private_key=admin_private_key,
        account_contract_address=admin_contract_address,
    )
    for publisher, address, sources in zip(
        publishers, publisher_address, publisher_sources
    ):
        result = await admin_client.add_publisher(
            publisher, address, max_fee=int(1e16)
        )
        print(hex(result.hash))

        await result.wait_for_acceptance()

        result = await admin_client.add_sources_for_publisher(publisher, sources)
        print(hex(result.hash))

        await result.wait_for_acceptance()


if __name__ == "__main__":
    asyncio.run(main())
