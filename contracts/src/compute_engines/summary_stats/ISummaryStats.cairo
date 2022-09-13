%lang starknet

@contract_interface
namespace ISummaryStats {
    func calculate_mean(key: felt, start: felt, stop: felt, num_datapoints: felt) -> (mean_: felt) {
    }

    func scaled_arr(key: felt, start: felt, stop: felt, num_datapoints: felt) -> (
        arr_len: felt, arr: felt*
    ) {
    }

    func arr_values(key: felt, start: felt, stop: felt, num_datapoints: felt) -> (
        arr_len: felt, arr: felt*
    ) {
    }
}
