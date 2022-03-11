struct Entry:
    member timestamp : felt
    member price : felt  # TODO: Figure out how to handle decimals
    member asset_name : felt
    member oracle_name : felt
end
