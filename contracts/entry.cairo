from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2

struct Entry:
    member timestamp : felt
    member price : felt
    member asset : felt  # UTF-8 encoded string, e.g. "USD/ETH"
    member publisher : felt
end

func hash_entry{pedersen_ptr : HashBuiltin*}(entry : Entry) -> (hash : felt):
    let (h1) = hash2{hash_ptr=pedersen_ptr}(entry.asset, entry.publisher)
    let (h2) = hash2{hash_ptr=pedersen_ptr}(entry.price, h1)
    let (h3) = hash2{hash_ptr=pedersen_ptr}(entry.timestamp, h2)
    return (h3)
end
