import asyncio
import os

from empiric.admin.client import EmpiricAdminClient

yield_curve_address = 0x06DC5481AAA92AC4C00E33465BB327814261C4B36322A6858C693F4E659962EC
new_oracle_controller_address = (
    0x012FADD18EC1A23A160CC46981400160FBF4A7A5EED156C4669E39807265BCD4
)


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_client = EmpiricAdminClient(
        admin_private_key,
    )
    result = await admin_client.send_transaction(
        yield_curve_address,
        "set_oracle_controller_address",
        [new_oracle_controller_address],
    )
    print(
        f"Updated oracle controller address to {new_oracle_controller_address} with tx: {result}"
    )


if __name__ == "__main__":
    asyncio.run(main())
