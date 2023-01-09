# Computational Feeds

Empiric has designed compute engines that use the same raw market data underlying our price feeds, but calculate different metrics to produce feeds of processed data. We call these new feeds computational feeds. Since computational feeds operate entirely on-chain, they don't introduce any new security assumptions.

The current Empiric Network proxy addresses are:&#x20;

| Feed                | Network               | Address                                                            | Block Explorer Link                                                                                                                                                                                                                                                    |
| ------------------- | --------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Realized Volatility | Starknet Alpha-Goerli | 0x00b63d77cbf599e72ab23f2746edd1197ce45960910ea048b4898c4866d7f300 | [Starkscan](https://testnet.starkscan.co/contract/0x00b63d77cbf599e72ab23f2746edd1197ce45960910ea048b4898c4866d7f300#read-contract), [Voyager](https://goerli.voyager.online/contract/0x00b63d77cbf599e72ab23f2746edd1197ce45960910ea048b4898c4866d7f300#readContract) |
| Yield Curve         | Starknet Alpha-Goerli | 0x06dc5481aaa92ac4c00e33465bb327814261c4b36322a6858c693f4e659962ec | [Starkscan](https://testnet.starkscan.co/contract/0x06dc5481aaa92ac4c00e33465bb327814261c4b36322a6858c693f4e659962ec#read-contract), [Voyager](https://goerli.voyager.online/contract/0x06dc5481aaa92ac4c00e33465bb327814261c4b36322a6858c693f4e659962ec#readContract) |

## **Realized Volatility**

For any price feed, Empiric offers a realized volatility feed. The realized volatility feed uses checkpoints to calculate the annualized volatility of an asset over a period of time.&#x20;

### Sample Code

If you are just trying to get started with our realized volatility feed, see this self-contained code snippet here. You can find the full Oracle interface specification is available [here](https://github.com/Astraly-Labs/Empiric/blob/master/contracts/starknet/src/compute_engines/summary_stats/ISummaryStats.cairo).

<pre><code><strong>%lang starknet
</strong>
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from oracle.ISummaryStats import ISummaryStats

const EMPIRIC_VOL_ADDRESS = 0x00b63d77cbf599e72ab23f2746edd1197ce45960910ea048b4898c4866d7f300;
const KEY = 19514442401534788;  // str_to_felt("ETH/USD")

@view
func check_vol_threshold{syscall_ptr: felt*, range_check_ptr}(threshold: felt) -> (
    is_above_threshold: felt
) {
    alloc_locals;

    let (volatility) = ISummaryStats.calculate_volatility(KEY, 1665051301, 0, 100);
    let (multiplier) = pow(10, decimals);

    let shifted_threshold = threshold * multiplier;
    let is_above_threshold = is_le(shifted_threshold, eth_price);
    return (is_above_threshold,);
}</code></pre>

### How Realized Volatility is Calculated

We calculate realized volatility under the Geometric Brownian Motion assumption using the following equation:

$$
\sigma^2 =  \frac{1}{N} \sum_{i=1}^N \frac{log(S_i / S_{i-1})^2}{(T_i - T_{i-1})}
$$

Where $$\sigma$$ is in units of $$1/\sqrt{(T)}$$ . We then multiply $$\sigma$$ by $$\sqrt{\Delta T_{year}}$$ to get the annualized volatility of the underlying asset. &#x20;

### **Technical Specification**&#x20;

### **Function: `calculate_volatility`**

This function allows you to query realized volatility for any price feed calculated over a requested period of time. The function accesses checkpoints within the requested timeframe, and uses the above equation to calculate realized volatility.&#x20;

Currently, Empiric sets a checkpoint every 5 minutes. If you need more granular data, you can set more checkpoint via the `set_checkpoint` function.

Inputs

- `pair_id`: uppercased utf8-encoded string
- `start_key`: timestamp at the beginning of the period over which you want to calculate realized volatility
- `end_key`: timestamp at the end of the period over which you want to calculate realized volatility. If set to 0, it defaults to the timestamp of the last published block&#x20;
- `num_samples`: number of samples on which you want to calculate volatility. StarkNet currently limits computation, so there is a max of 200 for this input

Returns&#x20;

- `volatility:` annualized realized volatility percentage. Volatility is reported with 8 decimals of precision. To convert it to percentage, divide the output by $$10^{-8}$$ (e.g. 7076538586 means annualized volatility is around 70%)

## **Yield Curve**

Empiric offers a feed that calculates the zero-coupon interest-rate curve fully on-chain. The interest rate values are derived from BTC spot and futures price difference, and Aave overnight rate.&#x20;

### How the Yield Curve is Calculated&#x20;

Aave overnight rates are used to estimate short-term rates. BTC spot and futures prices are pulled at the exact same time to calculate the rates for different maturities. The interest rate for each maturity is calculated according to the following equation:

$$
r(t,T) = max(0, (\frac{F(t,T)}{S(t)} - 1) \times \frac{1}{T})
$$

Where $$t$$ is the current time, $$T$$​ is the time to maturity, $$F(t,T)$$ is the current futures price with maturity of $$T$$, and $$S(t)$$ is the spot price. ​We floor the values with 0 to account for case where spot > future (backwardation).

### **Technical Specification**&#x20;

### **Struct: `YieldPoint`**

This struct represents a point on the yield curve. Each point contains the calculated rate, the timestamp at which it was calculated and what maturity it represents. It also shows the sources we have used to calculate it (e.g. Aave overnight rate, Deribit future/sport rate).

Members&#x20;

- `capture_timestamp`: timestamp of data capture&#x20;
- `expiry_timestamp`: timestamp of expiry of the instrument (1 day for overnight rates and expiration date for futures)&#x20;
- `rate`: the calculated yield rate or overnight rate
- `source`: an indicator for the source (`str_to_felt` encoded lowercase of "on" for Aave overnight rate, "future/spot" for Deribit future/sport rate, and "other" for future additional data sources)

### **Function: `get_yield_points`**

This function calculates what the yield curve is at any point in time, and returns the computed yields in form of an array.&#x20;

Inputs

- `decimals`: the precision at which the rates are calculated&#x20;

Returns

- `yield_curve`: an array of `YieldPoint` structs each representing a different maturity on the curve. Rates are reported up to the requested decimal.&#x20;
