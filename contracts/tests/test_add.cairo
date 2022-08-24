%lang starknet

from entry.library import Entry

@external
func test_proxy_contract{syscall_ptr : felt*, range_check_ptr}():
    assert 2 + 2 = 4
    return ()
end
