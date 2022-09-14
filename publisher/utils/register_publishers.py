import asyncio
import os

from empiric.core_.client import EmpiricClient

publishers = [
    "empiric",
    "argent",
    "cmt",
    "consensys",
    "equilibrium",
    "braavos",
    "openoracle2",
    "gemini",
]
publisher_address = [
    int(os.environ.get("PUBLISHER_ADDRESS"), 0),
    0x05BD6A92D27E52BF969002B72F263616103E03DA91E8C605AA842BB27C51516C,
    0x03851E76297E6D57C4FF049B502262663D37ABC373600EEBA4F0F6888D5D38AB,
    0x076317F7DDCC0B73FAC7BE8950514C0630E40665CF098488E243BDEDA3ABF4B9,
    0x0145A169E0AC417CB99AF4AA5CFAD2820B11D014A7DDB9FD23C6ACC356826EF0,
    0xE5CC6F2B6D34979184B88334EB64173FE4300CAB46ECD3229633FCC45C83D4,
    0x010660D8F0C7403D696E5B3FDCA2EF6630F9CD8102F9D3DD4CC65A82904AA8D7,
    0x06B5383D21E15A0291E84E8FD4B4FA54F5A087039AB0E0E85D563A0E851F8660,
]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_client = EmpiricClient(
        admin_private_key,
    )
    for publisher, address in zip(publishers, publisher_address):
        await admin_client.register_publisher_if_not_registered(publisher, address)


if __name__ == "__main__":

    asyncio.run(main())
