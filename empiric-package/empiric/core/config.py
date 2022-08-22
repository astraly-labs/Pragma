import logging
import os

from empiric.core.types import (
    INTEGRATION,
    MAINNET,
    STAGING,
    TESTNET,
    AggregationMode,
    Network,
)
from starknet_py.net.models import StarknetChainId
from typing_extensions import Protocol

logger = logging.getLogger(__name__)


# TODO (rlkelly): We need a consistent way to implement interfaces.  This seems to be the preferred method
class IConfig(Protocol):
    ADMIN_ADDRESS: int
    DEFAULT_AGGREGATION_MODE: int
    NETWORK: Network
    CHAIN_ID: int
    PUBLISHER_REGISTRY_ADDRESS: int
    ORACLE_CONTROLLER_ADDRESS: int
    GATEWAY_URL: str


class BaseConfig(IConfig):
    ADMIN_ADDRESS = 0x0704CC0F2749637A0345D108AC9CD597BB33CCF7F477978D52E236830812CD98
    DEFAULT_AGGREGATION_MODE = AggregationMode.MEDIAN.value
    # this indicates that the integration network uses goerli
    CHAIN_ID = StarknetChainId.TESTNET


class TestnetConfig(BaseConfig):
    NETWORK = TESTNET
    GATEWAY_URL = "https://alpha4.starknet.io"
    ORACLE_CONTROLLER_ADDRESS = (
        0x012FADD18EC1A23A160CC46981400160FBF4A7A5EED156C4669E39807265BCD4
    )
    PUBLISHER_REGISTRY_ADDRESS = (
        0x0743E8140A56D5EE9ED08EB77A92BCBCF8257DA34AB2A2EE93110709E61AB11A
    )


class IntegrationNetworkConfig(BaseConfig):
    NETWORK = INTEGRATION
    GATEWAY_URL = "https://external.integration.starknet.io"
    ADMIN_ADDRESS = 0x02D64A536926A2B88CAD32D6D55936F04B34A8D93231C1010D78C1B6745751C0
    ORACLE_CONTROLLER_ADDRESS = (
        0x072D2CD06603E0C957F54A4A1909745939FCFD597EA22323672A6EACBF27D02A
    )
    PUBLISHER_REGISTRY_ADDRESS = (
        0x062F25D256931E058906542CEE48D645996F0D84C98940AE7D2BD6B68ECC2925
    )


class StagingConfig(BaseConfig):
    NETWORK = TESTNET
    GATEWAY_URL = "https://alpha4.starknet.io"
    ORACLE_CONTROLLER_ADDRESS = (
        0x00225A37DE623DBD4D2287DDED4E0CB0EB4A5D7D9051D0E89A1321D4BCF9FDB2
    )
    PUBLISHER_REGISTRY_ADDRESS = (
        0x051949605AB53FCC2C0ADC1D53A72DD0FBCBF83E52399A8B05552F675B1DB4E9
    )


class MainnetConfig(BaseConfig):
    NETWORK = MAINNET
    GATEWAY_URL = "https://alpha-mainnet.starknet.io"
    CHAIN_ID = StarknetChainId.MAINNET
    ORACLE_CONTROLLER_ADDRESS = (
        0x00225A37DE623DBD4D2287DDED4E0CB0EB4A5D7D9051D0E89A1321D4BCF9FDB2
    )
    PUBLISHER_REGISTRY_ADDRESS = (
        0x051949605AB53FCC2C0ADC1D53A72DD0FBCBF83E52399A8B05552F675B1DB4E9
    )


CONFIG = {
    TESTNET: TestnetConfig,
    INTEGRATION: IntegrationNetworkConfig,
    MAINNET: MainnetConfig,
    STAGING: StagingConfig,
}


def get_config(network: Network):
    # TODO rlkelly: we should discuss our reliance on environment variables in config selection
    if os.environ.get("__EMPIRIC_STAGING_ENV__") == "TRUE":
        logger.warn("Warning: Communicating with staging contracts, not production")
        raw_config = CONFIG.get(STAGING)
    else:
        raw_config = CONFIG.get(network)

    if raw_config is None:
        raise NotImplementedError(
            "Empiric.BaseClient: Network not recognized, unknown network name"
        )

    return raw_config
