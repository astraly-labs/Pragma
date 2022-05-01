import asyncio
import os

from pontis.admin.client import PontisAdminClient
from pontis.core.const import ORACLE_ADDRESS, PUBLISHER_REGISTRY_ADDRESS, NETWORK


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        ORACLE_ADDRESS, PUBLISHER_REGISTRY_ADDRESS, admin_private_key, network=NETWORK
    )
    await admin_client.add_oracle_implementation(
        252113243162723766795031183139956862350877741660668887061447484899318784639
    )


if __name__ == "__main__":
    asyncio.run(main())
