%lang starknet

@contract_interface
namespace IPublisherRegistry:
    #
    # Getters
    #
    func get_admin_address() -> (admin_address : felt):
    end

    func get_publisher_address(publisher : felt) -> (publisher_address : felt):
    end

    func get_all_publishers() -> (publishers_len : felt, publishers : felt*):
    end

    #
    # Setters
    #

    func set_admin_address(new_address : felt):
    end

    func register_publisher(publisher : felt, publisher_address : felt):
    end

    func update_publisher_address(publisher : felt, new_publisher_address : felt):
    end
end
