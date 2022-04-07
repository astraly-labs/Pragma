%lang starknet

@contract_interface
namespace IOracle:
    #
    # Getters
    #

    func get_publisher_public_key(publisher : felt) -> (publisher_public_key : felt):
    end

    func get_entries_for_asset(asset : felt) -> (entries_len : felt, entries : Entry*):
    end

    func get_price(asset : felt) -> (price : felt):
    end

    #
    # Setters
    #

    func rotate_publisher_registration_key(
            old_key : felt, new_key : felt, signature_r : felt, signature_s : felt):
    end

    func register_publisher(
            publisher_public_key : felt, publisher : felt, publisher_signature_r : felt,
            publisher_signature_s : felt, registration_signature_r : felt,
            registration_signature_s : felt):
    end

    func submit_entry(new_entry : Entry, signature_r : felt, signature_s : felt):
    end
end
