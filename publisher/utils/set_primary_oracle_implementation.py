import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    await admin_client.set_primary_oracle_implementation_address(
        0x02BD808487154776F5275DCDB506C9D55319778567D4460F0C0BBBF42F482370
    )


if __name__ == "__main__":
    asyncio.run(main())
