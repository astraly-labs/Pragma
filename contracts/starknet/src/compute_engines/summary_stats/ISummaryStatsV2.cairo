#[contract]
use array::ArrayTrait;
use option::OptionTrait;

trait ISummaryStats {
    fn calculate_mean(key: felt, start: felt, stop: felt) -> felt;
    fn calculate_volatility(key: felt, start: felt, stop: felt, num_samples: felt) -> felt;
}
