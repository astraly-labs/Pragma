import logging

LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.DEBUG)

# defines the stream handler
_ch = logging.StreamHandler()  # creates the handler
_ch.setLevel(logging.INFO)  # sets the handler info

# adds the handler to the global variable: log
LOGGER.addHandler(_ch)
