import requests
import pandas as pd
import json
from datetime import datetime
import time
import matplotlib.pyplot as plt
import numpy as np


# We use Almgren & Chris (2000) algorithm for estimating execution cost.
# Link: https://www.smallake.kr/wp-content/uploads/2016/03/optliq.pdf

def estimate_execution_cost(volatility, notionalSize, price, TWAMM): 
    #Uniswap's data
    X = 195.23 * 1e6 / 2
    Y = X / price 
    K = 7273807805343.512
    
    gamma = 2.5 * 1e-6 * volatility * 1300 / 0.95
    tau = 1/12
    T = 1 
    eta = (K/Y) * (1/(Y**2)) * tau 
    
    
    R = notionalSize/price  
    
    # If you want to make any assumptions about the liquidator's risk tolerance, set lambda_u
    # according to that, and you can use the code below to find the minimum execution cost. 
    # our calculation assumes that the liquidator is risk neutral. 

    # lambda_u = risk tolerance 
    # kappa = np.sqrt(lambda_u/eta) * volatility * 1300
    # cost =  np.tanh(0.5 * kappa * tau) * ((tau * np.sinh(2 * kappa * T)) + (2 * T * np.sinh(kappa * tau))) / (2 * (tau ** 2) * (np.sinh(kappa * T))**2)
    # expectation = 0.5 * gamma * (R ** 2)  + (eta * (R ** 2) * cost) 
    

    #Return the TWAMM price of executing a trade 

    return (0.5 * gamma * (R**2) + ((eta - 0.5 * gamma * tau)* (R**2) / T))   

    