%lang starknet

@contract_interface
namespace ICheckEthThreshold:
    func check_eth_usd_threshold(threshold : felt) -> (is_above_threshold : felt):
    end
end
