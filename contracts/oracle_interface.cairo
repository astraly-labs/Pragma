%lang starknet

@contract_interface
namespace IOracle:
    func get_publisher_public_key(publisher : felt) -> (publisher_public_key : felt):
    end

    func get_price(asset : felt) -> (price : felt):
    end
end
