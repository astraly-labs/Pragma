SUMMARY_STATS_ABI = [
    {
        "inputs": [{"name": "oracle_address", "type": "felt"}],
        "name": "constructor",
        "outputs": [],
        "type": "constructor",
    },
    {
        "inputs": [
            {"name": "key", "type": "felt"},
            {"name": "start", "type": "felt"},
            {"name": "stop", "type": "felt"},
        ],
        "name": "calculate_mean",
        "outputs": [{"name": "mean_", "type": "felt"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"name": "key", "type": "felt"},
            {"name": "start", "type": "felt"},
            {"name": "stop", "type": "felt"},
        ],
        "name": "calculate_volatility",
        "outputs": [{"name": "volatility_", "type": "felt"}],
        "stateMutability": "view",
        "type": "function",
    },
]
