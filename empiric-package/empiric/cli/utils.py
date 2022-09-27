import asyncio
from functools import wraps

from empiric.cli.contracts.utils import *  # noqa: F401, F403


def coro(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        return asyncio.run(f(*args, **kwargs))

    return wrapper
