%lang starknet

from contracts.entry.library import Entry

@contract_interface
namespace IOracle:
    #
    # Getters
    #

    func get_publisher_public_key(publisher : felt) -> (publisher_public_key : felt):
    end

    func get_entries_for_key(key : felt) -> (entries_len : felt, entries : Entry*):
    end

    func get_value(key : felt) -> (value : felt, last_updated_timestamp : felt):
    end

    func get_decimals() -> (decimals : felt):
    end

    #
    # Setters
    #

    func rotate_publisher_registration_key(
            old_key : felt, new_key : felt, signature_r : felt, signature_s : felt):
    end

    func rotate_publisher_key(
            publisher : felt, old_key : felt, new_key : felt, signature_r : felt,
            signature_s : felt):
    end

    func register_publisher(
            publisher_public_key : felt, publisher : felt, publisher_signature_r : felt,
            publisher_signature_s : felt, registration_signature_r : felt,
            registration_signature_s : felt):
    end

    func submit_entry(new_entry : Entry, signature_r : felt, signature_s : felt):
    end

    func submit_many_entries(
            new_entries_len, new_entries, signatures_r_len, signatures_r, signatures_s_len,
            signatures_s):
    end
end
