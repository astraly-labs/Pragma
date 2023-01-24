import asyncio
import os

from empiric.core.client import EmpiricClient

publishers = ["EMPIRIC"]
publisher_address = [0x06F40A7CBA2E500321519ACC0E8C6554FC19DA93D7F46BC65637E9865752D4AE]
publisher_sources = [["CEX", "BITSTAMP", "COINBASE"]]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_contract_address = (
        0x029E7D00D0142EB684D6B010DDFE59348D892E5F8FF94F1B77CD372645DF4B77
    )
    admin_client = EmpiricClient(
        network="mainnet",
        account_private_key=admin_private_key,
        account_contract_address=admin_contract_address,
    )
    for publisher, address, sources in zip(
        publishers, publisher_address, publisher_sources
    ):
        result = await admin_client.add_publisher(
            publisher, address, max_fee=int(10e15)
        )
        print(hex(result.hash))

        await result.wait_for_acceptance()

        result = await admin_client.add_sources_for_publisher(publisher, sources)
        print(hex(result.hash))

        await result.wait_for_acceptance()


if __name__ == "__main__":
    asyncio.run(main())
