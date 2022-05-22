import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(admin_private_key)
    await admin_client.add_oracle_implementation(
        1846413073285495567555818487162880181188584589644086414307299604548431720188
    )


if __name__ == "__main__":
    asyncio.run(main())
