%lang starknet

@contract_interface
namespace IPublisherRegistry:
    #
    # Getters
    #

    func get_publisher_public_key(publisher : felt) -> (publisher_public_key : felt):
    end

    func get_all_publishers() -> (publishers_len : felt, publishers : felt*):
    end

    #
    # Setters
    #

    func rotate_admin_public_key(
            new_key : felt, old_key : felt, signature_r : felt, signature_s : felt):
    end

    func register_publisher(
            publisher_public_key : felt, publisher : felt, signature_r : felt, signature_s : felt):
    end

    func rotate_publisher_key(
            publisher : felt, new_key : felt, old_key : felt, signature_r : felt,
            signature_s : felt):
    end
end
