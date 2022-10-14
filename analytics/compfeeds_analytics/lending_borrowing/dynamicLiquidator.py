import pandas as pd
from datetime import datetime
import time
import matplotlib.pyplot as plt
import numpy as np
import utils
from matplotlib import style
import matplotlib.dates as md 
import scipy 

class dynamicLiquidator:
    def __init__(self, dynamicLBProtocol): 
        self.protocol = dynamicLBProtocol 
        self.reward = 0 


    def check_liquidity_opportunities(self, dynamicLBProtocol): 
        if dynamicLBProtocol.recoveryMode:
            while recoveryMode:
                liquidate(dynamicLBProtocol, 0)
        else: 
            for i in range(len(dynamicLBProtocol.balanceSheet)): 
                if (dynamicLBProtocol.balanceSheet[i,2] / dynamicLBProtocol.balanceSheet[i,1]) < dynamicLBProtocol.calculate_liquidation_threshold(self, dynamicLBProtocol.balanceSheet[i,2]): 
                    liquidate(dynamicLBProtocol, i)       


    def liquidate(self, dynamicLBProtocol, i): 
        dynamicLBProtocol.totalD -= dynamicLBProtocol.balanceSheet[i][1]
        dynamicLBProtocol.totalC -= dynamicLBProtocol.balanceSheet[i][2]
        liquidatorReward = dynamicLBProtocol.balanceSheet[i][1] * 0.005 + utils.estimate_execution_cost(dynamicLBProtocol.vol, dynamicLBProtocol.balanceSheet[i][1], dynamicLBProtocol.price, True)
        dynamicLBProtocol.liqidationRewards += dynamicLBProtocol.balanceSheet[i][2] - dynamicLBProtocol.balanceSheet[i][1] - liquidatorReward
        self.reward += liquidatorReward

        dynamicLBProtocol.balanceSheet.delete(i) 
        dynamicLBProtocol.set_recovery_mode(dynamicLBProtocol.vol)
        
