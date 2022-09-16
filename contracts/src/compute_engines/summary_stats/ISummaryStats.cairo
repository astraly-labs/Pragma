%lang starknet

@contract_interface
namespace ISummaryStats {
    func calculate_mean(key: felt, start: felt, stop: felt, num_datapoints: felt) -> (mean_: felt) {
    }

    func calculate_volatility(key: felt, start: felt, stop: felt) -> (volatility_: felt) {
    }
}
