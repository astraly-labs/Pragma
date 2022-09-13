%lang starknet

struct Entry {
    pair_id: felt,  // id of the asset pair (e.g. str_to_felt("ETH/USD"))
    value: felt,
    timestamp: felt,
    source: felt,
    publisher: felt,
}

struct Pair {
    id: felt,  // same as key currently (e.g. str_to_felt("ETH/USD") - force uppercase)
    quote_currency_id: felt,  // currency id - str_to_felt encode the ticker
    base_currency_id: felt,  // currency id - str_to_felt encode the ticker
}

struct Currency {
    id: felt,
    decimals: felt,
    is_abstract_currency: felt,  // True (1) if not a specific token but abstract, e.g. USD or ETH as a whole
    starknet_address: felt,  // optional, e.g. can have synthetics for non-bridged assets
    ethereum_address: felt,  // optional
}

struct Checkpoint {
    timestamp: felt,
    value: felt,
    aggregation_mode: felt,
    num_sources_aggregated: felt,
}
