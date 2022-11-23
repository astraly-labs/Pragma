%lang starknet

@contract_interface
namespace ISummaryStats {
    func calculate_mean(key: felt, start: felt, stop: felt) -> (mean_: felt) {
    }

    func calculate_volatility(key: felt, start: felt, stop: felt, num_samples: felt) -> (
        volatility_: felt
    ) {
    }
}
