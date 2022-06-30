%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE 
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import unsigned_div_rem, assert_not_zero

#Can probably drop everything below here
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow
from starkware.starknet.common.syscalls import get_block_timestamp

#pull in an ECDSA signature check 
from starkware.cairo.common.cairo_builtins import SignatureBuiltin
from starkware.cairo.common.signature import verify_ecdsa_signature

#Struct for lookup of public keys; struct imports
from contracts.open_oracle.structs import PublicKeyStruct
from contracts.entry.library import Entry

from contracts.oracle_controller.IOracleController import IOracleController

from contracts.admin.library import (
    Admin_initialize_admin_address,
    Admin_get_admin_address,
    Admin_set_admin_address,
    Admin_only_admin,
)

#this probably will not be aa library but a OpenOracle.cairo

#Psuedo code it

#Flow 
#
#Someone posts the API and signs it to an HTTPS database. Now that signature confirms feed is tamper proof and provably unmodified 
#except by the (if they chose a signing scheme with minimal hash collison) holder of priv key

# Someone then takes the messages, the signature and passes it to pontis through the python SDK, publishing like they would any
#other publisher data. This is where our open oracle adpator comes in
#
#Three parts: 
#Recieve the data and check if it is part of a signer. So have a registry of accepted public keys
#Check it against the public key to confirm signature validation
#based on that execute some logic on chain with updating our registry. This is similar to orcal implementation. 

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    admin_address : felt, oracle_controller_address : felt
):
    Admin_initialize_admin_address(admin_address)
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end


#
# Storage 
#

@storage_var
func oracle_controller_address_storage() -> (oracle_controller_address : felt):
end

@storage_var
func open_oracle_publishers_len_storage() -> (open_oracle_publishers_len : felt):
end

@storage_var
func open_oracle_publishers_storage(idx : felt) -> (publisher : felt):
end

@storage_var
func public_key_struct_storage(publisher : felt) -> (public_key_struct : PublicKeyStruct):
end


#
#Getters: all @view; 
#

@view
func get_oracle_controller_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (oracle_controller_address : felt):
    let (oracle_controller_address) = oracle_controller_address_storage.read()
    return (oracle_controller_address)
end

@view
func get_publishers_len{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    ) -> (publishers_len : felt):
    let (publishers_len) = open_oracle_publishers_len_storage.read()
    return(publishers_len)
end


@view
func get_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    idx : felt) -> (publisher : felt):
    let (publisher) = open_oracle_publishers_storage.read(idx)
    return (publisher)
end


@view
func get_public_key_struct{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt) -> (public_key_struct : PublicKeyStruct):
    let (public_key_struct) = public_key_struct_storage.read(publisher)
    return (public_key_struct_storage)
end


@view
func get_public_key_struct_public_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt) -> (public_key : felt):
    let (public_key_struct) = get_public_key_struct(publisher)
    let public_key = public_key_struct.public_key
    return (public_key)
end

#TODO get the is_active from a publisher --> struct
@view
func get_public_key_struct_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt) -> (is_active : felt):
    let (public_key_struct) = get_public_key_struct(publisher)
    let is_active = public_key_struct.is_active
    return (is_active)
end

#Gets all the active publishers in an array
@view
func get_active_publishers{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    ) -> (active_publishers_len : felt, active_publishers : felt*):
    let (active_publishers) = alloc()

    let (total_publishers_len) = open_oracle_publishers_len_storage.read()

    if total_publishers_len == 0:
        return (0, active_publishers)
    end

    let (active_publishers_len, active_publishers) = _build_active_publishers_array(total_publishers_len, active_publishers, 0, 0)

    return (active_publishers_len, active_publishers)
end


#
# Setters: Permission everything with Admin only; all @external; have an add and a set
# 

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_address : felt
):
    Admin_only_admin()
    Admin_set_admin_address(new_address)
    return ()
end

@external
func set_oracle_controller_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(oracle_controller_address : felt) -> ():
    Admin_only_admin()
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end

@external
func add_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, public_key : felt, is_active : felt) -> ():
    Admin_only_admin()
    
    with_attr error_message("OpenOracle: Publisher already registered"):
        let (existing_public_key) = get_public_key_struct_public_key(publisher)
        assert existing_public_key = 0
    end

    let (publishers_len) = open_oracle_publishers_len_storage.read()
    let new_public_key_struct = PublicKeyStruct(public_key, is_active)
    
    open_oracle_publishers_storage.write(publishers_len, publisher)
    set_public_key_struct_storage(new_public_key_struct)
    open_oracle_publishers_len_storage.write(publishers_len+1)
    return ()
end

@external
func set_public_key_struct_storage{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, public_key_struct : PublicKeyStruct) -> ():
    Admin_only_admin()
    public_key_struct_storage.write(publisher, public_key_struct)
    return ()
end

@external
func rotate_public_key_struct{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, new_public_key : felt, new_is_active : felt) -> ():
    Admin_only_admin()

    with_attr error_message("OpenOracle: Publisher is not already registered"):
        let (existing_public_key) = get_public_key_struct_public_key(publisher)
        assert_not_zero(existing_public_key)
    end

    let new_public_key_struct = PublicKeyStruct(new_public_key, new_is_active)
    set_public_key_struct_storage(publisher, new_public_key_struct)
    return ()
end

@external
func set_public_key_struct_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, new_is_active : felt) -> ():
    Admin_only_admin()
    with_attr error_message("OpenOracle: Publisher is not already registered"):
        let (existing_public_key) = get_public_key_struct_public_key(publisher)
        assert_not_zero(existing_public_key)
    end
    let (old_public_key) = get_public_key_struct_public_key(publisher)
    let new_public_key_struct = PublicKeyStruct(old_public_key, new_is_active)
    set_public_key_struct_storage(publisher, new_public_key_struct)
    return ()
end

#
#Helpers
#

#TODO Guard function for asserting that a publisher is registered
func assert_publisher_registered{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt) -> (): 

    with_attr error_message("OpenOracle: Publisher is not already registered"):
        let (existing_public_key) = get_public_key_struct_public_key(publisher)
        assert_not_zero(existing_public_key)
    end
end


#TODO Implement a _build_active_publishers_array() helper function. Need this for a get_publishers plural array function
func _build_active_publishers_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        total_publishers_len : felt, 
        active_publishers_array : felt*, 
        output_idx : felt, 
        storage_idx : felt 
        ) -> (
        active_publishers_array_len : felt, 
        active_publishers_array : felt*):
    
    if storage_idx == total_publishers_len:
        return (output_idx, active_publishers_array) #should this not return active_publishers_array_len in place of output_idx (or at least storage_idx)?
    end
    let (publisher) = get_publisher(storage_idx)
    let (publisher_is_active) = get_public_key_struct_is_active(publisher)
    if publisher_is_active == TRUE: #*bc of this check, returns only active publishers
        assert active_publishers_array[output_idx] = publisher
        let (recursed_active_publishers_array_len, recursed_active_publishers_array) = _build_active_publishers_array(
            total_publishers_len, active_publishers_array, output_idx + 1, storage_idx + 1)
        return (recursed_active_publishers_array_len, recursed_active_publishers_array)
    else:
        let (recursed_active_publishers_array_len, recursed_active_publishers_array) = _build_active_publishers_array(
            total_publishers_len, active_publishers_array, output_idx, storage_idx + 1)
        return (recursed_active_publishers_array_len, recursed_active_publishers_array)
    end
end


#
#Logic 
#



#Will need a function that gets called by sdk or by anyone of posting/attesting to the signature. Use compound's language of
#posting. Make sure an ABI exists for these functions. identify and group with the reporters. IE, have the feed go to the specific
#publisher's entry array/struct location

@external
func postSignature{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr, ecdsa_ptr : SignatureBuiltin*}(
    message : felt, input_signature_r : felt, input_signature_s : felt, publisher : felt) -> ():
    #early check that publisher is initialized
    with_attr error_message("OpenOracle: Public key associated with publisher provided is not active"):
        let (public_key_is_active) = get_public_key_struct_is_active(publisher)
        assert public_key_is_active = TRUE
    end
 

    #signature validation which throws error if incorrect
    let (associated_pk) = get_public_key_struct_public_key(publisher)
    verify_ecdsa_signature(message, associated_pk, input_signature_r, input_signature_s)

    #finally logic to send this to the oracle controller
    let(asset, price, timestamp) = parseMessage(message)
    let new_entry = Entry(asset, price, timestamp, publisher)

    let ORACLE_CONTROLLER_ADDRESS = get_oracle_controller_address()
    IOracleController.submit_entry(ORACLE_CONTROLLER_ADDRESS, new_entry)

    return()
end

#Write a signature validation function. I think we can be nonce agnostic bc timestamp will be included in entries (so we can
#remove stale bids later

#mapping the OpenOracle data to the struct. 

#Some comparision with the oracle controller to chose if this is appropriate to publish. This might already happen on 
#at the oracle_controller? Read the code

@external
func parseMessage{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    message : felt) -> (asset : felt, price : felt, timestamp : felt):
    #this is where the DER encoding overflow becomes an issue. ideally use TLV hex tag flow to break it up and return. 
    #Should recurse/iterate through each two digits in the hex, and find value tags. Then set them.
    
    #there will also need to be string felt conversion on the asset key. I know 0kx specifically posts for /USD pairs
    #but includes it in the data as BTC. 
    
    
    #Doing false outs for passing
    let(asset, price, timestamp) = message
    return (asset, price, timestamp)
end