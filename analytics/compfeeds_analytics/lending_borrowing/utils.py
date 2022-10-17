# We use Almgren & Chris (2000) algorithm for estimating execution cost.
# Link: https://www.smallake.kr/wp-content/uploads/2016/03/optliq.pdf

import numpy as np


def estimate_execution_cost(
    volatility: float, notional_size: float, price: float, risk_neutral: bool
) -> float:
    # Uniswap's data
    X = 195.23 * 1e6 / 2
    Y = X / price
    K = 7273807805343.512

    gamma = 2.5 * 1e-6 * volatility * 1300 / 0.95
    tau = 1 / 12
    T = 1
    eta = (K / Y) * (1 / (Y**2)) * tau

    R = notional_size / price

    # If you want to make any assumptions about the liquidator's risk tolerance, set lambda_u
    # according to that, and you can use the code below to find the minimum execution cost.
    # our calculation assumes that the liquidator is risk neutral,
    # therefore the execution cost will be equal to the expected cost of TWAMM.

    if risk_neutral:
        # Return the TWAMM price of executing a trade
        return 0.5 * gamma * (R**2) + ((eta - 0.5 * gamma * tau) * (R**2) / T)
    else:
        lambda_u = 1e-5
        kappa = np.sqrt(lambda_u / eta) * volatility * 1300
        cost = (
            np.tanh(0.5 * kappa * tau)
            * ((tau * np.sinh(2 * kappa * T)) + (2 * T * np.sinh(kappa * tau)))
            / (2 * (tau**2) * (np.sinh(kappa * T)) ** 2)
        )
        expectation = 0.5 * gamma * (R**2) + (eta * (R**2) * cost)
        return expectation
