PUBLISHER_REGISTRY_ABI = [
    {
        "data": [
            {"name": "publisher", "type": "felt"},
            {"name": "publisher_address", "type": "felt"},
        ],
        "keys": [],
        "name": "RegisteredPublisher",
        "type": "event",
    },
    {
        "data": [
            {"name": "publisher", "type": "felt"},
            {"name": "old_publisher_address", "type": "felt"},
            {"name": "new_publisher_address", "type": "felt"},
        ],
        "keys": [],
        "name": "UpdatedPublisherAddress",
        "type": "event",
    },
    {
        "data": [
            {"name": "old_admin_address", "type": "felt"},
            {"name": "new_admin_address", "type": "felt"},
        ],
        "keys": [],
        "name": "UpdatedAdminAddress",
        "type": "event",
    },
    {
        "inputs": [{"name": "admin_address", "type": "felt"}],
        "name": "constructor",
        "outputs": [],
        "type": "constructor",
    },
    {
        "inputs": [],
        "name": "get_admin_address",
        "outputs": [{"name": "admin_address", "type": "felt"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"name": "publisher", "type": "felt"}],
        "name": "get_publisher_address",
        "outputs": [{"name": "publisher_address", "type": "felt"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "get_all_publishers",
        "outputs": [
            {"name": "publishers_len", "type": "felt"},
            {"name": "publishers", "type": "felt*"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"name": "publisher", "type": "felt"}],
        "name": "get_publisher_sources",
        "outputs": [
            {"name": "sources_len", "type": "felt"},
            {"name": "sources", "type": "felt*"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"name": "publisher", "type": "felt"},
            {"name": "source", "type": "felt"},
        ],
        "name": "can_publish_source",
        "outputs": [{"name": "is_valid", "type": "felt"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"name": "new_address", "type": "felt"}],
        "name": "set_admin_address",
        "outputs": [],
        "type": "function",
    },
    {
        "inputs": [
            {"name": "publisher", "type": "felt"},
            {"name": "publisher_address", "type": "felt"},
        ],
        "name": "add_publisher",
        "outputs": [],
        "type": "function",
    },
    {
        "inputs": [{"name": "publisher", "type": "felt"}],
        "name": "remove_publisher",
        "outputs": [],
        "type": "function",
    },
    {
        "inputs": [
            {"name": "publisher", "type": "felt"},
            {"name": "new_publisher_address", "type": "felt"},
        ],
        "name": "update_publisher_address",
        "outputs": [],
        "type": "function",
    },
    {
        "inputs": [
            {"name": "publisher", "type": "felt"},
            {"name": "source", "type": "felt"},
        ],
        "name": "add_source_for_publisher",
        "outputs": [],
        "type": "function",
    },
    {
        "inputs": [
            {"name": "publisher", "type": "felt"},
            {"name": "sources_len", "type": "felt"},
            {"name": "sources", "type": "felt*"},
        ],
        "name": "add_sources_for_publisher",
        "outputs": [],
        "type": "function",
    },
    {
        "inputs": [
            {"name": "publisher", "type": "felt"},
            {"name": "source", "type": "felt"},
        ],
        "name": "remove_source_for_publisher",
        "outputs": [],
        "type": "function",
    },
]
