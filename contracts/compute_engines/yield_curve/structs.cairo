struct YieldPoint:
    member expiry_timestamp : felt  # timestamp of expiry of the instrument
    member capture_timestamp : felt  # timestamp of data capture
    # (1 day for overnight rates and expiration date for futures)
    member rate : felt  # The calculated yield rate: either overnight rate
    member source : felt  # An indicator for the source (str_to_felt encode lowercase one of:
    # "on" (overnight rate aave),
    # "fut/spot" (deribit future/sport rate),
    # "other" (for future additional data sources))
end
