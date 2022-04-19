import json
import os

import boto3

if __name__ == "__main__":
    client = boto3.client("batch", region_name="us-east-2")

    compute_environment_name = "pontis_environment"
    compute_environment_config = {
        "computeEnvironmentName": compute_environment_name,
        "type": "MANAGED",
        "state": "ENABLED",
        "computeResources": {
            "type": "FARGATE_SPOT",
            "maxvCpus": 256,
            "subnets": [
                "subnet-090dbb90708b53f95",
                "subnet-06f3a12c301f538b2",
                "subnet-027bb159c74b3bb5f",
            ],
            "securityGroupIds": [
                "sg-049bf05c3d9a1dc78",
            ],
        },
        "tags": {"project": "pontis"},
    }
    try:
        response = client.create_compute_environment(**compute_environment_config)
        print("Created compute environment", response)
    except client.exceptions.ClientException:  # compute environment already exists
        pass

    compute_environment = client.describe_compute_environments(
        computeEnvironments=[compute_environment_name]
    )["computeEnvironments"][0]

    job_queue_name = "pontis_publish_queue"
    job_queue_config = {
        "jobQueueName": job_queue_name,
        "state": "ENABLED",
        "priority": 1,
        "computeEnvironmentOrder": [
            {
                "order": 100,
                "computeEnvironment": compute_environment["computeEnvironmentArn"],
            }
        ],
        "tags": {"project": "pontis"},
    }
    try:
        response = client.create_job_queue(**job_queue_config)

        print("Created job queue", response)
    except client.exceptions.ClientException:  # compute environment already exists
        pass

    job_queue = client.describe_job_queues(jobQueues=[job_queue_name])["jobQueues"][0]

    secretsmanager_client = boto3.client("secretsmanager", region_name="us-east-2")
    AWS_SECRET_ARN = os.environ.get("AWS_SECRET_ARN")
    secret = secretsmanager_client.get_secret_value(SecretId=AWS_SECRET_ARN)
    secret_arn = secret["ARN"]
    secrets = json.loads(secret["SecretString"])
    secretsArg = [
        {"name": secret_name, "valueFrom": f"{secret_arn}:{secret_name}"}
        for secret_name in secrets.keys()
    ]

    iam_client = boto3.client("iam")

    ecsTaskExecutionRole = iam_client.get_role(RoleName="ecsTaskExecutionRole")

    with open("../all/.env", "r") as f:
        env_vars = {}
        for line in f:
            if "=" in line:
                (name, value) = line.strip().split("=", 1)
                env_vars[name] = value

    job_definition_name = "pontis_publish_testnet_job_definition"
    response = client.register_job_definition(
        jobDefinitionName=job_definition_name,
        type="container",
        containerProperties={
            "image": "42labs/pontis-publisher:latest",
            "resourceRequirements": [
                {"value": "512", "type": "MEMORY"},
                {"value": "0.25", "type": "VCPU"},
            ],
            "executionRoleArn": ecsTaskExecutionRole["Role"]["Arn"],
            "environment": [
                {"name": name, "value": value} for name, value in env_vars.items()
            ],
            "secrets": secretsArg,
        },
        retryStrategy={
            "attempts": 3,
        },
        timeout={"attemptDurationSeconds": 180},
        tags={"project": "pontis"},
        platformCapabilities=["FARGATE"],
    )

    response = client.submit_job(
        jobDefinition=job_definition_name,
        jobName="pontis_publish_testnet",
        jobQueue=job_queue_name,
        tags={"project": "pontis"},
    )

    print(response)
