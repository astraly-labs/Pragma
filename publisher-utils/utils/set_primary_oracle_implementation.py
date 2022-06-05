import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    await admin_client.set_primary_oracle_implementation_address(
        0x072FA0C2D3427353F372B94614F2ED5E9DA6EC358FD720CF7706BE0EE42A1449
    )


if __name__ == "__main__":
    asyncio.run(main())
