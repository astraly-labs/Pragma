import os

from pragma.cli.randomness import handle_random


def handler(event, context):
    handle_random(int(os.environ.get("START_BLOCK", 0)), "/cli-config.ini")
    return {
        "success": True,
    }
