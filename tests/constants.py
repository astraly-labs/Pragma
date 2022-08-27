from utils import construct_path

AGGREGATION_MODE = 0
CAIRO_PATH = ["contracts/src"]
DEFAULT_DECIMALS = 18
ACCOUNT_CONTRACT_FILE = construct_path("contracts/src/account/Account.cairo")
CONTRACT_FILE = construct_path(
    "contracts/src/oracle_implementation/OracleImplementation.cairo"
)
PUBLISHER_REGISTRY_CONTRACT_FILE = construct_path(
    "contracts/src/publisher_registry/PublisherRegistry.cairo"
)
ORACLE_CONTROLLER_CONTRACT_FILE = construct_path(
    "contracts/src/oracle_controller/OracleController.cairo"
)
ORACLE_IMPLEMENTATION_CONTRACT_FILE = construct_path(
    "contracts/src/oracle_implementation/OracleImplementation.cairo"
)
YIELD_CURVE_CONTRACT_FILE = construct_path(
    "contracts/src/compute_engines/yield_curve/YieldCurve.cairo"
)
PROXY_CONTRACT_FILE = construct_path("contracts/src/proxy/Proxy.cairo")
