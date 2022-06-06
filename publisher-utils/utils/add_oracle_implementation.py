import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(admin_private_key)
    await admin_client.add_oracle_implementation(
        0x00DFCF1028EAAD141E4F135019847AA3684918D639E8BCCF74C9E57851EC0C7D
    )


if __name__ == "__main__":
    asyncio.run(main())
