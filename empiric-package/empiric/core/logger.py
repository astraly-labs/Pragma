import logging

logger = logging.getLogger(__name__)


def get_stream_logger():
    import sys

    logger.setLevel(logging.DEBUG)
    streamHandler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    streamHandler.setFormatter(formatter)
    logger.addHandler(streamHandler)

    return logger
