import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(admin_private_key)
    if os.environ.get("__PONTIS_STAGING_ENV__") == "TRUE":
        await admin_client.add_oracle_implementation(
            0x052392D7B748DFBD81314FA41D6BBD6DD528D6C146BB6B212CCE72FB2B5D5801
        )
    else:
        await admin_client.add_oracle_implementation(
            0x02BD808487154776F5275DCDB506C9D55319778567D4460F0C0BBBF42F482370
        )


if __name__ == "__main__":
    asyncio.run(main())
