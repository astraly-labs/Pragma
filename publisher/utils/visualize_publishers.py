import asyncio
import time

import matplotlib.pyplot as plt
import pandas as pd
from empiric.core.client import EmpiricClient
from empiric.core.utils import currency_pair_to_key, felt_to_str


async def main(pair):
    key = currency_pair_to_key(*pair)

    client = EmpiricClient()
    decimals = await client.get_decimals(key)
    entries = []

    num_reps = 1  # 2 * 3  # Run for 3 hours
    for i in range(num_reps):
        print("awake - fetching")
        entries.extend(await client.get_entries(key))

        if i < num_reps - 1:
            print("sleeping")
            time.sleep(300)  # 5 minutes

    df = pd.DataFrame(entries)
    df["value"] = df["value"] / (10**decimals)
    df["datetime"] = pd.to_datetime(df["timestamp"], unit="s")
    df["publisher"] = df["publisher"].apply(felt_to_str)
    df["source"] = df["source"].apply(felt_to_str)

    fig, (ax1, ax2) = plt.subplots(2)
    fig.tight_layout(pad=4)

    for publisher in df["publisher"].unique():
        subset = df[df["publisher"] == publisher]
        ax1.scatter(subset["datetime"], subset["value"], label=publisher)
    ax1.legend(ncol=3, loc="upper center", bbox_to_anchor=(0.5, 1.2))

    for source in df["source"].unique():
        subset = df[df["source"] == source]
        ax2.scatter(subset["datetime"], subset["value"], label=source)
    ax2.legend(ncol=3, loc="upper center", bbox_to_anchor=(0.5, 1.4))

    df.to_csv("~/Desktop/oracle-data.csv")

    plt.show()


if __name__ == "__main__":
    pair = ("ETH", "USD")
    asyncio.run(main(pair))
