import json
import os.path

import pandas as pd
import requests
from empiric.core.utils import felt_to_str

JSON_FILE = "empiric-events.json"
CSV_FILE = "empiric-events.csv"


def get_events():
    """If no JSON file in current directory, requests all events from StarkNet Indexer."""
    if not os.path.isfile(JSON_FILE):
        chunk_size = 1_000_000
        print(
            f"Requesting all SubmittedSpotEntry events from StarkNet Indexer. Using chunks of size {chunk_size} This might take a while..."
        )
        url = "https://hasura.prod.summary.dev/v1/graphql"
        i = 0
        data = None
        while True:
            print(f"Fetching chunk {i+1}")
            # Note that the contract address can't have a leading 0 or the GraphQl query won't find the contract.
            request_json = {
                "query": "query empiric { starknet_goerli_event(limit: "
                + str(chunk_size)
                + ", offset: "
                + str(i * chunk_size)
                + ', order_by: {id: asc}, where: {name: {_eq: "SubmittedEntry"}, transmitter_contract: {_eq: "0x12fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4"}}) { name arguments { value } transaction_hash }}'
            }
            # TODO: Update contract address to Empiric 1.0 and change SubmittedEntry to SubmittedSpotEntry
            r = requests.post(url=url, json=request_json)
            if r.status_code != 200:
                raise Exception(
                    f"Query failed to run by returning code of {r.status_code}.\n{request_json}"
                )
            new_data = r.json()
            if "errors" in new_data:
                print(new_data)
                raise Exception("Error getting data from starknet indexer")
            elif data is None:
                data = new_data
            elif "data" in data and len(new_data["data"]["starknet_goerli_event"]) > 0:
                data["data"]["starknet_goerli_event"].extend(
                    new_data["data"]["starknet_goerli_event"]
                )
            else:
                break
            i += 1

        with open(JSON_FILE, "w") as data_file:
            json.dump(data, data_file)
    else:
        print(f"Reading in {JSON_FILE}...")
        with open(JSON_FILE) as data_file:
            data = json.load(data_file)
    return data


def format_events(data):
    """Returns a list of Events. Each event's fields are converted to ints."""
    events = data["data"]["starknet_goerli_event"]
    formatted_events = [
        {
            **event["arguments"][0]["value"],
            "transaction_hash": event["transaction_hash"],
        }
        for event in events
    ]
    return [
        {key: int(value, 16) for key, value in event.items()}
        for event in formatted_events
    ]


def to_csv(formatted_events):
    print(f"Converting to {CSV_FILE}...")
    df = pd.DataFrame(formatted_events)
    df["key"] = df["key"].apply(felt_to_str)
    df["value"] = df["value"] / (10**18)
    df["datetime"] = pd.to_datetime(df["timestamp"], unit="s")
    df["publisher"] = df["publisher"].apply(felt_to_str)
    df["source"] = df["source"].apply(felt_to_str)
    df.to_csv(CSV_FILE)
    print(f"Found {df.shape[0]} events.")


if __name__ == "__main__":
    events = get_events()
    formatted_events = format_events(events)
    to_csv(formatted_events)
