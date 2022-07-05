import asyncio
import os

from pontis.admin.client import PontisAdminClient


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"))
    admin_client = PontisAdminClient(
        admin_private_key,
    )
    if os.environ.get("__PONTIS_STAGING_ENV__") == "TRUE":
        await admin_client.set_primary_oracle_implementation_address(
            0x019ba8db6b7749c359d9e0226723dcdf664aa7230e880d59166cbf649a518dd6
        )
    else:
        await admin_client.set_primary_oracle_implementation_address(
            0x05A88457F9292D0596090300713E80724631024E7A92989302D458271C98CAD4
        )


if __name__ == "__main__":
    asyncio.run(main())
