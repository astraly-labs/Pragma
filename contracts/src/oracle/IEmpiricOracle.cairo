%lang starknet

struct Entry {
    pair_id: felt,  // UTF-8 encoded uppercased string, e.g. "ETH/USD"
    value: felt,  // Value shifted to the left by decimals
    timestamp: felt,  // Timestamp of the most recent update, UTC epoch
    source: felt,  // UTF-8 encoded uppercased string, e.g. "FTX"
    publisher: felt,  // UTF-8 encoded uppercased string, e.g. "CONSENSYS"
    // Publisher of the data (usually the source, but occasionally a third party)
}

namespace EmpiricAggregationModes {
    const MEDIAN = 84959893733710;  // str_to_felt("MEDIAN")
}

@contract_interface
namespace IEmpiricOracle {
    //
    // Getters
    //

    func get_decimals(pair_id: felt) -> (decimals: felt) {
    }

    func get_entries(pair_id: felt, sources_len: felt, sources: felt*) -> (
        entries_len: felt, entries: Entry*
    ) {
    }

    func get_entry(pair_id: felt, source: felt) -> (entry: Entry) {
    }

    func get_value(pair_id: felt, aggregation_mode: felt) -> (
        value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    func get_value_for_sources(
        pair_id: felt, aggregation_mode: felt, sources_len: felt, sources: felt*
    ) -> (value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt) {
    }
}
