%lang starknet

from contracts.entry import Entry

@contract_interface
namespace IOracle:
    func get_price(asset : felt) -> (entry : Entry):
    end
end
