---
id: realized-volatility
title: Realized Volatility
sidebar_position: 3
---

---

## Realized Volatility

For any price feed, Pragma offers a realized volatility feed. The realized volatility feed uses checkpoints to calculate the annualized volatility of an asset over a period of time.

#### Sample Code

If you are just trying to get started with our realized volatility feed, see this self-contained code snippet here. You can find the full Oracle interface specification is available [here](https://github.com/Astraly-Labs/Pragma/blob/master/contracts/starknet/src/compute_engines/summary_stats/ISummaryStats.cairo).

```bash
%lang starknet

from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from oracle.ISummaryStats import ISummaryStats

const PRAGMA_VOL_ADDRESS = 0x00b63d77cbf599e72ab23f2746edd1197ce45960910ea048b4898c4866d7f300;
const KEY = 19514442401534788; // str_to_felt("ETH/USD")

@view
func check_vol_threshold{syscall_ptr: felt\*, range_check_ptr}(threshold: felt) -> (
is_above_threshold: felt
) {
alloc_locals;

    let (volatility) = ISummaryStats.calculate_volatility(KEY, 1665051301, 0, 100);
    let (multiplier) = pow(10, decimals);

    let shifted_threshold = threshold * multiplier;
    let is_above_threshold = is_le(shifted_threshold, eth_price);
    return (is_above_threshold,);

}
```

## How Realized Volatility is Calculated

We calculate realized volatility under the Geometric Brownian Motion assumption using the following equation:

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/yBPHTFk/Screenshot-2023-02-27-at-16-03-04.png" />
  </div>

Where σ is in units of 1/$\sqrt{T}$. We then multiply σ by $\sqrt{ΔTyear}$ to get the annualized volatility of the underlying asset.

## Technical Specification

### Function: `calculate_volatility`

This function allows you to query realized volatility for any price feed calculated over a requested period of time. The function accesses checkpoints within the requested timeframe, and uses the above equation to calculate realized volatility.
Currently, Pragma sets a checkpoint every 5 minutes. If you need more granular data, you can set more checkpoint via the `set_checkpoint function`.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `start_key`: timestamp at the beginning of the period over which you want to calculate realized volatility
- `end_key`: timestamp at the end of the period over which you want to calculate realized volatility. If set to 0, it defaults to the timestamp of the last published block
- `num_samples`: number of samples on which you want to calculate volatility. StarkNet currently limits computation, so there is a max of 200 for this input

#### Returns

- `volatility`: annualized realized volatility percentage. Volatility is reported with 8 decimals of precision. To convert it to percentage, divide the output by 10^8 (e.g. 7076538586 means annualized volatility is around 70%)
