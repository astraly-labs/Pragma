%lang starknet

struct BaseEntry {
    timestamp: felt,
    source: felt,
    publisher: felt,
}

struct GenericEntry {
    base: BaseEntry,
    key: felt,
    value: felt,
}

struct GenericEntryStorage {
    timestamp__value: felt,
}

struct SpotEntry {
    base: BaseEntry,
    pair_id: felt,
    price: felt,
    volume: felt,
}

struct SpotEntryStorage {
    timestamp__volume__price: felt,
}

struct FutureEntry {
    base: BaseEntry,
    pair_id: felt,
    price: felt,
    expiry_timestamp: felt,
}

struct FutureEntryStorage {
    timestamp__price: felt,
}

struct OptionEntry {
    base: BaseEntry,
    pair_id: felt,
    price: felt,
    option_type: felt,
    expiry_timestamp: felt,
    strike_price: felt,
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
