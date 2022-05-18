import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(admin_private_key)
    result = await admin_client.add_oracle_implementation(
        505099763246281825999240702363847539949296834022127438235264284507627799291
    )

    print(f"Added oracle implementation with transaction {result}")


if __name__ == "__main__":
    asyncio.run(main())
