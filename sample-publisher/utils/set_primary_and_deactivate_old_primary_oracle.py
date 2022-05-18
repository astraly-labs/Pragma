import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    old_primary_oracle_implementation_address = (
        await admin_client.get_primary_oracle_implementation_address()
    )
    await admin_client.set_primary_oracle(
        1756514290914178884475067584566382164070297082487069321591772071402623854458
    )
    await admin_client.update_oracle_implementation_active_status(
        old_primary_oracle_implementation_address, 1
    )


if __name__ == "__main__":
    asyncio.run(main())
