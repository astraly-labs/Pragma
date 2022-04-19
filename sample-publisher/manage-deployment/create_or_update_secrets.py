import json
import os

import boto3

if __name__ == "__main__":
    network = os.environ.get("NETWORK")
    AWS_SECRET_ARN = os.environ.get("AWS_SECRET_ARN")

    if network is None:
        raise Exception("Network not defined as env variable")

    secretsmanager_client = boto3.client("secretsmanager", region_name="us-east-2")

    with open("../all/.secrets.env", "r") as f:
        secrets = {}
        for line in f:
            if "=" in line:
                (name, value) = line.strip().split("=", 1)
                secrets[name] = value
        secret_master_name = f"pontis-{network}"
        update_kwargs = {
            "SecretString": str(json.dumps(secrets)),
        }
    get_kwargs = {"SecretId": AWS_SECRET_ARN}

    try:
        response = secretsmanager_client.get_secret_value(**get_kwargs)

        secretsmanager_client.put_secret_value(**{**update_kwargs, **get_kwargs})
        print("Updated secret %s.", secret_master_name)
    except secretsmanager_client.exceptions.ResourceNotFoundException:  # create secret
        set_kwargs = {**update_kwargs, "Name": secret_master_name}
        response = secretsmanager_client.create_secret(**set_kwargs)
        print("Created secret %s.", secret_master_name)
