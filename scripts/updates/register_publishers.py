import asyncio
import os

from empiric.core.client import EmpiricClient
from empiric.core.utils import str_to_felt

network = os.environ.get("NETWORK")

"""
TESTNET
"""
if network == "testnet":
    publishers = [
        "TESTING",
        "EMPIRIC",
        "EQUILIBRIUM",
        "CMT",
        "ARGENT",
        "GEMINI",
        "JANESTREET",
        "KRAKEN",
    ]
    publishers_sources = [
        ["BITSTAMP", "CEX", "COINBASE", "FTX", "GEMINI", "THEGRAPH"],
        ["BITSTAMP", "CEX", "COINBASE", "FTX", "GEMINI", "THEGRAPH"],
        ["COINBASE", "BITSTAMP", "CEX", "FTX"],
        ["CMT"],
        ["COINBASE", "BITSTAMP", "CEX", "FTX", "THEGRAPH"],
        ["GEMINI"],
        ["JANESTREET"],
        ["KRAKEN"],
    ]
    publisher_address = [
        0x4E6C703382DB510C25AA0DB3F58C50F694C7D084B581F5B30765EEACE32870A,
        0x121108C052BBD5B273223043AD58A7E51C55EF454F3E02B0A0B4C559A925D4,
        0xCF357FA043A29F7EA06736CC253D8D6D8A208C03B92FFB4B50074F8470818B,
        0x2CC96E347C422C75A336A1594A93759456CA6405ADC21BAADED39A2FF93C97B,
        0x6BCDCF68F77A80571B55FC1651A26DC04939DFDD698485BE24FA5AC4DBF84B1,
        0x17A6F7E8196C9A7AFF90B7CC4BF98842894ECC2B9CC1A3703A1AAB948FCE208,
        0x7F2E12E33CB9BAF0FDD8407CD5117D3564D8F2CACFCC0A9B858726CBBE5BCAF,
        0x07EB9BE3E21951A85F04FF74F08B15FD052E3776CEA1F18E3B4A5375CE681E3D,
    ]
    admin_address = 0x21D6F33C00D3657D7EC6F9322399729AFDF21533B77CF0512AC583B4755F011

"""
TESTNET2
"""
if network == "testnet2":
    publishers = [
        "EMPIRIC",
        "TEST",
    ]
    publishers_sources = [
        ["BITSTAMP", "CEX", "COINBASE", "GEMINI", "THEGRAPH"],
        ["BITSTAMP", "CEX", "COINBASE", "GEMINI", "THEGRAPH"],
    ]
    publisher_address = [
        0x05B91611369AC8FF0DF129EA3A6874B063E5E4723E85A60F9F6F7477FFF439DD,
        0x029E7D00D0142EB684D6B010DDFE59348D892E5F8FF94F1B77CD372645DF4B77,
    ]
    admin_address = 0x5B91611369AC8FF0DF129EA3A6874B063E5E4723E85A60F9F6F7477FFF439DD

"""
TESTNET2
"""
if network == "mainnet":
    publishers = [
        "EQUILIBRIUM",
    ]
    publishers_sources = [
        ["BITSTAMP", "CEX", "COINBASE", "ASCENDEX", "DEFILLAMA", "KAIKO"],
    ]
    publisher_address = [
        0x057944658c24ba297a3a03bbd8d88320dd197cd0144b1e2cdbdbf1dfd179da5d,
    ]
    admin_address = 0x29e7d00d0142eb684d6b010ddfe59348d892e5f8ff94f1b77cd372645df4b77


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_client = EmpiricClient(
        network=network,
        account_private_key=admin_private_key,
        account_contract_address=admin_address,
    )
    for publisher, sources, address in zip(
        publishers, publishers_sources, publisher_address
    ):
        existing_address = await admin_client.get_publisher_address(publisher)
        if existing_address == 0:
            res = await admin_client.add_publisher(publisher, address)
            print(f"Registered new publisher {publisher} with tx {hex(res.hash)}")
        elif existing_address != address:
            print(
                f"Publisher {publisher} registered with address {hex(existing_address)} but config has address {hex(address)}. Exiting..."
            )
            return

        existing_sources = await admin_client.get_publisher_sources(publisher)
        new_sources = [x for x in sources if str_to_felt(x) not in existing_sources]
        if len(new_sources) > 0:
            res = await admin_client.add_sources_for_publisher(publisher, sources)
            print(
                f"Registered sources {new_sources} for publisher {publisher} with tx {hex(res.hash)}"
            )


if __name__ == "__main__":
    asyncio.run(main())
