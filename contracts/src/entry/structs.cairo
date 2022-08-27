%lang starknet

struct Entry:
    member pair_id : felt  # id of the asset pair (e.g. str_to_felt("ETH/USD"))
    member value : felt
    member timestamp : felt
    member source : felt
    member publisher : felt
end

struct Pair:
    member id : felt  # same as key currently (e.g. str_to_felt("ETH/USD") - force uppercase)
    member quote_currency_id : felt  # currency id - str_to_felt encode the ticker
    member base_currency_id : felt  # currency id - str_to_felt encode the ticker
end

struct Currency:
    member id : felt
    member decimals : felt
    member is_abstract_currency : felt  # True (1) if not a specific token but abstract, e.g. USD or ETH as a whole
    member starknet_address : felt  # optional, e.g. can have synthetics for non-bridged assets
    member ethereum_address : felt  # optional
end
