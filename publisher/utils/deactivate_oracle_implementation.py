import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_client = PontisAdminClient(admin_private_key)
    await admin_client.update_oracle_implementation_active_status(
        2798922674947025525023815748744490191423741149769824865676652064363168685077, 0
    )


if __name__ == "__main__":
    asyncio.run(main())
