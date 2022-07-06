import asyncio
import os

from pontis.admin.client import PontisAdminClient

publishers = ["pontis"]  # , "equilibrium", "cmt", "argent", "consensys"]
publisher_address = [int(os.environ.get("PUBLISHER_ADDRESS"))]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    for publisher, address in zip(publishers, publisher_address):
        await admin_client.register_publisher_if_not_registered(publisher, address)


if __name__ == "__main__":

    asyncio.run(main())
