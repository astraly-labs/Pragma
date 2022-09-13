%lang starknet

@contract_interface
namespace ICheckThreshold {
    func check_eth_usd_threshold(threshold: felt) -> (is_above_threshold: felt) {
    }
}
