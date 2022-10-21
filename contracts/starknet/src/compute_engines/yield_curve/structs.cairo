struct YieldPoint {
    expiry_timestamp: felt,  // timestamp of expiry of the instrument
    capture_timestamp: felt,  // timestamp of data capture
    // (1 day for overnight rates and expiration date for futures)
    rate: felt,  // The calculated yield rate: either overnight rate
    // or max(0, ((future/spot) - 1) * (365/days to future expiry))
    source: felt,  // An indicator for the source (str_to_felt encode uppercase one of:
    // "ON" (overnight rate),
    // "FUTURE/SPOT" (future/spot rate),
    // "OTHER" (for future additional data sources))
}
