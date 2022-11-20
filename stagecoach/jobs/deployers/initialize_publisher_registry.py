import asyncio
import os

from empiric.core.client import EmpiricClient

publishers = ["TESTING"]
publisher_address = [
    2278157096054152692718239532338288767241506746611749246706039626657362504243
]
publisher_sources = [["CEX", "BITSTAMP", "COINBASE"]]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_contract_address = (
        2144316864105448645362633189487810005691816773195985887895555201695170180022
    )
    admin_client = EmpiricClient(
        network="testnet2",
        account_private_key=admin_private_key,
        account_contract_address=admin_contract_address,
    )
    for publisher, address, sources in zip(
        publishers, publisher_address, publisher_sources
    ):
        result = await admin_client.add_publisher(
            publisher, address, max_fee=int(10e18)
        )
        print(hex(result.hash))

        # TODO: Create wait_for_accepted instead of wait_for_recevied
        # For now, manually check tx status and wait until continuing
        breakpoint()

        result = await admin_client.add_sources_for_publisher(publisher, sources)
        print(hex(result.hash))


if __name__ == "__main__":
    asyncio.run(main())
