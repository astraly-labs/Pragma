import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(admin_private_key)
    await admin_client.update_oracle_implementation_active_status(
        3564655954433514927229099908831749495753393972839674397797678872822274473132, 0
    )


if __name__ == "__main__":
    asyncio.run(main())
