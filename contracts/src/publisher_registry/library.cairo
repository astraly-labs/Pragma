%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.math import assert_not_equal
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.hash import hash2
from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.math import assert_not_zero

//
// Storage
//

@storage_var
func Publisher__publisher_address_storage(publisher: felt) -> (publisher_address: felt) {
}

@storage_var
func Publisher__publishers_len_storage() -> (publishers_len: felt) {
}

@storage_var
func Publisher__publishers_storage(idx: felt) -> (publisher: felt) {
}

@storage_var
func Publisher__publishers_sources(publisher, idx) -> (source: felt) {
}

@storage_var
func Publisher__publishers_sources_idx(publisher) -> (idx: felt) {
}

//
// Events
//

@event
func RegisteredPublisher(publisher: felt, publisher_address: felt) {
}

@event
func UpdatedPublisherAddress(
    publisher: felt, old_publisher_address: felt, new_publisher_address: felt
) {
}

namespace Publisher {
    //
    // Getters
    //

    func get_publisher_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher: felt
    ) -> (publisher_address: felt) {
        let (publisher_address) = Publisher__publisher_address_storage.read(publisher);
        return (publisher_address,);
    }

    func get_all_publishers{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
        publishers_len: felt, publishers: felt*
    ) {
        alloc_locals;

        let (publishers_len) = Publisher__publishers_len_storage.read();
        let (local publishers) = alloc();

        if (publishers_len == 0) {
            return (publishers_len, publishers);
        }

        build_publishers_array(publishers_len, publishers, 0);

        return (publishers_len, publishers);
    }

    //
    // Setters
    //

    func add_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher: felt, publisher_address: felt
    ) {
        let (existing_publisher_address) = get_publisher_address(publisher);

        with_attr error_message("PublisherRegistry: Publisher with this name already registered") {
            assert existing_publisher_address = 0;
        }

        let (publishers_len) = Publisher__publishers_len_storage.read();

        Publisher__publishers_len_storage.write(publishers_len + 1);
        Publisher__publishers_storage.write(publishers_len, publisher);  // 0-indexed, so write at old_len (not new_len=len+1)
        Publisher__publisher_address_storage.write(publisher, publisher_address);

        RegisteredPublisher.emit(publisher, publisher_address);

        return ();
    }

    func update_publisher_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher: felt, new_publisher_address: felt
    ) {
        alloc_locals;
        let (existing_publisher_address) = get_publisher_address(publisher);
        let (caller_address) = get_caller_address();

        with_attr error_message(
                "PublisherRegistry: Publisher with this name has not been registered") {
            assert_not_zero(existing_publisher_address);
        }

        with_attr error_message("PublisherRegistry: Only publisher can rotate their key") {
            assert caller_address = existing_publisher_address;
        }

        Publisher__publisher_address_storage.write(publisher, new_publisher_address);

        UpdatedPublisherAddress.emit(publisher, existing_publisher_address, new_publisher_address);
        return ();
    }

    //
    // Helpers
    //

    func remove_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher: felt
    ) {
        alloc_locals;

        Publisher__publisher_address_storage.write(publisher, 0);
        Publisher__publishers_sources_idx.write(publisher, 0);
        Publisher__publishers_sources.write(publisher, 0, 0);

        let (publisher_len) = Publisher__publishers_len_storage.read();
        if (publisher_len == 1) {
            Publisher__publishers_len_storage.write(0);
            Publisher__publishers_storage.write(0, 0);
            return ();
        }
        let (publisher_idx) = _find_publisher_idx(0, publisher, publisher_len);

        if (publisher_idx == -1) {
            with_attr error_message("publisher not found") {
                // throw
                assert publisher_idx = 0;
            }
        }

        if (publisher_idx == publisher_len - 1) {
            Publisher__publishers_storage.write(publisher_len - 1, 0);
            Publisher__publishers_len_storage.write(publisher_len - 1);
        } else {
            let (last_publisher) = Publisher__publishers_storage.read(publisher_len - 1);
            Publisher__publishers_storage.write(publisher_idx, last_publisher);
            Publisher__publishers_storage.write(publisher_len - 1, 0);
            Publisher__publishers_len_storage.write(publisher_len - 1);
        }

        return ();
    }

    func build_publishers_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publishers_len: felt, publishers: felt*, idx: felt
    ) -> (publishers: felt*) {
        let (new_value) = Publisher__publishers_storage.read(idx);
        assert [publishers + idx] = new_value;

        if (idx == publishers_len) {
            return (publishers,);
        }

        build_publishers_array(publishers_len, publishers, idx + 1);

        return (publishers,);
    }

    func add_source_for_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher, source
    ) {
        let (existing_publisher_address) = get_publisher_address(publisher);

        with_attr error_message("PublisherRegistry: Publisher does not exist") {
            assert_not_equal(existing_publisher_address, 0);
        }

        let (can_publish_) = can_publish_source(publisher, source);
        if (can_publish_ == TRUE) {
            with_attr error_message("Already Registered for publisher") {
                // throw
                assert can_publish_ = FALSE;
            }
        }

        let (cur_idx) = Publisher__publishers_sources_idx.read(publisher);
        Publisher__publishers_sources.write(publisher, cur_idx, source);
        Publisher__publishers_sources_idx.write(publisher, cur_idx + 1);
        return ();
    }

    func add_sources_for_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher, sources_len, sources: felt*
    ) {
        if (sources_len == 0) {
            return ();
        }
        add_source_for_publisher(publisher, [sources]);
        return add_sources_for_publisher(publisher, sources_len - 1, sources + 1);
    }

    func get_publisher_sources{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher
    ) -> (sources_len: felt, sources: felt*) {
        alloc_locals;

        let (cur_idx) = Publisher__publishers_sources_idx.read(publisher);
        let (sources_arr) = alloc();
        _iter_publisher_sources(0, cur_idx, publisher, sources_arr);

        return (cur_idx, sources_arr);
    }

    func _iter_publisher_sources{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        cur_idx, max_idx, publisher, sources_arr: felt*
    ) {
        if (cur_idx == max_idx) {
            return ();
        }
        let (_source) = Publisher__publishers_sources.read(publisher, cur_idx);
        assert sources_arr[cur_idx] = _source;
        return _iter_publisher_sources(cur_idx + 1, max_idx, publisher, sources_arr);
    }

    func remove_source_for_publisher{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(publisher, source) {
        alloc_locals;

        let (cur_idx) = Publisher__publishers_sources_idx.read(publisher);
        if (cur_idx == 0) {
            return ();
        }

        let (sources_arr) = alloc();
        _iter_publisher_sources(0, cur_idx, publisher, sources_arr);
        with_attr error_message("Source not found") {
            let (source_idx) = _find_source_idx(0, source, cur_idx, sources_arr);
        }
        if (source_idx == cur_idx - 1) {
            Publisher__publishers_sources_idx.write(publisher, cur_idx - 1);
            Publisher__publishers_sources.write(publisher, cur_idx - 1, 0);
        } else {
            let (final_source) = Publisher__publishers_sources.read(publisher, cur_idx - 1);
            Publisher__publishers_sources_idx.write(publisher, cur_idx - 1);
            Publisher__publishers_sources.write(publisher, cur_idx - 1, 0);
            Publisher__publishers_sources.write(publisher, source_idx, final_source);
        }

        return ();
    }

    func can_publish_source{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher, source
    ) -> (is_valid: felt) {
        alloc_locals;

        let (cur_idx) = Publisher__publishers_sources_idx.read(publisher);
        if (cur_idx == 0) {
            return (-1,);
        }

        let (sources_arr) = alloc();
        _iter_publisher_sources(0, cur_idx, publisher, sources_arr);

        let (source_idx) = _find_source_idx(0, source, cur_idx, sources_arr);

        if (source_idx == -1) {
            return (FALSE,);
        } else {
            return (TRUE,);
        }
    }

    func _find_source_idx{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        cur_idx, source, sources_arr_len, sources_arr: felt*
    ) -> (source_idx: felt) {
        if (cur_idx == sources_arr_len) {
            return (-1,);
        }
        if (sources_arr[cur_idx] == source) {
            return (cur_idx,);
        }
        return _find_source_idx(cur_idx + 1, source, sources_arr_len, sources_arr);
    }

    func _find_publisher_idx{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        cur_idx, max_idx, publisher
    ) -> (publisher_idx: felt) {
        if (cur_idx == max_idx) {
            return (-1,);
        }
        let (_publisher) = Publisher__publishers_storage.read(cur_idx);
        if (_publisher == publisher) {
            return (cur_idx,);
        }
        return _find_publisher_idx(cur_idx + 1, max_idx, publisher);
    }
}
