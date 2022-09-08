import os.path
import time

import pandas as pd
from starknet_py.contract import Contract
from starknet_py.net.gateway_client import GatewayClient


def main():
    print(f"Fetching Stork data at time: {time.time()}")
    data_output_filename = "stork_data.csv"
    CONTRACT_ADDRESS = (
        "0x0178a8866ef77a01df365b49d03fe46b8a90703e9fa1e10518277d12153b93d7"
    )
    ASSET = "ETH/USD"
    contract = Contract.from_address_sync(CONTRACT_ADDRESS, GatewayClient("testnet"))
    result = contract.functions["get_value"].call_sync(ASSET)

    df = pd.DataFrame(result)
    if not os.path.isfile(data_output_filename):
        df.to_csv(data_output_filename)
    else:
        df.to_csv(data_output_filename, mode="a", header=False)


if __name__ == "__main__":
    while True:
        start_time = time.time()
        main()
        time.sleep(
            time.time() - start_time + 179
        )  # sleep for 179 seconds, almost 3 minutes
