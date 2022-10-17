import utils
from dynamicLB import DynamicLBProtocol


class DynamicLiquidator:
    def __init__(self, protocol: DynamicLBProtocol):
        self.protocol = protocol
        self.reward = 0

    def check_liquidity_opportunities(self, protocol: DynamicLBProtocol):
        if protocol.recoveryMode:
            while protocol.recoveryMode:
                self.liquidate(protocol, 0)
        else:
            for i in range(len(protocol.balanceSheet)):
                if (
                    protocol.balanceSheet[i, 2] / protocol.balanceSheet[i, 1]
                ) < protocol.calculate_liquidation_threshold(
                    self, protocol.balanceSheet[i, 2]
                ):
                    self.liquidate(protocol, i)

    def liquidate(self, protocol: DynamicLBProtocol, i: int):
        protocol.totalD -= protocol.balanceSheet[i][1]
        protocol.totalC -= protocol.balanceSheet[i][2]
        liquidatorReward = protocol.balanceSheet[i][
            1
        ] * 0.005 + utils.estimate_execution_cost(
            protocol.vol,
            protocol.balanceSheet[i][1],
            protocol.price,
            True,
        )
        protocol.liqidationRewards += (
            protocol.balanceSheet[i][2] - protocol.balanceSheet[i][1] - liquidatorReward
        )
        self.reward += liquidatorReward

        protocol.balanceSheet.delete(i)
        protocol.set_recovery_mode(protocol.vol)

        return
