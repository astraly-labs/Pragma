import json

from utils import construct_path

AGGREGATION_MODE = 0
CAIRO_PATH = ["contracts/starknet/src", "contracts/starknet/lib"]
DEFAULT_DECIMALS = 18
ACCOUNT_CONTRACT_FILE = construct_path("contracts/starknet/src/account/Account.cairo")
ORACLE_CONTRACT_FILE = construct_path("contracts/starknet/src/oracle/Oracle.cairo")
PUBLISHER_REGISTRY_CONTRACT_FILE = construct_path(
    "contracts/starknet/src/publisher_registry/PublisherRegistry.cairo"
)
YIELD_CURVE_CONTRACT_FILE = construct_path(
    "contracts/starknet/src/compute_engines/yield_curve/YieldCurve.cairo"
)
PROXY_CONTRACT_FILE = construct_path("contracts/starknet/src/proxy/Proxy.cairo")
SUMMARY_STATS_FILE = construct_path(
    "contracts/starknet/src/compute_engines/summary_stats/SummaryStats.cairo"
)
ORACLE_ABI = json.load(open(construct_path("contracts/starknet/build/Oracle_abi.json")))
