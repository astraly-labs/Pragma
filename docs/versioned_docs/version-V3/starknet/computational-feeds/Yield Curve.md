---
id: yield-curve
title: Yield Curve
sidebar_position: 2
---

---

## Yield Curve

Pragma offers a feed that calculates the zero-coupon interest-rate curve fully on-chain. The interest rate values are derived from BTC spot and futures price difference, and Aave overnight rate.

### How the Yield Curve is Calculated

Aave overnight rates are used to estimate short-term rates. BTC spot and futures prices are pulled at the exact same time to calculate the rates for different maturities. The interest rate for each maturity is calculated according to the following equation:

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/wCYD1bk/Screenshot-2023-02-27-at-16-26-47.png" />
  </div>

​We floor the values with 0 to account for case where spot > future (backwardation).

## Technical Specification

### Struct: `YieldPoint`

This struct represents a point on the yield curve. Each point contains the calculated rate, the timestamp at which it was calculated and what maturity it represents. It also shows the sources we have used to calculate it (e.g. Aave overnight rate, Deribit future/sport rate).

#### Members

- `capture_timestamp`: timestamp of data capture
- `expiry_timestamp`: timestamp of expiry of the instrument (1 day for overnight rates and expiration date for futures)
- `rate`: the calculated yield rate or overnight rate
- `source`: an indicator for the source (`str_to_felt` encoded lowercase of "on" for Aave overnight rate, "future/spot" for Deribit future/sport rate, and "other" for future additional data sources)

### Function: `get_yield_points`

This function calculates what the yield curve is at any point in time, and returns the computed yields in form of an array.

#### Inputs

- `decimals`: the precision at which the rates are calculated

#### Returns

- `yield_curve`: an array of `YieldPoint` structs each representing a different maturity on the curve. Rates are reported up to the requested decimal.
