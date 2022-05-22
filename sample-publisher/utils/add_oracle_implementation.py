import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(admin_private_key)
    await admin_client.add_oracle_implementation(
        871842008053911172992316077911748525629328214355070533568737852246019303538
    )


if __name__ == "__main__":
    asyncio.run(main())
