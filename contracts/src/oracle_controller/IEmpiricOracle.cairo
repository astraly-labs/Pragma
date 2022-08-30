%lang starknet

struct Entry:
    member pair_id : felt  # UTF-8 encoded lowercased string, e.g. "eth/usd"
    member value : felt  # Value shifted to the left by decimals
    member timestamp : felt  # Timestamp of the most recent update, UTC epoch
    member source : felt  # UTF-8 encoded lowercased string, e.g. "ftx"
    member publisher : felt  # UTF-8 encoded lowercased string, e.g. "consensys"
    # Publisher of the data (usually the source, but occasionally a third party)
end

namespace EmpiricAggregationModes:
    const MEDIAN = 120282243752302  # str_to_felt("median")
end

@contract_interface
namespace IEmpiricOracle:
    #
    # Getters
    #

    func get_decimals(pair_id : felt) -> (decimals : felt):
    end

    func get_entries(pair_id : felt, sources_len : felt, sources : felt*) -> (
        entries_len : felt, entries : Entry*
    ):
    end

    func get_entry(pair_id : felt, source : felt) -> (entry : Entry):
    end

    func get_value(pair_id : felt, aggregation_mode : felt) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end

    func get_value_for_sources(
        pair_id : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
    ) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end
end
