import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(admin_private_key)
    result = await admin_client.add_oracle_implementation(
        1756514290914178884475067584566382164070297082487069321591772071402623854458
    )

    print(f"Added oracle implementation with transaction {result}")


if __name__ == "__main__":
    asyncio.run(main())
