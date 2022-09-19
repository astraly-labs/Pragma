# STAGECOACH

This is a collection of our automation tasks.  Most of the images use an AWS Lambda Docker image to allow for deploying on Lambda or locally invoking the functionality.  This allows for serverless scaling of our Monitors and Jobs.

The general structure is that there are two main types of "tasks" that can be done:

- Monitors: A task that watches for an event, and can trigger a Job
- Jobs: A task that executes a state change, and can trigger another Job or return a status
- Dags: The relationships between monitors and jobs

A theoretical example might be, a monitor might be the current balance in ETH of a publisher.  If the balance of the publisher goes below a certain value, the monitor will trigger a job to deposit more ETH to the contract address.  The "dags" directory will hold the configuration for these dependent calls.  This may rely on an intermediate language or step functions using the CDK.  Monitors can either be a long running process or a periodic trigger to wakeup and look for events.
