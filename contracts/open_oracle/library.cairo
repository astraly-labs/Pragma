%lang starknet

from starkware.cairo.common.alloc import alloc # will need for array pulls
from starkware.cairo.common.bool import TRUE, FALSE #for comparative
from starkware.cairo.common.cairo_builtins import HashBuiltin

#Can probably drop everything below here
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow
from starkware.starknet.common.syscalls import get_block_timestamp
from starkware.cairo.common.math import unsigned_div_rem

#need to pull in the ECDSA hash to check 
#TODO find this import

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
# Struct for lookup of public keys. 
#
struct SupportedPublicKey:
    member pub_key : felt
    member is_active : felt
end

#
# Storage 
#

@storage_var
func supported_pub_key_len_storage() -> (supported_pub_key_len : felt):
end

@storage_var
func oo_publishers_storage(idx : felt) -> (publisher : felt):
end

@storage_var
func spk_struct_storage(publisher : felt) -> (spk_struct : SupportedPublicKey):
end


#
#Getters: all @view; 
#

#TODO get spk_len
@view
func get_supported_pub_key_len{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    ) -> (spk_len : felt):
    let (spk_len) = supported_pub_key_len_storage.read()
    return(spk_len)
end

#TODO get a single publisher at an spk_len
@view
func get_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spk_len : felt) -> (publisher : felt):
    let (publisher) = oo_publishers_storage.read(idx)
    return (publisher)
end

#TODO get a single struct at a publisher
@view
func get_spk_struct{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt) -> (spk_struct : SupportedPublicKey):
    let (spk_struct) = spk_struct_storage.read(publisher)
    return (spk_struct_storage)
end

#TODO get the pub_key from a publisher ---> struct
@view
func get_spk_pub_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt) -> (pub_key : felt):
    let (spk_struct) = get_spk_struct(publisher)
    let pub_key = spk_struct.pub_key
    return (pub_key)
end

#TODO get the is_active from a publisher --> struct
@view
func get_spk_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt) -> (is_active : felt):
    let (spk_struct) = get_spk_struct(publisher)
    let is_active = spk_struct.is_active
    return (is_active)
end

#TODO get all the publishers in an array



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
func add_supported_public_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, pub_key : felt, is_active : felt) -> ():
    Admin_only_admin()
    
    let (spk_len) = supported_pub_key_len_storage.read()
    oo_publishers_storage.write(spk_len, publisher)

    #this struct setting might be in our struct setter, or its own function
    #actually I like how we disaggregate creating the struct and writing to storage as seperate functions
    #that is good. 
    let new_spk_struct = SupportedPublicKey(pub_key, is_active)
    set_spk_struct_storage(new_spk_struct) #or should it be the base line .write()?
    supported_pub_key_len_storage.write(supported_pub_key_len_storage+1)
    return ()
end

@external
func set_spk_struct_storage{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, spk_struct : SupportedPublicKey) -> ():
    Admin_only_admin()
    spk_struct_storage.write(publisher, spk_struct)
    return ()
end

#try not to use set_publisher, only really useful if name change but that would cause breaking changes;
#will throw off all the old keys; we could avoid through off if we really wanted to using a ring buffer implementation
#to ensure no gaps. Can we just not implement?

@external
func set_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    idx : felt, publisher : felt) -> ():
    Admin_only_admin()
    oo_publishers_storage.write(idx, publisher)
    return ()
end

#TODO set pubkey; NOT DONE, we also pass in a new is_active? or not have the code being written for not but pass in is there
@external
func set_spk_pub_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, new_pub_key : felt, new_is_active : felt) -> ():
    Admin_only_admin()

    #if we assume that the activity status of the old public key carries to the newly set one use this code
    #let (old_is_active) = get_spk_is_active(publisher)
    #let new_spk_struct = SupportedPublicKey(new_pub_key, old_is_active)

    #better IMO to interpret that a new pub key has its own activity status given why you rotate keys
    #throw a with_attr here?
    let new_spk_struct = SupportedPublicKey(new_pub_key, new_is_active)
    set_spk_struct_storage(publisher, new_spk_struct)
    return ()
end

#TODO set isactive. use old pub key. so need pub key getter
@external
func set_spk_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, new_is_active : felt) -> ():
    Admin_only_admin()
    
    #here we assume that old pub_key holds over
    let (old_pub_key) = get_spk_pub_key(publisher)
    let new_spk_struct = SupportedPublicKey(old_pub_key, new_is_active)
    set_spk_struct_storage(publisher, new_spk_struct)
    return ()
end


#
#Logic 
#

