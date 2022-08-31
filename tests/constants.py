import json

from utils import construct_path

AGGREGATION_MODE = 0
CAIRO_PATH = ["contracts/src"]
DEFAULT_DECIMALS = 18
ACCOUNT_CONTRACT_FILE = construct_path("contracts/src/account/Account.cairo")
ORACLE_CONTRACT_FILE = construct_path("contracts/src/oracle/Oracle.cairo")
PUBLISHER_REGISTRY_CONTRACT_FILE = construct_path(
    "contracts/src/publisher_registry/PublisherRegistry.cairo"
)
YIELD_CURVE_CONTRACT_FILE = construct_path(
    "contracts/src/compute_engines/yield_curve/YieldCurve.cairo"
)
PROXY_CONTRACT_FILE = construct_path("contracts/src/proxy/Proxy.cairo")
ORACLE_ABI = json.load(open(construct_path("contracts/build/Oracle_abi.json")))
