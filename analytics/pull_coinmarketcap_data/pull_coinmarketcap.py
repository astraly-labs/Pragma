import datetime
import os
import time

import pandas as pd
import requests


def main():
    print(f"Fetching Coinmarketcap data at time: {time.time()}")
    data_output_filename = "coinmarketcap_data.csv"

    COINMARKETCAP_KEY = os.environ.get("COINMARKETCAP_API_KEY")
    response = requests.get(
        "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
        headers={
            "X-CMC_PRO_API_KEY": COINMARKETCAP_KEY,
            "Accepts": "application/json",
        },
        params={"slug": "ethereum"},
    )
    result = {
        "value": response.json()["data"]["1027"]["quote"]["USD"]["price"],
        "timestamp": int(
            datetime.datetime.strptime(
                response.json()["data"]["1027"]["quote"]["USD"]["last_updated"],
                "%Y-%m-%dT%H:%M:%S.%f%z",
            ).timestamp()
        ),
    }

    df = pd.DataFrame(result, index=[0])
    if not os.path.isfile(data_output_filename):
        df.to_csv(data_output_filename)
    else:
        df.to_csv(data_output_filename, mode="a", header=False)


if __name__ == "__main__":
    while True:
        start_time = time.time()
        main()
        time.sleep(time.time() - start_time + 30)  # sleep for 30 seconds
