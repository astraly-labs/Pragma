RANDOMNESS_ABI = [
    {
        "data": [
            {
                "name": "implementation",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "previousAdminAddress",
                "type": "felt"
            },
            {
                "name": "newAdminAddress",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "AdminAddressChanged",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "requestor_address",
                "type": "felt"
            },
            {
                "name": "request_id",
                "type": "felt"
            },
            {
                "name": "minimum_block_number",
                "type": "felt"
            },
            {
                "name": "callback_gas_limit",
                "type": "felt"
            },
            {
                "name": "num_words",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Randomness__request",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "requestor_address",
                "type": "felt"
            },
            {
                "name": "request_id",
                "type": "felt"
            },
            {
                "name": "status",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Randomness__status_change",
        "type": "event"
    },
    {
        "inputs": [
            {
                "name": "proxy_admin",
                "type": "felt"
            }
        ],
        "name": "initializer",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "requestor_address",
                "type": "felt"
            },
            {
                "name": "request_id",
                "type": "felt"
            },
            {
                "name": "status",
                "type": "felt"
            }
        ],
        "name": "update_status",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "seed",
                "type": "felt"
            },
            {
                "name": "callback_address",
                "type": "felt"
            },
            {
                "name": "callback_gas_limit",
                "type": "felt"
            },
            {
                "name": "publish_delay",
                "type": "felt"
            },
            {
                "name": "num_words",
                "type": "felt"
            }
        ],
        "name": "request_random",
        "outputs": [
            {
                "name": "request_id",
                "type": "felt"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "request_id",
                "type": "felt"
            },
            {
                "name": "requestor_address",
                "type": "felt"
            },
            {
                "name": "seed",
                "type": "felt"
            },
            {
                "name": "minimum_block_number",
                "type": "felt"
            },
            {
                "name": "callback_address",
                "type": "felt"
            },
            {
                "name": "callback_gas_limit",
                "type": "felt"
            },
            {
                "name": "num_words",
                "type": "felt"
            }
        ],
        "name": "cancel_random_request",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "request_id",
                "type": "felt"
            },
            {
                "name": "requestor_address",
                "type": "felt"
            },
            {
                "name": "seed",
                "type": "felt"
            },
            {
                "name": "callback_address",
                "type": "felt"
            },
            {
                "name": "callback_gas_limit",
                "type": "felt"
            },
            {
                "name": "minimum_block_number",
                "type": "felt"
            },
            {
                "name": "random_words_len",
                "type": "felt"
            },
            {
                "name": "random_words",
                "type": "felt*"
            },
            {
                "name": "block_hash",
                "type": "felt"
            },
            {
                "name": "proof_len",
                "type": "felt"
            },
            {
                "name": "proof",
                "type": "felt*"
            }
        ],
        "name": "submit_random",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "requestor_address",
                "type": "felt"
            },
            {
                "name": "offset",
                "type": "felt"
            },
            {
                "name": "max_len",
                "type": "felt"
            },
            {
                "name": "request_ids_len",
                "type": "felt"
            },
            {
                "name": "request_ids",
                "type": "felt*"
            }
        ],
        "name": "get_pending_requests",
        "outputs": [
            {
                "name": "requests_len",
                "type": "felt"
            },
            {
                "name": "requests",
                "type": "felt*"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "requestor_address",
                "type": "felt"
            },
            {
                "name": "request_id",
                "type": "felt"
            }
        ],
        "name": "request_id_status",
        "outputs": [
            {
                "name": "status_",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "requestor_address",
                "type": "felt"
            }
        ],
        "name": "requestor_current_index",
        "outputs": [
            {
                "name": "idx",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
