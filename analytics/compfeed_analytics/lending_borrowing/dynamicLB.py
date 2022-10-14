import pandas as pd
from datetime import datetime
import time
import matplotlib.pyplot as plt
import numpy as np
import utils
from matplotlib import style
import matplotlib.dates as md 
from scipy.stats import norm



class dynamicLBProtocol:
    def __init__(self, volatility, price, pi, pi_total): 
        self.totalC = 0
        self.totalD = 0 
        # The balanceSheet is an array containing CDR ratios, collateral, debt, and address for each loan. 
        self.balanceSheet = np.empty((0,4), int)
        self.recoveryMode = False
        self.pi = pi
        self.pi_total = pi_total
        self.price = price
        self.vol = volatility
        self.liqidationRewards = 0


    def calculate_liquidation_threshold(self, loan_amount): 
        if self.recoveryMode == False: 
            optimalExecution = True 
            l = (1 + self.vol * norm.ppf(self.pi))
            x = utils.estimate_execution_cost(self.vol, loan_amount, self.price, optimalExecution)/ loan_amount
            return (l+x) 

        else: 
            l =  (1 + self.vol * norm.ppf(self.pi_total))
            optimalExecution = True
            x = utils.estimate_execution_cost(self.vol, loan_amount, self.price, optimalExecution)/ loan_amount 
            return (l+x)
             


    def process_order(self, debt, collateral, address): 
        l = self.calculate_liquidation_threshold(debt) 
        print(l)
        CDR = (collateral / debt)
        if CDR < l: 
            print("Loan request rejected. CDR too low.")
            return(False)

        else: 
            print("Loan order placed.")
            self.balanceSheet = np.vstack([self.balanceSheet, [CDR, debt, collateral, address]]) 
            self.totalC += collateral
            self.totalD += debt 
            self.balanceSheet = self.balanceSheet[self.balanceSheet[:, 0].argsort()]

        self.set_recovery_mode(self.vol)

        return(True)
    
    def withdraw_collateral(self, address): 
        if address not in self.balanceSheet[:,3]: 
            print("No loans found with this address.")
            return(False)

        else: 
            self.totalD -= self.balanceSheet[self.balanceSheet[:,3] == address][1]
            self.totalC -= self.balanceSheet[self.balanceSheet[:,3] == address][2]
            self.set_recovery_mode(self.vol)
            print("You've successfully repaid your debt to the protocol, and receive a collateral of ", self.balanceSheet[self.balanceSheet[:,3] == address][2])
            self.balanceSheet = np.delete(self.balanceSheet, self.balanceSheet[:,3] == address)
            return(True)
        

    def set_recovery_mode(self, volatility):
        if self.totalD == 0: 
            self.recoveryMode = False 
            return

        if (self.totalC / self.totalD) < (1 + volatility * norm.ppf(self.pi_total)): 
            self.recoveryMode = True 
        else: 
            self.recoveryMode = False 
        return


    def get_recovery_Threshold(self):
        return (1 + self.vol * norm.ppf(self.pi_total))


    def update_vars(self, new_vol, new_price): 
        if self.totalD == 0:
            self.price = new_price 
            self.vol = new_vol 

        else: 
            self.totalC *= new_price / self.price  
            self.balanceSheet[:,2] *= new_price / self.price  
            self.balanceSheet[:,0] *= new_price / self.price  
            self.set_recovery_mode(new_vol)
            self.price = new_price 
            self.vol = new_vol 
        
        return


    def status(self): 
        print("Protocol's Status Summary")
        print("-----------------------------------")
        print("Cummulative Debt:", self.totalD)
        print("Cummulative Collateral:", self.totalC)
        print("Total CDR:", self.totalC * 100 / self.totalD)
        print("Minimum Total Collateral:", (1 + self.vol * norm.ppf(self.pi_total)) * 100)
        if self.recoveryMode:
            print("Recovery Mode is activated. Liquidations will happen until total CDR hits ", 
            (1 + self.vol * norm.ppf(self.pi_total)) * 100, ".")
        else: 
            print("The protocol is not in Recovery Mode.") 
        
        print("Protocol's balance sheet:")
        print(self.balanceSheet[:,[1,2]])
        return 

        
        
