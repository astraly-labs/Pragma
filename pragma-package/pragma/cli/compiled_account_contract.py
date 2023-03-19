# pylint: disable=too-many-lines
COMPILED_ACCOUNT_CONTRACT = r"""{
    "abi": [
        {
            "members": [
                {
                    "name": "to",
                    "offset": 0,
                    "type": "felt"
                },
                {
                    "name": "selector",
                    "offset": 1,
                    "type": "felt"
                },
                {
                    "name": "data_offset",
                    "offset": 2,
                    "type": "felt"
                },
                {
                    "name": "data_len",
                    "offset": 3,
                    "type": "felt"
                }
            ],
            "name": "AccountCallArray",
            "size": 4,
            "type": "struct"
        },
        {
            "inputs": [
                {
                    "name": "public_key",
                    "type": "felt"
                }
            ],
            "name": "constructor",
            "outputs": [],
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getPublicKey",
            "outputs": [
                {
                    "name": "publicKey",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "interfaceId",
                    "type": "felt"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "name": "success",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "newPublicKey",
                    "type": "felt"
                }
            ],
            "name": "setPublicKey",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "hash",
                    "type": "felt"
                },
                {
                    "name": "signature_len",
                    "type": "felt"
                },
                {
                    "name": "signature",
                    "type": "felt*"
                }
            ],
            "name": "isValidSignature",
            "outputs": [
                {
                    "name": "isValid",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "call_array_len",
                    "type": "felt"
                },
                {
                    "name": "call_array",
                    "type": "AccountCallArray*"
                },
                {
                    "name": "calldata_len",
                    "type": "felt"
                },
                {
                    "name": "calldata",
                    "type": "felt*"
                }
            ],
            "name": "__validate__",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "class_hash",
                    "type": "felt"
                }
            ],
            "name": "__validate_declare__",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "call_array_len",
                    "type": "felt"
                },
                {
                    "name": "call_array",
                    "type": "AccountCallArray*"
                },
                {
                    "name": "calldata_len",
                    "type": "felt"
                },
                {
                    "name": "calldata",
                    "type": "felt*"
                }
            ],
            "name": "__execute__",
            "outputs": [
                {
                    "name": "response_len",
                    "type": "felt"
                },
                {
                    "name": "response",
                    "type": "felt*"
                }
            ],
            "type": "function"
        }
    ],
    "entry_points_by_type": {
        "CONSTRUCTOR": [
            {
                "offset": "0x11b",
                "selector": "0x28ffe4ff0f226a9107253e17a904099aa4f63a02a5621de0576e5aa71bc5194"
            }
        ],
        "EXTERNAL": [
            {
                "offset": "0x17a",
                "selector": "0xbc0eb87884ab91e330445c3584a50d7ddf4b568f02fbeb456a6242cce3f5d9"
            },
            {
                "offset": "0x240",
                "selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad"
            },
            {
                "offset": "0x1d1",
                "selector": "0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775"
            },
            {
                "offset": "0x13e",
                "selector": "0x1a6c6a0bdec86cc645c91997d8eea83e87148659e3e61122f72361fd5e94079"
            },
            {
                "offset": "0x1a1",
                "selector": "0x213dfe25e2ca309c4d615a09cfc95fdb2fc7dc73fbcad12c450fe93b1f2ff9e"
            },
            {
                "offset": "0x20c",
                "selector": "0x289da278a8dc833409cabfdad1581e8e7d40e42dcaed693fa4008dcdb4963b3"
            },
            {
                "offset": "0x15f",
                "selector": "0x29e211664c0b63c79638fbea474206ca74016b3e9a3dc4f9ac300ffd8bdf2cd"
            }
        ],
        "L1_HANDLER": []
    },
    "program": {
        "attributes": [
            {
                "accessible_scopes": [
                    "account.library",
                    "account.library.Account",
                    "account.library.Account.assert_only_self"
                ],
                "end_pc": 116,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 13,
                        "offset": 12
                    },
                    "reference_ids": {
                        "account.library.Account.assert_only_self.caller": 81,
                        "account.library.Account.assert_only_self.self": 79,
                        "account.library.Account.assert_only_self.syscall_ptr": 80
                    }
                },
                "name": "error_message",
                "start_pc": 115,
                "value": "Account: caller is not this account"
            },
            {
                "accessible_scopes": [
                    "account.library",
                    "account.library.Account",
                    "account.library.Account.execute"
                ],
                "end_pc": 186,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 18,
                        "offset": 8
                    },
                    "reference_ids": {
                        "account.library.Account.execute.bitwise_ptr": 123,
                        "account.library.Account.execute.call_array": 117,
                        "account.library.Account.execute.call_array_len": 116,
                        "account.library.Account.execute.calldata": 119,
                        "account.library.Account.execute.calldata_len": 118,
                        "account.library.Account.execute.ecdsa_ptr": 122,
                        "account.library.Account.execute.pedersen_ptr": 121,
                        "account.library.Account.execute.range_check_ptr": 124,
                        "account.library.Account.execute.syscall_ptr": 125,
                        "account.library.Account.execute.tx_info": 126
                    }
                },
                "name": "error_message",
                "start_pc": 183,
                "value": "Account: invalid tx version"
            },
            {
                "accessible_scopes": [
                    "account.library",
                    "account.library.Account",
                    "account.library.Account.execute"
                ],
                "end_pc": 191,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 18,
                        "offset": 15
                    },
                    "reference_ids": {
                        "account.library.Account.execute.__temp9": 127,
                        "account.library.Account.execute.bitwise_ptr": 123,
                        "account.library.Account.execute.call_array": 117,
                        "account.library.Account.execute.call_array_len": 116,
                        "account.library.Account.execute.calldata": 119,
                        "account.library.Account.execute.calldata_len": 118,
                        "account.library.Account.execute.caller": 129,
                        "account.library.Account.execute.ecdsa_ptr": 122,
                        "account.library.Account.execute.pedersen_ptr": 121,
                        "account.library.Account.execute.range_check_ptr": 124,
                        "account.library.Account.execute.syscall_ptr": 128,
                        "account.library.Account.execute.tx_info": 126
                    }
                },
                "name": "error_message",
                "start_pc": 189,
                "value": "Account: no reentrant call"
            }
        ],
        "builtins": [
            "pedersen",
            "range_check",
            "ecdsa",
            "bitwise"
        ],
        "compiler_version": "0.10.0",
        "data": [
            "0x40780017fff7fff",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x20780017fff7ffd",
            "0x3",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480080007fff8000",
            "0x400080007ffd7fff",
            "0x482480017ffd8001",
            "0x1",
            "0x482480017ffd8001",
            "0x1",
            "0xa0680017fff7ffe",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffffb",
            "0x402a7ffc7ffd7fff",
            "0x208b7fff7fff7ffe",
            "0x480680017fff8000",
            "0x43616c6c436f6e7472616374",
            "0x400280007ff97fff",
            "0x400380017ff97ffa",
            "0x400380027ff97ffb",
            "0x400380037ff97ffc",
            "0x400380047ff97ffd",
            "0x482680017ff98000",
            "0x7",
            "0x480280057ff98000",
            "0x480280067ff98000",
            "0x208b7fff7fff7ffe",
            "0x480680017fff8000",
            "0x47657443616c6c657241646472657373",
            "0x400280007ffd7fff",
            "0x482680017ffd8000",
            "0x2",
            "0x480280017ffd8000",
            "0x208b7fff7fff7ffe",
            "0x480680017fff8000",
            "0x476574436f6e747261637441646472657373",
            "0x400280007ffd7fff",
            "0x482680017ffd8000",
            "0x2",
            "0x480280017ffd8000",
            "0x208b7fff7fff7ffe",
            "0x480680017fff8000",
            "0x53746f7261676552656164",
            "0x400280007ffc7fff",
            "0x400380017ffc7ffd",
            "0x482680017ffc8000",
            "0x3",
            "0x480280027ffc8000",
            "0x208b7fff7fff7ffe",
            "0x480680017fff8000",
            "0x53746f726167655772697465",
            "0x400280007ffb7fff",
            "0x400380017ffb7ffc",
            "0x400380027ffb7ffd",
            "0x482680017ffb8000",
            "0x3",
            "0x208b7fff7fff7ffe",
            "0x480680017fff8000",
            "0x4765745478496e666f",
            "0x400280007ffd7fff",
            "0x482680017ffd8000",
            "0x2",
            "0x480280017ffd8000",
            "0x208b7fff7fff7ffe",
            "0x400380017ff97ffa",
            "0x400380007ff97ffb",
            "0x482680017ff98000",
            "0x2",
            "0x208b7fff7fff7ffe",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x480680017fff8000",
            "0x1379ac0624b939ceb9dede92211d7db5ee174fe28be72245b0a1a2abd81c98f",
            "0x208b7fff7fff7ffe",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffffa",
            "0x480a7ffb7fff8000",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffda",
            "0x48127ffe7fff8000",
            "0x48127ff57fff8000",
            "0x48127ff57fff8000",
            "0x48127ffc7fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffed",
            "0x480a7ffa7fff8000",
            "0x48127ffe7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd4",
            "0x48127ff67fff8000",
            "0x48127ff67fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffff1",
            "0x208b7fff7fff7ffe",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffb8",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffae",
            "0x40127fff7fff7ff9",
            "0x48127ffe7fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd5",
            "0x208b7fff7fff7ffe",
            "0x482680017ffd8000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffe00365a",
            "0x20680017fff7fff",
            "0x8",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480680017fff8000",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x482680017ffd8000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffff59942a8c",
            "0x20680017fff7fff",
            "0x8",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480680017fff8000",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480680017fff8000",
            "0x0",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd7",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffbf",
            "0x208b7fff7fff7ffe",
            "0x480a7ff77fff8000",
            "0x480a7ff87fff8000",
            "0x480a7ffa7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffac",
            "0x480a7ff97fff8000",
            "0x480a7ffb7fff8000",
            "0x48127ffd7fff8000",
            "0x480280007ffd8000",
            "0x480280017ffd8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff9b",
            "0x48127ff47fff8000",
            "0x48127ff47fff8000",
            "0x48127ffd7fff8000",
            "0x48127ff37fff8000",
            "0x480680017fff8000",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x2",
            "0x480a7ff57fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff88",
            "0x480680017fff8000",
            "0x1",
            "0x400080007ffe7fff",
            "0x48127ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff64",
            "0x400680017fff7fff",
            "0x0",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff42",
            "0x40137fff7fff8000",
            "0x48127ffb7fff8000",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffd7fff8000",
            "0x480a80007fff8000",
            "0x1104800180018000",
            "0x35",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff38",
            "0x40137fff7fff8001",
            "0x48127ffc7fff8000",
            "0x480a7ffa7fff8000",
            "0x480a80007fff8000",
            "0x480a80017fff8000",
            "0x1104800180018000",
            "0xa",
            "0x48127ffe7fff8000",
            "0x480a7ff67fff8000",
            "0x480a7ff77fff8000",
            "0x480a7ff87fff8000",
            "0x480a7ff97fff8000",
            "0x48127ffa7fff8000",
            "0x480a80017fff8000",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x3",
            "0x20780017fff7ffb",
            "0x6",
            "0x480a7ffa7fff8000",
            "0x480680017fff8000",
            "0x0",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480280007ffc8000",
            "0x480280017ffc8000",
            "0x480280027ffc8000",
            "0x480280037ffc8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff2c",
            "0x40137ffe7fff8000",
            "0x40137fff7fff8001",
            "0x40137ffd7fff8002",
            "0x480a7ffd7fff8000",
            "0x480a80017fff8000",
            "0x480a80007fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff15",
            "0x480a80027fff8000",
            "0x482680017ffb8000",
            "0x800000000000011000000000000000000000000000000000000000000000000",
            "0x482680017ffc8000",
            "0x4",
            "0x482a80007ffd8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffe4",
            "0x48127ffe7fff8000",
            "0x482880007ffe8000",
            "0x208b7fff7fff7ffe",
            "0x20780017fff7ffa",
            "0x4",
            "0x480a7ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480280007ffb8000",
            "0x400280007ffd7fff",
            "0x480280017ffb8000",
            "0x400280017ffd7fff",
            "0x480280037ffb8000",
            "0x400280027ffd7fff",
            "0x480280027ffb8000",
            "0x48327fff7ffc8000",
            "0x400280037ffd7fff",
            "0x480a7ff97fff8000",
            "0x482680017ffa8000",
            "0x800000000000011000000000000000000000000000000000000000000000000",
            "0x482680017ffb8000",
            "0x4",
            "0x480a7ffc7fff8000",
            "0x482680017ffd8000",
            "0x4",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffec",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff4f",
            "0x208b7fff7fff7ffe",
            "0x482680017ffd8000",
            "0x1",
            "0x402a7ffd7ffc7fff",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280027ffb8000",
            "0x480280007ffd8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffff3",
            "0x40780017fff7fff",
            "0x1",
            "0x48127ffc7fff8000",
            "0x48127ffc7fff8000",
            "0x48127ffc7fff8000",
            "0x480280037ffb8000",
            "0x480280047ffb8000",
            "0x480680017fff8000",
            "0x0",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff45",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x1",
            "0x4003800080007ffc",
            "0x4826800180008000",
            "0x1",
            "0x480a7ffd7fff8000",
            "0x4828800080007ffe",
            "0x480a80007fff8000",
            "0x208b7fff7fff7ffe",
            "0x402b7ffd7ffc7ffd",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280027ffb8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffee",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffff1",
            "0x48127ff47fff8000",
            "0x48127ff47fff8000",
            "0x48127ffb7fff8000",
            "0x480280037ffb8000",
            "0x480280047ffb8000",
            "0x48127ff97fff8000",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff2a",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x1",
            "0x4003800080007ffc",
            "0x4826800180008000",
            "0x1",
            "0x480a7ffd7fff8000",
            "0x4828800080007ffe",
            "0x480a80007fff8000",
            "0x208b7fff7fff7ffe",
            "0x482680017ffd8000",
            "0x1",
            "0x402a7ffd7ffc7fff",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280027ffb8000",
            "0x480280007ffd8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffea",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffee",
            "0x48127ff47fff8000",
            "0x48127ff47fff8000",
            "0x48127ffb7fff8000",
            "0x480280037ffb8000",
            "0x480280047ffb8000",
            "0x48127ff97fff8000",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff20",
            "0x208b7fff7fff7ffe",
            "0x482680017ffd8000",
            "0x1",
            "0x402a7ffd7ffc7fff",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280027ffb8000",
            "0x480280007ffd8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffff3",
            "0x40780017fff7fff",
            "0x1",
            "0x48127ffc7fff8000",
            "0x48127ffc7fff8000",
            "0x48127ffc7fff8000",
            "0x480280037ffb8000",
            "0x480280047ffb8000",
            "0x480680017fff8000",
            "0x0",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ff77fff8000",
            "0x480a7ff87fff8000",
            "0x480a7ff97fff8000",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff0b",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x1",
            "0x4003800080007ffc",
            "0x4826800180008000",
            "0x1",
            "0x480a7ffd7fff8000",
            "0x4828800080007ffe",
            "0x480a80007fff8000",
            "0x208b7fff7fff7ffe",
            "0x480280027ffb8000",
            "0x480280017ffd8000",
            "0x400080007ffe7fff",
            "0x482680017ffd8000",
            "0x2",
            "0x480280017ffd8000",
            "0x48307fff7ffe8000",
            "0x402a7ffd7ffc7fff",
            "0x480280027ffb8000",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280037ffb8000",
            "0x482480017ffc8000",
            "0x1",
            "0x480280007ffd8000",
            "0x480280017ffd8000",
            "0x482680017ffd8000",
            "0x2",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffdc",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffe3",
            "0x48127ff37fff8000",
            "0x48127ff37fff8000",
            "0x48127ffb7fff8000",
            "0x48127ff27fff8000",
            "0x480280047ffb8000",
            "0x48127ff97fff8000",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ff67fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe7c",
            "0x48127ffe7fff8000",
            "0x480a7ff77fff8000",
            "0x480a7ff87fff8000",
            "0x480a7ff97fff8000",
            "0x480080057ffb8000",
            "0x480080037ffa8000",
            "0x480080047ff98000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffed6",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x208b7fff7fff7ffe",
            "0x480280027ffb8000",
            "0x480280007ffd8000",
            "0x400080007ffe7fff",
            "0x482680017ffd8000",
            "0x1",
            "0x480280007ffd8000",
            "0x484480017fff8000",
            "0x4",
            "0x48307fff7ffd8000",
            "0x480280027ffb8000",
            "0x480080007ffe8000",
            "0x400080017ffe7fff",
            "0x482480017ffd8000",
            "0x1",
            "0x480080007ffc8000",
            "0x48307fff7ffe8000",
            "0x402a7ffd7ffc7fff",
            "0x480280027ffb8000",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280037ffb8000",
            "0x482480017ffc8000",
            "0x2",
            "0x480280007ffd8000",
            "0x482680017ffd8000",
            "0x1",
            "0x480080007ff38000",
            "0x482480017ff28000",
            "0x1",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd3",
            "0x40780017fff7fff",
            "0x1",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffc7fff8000",
            "0x48127ffa7fff8000",
            "0x480280047ffb8000",
            "0x480680017fff8000",
            "0x0",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ff97fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe41",
            "0x48127ffe7fff8000",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480080057ffb8000",
            "0x480080037ffa8000",
            "0x480080047ff98000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe9b",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x208b7fff7fff7ffe",
            "0x482680017ffd8000",
            "0x1",
            "0x402a7ffd7ffc7fff",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280037ffb8000",
            "0x480280027ffb8000",
            "0x480280007ffd8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffe8",
            "0x40780017fff7fff",
            "0x1",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffc7fff8000",
            "0x48127ffa7fff8000",
            "0x480280047ffb8000",
            "0x480680017fff8000",
            "0x0",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ff57fff8000",
            "0x480a7ff67fff8000",
            "0x480a7ff77fff8000",
            "0x480a7ff87fff8000",
            "0x480a7ff97fff8000",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe89",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x3",
            "0x4003800080007ffb",
            "0x400380007ffd7ffb",
            "0x402780017ffd8001",
            "0x1",
            "0x4826800180008000",
            "0x1",
            "0x40297ffb7fff8002",
            "0x4826800180008000",
            "0x1",
            "0x480a7ffc7fff8000",
            "0x480a7ffb7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffdca",
            "0x480a80017fff8000",
            "0x4829800080008002",
            "0x480a80007fff8000",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x4",
            "0x480280027ffb8000",
            "0x480280007ffd8000",
            "0x400080007ffe7fff",
            "0x482680017ffd8000",
            "0x1",
            "0x480280007ffd8000",
            "0x484480017fff8000",
            "0x4",
            "0x48307fff7ffd8000",
            "0x480280027ffb8000",
            "0x480080007ffe8000",
            "0x400080017ffe7fff",
            "0x482480017ffd8000",
            "0x1",
            "0x480080007ffc8000",
            "0x48307fff7ffe8000",
            "0x402a7ffd7ffc7fff",
            "0x480280027ffb8000",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x480280037ffb8000",
            "0x480280047ffb8000",
            "0x482480017ffb8000",
            "0x2",
            "0x480280007ffd8000",
            "0x482680017ffd8000",
            "0x1",
            "0x480080007ff28000",
            "0x482480017ff18000",
            "0x1",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffc2",
            "0x40137ff97fff8000",
            "0x40137ffa7fff8001",
            "0x40137ffb7fff8002",
            "0x40137ffc7fff8003",
            "0x48127ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffc7",
            "0x480a80007fff8000",
            "0x480a80017fff8000",
            "0x48127ffb7fff8000",
            "0x480a80027fff8000",
            "0x480a80037fff8000",
            "0x48127ff97fff8000",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe"
        ],
        "debug_info": null,
        "hints": {
            "0": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.alloc",
                        "starkware.cairo.common.alloc.alloc"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 0,
                            "offset": 0
                        },
                        "reference_ids": {}
                    }
                }
            ],
            "6": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.memcpy",
                        "starkware.cairo.common.memcpy.memcpy"
                    ],
                    "code": "vm_enter_scope({'n': ids.len})",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 1,
                            "offset": 0
                        },
                        "reference_ids": {
                            "starkware.cairo.common.memcpy.memcpy.dst": 0,
                            "starkware.cairo.common.memcpy.memcpy.len": 2,
                            "starkware.cairo.common.memcpy.memcpy.src": 1
                        }
                    }
                }
            ],
            "14": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.memcpy",
                        "starkware.cairo.common.memcpy.memcpy"
                    ],
                    "code": "n -= 1\nids.continue_copying = 1 if n > 0 else 0",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 1,
                            "offset": 5
                        },
                        "reference_ids": {
                            "starkware.cairo.common.memcpy.memcpy.__temp0": 5,
                            "starkware.cairo.common.memcpy.memcpy.continue_copying": 6,
                            "starkware.cairo.common.memcpy.memcpy.dst": 0,
                            "starkware.cairo.common.memcpy.memcpy.frame": 4,
                            "starkware.cairo.common.memcpy.memcpy.len": 2,
                            "starkware.cairo.common.memcpy.memcpy.next_frame": 7,
                            "starkware.cairo.common.memcpy.memcpy.src": 1
                        }
                    }
                }
            ],
            "17": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.memcpy",
                        "starkware.cairo.common.memcpy.memcpy"
                    ],
                    "code": "vm_exit_scope()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 1,
                            "offset": 6
                        },
                        "reference_ids": {
                            "starkware.cairo.common.memcpy.memcpy.__temp0": 5,
                            "starkware.cairo.common.memcpy.memcpy.continue_copying": 6,
                            "starkware.cairo.common.memcpy.memcpy.dst": 0,
                            "starkware.cairo.common.memcpy.memcpy.frame": 4,
                            "starkware.cairo.common.memcpy.memcpy.len": 2,
                            "starkware.cairo.common.memcpy.memcpy.next_frame": 7,
                            "starkware.cairo.common.memcpy.memcpy.src": 1
                        }
                    }
                }
            ],
            "25": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.call_contract"
                    ],
                    "code": "syscall_handler.call_contract(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 2,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.call_contract.__temp1": 14,
                            "starkware.starknet.common.syscalls.call_contract.calldata": 11,
                            "starkware.starknet.common.syscalls.call_contract.calldata_size": 10,
                            "starkware.starknet.common.syscalls.call_contract.contract_address": 8,
                            "starkware.starknet.common.syscalls.call_contract.function_selector": 9,
                            "starkware.starknet.common.syscalls.call_contract.syscall": 13,
                            "starkware.starknet.common.syscalls.call_contract.syscall_ptr": 12
                        }
                    }
                }
            ],
            "33": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.get_caller_address"
                    ],
                    "code": "syscall_handler.get_caller_address(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 3,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.get_caller_address.__temp2": 19,
                            "starkware.starknet.common.syscalls.get_caller_address.syscall": 18,
                            "starkware.starknet.common.syscalls.get_caller_address.syscall_ptr": 17
                        }
                    }
                }
            ],
            "40": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.get_contract_address"
                    ],
                    "code": "syscall_handler.get_contract_address(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 4,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.get_contract_address.__temp3": 23,
                            "starkware.starknet.common.syscalls.get_contract_address.syscall": 22,
                            "starkware.starknet.common.syscalls.get_contract_address.syscall_ptr": 21
                        }
                    }
                }
            ],
            "48": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.storage_read"
                    ],
                    "code": "syscall_handler.storage_read(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 5,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.storage_read.__temp4": 28,
                            "starkware.starknet.common.syscalls.storage_read.address": 25,
                            "starkware.starknet.common.syscalls.storage_read.syscall": 27,
                            "starkware.starknet.common.syscalls.storage_read.syscall_ptr": 26
                        }
                    }
                }
            ],
            "57": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.storage_write"
                    ],
                    "code": "syscall_handler.storage_write(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 6,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.storage_write.__temp5": 34,
                            "starkware.starknet.common.syscalls.storage_write.address": 31,
                            "starkware.starknet.common.syscalls.storage_write.syscall_ptr": 33,
                            "starkware.starknet.common.syscalls.storage_write.value": 32
                        }
                    }
                }
            ],
            "63": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.get_tx_info"
                    ],
                    "code": "syscall_handler.get_tx_info(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 7,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.get_tx_info.__temp6": 38,
                            "starkware.starknet.common.syscalls.get_tx_info.syscall": 37,
                            "starkware.starknet.common.syscalls.get_tx_info.syscall_ptr": 36
                        }
                    }
                }
            ],
            "67": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.signature",
                        "starkware.cairo.common.signature.verify_ecdsa_signature"
                    ],
                    "code": "ecdsa_builtin.add_signature(ids.ecdsa_ptr.address_, (ids.signature_r, ids.signature_s))",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 8,
                            "offset": 0
                        },
                        "reference_ids": {
                            "starkware.cairo.common.signature.verify_ecdsa_signature.ecdsa_ptr": 45,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.message": 41,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.public_key": 42,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.signature_r": 43,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.signature_s": 44
                        }
                    }
                }
            ],
            "292": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.constructor"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 27,
                            "offset": 35
                        },
                        "reference_ids": {
                            "__wrappers__.constructor.__calldata_actual_size": 175,
                            "__wrappers__.constructor.__calldata_arg_public_key": 173,
                            "__wrappers__.constructor.__calldata_ptr": 174,
                            "__wrappers__.constructor.__temp15": 176,
                            "__wrappers__.constructor.bitwise_ptr": 171,
                            "__wrappers__.constructor.ecdsa_ptr": 170,
                            "__wrappers__.constructor.pedersen_ptr": 178,
                            "__wrappers__.constructor.range_check_ptr": 179,
                            "__wrappers__.constructor.ret_value": 180,
                            "__wrappers__.constructor.syscall_ptr": 177
                        }
                    }
                }
            ],
            "309": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.getPublicKey_encode_return"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 29,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.getPublicKey_encode_return.range_check_ptr": 191,
                            "__wrappers__.getPublicKey_encode_return.ret_value": 190
                        }
                    }
                }
            ],
            "342": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.supportsInterface_encode_return"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 33,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.supportsInterface_encode_return.range_check_ptr": 218,
                            "__wrappers__.supportsInterface_encode_return.ret_value": 217
                        }
                    }
                }
            ],
            "387": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.setPublicKey"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 37,
                            "offset": 50
                        },
                        "reference_ids": {
                            "__wrappers__.setPublicKey.__calldata_actual_size": 255,
                            "__wrappers__.setPublicKey.__calldata_arg_newPublicKey": 253,
                            "__wrappers__.setPublicKey.__calldata_ptr": 254,
                            "__wrappers__.setPublicKey.__temp19": 256,
                            "__wrappers__.setPublicKey.bitwise_ptr": 251,
                            "__wrappers__.setPublicKey.ecdsa_ptr": 250,
                            "__wrappers__.setPublicKey.pedersen_ptr": 258,
                            "__wrappers__.setPublicKey.range_check_ptr": 259,
                            "__wrappers__.setPublicKey.ret_value": 260,
                            "__wrappers__.setPublicKey.syscall_ptr": 257
                        }
                    }
                }
            ],
            "408": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.isValidSignature_encode_return"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 39,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.isValidSignature_encode_return.range_check_ptr": 276,
                            "__wrappers__.isValidSignature_encode_return.ret_value": 275
                        }
                    }
                }
            ],
            "496": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.__validate__"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 42,
                            "offset": 77
                        },
                        "reference_ids": {
                            "__wrappers__.__validate__.__calldata_actual_size": 347,
                            "__wrappers__.__validate__.__calldata_arg_call_array": 333,
                            "__wrappers__.__validate__.__calldata_arg_call_array_len": 328,
                            "__wrappers__.__validate__.__calldata_arg_calldata": 343,
                            "__wrappers__.__validate__.__calldata_arg_calldata_len": 338,
                            "__wrappers__.__validate__.__calldata_ptr": 346,
                            "__wrappers__.__validate__.__temp26": 330,
                            "__wrappers__.__validate__.__temp27": 331,
                            "__wrappers__.__validate__.__temp28": 334,
                            "__wrappers__.__validate__.__temp29": 335,
                            "__wrappers__.__validate__.__temp30": 336,
                            "__wrappers__.__validate__.__temp31": 340,
                            "__wrappers__.__validate__.__temp32": 341,
                            "__wrappers__.__validate__.__temp33": 344,
                            "__wrappers__.__validate__.__temp34": 345,
                            "__wrappers__.__validate__.__temp35": 348,
                            "__wrappers__.__validate__.bitwise_ptr": 326,
                            "__wrappers__.__validate__.ecdsa_ptr": 351,
                            "__wrappers__.__validate__.pedersen_ptr": 350,
                            "__wrappers__.__validate__.range_check_ptr": 352,
                            "__wrappers__.__validate__.ret_value": 353,
                            "__wrappers__.__validate__.syscall_ptr": 349
                        }
                    }
                }
            ],
            "534": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.__validate_declare__"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 44,
                            "offset": 63
                        },
                        "reference_ids": {
                            "__wrappers__.__validate_declare__.__calldata_actual_size": 375,
                            "__wrappers__.__validate_declare__.__calldata_arg_class_hash": 373,
                            "__wrappers__.__validate_declare__.__calldata_ptr": 374,
                            "__wrappers__.__validate_declare__.__temp36": 376,
                            "__wrappers__.__validate_declare__.bitwise_ptr": 371,
                            "__wrappers__.__validate_declare__.ecdsa_ptr": 379,
                            "__wrappers__.__validate_declare__.pedersen_ptr": 378,
                            "__wrappers__.__validate_declare__.range_check_ptr": 380,
                            "__wrappers__.__validate_declare__.ret_value": 381,
                            "__wrappers__.__validate_declare__.syscall_ptr": 377
                        }
                    }
                }
            ],
            "557": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.__execute___encode_return"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 47,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.__execute___encode_return.range_check_ptr": 401,
                            "__wrappers__.__execute___encode_return.ret_value": 400
                        }
                    }
                }
            ]
        },
        "identifiers": {
            "__main__.Account": {
                "destination": "account.library.Account",
                "type": "alias"
            },
            "__main__.AccountCallArray": {
                "destination": "account.library.AccountCallArray",
                "type": "alias"
            },
            "__main__.BitwiseBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "type": "alias"
            },
            "__main__.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "__main__.SignatureBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.SignatureBuiltin",
                "type": "alias"
            },
            "__main__.__execute__": {
                "decorators": [
                    "external"
                ],
                "pc": 545,
                "type": "function"
            },
            "__main__.__execute__.Args": {
                "full_name": "__main__.__execute__.Args",
                "members": {
                    "call_array": {
                        "cairo_type": "account.library.AccountCallArray*",
                        "offset": 1
                    },
                    "call_array_len": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 3
                    },
                    "calldata_len": {
                        "cairo_type": "felt",
                        "offset": 2
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "__main__.__execute__.ImplicitArgs": {
                "full_name": "__main__.__execute__.ImplicitArgs",
                "members": {
                    "bitwise_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                        "offset": 3
                    },
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 2
                    },
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 4
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "__main__.__execute__.Return": {
                "cairo_type": "(response_len: felt, response: felt*)",
                "type": "type_definition"
            },
            "__main__.__execute__.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.__execute__.bitwise_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                "full_name": "__main__.__execute__.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 556,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "__main__.__execute__.call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.call_array_len": {
                "cairo_type": "felt",
                "full_name": "__main__.__execute__.call_array_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-6), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.calldata": {
                "cairo_type": "felt*",
                "full_name": "__main__.__execute__.calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.calldata_len": {
                "cairo_type": "felt",
                "full_name": "__main__.__execute__.calldata_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__main__.__execute__.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 556,
                        "value": "[cast(ap + (-5), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.__execute__.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-10), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 556,
                        "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.__execute__.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-7), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 556,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.response": {
                "cairo_type": "felt*",
                "full_name": "__main__.__execute__.response",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 556,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.response_len": {
                "cairo_type": "felt",
                "full_name": "__main__.__execute__.response_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 556,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.__execute__.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 545,
                        "value": "[cast(fp + (-11), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 556,
                        "value": "[cast(ap + (-7), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__": {
                "decorators": [
                    "external"
                ],
                "pc": 448,
                "type": "function"
            },
            "__main__.__validate__.Args": {
                "full_name": "__main__.__validate__.Args",
                "members": {
                    "call_array": {
                        "cairo_type": "account.library.AccountCallArray*",
                        "offset": 1
                    },
                    "call_array_len": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 3
                    },
                    "calldata_len": {
                        "cairo_type": "felt",
                        "offset": 2
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "__main__.__validate__.ImplicitArgs": {
                "full_name": "__main__.__validate__.ImplicitArgs",
                "members": {
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 2
                    },
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "__main__.__validate__.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "__main__.__validate__.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.__validate__.call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "__main__.__validate__.call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.call_array_len": {
                "cairo_type": "felt",
                "full_name": "__main__.__validate__.call_array_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-6), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.calldata": {
                "cairo_type": "felt*",
                "full_name": "__main__.__validate__.calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.calldata_len": {
                "cairo_type": "felt",
                "full_name": "__main__.__validate__.calldata_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__main__.__validate__.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 51
                        },
                        "pc": 460,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.__validate__.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 51
                        },
                        "pc": 460,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.__validate__.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-7), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 51
                        },
                        "pc": 460,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.__validate__.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 448,
                        "value": "[cast(fp + (-10), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 6
                        },
                        "pc": 451,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 51
                        },
                        "pc": 460,
                        "value": "[cast(ap + (-5), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate__.tx_info": {
                "cairo_type": "starkware.starknet.common.syscalls.TxInfo*",
                "full_name": "__main__.__validate__.tx_info",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 6
                        },
                        "pc": 451,
                        "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate_declare__": {
                "decorators": [
                    "external"
                ],
                "pc": 507,
                "type": "function"
            },
            "__main__.__validate_declare__.Args": {
                "full_name": "__main__.__validate_declare__.Args",
                "members": {
                    "class_hash": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "__main__.__validate_declare__.ImplicitArgs": {
                "full_name": "__main__.__validate_declare__.ImplicitArgs",
                "members": {
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 2
                    },
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "__main__.__validate_declare__.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "__main__.__validate_declare__.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.__validate_declare__.class_hash": {
                "cairo_type": "felt",
                "full_name": "__main__.__validate_declare__.class_hash",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 0
                        },
                        "pc": 507,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate_declare__.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__main__.__validate_declare__.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 0
                        },
                        "pc": 507,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 51
                        },
                        "pc": 519,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate_declare__.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.__validate_declare__.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 0
                        },
                        "pc": 507,
                        "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 51
                        },
                        "pc": 519,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate_declare__.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.__validate_declare__.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 0
                        },
                        "pc": 507,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 51
                        },
                        "pc": 519,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate_declare__.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.__validate_declare__.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 0
                        },
                        "pc": 507,
                        "value": "[cast(fp + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 6
                        },
                        "pc": 510,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 51
                        },
                        "pc": 519,
                        "value": "[cast(ap + (-5), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__validate_declare__.tx_info": {
                "cairo_type": "starkware.starknet.common.syscalls.TxInfo*",
                "full_name": "__main__.__validate_declare__.tx_info",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 6
                        },
                        "pc": 510,
                        "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.constructor": {
                "decorators": [
                    "constructor"
                ],
                "pc": 276,
                "type": "function"
            },
            "__main__.constructor.Args": {
                "full_name": "__main__.constructor.Args",
                "members": {
                    "public_key": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "__main__.constructor.ImplicitArgs": {
                "full_name": "__main__.constructor.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "__main__.constructor.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "__main__.constructor.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.constructor.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.constructor.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 0
                        },
                        "pc": 276,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 28
                        },
                        "pc": 282,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.constructor.public_key": {
                "cairo_type": "felt",
                "full_name": "__main__.constructor.public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 0
                        },
                        "pc": 276,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.constructor.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.constructor.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 0
                        },
                        "pc": 276,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 28
                        },
                        "pc": 282,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.constructor.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.constructor.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 0
                        },
                        "pc": 276,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 28
                        },
                        "pc": 282,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.getPublicKey": {
                "decorators": [
                    "view"
                ],
                "pc": 303,
                "type": "function"
            },
            "__main__.getPublicKey.Args": {
                "full_name": "__main__.getPublicKey.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__main__.getPublicKey.ImplicitArgs": {
                "full_name": "__main__.getPublicKey.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "__main__.getPublicKey.Return": {
                "cairo_type": "(publicKey: felt)",
                "type": "type_definition"
            },
            "__main__.getPublicKey.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.getPublicKey.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.getPublicKey.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 0
                        },
                        "pc": 303,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 28
                        },
                        "pc": 308,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.getPublicKey.publicKey": {
                "cairo_type": "felt",
                "full_name": "__main__.getPublicKey.publicKey",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 28
                        },
                        "pc": 308,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.getPublicKey.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.getPublicKey.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 0
                        },
                        "pc": 303,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 28
                        },
                        "pc": 308,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.getPublicKey.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.getPublicKey.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 0
                        },
                        "pc": 303,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 28
                        },
                        "pc": 308,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_tx_info": {
                "destination": "starkware.starknet.common.syscalls.get_tx_info",
                "type": "alias"
            },
            "__main__.isValidSignature": {
                "decorators": [
                    "view"
                ],
                "pc": 398,
                "type": "function"
            },
            "__main__.isValidSignature.Args": {
                "full_name": "__main__.isValidSignature.Args",
                "members": {
                    "hash": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "signature": {
                        "cairo_type": "felt*",
                        "offset": 2
                    },
                    "signature_len": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "__main__.isValidSignature.ImplicitArgs": {
                "full_name": "__main__.isValidSignature.ImplicitArgs",
                "members": {
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 2
                    },
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "__main__.isValidSignature.Return": {
                "cairo_type": "(isValid: felt)",
                "type": "type_definition"
            },
            "__main__.isValidSignature.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.isValidSignature.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__main__.isValidSignature.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 398,
                        "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 45
                        },
                        "pc": 407,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.isValidSignature.hash": {
                "cairo_type": "felt",
                "full_name": "__main__.isValidSignature.hash",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 398,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.isValidSignature.isValid": {
                "cairo_type": "felt",
                "full_name": "__main__.isValidSignature.isValid",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 45
                        },
                        "pc": 407,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.isValidSignature.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.isValidSignature.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 398,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 45
                        },
                        "pc": 407,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.isValidSignature.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.isValidSignature.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 398,
                        "value": "[cast(fp + (-6), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 45
                        },
                        "pc": 407,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.isValidSignature.signature": {
                "cairo_type": "felt*",
                "full_name": "__main__.isValidSignature.signature",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 398,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.isValidSignature.signature_len": {
                "cairo_type": "felt",
                "full_name": "__main__.isValidSignature.signature_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 398,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.isValidSignature.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.isValidSignature.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 398,
                        "value": "[cast(fp + (-9), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 45
                        },
                        "pc": 407,
                        "value": "[cast(ap + (-5), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.setPublicKey": {
                "decorators": [
                    "external"
                ],
                "pc": 371,
                "type": "function"
            },
            "__main__.setPublicKey.Args": {
                "full_name": "__main__.setPublicKey.Args",
                "members": {
                    "newPublicKey": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "__main__.setPublicKey.ImplicitArgs": {
                "full_name": "__main__.setPublicKey.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "__main__.setPublicKey.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "__main__.setPublicKey.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.setPublicKey.newPublicKey": {
                "cairo_type": "felt",
                "full_name": "__main__.setPublicKey.newPublicKey",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 371,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.setPublicKey.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.setPublicKey.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 371,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 43
                        },
                        "pc": 377,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.setPublicKey.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.setPublicKey.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 371,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 43
                        },
                        "pc": 377,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.setPublicKey.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.setPublicKey.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 371,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 43
                        },
                        "pc": 377,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.supportsInterface": {
                "decorators": [
                    "view"
                ],
                "pc": 335,
                "type": "function"
            },
            "__main__.supportsInterface.Args": {
                "full_name": "__main__.supportsInterface.Args",
                "members": {
                    "interfaceId": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "__main__.supportsInterface.ImplicitArgs": {
                "full_name": "__main__.supportsInterface.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "__main__.supportsInterface.Return": {
                "cairo_type": "(success: felt)",
                "type": "type_definition"
            },
            "__main__.supportsInterface.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.supportsInterface.interfaceId": {
                "cairo_type": "felt",
                "full_name": "__main__.supportsInterface.interfaceId",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 0
                        },
                        "pc": 335,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.supportsInterface.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.supportsInterface.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 0
                        },
                        "pc": 335,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 32,
                            "offset": 0
                        },
                        "pc": 341,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.supportsInterface.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.supportsInterface.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 0
                        },
                        "pc": 335,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 32,
                            "offset": 0
                        },
                        "pc": 341,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.supportsInterface.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.supportsInterface.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 0
                        },
                        "pc": 335,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 32,
                            "offset": 0
                        },
                        "pc": 341,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__": {
                "decorators": [
                    "external"
                ],
                "pc": 576,
                "type": "function"
            },
            "__wrappers__.__execute__.Args": {
                "full_name": "__wrappers__.__execute__.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.__execute__.ImplicitArgs": {
                "full_name": "__wrappers__.__execute__.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.__execute__.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: starkware.cairo.common.cairo_builtins.SignatureBuiltin*, bitwise_ptr: starkware.cairo.common.cairo_builtins.BitwiseBuiltin*, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.__execute__.SIZEOF_LOCALS": {
                "type": "const",
                "value": 4
            },
            "__wrappers__.__execute__.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 15
                        },
                        "pc": 594,
                        "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__calldata_arg_call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "__wrappers__.__execute__.__calldata_arg_call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 6
                        },
                        "pc": 581,
                        "value": "cast([fp + (-3)] + 1, account.library.AccountCallArray*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__calldata_arg_call_array_len": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__calldata_arg_call_array_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__calldata_arg_calldata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__execute__.__calldata_arg_calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 12
                        },
                        "pc": 590,
                        "value": "cast([ap + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__calldata_arg_calldata_len": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__calldata_arg_calldata_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 10
                        },
                        "pc": 587,
                        "value": "[cast([ap + (-1)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__execute__.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 10
                        },
                        "pc": 587,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 10
                        },
                        "pc": 587,
                        "value": "cast([ap + (-1)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 15
                        },
                        "pc": 594,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp38": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp38",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 5
                        },
                        "pc": 579,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp39": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp39",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 6
                        },
                        "pc": 580,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp40": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp40",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 7
                        },
                        "pc": 583,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp41": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp41",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 8
                        },
                        "pc": 584,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp42": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp42",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 9
                        },
                        "pc": 586,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp43": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp43",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 11
                        },
                        "pc": 588,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp44": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp44",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 12
                        },
                        "pc": 589,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp45": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp45",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 13
                        },
                        "pc": 592,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp46": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp46",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 14
                        },
                        "pc": 593,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp47": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp47",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 16
                        },
                        "pc": 596,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__wrapped_func": {
                "destination": "__main__.__execute__",
                "type": "alias"
            },
            "__wrappers__.__execute__.bitwise_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                "full_name": "__wrappers__.__execute__.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "[cast([fp + (-5)] + 4, starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 610,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 614,
                        "value": "[cast(fp + 3, starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__wrappers__.__execute__.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 610,
                        "value": "[cast(ap + (-5), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 613,
                        "value": "[cast(fp + 2, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.__execute__.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 610,
                        "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 612,
                        "value": "[cast(fp + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 6
                        },
                        "pc": 581,
                        "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 12
                        },
                        "pc": 590,
                        "value": "cast([[fp + (-5)] + 2] + 2, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 610,
                        "value": "[cast(ap + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 617,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.ret_value": {
                "cairo_type": "(response_len: felt, response: felt*)",
                "full_name": "__wrappers__.__execute__.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 610,
                        "value": "[cast(ap + (-2), (response_len: felt, response: felt*)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__execute__.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 617,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 617,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__execute__.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 4
                        },
                        "pc": 578,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 610,
                        "value": "[cast(ap + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 611,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return": {
                "decorators": [],
                "pc": 557,
                "type": "function"
            },
            "__wrappers__.__execute___encode_return.Args": {
                "full_name": "__wrappers__.__execute___encode_return.Args",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "ret_value": {
                        "cairo_type": "(response_len: felt, response: felt*)",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "__wrappers__.__execute___encode_return.ImplicitArgs": {
                "full_name": "__wrappers__.__execute___encode_return.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.__execute___encode_return.Return": {
                "cairo_type": "(range_check_ptr: felt, data_len: felt, data: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.__execute___encode_return.SIZEOF_LOCALS": {
                "type": "const",
                "value": 3
            },
            "__wrappers__.__execute___encode_return.__return_value_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__execute___encode_return.__return_value_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 3
                        },
                        "pc": 559,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 3
                        },
                        "pc": 560,
                        "value": "cast([fp] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 4
                        },
                        "pc": 566,
                        "value": "[cast(fp + 2, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return.__return_value_ptr_copy": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__execute___encode_return.__return_value_ptr_copy",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 3
                        },
                        "pc": 563,
                        "value": "cast([fp] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return.__return_value_ptr_start": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__execute___encode_return.__return_value_ptr_start",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 3
                        },
                        "pc": 559,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return.__temp37": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute___encode_return.__temp37",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 4
                        },
                        "pc": 565,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.__execute___encode_return.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute___encode_return.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 0
                        },
                        "pc": 557,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 3
                        },
                        "pc": 563,
                        "value": "[cast(fp + 1, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return.ret_value": {
                "cairo_type": "(response_len: felt, response: felt*)",
                "full_name": "__wrappers__.__execute___encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 0
                        },
                        "pc": 557,
                        "value": "[cast(fp + (-5), (response_len: felt, response: felt*)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__": {
                "decorators": [
                    "external"
                ],
                "pc": 465,
                "type": "function"
            },
            "__wrappers__.__validate__.Args": {
                "full_name": "__wrappers__.__validate__.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.__validate__.ImplicitArgs": {
                "full_name": "__wrappers__.__validate__.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.__validate__.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: starkware.cairo.common.cairo_builtins.SignatureBuiltin*, bitwise_ptr: felt, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.__validate__.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.__validate__.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 11
                        },
                        "pc": 481,
                        "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__calldata_arg_call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "__wrappers__.__validate__.__calldata_arg_call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 2
                        },
                        "pc": 468,
                        "value": "cast([fp + (-3)] + 1, account.library.AccountCallArray*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__calldata_arg_call_array_len": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__calldata_arg_call_array_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__calldata_arg_calldata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__validate__.__calldata_arg_calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 8
                        },
                        "pc": 477,
                        "value": "cast([ap + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__calldata_arg_calldata_len": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__calldata_arg_calldata_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 6
                        },
                        "pc": 474,
                        "value": "[cast([ap + (-1)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__validate__.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 6
                        },
                        "pc": 474,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 6
                        },
                        "pc": 474,
                        "value": "cast([ap + (-1)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 11
                        },
                        "pc": 481,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp26": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp26",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 1
                        },
                        "pc": 466,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp27": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp27",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 2
                        },
                        "pc": 467,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp28": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp28",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 3
                        },
                        "pc": 470,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp29": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp29",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 4
                        },
                        "pc": 471,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp30": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp30",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 5
                        },
                        "pc": 473,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp31": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp31",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 7
                        },
                        "pc": 475,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp32": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp32",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 8
                        },
                        "pc": 476,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp33": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp33",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 9
                        },
                        "pc": 479,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp34": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp34",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 10
                        },
                        "pc": 480,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__temp35": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.__temp35",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 12
                        },
                        "pc": 483,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.__wrapped_func": {
                "destination": "__main__.__validate__",
                "type": "alias"
            },
            "__wrappers__.__validate__.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__wrappers__.__validate__.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 77
                        },
                        "pc": 496,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.__validate__.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 77
                        },
                        "pc": 496,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 2
                        },
                        "pc": 468,
                        "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 8
                        },
                        "pc": 477,
                        "value": "cast([[fp + (-5)] + 2] + 2, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 77
                        },
                        "pc": 496,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.ret_value": {
                "cairo_type": "()",
                "full_name": "__wrappers__.__validate__.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 77
                        },
                        "pc": 496,
                        "value": "[cast(ap + 0, ()*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__validate__.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 78
                        },
                        "pc": 498,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate__.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 78
                        },
                        "pc": 498,
                        "value": "cast(0, felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate__.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__validate__.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 465,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 77
                        },
                        "pc": 496,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate___encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.__validate_declare__": {
                "decorators": [
                    "external"
                ],
                "pc": 524,
                "type": "function"
            },
            "__wrappers__.__validate_declare__.Args": {
                "full_name": "__wrappers__.__validate_declare__.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.__validate_declare__.ImplicitArgs": {
                "full_name": "__wrappers__.__validate_declare__.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.__validate_declare__.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: starkware.cairo.common.cairo_builtins.SignatureBuiltin*, bitwise_ptr: felt, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.__validate_declare__.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.__validate_declare__.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate_declare__.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.__calldata_arg_class_hash": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate_declare__.__calldata_arg_class_hash",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__validate_declare__.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.__temp36": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate_declare__.__temp36",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 1
                        },
                        "pc": 526,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.__wrapped_func": {
                "destination": "__main__.__validate_declare__",
                "type": "alias"
            },
            "__wrappers__.__validate_declare__.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate_declare__.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__wrappers__.__validate_declare__.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 63
                        },
                        "pc": 534,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.__validate_declare__.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 63
                        },
                        "pc": 534,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate_declare__.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 63
                        },
                        "pc": 534,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.ret_value": {
                "cairo_type": "()",
                "full_name": "__wrappers__.__validate_declare__.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 63
                        },
                        "pc": 534,
                        "value": "[cast(ap + 0, ()*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__validate_declare__.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 64
                        },
                        "pc": 536,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__validate_declare__.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 64
                        },
                        "pc": 536,
                        "value": "cast(0, felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare__.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.__validate_declare__.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 524,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 63
                        },
                        "pc": 534,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__validate_declare___encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.constructor": {
                "decorators": [
                    "constructor"
                ],
                "pc": 283,
                "type": "function"
            },
            "__wrappers__.constructor.Args": {
                "full_name": "__wrappers__.constructor.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.constructor.ImplicitArgs": {
                "full_name": "__wrappers__.constructor.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.constructor.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: felt, bitwise_ptr: felt, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.constructor.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.constructor.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.__calldata_arg_public_key": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.__calldata_arg_public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.constructor.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.__temp15": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.__temp15",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 1
                        },
                        "pc": 285,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.__wrapped_func": {
                "destination": "__main__.constructor",
                "type": "alias"
            },
            "__wrappers__.constructor.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.ecdsa_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "[cast([fp + (-5)] + 3, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.constructor.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 35
                        },
                        "pc": 292,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 35
                        },
                        "pc": 292,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.ret_value": {
                "cairo_type": "()",
                "full_name": "__wrappers__.constructor.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 35
                        },
                        "pc": 292,
                        "value": "[cast(ap + 0, ()*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.constructor.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 36
                        },
                        "pc": 294,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 36
                        },
                        "pc": 294,
                        "value": "cast(0, felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.constructor.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 283,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 35
                        },
                        "pc": 292,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.getPublicKey": {
                "decorators": [
                    "view"
                ],
                "pc": 318,
                "type": "function"
            },
            "__wrappers__.getPublicKey.Args": {
                "full_name": "__wrappers__.getPublicKey.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.getPublicKey.ImplicitArgs": {
                "full_name": "__wrappers__.getPublicKey.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.getPublicKey.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: felt, bitwise_ptr: felt, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.getPublicKey.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.getPublicKey.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.getPublicKey.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "cast([fp + (-3)] - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.getPublicKey.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.__wrapped_func": {
                "destination": "__main__.getPublicKey",
                "type": "alias"
            },
            "__wrappers__.getPublicKey.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.getPublicKey.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.ecdsa_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.getPublicKey.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast([fp + (-5)] + 3, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.getPublicKey.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 33
                        },
                        "pc": 324,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.getPublicKey.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 33
                        },
                        "pc": 324,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 41
                        },
                        "pc": 327,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.ret_value": {
                "cairo_type": "(publicKey: felt)",
                "full_name": "__wrappers__.getPublicKey.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 33
                        },
                        "pc": 324,
                        "value": "[cast(ap + (-1), (publicKey: felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.getPublicKey.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 41
                        },
                        "pc": 327,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.getPublicKey.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 41
                        },
                        "pc": 327,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.getPublicKey.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 33
                        },
                        "pc": 324,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey_encode_return": {
                "decorators": [],
                "pc": 309,
                "type": "function"
            },
            "__wrappers__.getPublicKey_encode_return.Args": {
                "full_name": "__wrappers__.getPublicKey_encode_return.Args",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "ret_value": {
                        "cairo_type": "(publicKey: felt)",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "__wrappers__.getPublicKey_encode_return.ImplicitArgs": {
                "full_name": "__wrappers__.getPublicKey_encode_return.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.getPublicKey_encode_return.Return": {
                "cairo_type": "(range_check_ptr: felt, data_len: felt, data: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.getPublicKey_encode_return.SIZEOF_LOCALS": {
                "type": "const",
                "value": 1
            },
            "__wrappers__.getPublicKey_encode_return.__return_value_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.getPublicKey_encode_return.__return_value_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 1
                        },
                        "pc": 311,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 1
                        },
                        "pc": 312,
                        "value": "cast([fp] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey_encode_return.__return_value_ptr_start": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.getPublicKey_encode_return.__return_value_ptr_start",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 1
                        },
                        "pc": 311,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey_encode_return.__temp16": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.getPublicKey_encode_return.__temp16",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 2
                        },
                        "pc": 314,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.getPublicKey_encode_return.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.getPublicKey_encode_return.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 0
                        },
                        "pc": 309,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.getPublicKey_encode_return.ret_value": {
                "cairo_type": "(publicKey: felt)",
                "full_name": "__wrappers__.getPublicKey_encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 0
                        },
                        "pc": 309,
                        "value": "[cast(fp + (-4), (publicKey: felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature": {
                "decorators": [
                    "view"
                ],
                "pc": 417,
                "type": "function"
            },
            "__wrappers__.isValidSignature.Args": {
                "full_name": "__wrappers__.isValidSignature.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.isValidSignature.ImplicitArgs": {
                "full_name": "__wrappers__.isValidSignature.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.isValidSignature.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: starkware.cairo.common.cairo_builtins.SignatureBuiltin*, bitwise_ptr: felt, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.isValidSignature.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.isValidSignature.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 5
                        },
                        "pc": 424,
                        "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__calldata_arg_hash": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__calldata_arg_hash",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__calldata_arg_signature": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.isValidSignature.__calldata_arg_signature",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 2
                        },
                        "pc": 420,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__calldata_arg_signature_len": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__calldata_arg_signature_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast([fp + (-3)] + 1, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.isValidSignature.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 5
                        },
                        "pc": 424,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__temp21": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__temp21",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 1
                        },
                        "pc": 418,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__temp22": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__temp22",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 2
                        },
                        "pc": 419,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__temp23": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__temp23",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 3
                        },
                        "pc": 422,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__temp24": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__temp24",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 4
                        },
                        "pc": 423,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__temp25": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.__temp25",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 6
                        },
                        "pc": 426,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.__wrapped_func": {
                "destination": "__main__.isValidSignature",
                "type": "alias"
            },
            "__wrappers__.isValidSignature.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__wrappers__.isValidSignature.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 60
                        },
                        "pc": 437,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.isValidSignature.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 60
                        },
                        "pc": 437,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 2
                        },
                        "pc": 420,
                        "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 60
                        },
                        "pc": 437,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 68
                        },
                        "pc": 440,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.ret_value": {
                "cairo_type": "(isValid: felt)",
                "full_name": "__wrappers__.isValidSignature.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 60
                        },
                        "pc": 437,
                        "value": "[cast(ap + (-1), (isValid: felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.isValidSignature.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 68
                        },
                        "pc": 440,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 68
                        },
                        "pc": 440,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.isValidSignature.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 0
                        },
                        "pc": 417,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 40,
                            "offset": 60
                        },
                        "pc": 437,
                        "value": "[cast(ap + (-5), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature_encode_return": {
                "decorators": [],
                "pc": 408,
                "type": "function"
            },
            "__wrappers__.isValidSignature_encode_return.Args": {
                "full_name": "__wrappers__.isValidSignature_encode_return.Args",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "ret_value": {
                        "cairo_type": "(isValid: felt)",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "__wrappers__.isValidSignature_encode_return.ImplicitArgs": {
                "full_name": "__wrappers__.isValidSignature_encode_return.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.isValidSignature_encode_return.Return": {
                "cairo_type": "(range_check_ptr: felt, data_len: felt, data: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.isValidSignature_encode_return.SIZEOF_LOCALS": {
                "type": "const",
                "value": 1
            },
            "__wrappers__.isValidSignature_encode_return.__return_value_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.isValidSignature_encode_return.__return_value_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 1
                        },
                        "pc": 410,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 1
                        },
                        "pc": 411,
                        "value": "cast([fp] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature_encode_return.__return_value_ptr_start": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.isValidSignature_encode_return.__return_value_ptr_start",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 1
                        },
                        "pc": 410,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature_encode_return.__temp20": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature_encode_return.__temp20",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 2
                        },
                        "pc": 413,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.isValidSignature_encode_return.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.isValidSignature_encode_return.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 0
                        },
                        "pc": 408,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.isValidSignature_encode_return.ret_value": {
                "cairo_type": "(isValid: felt)",
                "full_name": "__wrappers__.isValidSignature_encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 0
                        },
                        "pc": 408,
                        "value": "[cast(fp + (-4), (isValid: felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey": {
                "decorators": [
                    "external"
                ],
                "pc": 378,
                "type": "function"
            },
            "__wrappers__.setPublicKey.Args": {
                "full_name": "__wrappers__.setPublicKey.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.setPublicKey.ImplicitArgs": {
                "full_name": "__wrappers__.setPublicKey.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.setPublicKey.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: felt, bitwise_ptr: felt, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.setPublicKey.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.setPublicKey.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.setPublicKey.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.__calldata_arg_newPublicKey": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.setPublicKey.__calldata_arg_newPublicKey",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.setPublicKey.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.__temp19": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.setPublicKey.__temp19",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 1
                        },
                        "pc": 380,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.__wrapped_func": {
                "destination": "__main__.setPublicKey",
                "type": "alias"
            },
            "__wrappers__.setPublicKey.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.setPublicKey.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.ecdsa_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.setPublicKey.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "[cast([fp + (-5)] + 3, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.setPublicKey.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 50
                        },
                        "pc": 387,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.setPublicKey.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 50
                        },
                        "pc": 387,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.ret_value": {
                "cairo_type": "()",
                "full_name": "__wrappers__.setPublicKey.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 50
                        },
                        "pc": 387,
                        "value": "[cast(ap + 0, ()*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.setPublicKey.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 51
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.setPublicKey.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 51
                        },
                        "pc": 389,
                        "value": "cast(0, felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.setPublicKey.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 378,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 50
                        },
                        "pc": 387,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.setPublicKey_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.supportsInterface": {
                "decorators": [
                    "view"
                ],
                "pc": 351,
                "type": "function"
            },
            "__wrappers__.supportsInterface.Args": {
                "full_name": "__wrappers__.supportsInterface.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.supportsInterface.ImplicitArgs": {
                "full_name": "__wrappers__.supportsInterface.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.supportsInterface.Return": {
                "cairo_type": "(syscall_ptr: felt*, pedersen_ptr: starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr: felt, ecdsa_ptr: felt, bitwise_ptr: felt, size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.supportsInterface.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.supportsInterface.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.__calldata_arg_interfaceId": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.__calldata_arg_interfaceId",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.supportsInterface.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.__temp18": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.__temp18",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 1
                        },
                        "pc": 353,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.__wrapped_func": {
                "destination": "__main__.supportsInterface",
                "type": "alias"
            },
            "__wrappers__.supportsInterface.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.ecdsa_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "[cast([fp + (-5)] + 3, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.supportsInterface.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 360,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 360,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 8
                        },
                        "pc": 363,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.ret_value": {
                "cairo_type": "(success: felt)",
                "full_name": "__wrappers__.supportsInterface.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 360,
                        "value": "[cast(ap + (-1), (success: felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.supportsInterface.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 8
                        },
                        "pc": 363,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 8
                        },
                        "pc": 363,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.supportsInterface.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 351,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 360,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return": {
                "decorators": [],
                "pc": 342,
                "type": "function"
            },
            "__wrappers__.supportsInterface_encode_return.Args": {
                "full_name": "__wrappers__.supportsInterface_encode_return.Args",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "ret_value": {
                        "cairo_type": "(success: felt)",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "__wrappers__.supportsInterface_encode_return.ImplicitArgs": {
                "full_name": "__wrappers__.supportsInterface_encode_return.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.supportsInterface_encode_return.Return": {
                "cairo_type": "(range_check_ptr: felt, data_len: felt, data: felt*)",
                "type": "type_definition"
            },
            "__wrappers__.supportsInterface_encode_return.SIZEOF_LOCALS": {
                "type": "const",
                "value": 1
            },
            "__wrappers__.supportsInterface_encode_return.__return_value_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.supportsInterface_encode_return.__return_value_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 1
                        },
                        "pc": 344,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 1
                        },
                        "pc": 345,
                        "value": "cast([fp] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return.__return_value_ptr_start": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.supportsInterface_encode_return.__return_value_ptr_start",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 1
                        },
                        "pc": 344,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return.__temp17": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface_encode_return.__temp17",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 2
                        },
                        "pc": 347,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.supportsInterface_encode_return.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface_encode_return.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 342,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return.ret_value": {
                "cairo_type": "(success: felt)",
                "full_name": "__wrappers__.supportsInterface_encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 342,
                        "value": "[cast(fp + (-4), (success: felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account": {
                "type": "namespace"
            },
            "account.library.Account.Args": {
                "full_name": "account.library.Account.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account.ImplicitArgs": {
                "full_name": "account.library.Account.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account._execute_list": {
                "decorators": [],
                "pc": 218,
                "type": "function"
            },
            "account.library.Account._execute_list.Args": {
                "full_name": "account.library.Account._execute_list.Args",
                "members": {
                    "calls": {
                        "cairo_type": "account.library.Call*",
                        "offset": 1
                    },
                    "calls_len": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "felt*",
                        "offset": 2
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account._execute_list.ImplicitArgs": {
                "full_name": "account.library.Account._execute_list.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account._execute_list.Return": {
                "cairo_type": "(response_len: felt)",
                "type": "type_definition"
            },
            "account.library.Account._execute_list.SIZEOF_LOCALS": {
                "type": "const",
                "value": 3
            },
            "account.library.Account._execute_list.calls": {
                "cairo_type": "account.library.Call*",
                "full_name": "account.library.Account._execute_list.calls",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 218,
                        "value": "[cast(fp + (-4), account.library.Call**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._execute_list.calls_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._execute_list.calls_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 218,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._execute_list.res": {
                "cairo_type": "(retdata_size: felt, retdata: felt*)",
                "full_name": "account.library.Account._execute_list.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 14
                        },
                        "pc": 233,
                        "value": "[cast(ap + (-2), (retdata_size: felt, retdata: felt*)*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 14
                        },
                        "pc": 235,
                        "value": "[cast(fp, (retdata_size: felt, retdata: felt*)*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._execute_list.response": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account._execute_list.response",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 218,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._execute_list.response_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._execute_list.response_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 0
                        },
                        "pc": 249,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._execute_list.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account._execute_list.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 218,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 11
                        },
                        "pc": 233,
                        "value": "[cast(ap + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 0
                        },
                        "pc": 246,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 14
                        },
                        "pc": 233,
                        "value": "[cast(ap + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 14
                        },
                        "pc": 236,
                        "value": "[cast(fp + 2, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 0
                        },
                        "pc": 249,
                        "value": "[cast(ap + (-2), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._execute_list.this_call": {
                "cairo_type": "account.library.Call",
                "full_name": "account.library.Account._execute_list.this_call",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 3
                        },
                        "pc": 226,
                        "value": "[cast([fp + (-4)], account.library.Call*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call": {
                "decorators": [],
                "pc": 252,
                "type": "function"
            },
            "account.library.Account._from_call_array_to_call.Args": {
                "full_name": "account.library.Account._from_call_array_to_call.Args",
                "members": {
                    "call_array": {
                        "cairo_type": "account.library.AccountCallArray*",
                        "offset": 1
                    },
                    "call_array_len": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 2
                    },
                    "calls": {
                        "cairo_type": "account.library.Call*",
                        "offset": 3
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "account.library.Account._from_call_array_to_call.ImplicitArgs": {
                "full_name": "account.library.Account._from_call_array_to_call.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account._from_call_array_to_call.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account._from_call_array_to_call.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account._from_call_array_to_call.__temp10": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp10",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 1
                        },
                        "pc": 257,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.__temp11": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp11",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 2
                        },
                        "pc": 259,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.__temp12": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp12",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 3
                        },
                        "pc": 261,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.__temp13": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp13",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 4
                        },
                        "pc": 263,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.__temp14": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp14",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 5
                        },
                        "pc": 264,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "account.library.Account._from_call_array_to_call.call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 252,
                        "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.call_array_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.call_array_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 252,
                        "value": "[cast(fp + (-6), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.calldata": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account._from_call_array_to_call.calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 252,
                        "value": "[cast(fp + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.calls": {
                "cairo_type": "account.library.Call*",
                "full_name": "account.library.Account._from_call_array_to_call.calls",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 252,
                        "value": "[cast(fp + (-3), account.library.Call**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account._from_call_array_to_call.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 252,
                        "value": "[cast(fp + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 25,
                            "offset": 0
                        },
                        "pc": 275,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.assert_only_self": {
                "decorators": [],
                "pc": 109,
                "type": "function"
            },
            "account.library.Account.assert_only_self.Args": {
                "full_name": "account.library.Account.assert_only_self.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account.assert_only_self.ImplicitArgs": {
                "full_name": "account.library.Account.assert_only_self.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account.assert_only_self.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account.assert_only_self.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.assert_only_self.caller": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.assert_only_self.caller",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 13,
                            "offset": 12
                        },
                        "pc": 115,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.assert_only_self.self": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.assert_only_self.self",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 13,
                            "offset": 6
                        },
                        "pc": 112,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.assert_only_self.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.assert_only_self.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 13,
                            "offset": 0
                        },
                        "pc": 109,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 13,
                            "offset": 6
                        },
                        "pc": 112,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 13,
                            "offset": 12
                        },
                        "pc": 115,
                        "value": "[cast(ap + (-2), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute": {
                "decorators": [],
                "pc": 178,
                "type": "function"
            },
            "account.library.Account.execute.Args": {
                "full_name": "account.library.Account.execute.Args",
                "members": {
                    "call_array": {
                        "cairo_type": "account.library.AccountCallArray*",
                        "offset": 1
                    },
                    "call_array_len": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 3
                    },
                    "calldata_len": {
                        "cairo_type": "felt",
                        "offset": 2
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "account.library.Account.execute.ImplicitArgs": {
                "full_name": "account.library.Account.execute.ImplicitArgs",
                "members": {
                    "bitwise_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                        "offset": 3
                    },
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 2
                    },
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 4
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "account.library.Account.execute.Return": {
                "cairo_type": "(response_len: felt, response: felt*)",
                "type": "type_definition"
            },
            "account.library.Account.execute.SIZEOF_LOCALS": {
                "type": "const",
                "value": 2
            },
            "account.library.Account.execute.__temp9": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.__temp9",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 9
                        },
                        "pc": 185,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.bitwise_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                "full_name": "account.library.Account.execute.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "account.library.Account.execute.call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.call_array_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.call_array_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-6), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.calldata": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.execute.calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.calldata_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.calldata_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.caller": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.caller",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 15
                        },
                        "pc": 189,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.calls": {
                "cairo_type": "account.library.Call*",
                "full_name": "account.library.Account.execute.calls",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 18
                        },
                        "pc": 193,
                        "value": "[cast(ap + (-1), account.library.Call**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 18
                        },
                        "pc": 194,
                        "value": "[cast(fp, account.library.Call**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.calls_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.calls_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 201,
                        "value": "[cast(fp + (-6), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "account.library.Account.execute.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account.execute.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-10), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-7), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.response": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.execute.response",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 3
                        },
                        "pc": 203,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 3
                        },
                        "pc": 204,
                        "value": "[cast(fp + 1, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.response_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.response_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 0
                        },
                        "pc": 210,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.execute.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 178,
                        "value": "[cast(fp + (-11), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 6
                        },
                        "pc": 183,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 13
                        },
                        "pc": 189,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 200,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 0
                        },
                        "pc": 208,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 8
                        },
                        "pc": 183,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 15
                        },
                        "pc": 189,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 201,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 0
                        },
                        "pc": 210,
                        "value": "[cast(ap + (-2), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.tx_info": {
                "cairo_type": "starkware.starknet.common.syscalls.TxInfo*",
                "full_name": "account.library.Account.execute.tx_info",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 8
                        },
                        "pc": 183,
                        "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_public_key": {
                "decorators": [],
                "pc": 118,
                "type": "function"
            },
            "account.library.Account.get_public_key.Args": {
                "full_name": "account.library.Account.get_public_key.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account.get_public_key.ImplicitArgs": {
                "full_name": "account.library.Account.get_public_key.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account.get_public_key.Return": {
                "cairo_type": "(public_key: felt)",
                "type": "type_definition"
            },
            "account.library.Account.get_public_key.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.get_public_key.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account.get_public_key.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 0
                        },
                        "pc": 118,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 23
                        },
                        "pc": 123,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_public_key.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.get_public_key.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 0
                        },
                        "pc": 118,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 23
                        },
                        "pc": 123,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_public_key.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.get_public_key.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 0
                        },
                        "pc": 118,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 23
                        },
                        "pc": 123,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.initializer": {
                "decorators": [],
                "pc": 102,
                "type": "function"
            },
            "account.library.Account.initializer.Args": {
                "full_name": "account.library.Account.initializer.Args",
                "members": {
                    "_public_key": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account.initializer.ImplicitArgs": {
                "full_name": "account.library.Account.initializer.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account.initializer.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account.initializer.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.initializer._public_key": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.initializer._public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 0
                        },
                        "pc": 102,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.initializer.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account.initializer.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 0
                        },
                        "pc": 102,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 22
                        },
                        "pc": 108,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.initializer.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.initializer.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 0
                        },
                        "pc": 102,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 22
                        },
                        "pc": 108,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.initializer.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.initializer.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 0
                        },
                        "pc": 102,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 22
                        },
                        "pc": 108,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature": {
                "decorators": [],
                "pc": 159,
                "type": "function"
            },
            "account.library.Account.is_valid_signature.Args": {
                "full_name": "account.library.Account.is_valid_signature.Args",
                "members": {
                    "hash": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "signature": {
                        "cairo_type": "felt*",
                        "offset": 2
                    },
                    "signature_len": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account.is_valid_signature.ImplicitArgs": {
                "full_name": "account.library.Account.is_valid_signature.ImplicitArgs",
                "members": {
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 2
                    },
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "account.library.Account.is_valid_signature.Return": {
                "cairo_type": "(is_valid: felt)",
                "type": "type_definition"
            },
            "account.library.Account.is_valid_signature.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.is_valid_signature._public_key": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.is_valid_signature._public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 23
                        },
                        "pc": 164,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "account.library.Account.is_valid_signature.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 159,
                        "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 31
                        },
                        "pc": 171,
                        "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.hash": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.is_valid_signature.hash",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 159,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account.is_valid_signature.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 159,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 23
                        },
                        "pc": 164,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.is_valid_signature.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 159,
                        "value": "[cast(fp + (-6), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 23
                        },
                        "pc": 164,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.sig_r": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.is_valid_signature.sig_r",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 23
                        },
                        "pc": 164,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.sig_s": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.is_valid_signature.sig_s",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 23
                        },
                        "pc": 164,
                        "value": "[cast([fp + (-3)] + 1, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.signature": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.is_valid_signature.signature",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 159,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.signature_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.is_valid_signature.signature_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 159,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.is_valid_signature.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 159,
                        "value": "[cast(fp + (-9), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 23
                        },
                        "pc": 164,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.set_public_key": {
                "decorators": [],
                "pc": 150,
                "type": "function"
            },
            "account.library.Account.set_public_key.Args": {
                "full_name": "account.library.Account.set_public_key.Args",
                "members": {
                    "new_public_key": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account.set_public_key.ImplicitArgs": {
                "full_name": "account.library.Account.set_public_key.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account.set_public_key.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account.set_public_key.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.set_public_key.new_public_key": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.set_public_key.new_public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 150,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.set_public_key.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account.set_public_key.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 150,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 37
                        },
                        "pc": 158,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.set_public_key.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.set_public_key.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 150,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 37
                        },
                        "pc": 158,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.set_public_key.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.set_public_key.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 150,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 16
                        },
                        "pc": 153,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 37
                        },
                        "pc": 158,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.supports_interface": {
                "decorators": [],
                "pc": 124,
                "type": "function"
            },
            "account.library.Account.supports_interface.Args": {
                "full_name": "account.library.Account.supports_interface.Args",
                "members": {
                    "interface_id": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account.supports_interface.ImplicitArgs": {
                "full_name": "account.library.Account.supports_interface.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account.supports_interface.Return": {
                "cairo_type": "(success: felt)",
                "type": "type_definition"
            },
            "account.library.Account.supports_interface.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.supports_interface.__temp7": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.supports_interface.__temp7",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 1
                        },
                        "pc": 126,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.supports_interface.__temp8": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.supports_interface.__temp8",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 2
                        },
                        "pc": 136,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.supports_interface.interface_id": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.supports_interface.interface_id",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 0
                        },
                        "pc": 124,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.supports_interface.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account.supports_interface.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 0
                        },
                        "pc": 124,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.supports_interface.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.supports_interface.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 0
                        },
                        "pc": 124,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.supports_interface.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.supports_interface.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 0
                        },
                        "pc": 124,
                        "value": "[cast(fp + (-6), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.AccountCallArray": {
                "full_name": "account.library.AccountCallArray",
                "members": {
                    "data_len": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "data_offset": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "to": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "account.library.Account_public_key": {
                "type": "namespace"
            },
            "account.library.Account_public_key.Args": {
                "full_name": "account.library.Account_public_key.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_public_key.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "account.library.Account_public_key.ImplicitArgs": {
                "full_name": "account.library.Account_public_key.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_public_key.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account_public_key.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_public_key.addr": {
                "decorators": [],
                "pc": 72,
                "type": "function"
            },
            "account.library.Account_public_key.addr.Args": {
                "full_name": "account.library.Account_public_key.addr.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_public_key.addr.ImplicitArgs": {
                "full_name": "account.library.Account_public_key.addr.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 0
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "account.library.Account_public_key.addr.Return": {
                "cairo_type": "(res: felt)",
                "type": "type_definition"
            },
            "account.library.Account_public_key.addr.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_public_key.addr.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account_public_key.addr.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 0
                        },
                        "pc": 72,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.addr.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.addr.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 0
                        },
                        "pc": 72,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.addr.res": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.addr.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 0
                        },
                        "pc": 72,
                        "value": "cast(550557492744938365112574611882025123252567779123164597803728068558738016655, felt)"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.hash2": {
                "destination": "starkware.cairo.common.hash.hash2",
                "type": "alias"
            },
            "account.library.Account_public_key.normalize_address": {
                "destination": "starkware.starknet.common.storage.normalize_address",
                "type": "alias"
            },
            "account.library.Account_public_key.read": {
                "decorators": [],
                "pc": 77,
                "type": "function"
            },
            "account.library.Account_public_key.read.Args": {
                "full_name": "account.library.Account_public_key.read.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_public_key.read.ImplicitArgs": {
                "full_name": "account.library.Account_public_key.read.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account_public_key.read.Return": {
                "cairo_type": "(public_key: felt)",
                "type": "type_definition"
            },
            "account.library.Account_public_key.read.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_public_key.read.__storage_var_temp0": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.read.__storage_var_temp0",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 14
                        },
                        "pc": 85,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 18
                        },
                        "pc": 89,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.read.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account_public_key.read.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 77,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 7
                        },
                        "pc": 81,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 16
                        },
                        "pc": 87,
                        "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.read.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.read.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 77,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 7
                        },
                        "pc": 81,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 17
                        },
                        "pc": 88,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.read.storage_addr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.read.storage_addr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 7
                        },
                        "pc": 81,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.read.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account_public_key.read.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 77,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 14
                        },
                        "pc": 85,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 15
                        },
                        "pc": 86,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.storage_read": {
                "destination": "starkware.starknet.common.syscalls.storage_read",
                "type": "alias"
            },
            "account.library.Account_public_key.storage_write": {
                "destination": "starkware.starknet.common.syscalls.storage_write",
                "type": "alias"
            },
            "account.library.Account_public_key.write": {
                "decorators": [],
                "pc": 90,
                "type": "function"
            },
            "account.library.Account_public_key.write.Args": {
                "full_name": "account.library.Account_public_key.write.Args",
                "members": {
                    "value": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account_public_key.write.ImplicitArgs": {
                "full_name": "account.library.Account_public_key.write.ImplicitArgs",
                "members": {
                    "pedersen_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 1
                    },
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "account.library.Account_public_key.write.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account_public_key.write.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_public_key.write.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account_public_key.write.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 0
                        },
                        "pc": 90,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 7
                        },
                        "pc": 94,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.write.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.write.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 0
                        },
                        "pc": 90,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 7
                        },
                        "pc": 94,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.write.storage_addr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.write.storage_addr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 7
                        },
                        "pc": 94,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.write.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account_public_key.write.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 0
                        },
                        "pc": 90,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 14
                        },
                        "pc": 99,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_public_key.write.value": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_public_key.write.value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 0
                        },
                        "pc": 90,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.BitwiseBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "type": "alias"
            },
            "account.library.Call": {
                "full_name": "account.library.Call",
                "members": {
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 3
                    },
                    "calldata_len": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "to": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "account.library.FALSE": {
                "destination": "starkware.cairo.common.bool.FALSE",
                "type": "alias"
            },
            "account.library.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "account.library.IACCOUNT_ID": {
                "destination": "openzeppelin.utils.constants.library.IACCOUNT_ID",
                "type": "alias"
            },
            "account.library.IERC165_ID": {
                "destination": "openzeppelin.utils.constants.library.IERC165_ID",
                "type": "alias"
            },
            "account.library.SignatureBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.SignatureBuiltin",
                "type": "alias"
            },
            "account.library.TRUE": {
                "destination": "starkware.cairo.common.bool.TRUE",
                "type": "alias"
            },
            "account.library.Uint256": {
                "destination": "starkware.cairo.common.uint256.Uint256",
                "type": "alias"
            },
            "account.library.alloc": {
                "destination": "starkware.cairo.common.alloc.alloc",
                "type": "alias"
            },
            "account.library.call_contract": {
                "destination": "starkware.starknet.common.syscalls.call_contract",
                "type": "alias"
            },
            "account.library.get_caller_address": {
                "destination": "starkware.starknet.common.syscalls.get_caller_address",
                "type": "alias"
            },
            "account.library.get_contract_address": {
                "destination": "starkware.starknet.common.syscalls.get_contract_address",
                "type": "alias"
            },
            "account.library.get_fp_and_pc": {
                "destination": "starkware.cairo.common.registers.get_fp_and_pc",
                "type": "alias"
            },
            "account.library.get_tx_info": {
                "destination": "starkware.starknet.common.syscalls.get_tx_info",
                "type": "alias"
            },
            "account.library.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "account.library.split_felt": {
                "destination": "starkware.cairo.common.math.split_felt",
                "type": "alias"
            },
            "account.library.verify_ecdsa_signature": {
                "destination": "starkware.cairo.common.signature.verify_ecdsa_signature",
                "type": "alias"
            },
            "account.library.verify_eth_signature_uint256": {
                "destination": "starkware.cairo.common.cairo_secp.signature.verify_eth_signature_uint256",
                "type": "alias"
            },
            "openzeppelin.utils.constants.library.DEFAULT_ADMIN_ROLE": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.utils.constants.library.IACCESSCONTROL_ID": {
                "type": "const",
                "value": 2036718347
            },
            "openzeppelin.utils.constants.library.IACCOUNT_ID": {
                "type": "const",
                "value": 2792084853
            },
            "openzeppelin.utils.constants.library.IERC165_ID": {
                "type": "const",
                "value": 33540519
            },
            "openzeppelin.utils.constants.library.IERC721_ENUMERABLE_ID": {
                "type": "const",
                "value": 2014223715
            },
            "openzeppelin.utils.constants.library.IERC721_ID": {
                "type": "const",
                "value": 2158778573
            },
            "openzeppelin.utils.constants.library.IERC721_METADATA_ID": {
                "type": "const",
                "value": 1532892063
            },
            "openzeppelin.utils.constants.library.IERC721_RECEIVER_ID": {
                "type": "const",
                "value": 353073666
            },
            "openzeppelin.utils.constants.library.INVALID_ID": {
                "type": "const",
                "value": 4294967295
            },
            "openzeppelin.utils.constants.library.UINT8_MAX": {
                "type": "const",
                "value": 255
            },
            "starkware.cairo.common.alloc.alloc": {
                "decorators": [],
                "pc": 0,
                "type": "function"
            },
            "starkware.cairo.common.alloc.alloc.Args": {
                "full_name": "starkware.cairo.common.alloc.alloc.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.common.alloc.alloc.ImplicitArgs": {
                "full_name": "starkware.cairo.common.alloc.alloc.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.common.alloc.alloc.Return": {
                "cairo_type": "(ptr: felt*)",
                "type": "type_definition"
            },
            "starkware.cairo.common.alloc.alloc.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.bitwise.ALL_ONES": {
                "type": "const",
                "value": -106710729501573572985208420194530329073740042555888586719234
            },
            "starkware.cairo.common.bitwise.BitwiseBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.bool.FALSE": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.bool.TRUE": {
                "type": "const",
                "value": 1
            },
            "starkware.cairo.common.cairo_builtins.BitwiseBuiltin": {
                "full_name": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "members": {
                    "x": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "x_and_y": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "x_or_y": {
                        "cairo_type": "felt",
                        "offset": 4
                    },
                    "x_xor_y": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "y": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_builtins.EcOpBuiltin": {
                "full_name": "starkware.cairo.common.cairo_builtins.EcOpBuiltin",
                "members": {
                    "m": {
                        "cairo_type": "felt",
                        "offset": 4
                    },
                    "p": {
                        "cairo_type": "starkware.cairo.common.ec_point.EcPoint",
                        "offset": 0
                    },
                    "q": {
                        "cairo_type": "starkware.cairo.common.ec_point.EcPoint",
                        "offset": 2
                    },
                    "r": {
                        "cairo_type": "starkware.cairo.common.ec_point.EcPoint",
                        "offset": 5
                    }
                },
                "size": 7,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_builtins.EcPoint": {
                "destination": "starkware.cairo.common.ec_point.EcPoint",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_builtins.HashBuiltin": {
                "full_name": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "members": {
                    "result": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "x": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "y": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_builtins.KeccakBuiltin": {
                "full_name": "starkware.cairo.common.cairo_builtins.KeccakBuiltin",
                "members": {
                    "input": {
                        "cairo_type": "starkware.cairo.common.keccak_state.KeccakBuiltinState",
                        "offset": 0
                    },
                    "output": {
                        "cairo_type": "starkware.cairo.common.keccak_state.KeccakBuiltinState",
                        "offset": 8
                    }
                },
                "size": 16,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_builtins.KeccakBuiltinState": {
                "destination": "starkware.cairo.common.keccak_state.KeccakBuiltinState",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_builtins.SignatureBuiltin": {
                "full_name": "starkware.cairo.common.cairo_builtins.SignatureBuiltin",
                "members": {
                    "message": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "pub_key": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_keccak.keccak.BLOCK_SIZE": {
                "destination": "starkware.cairo.common.cairo_keccak.packed_keccak.BLOCK_SIZE",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.BYTES_IN_WORD": {
                "type": "const",
                "value": 8
            },
            "starkware.cairo.common.cairo_keccak.keccak.BitwiseBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.KECCAK_CAPACITY_IN_WORDS": {
                "type": "const",
                "value": 8
            },
            "starkware.cairo.common.cairo_keccak.keccak.KECCAK_FULL_RATE_IN_BYTES": {
                "type": "const",
                "value": 136
            },
            "starkware.cairo.common.cairo_keccak.keccak.KECCAK_FULL_RATE_IN_WORDS": {
                "type": "const",
                "value": 17
            },
            "starkware.cairo.common.cairo_keccak.keccak.KECCAK_STATE_SIZE_FELTS": {
                "type": "const",
                "value": 25
            },
            "starkware.cairo.common.cairo_keccak.keccak.Uint256": {
                "destination": "starkware.cairo.common.uint256.Uint256",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.alloc": {
                "destination": "starkware.cairo.common.alloc.alloc",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.assert_lt": {
                "destination": "starkware.cairo.common.math.assert_lt",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.assert_nn": {
                "destination": "starkware.cairo.common.math.assert_nn",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.assert_nn_le": {
                "destination": "starkware.cairo.common.math.assert_nn_le",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.assert_not_zero": {
                "destination": "starkware.cairo.common.math.assert_not_zero",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.bitwise_and": {
                "destination": "starkware.cairo.common.bitwise.bitwise_and",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.bitwise_or": {
                "destination": "starkware.cairo.common.bitwise.bitwise_or",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.bitwise_xor": {
                "destination": "starkware.cairo.common.bitwise.bitwise_xor",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.memset": {
                "destination": "starkware.cairo.common.memset.memset",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.packed_keccak_func": {
                "destination": "starkware.cairo.common.cairo_keccak.packed_keccak.packed_keccak_func",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.pow": {
                "destination": "starkware.cairo.common.pow.pow",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.split_felt": {
                "destination": "starkware.cairo.common.math.split_felt",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.uint256_reverse_endian": {
                "destination": "starkware.cairo.common.uint256.uint256_reverse_endian",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.keccak.unsigned_div_rem": {
                "destination": "starkware.cairo.common.math.unsigned_div_rem",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.packed_keccak.ALL_ONES": {
                "type": "const",
                "value": -106710729501573572985208420194530329073740042555888586719234
            },
            "starkware.cairo.common.cairo_keccak.packed_keccak.BLOCK_SIZE": {
                "type": "const",
                "value": 3
            },
            "starkware.cairo.common.cairo_keccak.packed_keccak.BitwiseBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.packed_keccak.SHIFTS": {
                "type": "const",
                "value": 340282366920938463481821351505477763073
            },
            "starkware.cairo.common.cairo_keccak.packed_keccak.alloc": {
                "destination": "starkware.cairo.common.alloc.alloc",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_keccak.packed_keccak.get_fp_and_pc": {
                "destination": "starkware.cairo.common.registers.get_fp_and_pc",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.bigint.BASE": {
                "destination": "starkware.cairo.common.cairo_secp.constants.BASE",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.bigint.BigInt3": {
                "full_name": "starkware.cairo.common.cairo_secp.bigint.BigInt3",
                "members": {
                    "d0": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "d1": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "d2": {
                        "cairo_type": "felt",
                        "offset": 2
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_secp.bigint.RC_BOUND": {
                "destination": "starkware.cairo.common.math_cmp.RC_BOUND",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.bigint.Uint256": {
                "destination": "starkware.cairo.common.uint256.Uint256",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt3": {
                "full_name": "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt3",
                "members": {
                    "d0": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "d1": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "d2": {
                        "cairo_type": "felt",
                        "offset": 2
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt5": {
                "full_name": "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt5",
                "members": {
                    "d0": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "d1": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "d2": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "d3": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "d4": {
                        "cairo_type": "felt",
                        "offset": 4
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_secp.bigint.assert_nn": {
                "destination": "starkware.cairo.common.math.assert_nn",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.bigint.assert_nn_le": {
                "destination": "starkware.cairo.common.math.assert_nn_le",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.bigint.unsigned_div_rem": {
                "destination": "starkware.cairo.common.math.unsigned_div_rem",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.constants.BASE": {
                "type": "const",
                "value": 77371252455336267181195264
            },
            "starkware.cairo.common.cairo_secp.constants.BETA": {
                "type": "const",
                "value": 7
            },
            "starkware.cairo.common.cairo_secp.constants.N0": {
                "type": "const",
                "value": 10428087374290690730508609
            },
            "starkware.cairo.common.cairo_secp.constants.N1": {
                "type": "const",
                "value": 77371252455330678278691517
            },
            "starkware.cairo.common.cairo_secp.constants.N2": {
                "type": "const",
                "value": 19342813113834066795298815
            },
            "starkware.cairo.common.cairo_secp.constants.P0": {
                "type": "const",
                "value": 77371252455336262886226991
            },
            "starkware.cairo.common.cairo_secp.constants.P1": {
                "type": "const",
                "value": 77371252455336267181195263
            },
            "starkware.cairo.common.cairo_secp.constants.P2": {
                "type": "const",
                "value": 19342813113834066795298815
            },
            "starkware.cairo.common.cairo_secp.constants.SECP_REM": {
                "type": "const",
                "value": 4294968273
            },
            "starkware.cairo.common.cairo_secp.ec.BigInt3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.BigInt3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.ec.EcPoint": {
                "full_name": "starkware.cairo.common.cairo_secp.ec.EcPoint",
                "members": {
                    "x": {
                        "cairo_type": "starkware.cairo.common.cairo_secp.bigint.BigInt3",
                        "offset": 0
                    },
                    "y": {
                        "cairo_type": "starkware.cairo.common.cairo_secp.bigint.BigInt3",
                        "offset": 3
                    }
                },
                "size": 6,
                "type": "struct"
            },
            "starkware.cairo.common.cairo_secp.ec.UnreducedBigInt3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.ec.is_zero": {
                "destination": "starkware.cairo.common.cairo_secp.field.is_zero",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.ec.nondet_bigint3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.nondet_bigint3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.ec.unreduced_mul": {
                "destination": "starkware.cairo.common.cairo_secp.field.unreduced_mul",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.ec.unreduced_sqr": {
                "destination": "starkware.cairo.common.cairo_secp.field.unreduced_sqr",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.ec.verify_zero": {
                "destination": "starkware.cairo.common.cairo_secp.field.verify_zero",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.BASE": {
                "destination": "starkware.cairo.common.cairo_secp.constants.BASE",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.BigInt3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.BigInt3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.P0": {
                "destination": "starkware.cairo.common.cairo_secp.constants.P0",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.P1": {
                "destination": "starkware.cairo.common.cairo_secp.constants.P1",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.P2": {
                "destination": "starkware.cairo.common.cairo_secp.constants.P2",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.SECP_REM": {
                "destination": "starkware.cairo.common.cairo_secp.constants.SECP_REM",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.UnreducedBigInt3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.assert_nn_le": {
                "destination": "starkware.cairo.common.math.assert_nn_le",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.nondet_bigint3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.nondet_bigint3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.BASE": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.BASE",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.BETA": {
                "destination": "starkware.cairo.common.cairo_secp.constants.BETA",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.BigInt3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.BigInt3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.BitwiseBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.EcPoint": {
                "destination": "starkware.cairo.common.cairo_secp.ec.EcPoint",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.N0": {
                "destination": "starkware.cairo.common.cairo_secp.constants.N0",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.N1": {
                "destination": "starkware.cairo.common.cairo_secp.constants.N1",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.N2": {
                "destination": "starkware.cairo.common.cairo_secp.constants.N2",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.RC_BOUND": {
                "destination": "starkware.cairo.common.math_cmp.RC_BOUND",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.Uint256": {
                "destination": "starkware.cairo.common.uint256.Uint256",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.UnreducedBigInt3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.alloc": {
                "destination": "starkware.cairo.common.alloc.alloc",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.assert_nn": {
                "destination": "starkware.cairo.common.math.assert_nn",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.assert_nn_le": {
                "destination": "starkware.cairo.common.math.assert_nn_le",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.assert_not_zero": {
                "destination": "starkware.cairo.common.math.assert_not_zero",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.bigint_mul": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.bigint_mul",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.bigint_to_uint256": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.bigint_to_uint256",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.ec_add": {
                "destination": "starkware.cairo.common.cairo_secp.ec.ec_add",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.ec_mul": {
                "destination": "starkware.cairo.common.cairo_secp.ec.ec_mul",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.ec_negate": {
                "destination": "starkware.cairo.common.cairo_secp.ec.ec_negate",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.finalize_keccak": {
                "destination": "starkware.cairo.common.cairo_keccak.keccak.finalize_keccak",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.keccak_uint256s_bigend": {
                "destination": "starkware.cairo.common.cairo_keccak.keccak.keccak_uint256s_bigend",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.nondet_bigint3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.nondet_bigint3",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.reduce": {
                "destination": "starkware.cairo.common.cairo_secp.field.reduce",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.uint256_to_bigint": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.uint256_to_bigint",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.unreduced_mul": {
                "destination": "starkware.cairo.common.cairo_secp.field.unreduced_mul",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.unreduced_sqr": {
                "destination": "starkware.cairo.common.cairo_secp.field.unreduced_sqr",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.unsigned_div_rem": {
                "destination": "starkware.cairo.common.math.unsigned_div_rem",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.validate_reduced_field_element": {
                "destination": "starkware.cairo.common.cairo_secp.field.validate_reduced_field_element",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.signature.verify_zero": {
                "destination": "starkware.cairo.common.cairo_secp.field.verify_zero",
                "type": "alias"
            },
            "starkware.cairo.common.dict_access.DictAccess": {
                "full_name": "starkware.cairo.common.dict_access.DictAccess",
                "members": {
                    "key": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "new_value": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "prev_value": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.cairo.common.ec.EcOpBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.EcOpBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.ec.EcPoint": {
                "destination": "starkware.cairo.common.ec_point.EcPoint",
                "type": "alias"
            },
            "starkware.cairo.common.ec.StarkCurve": {
                "type": "namespace"
            },
            "starkware.cairo.common.ec.StarkCurve.ALPHA": {
                "type": "const",
                "value": 1
            },
            "starkware.cairo.common.ec.StarkCurve.Args": {
                "full_name": "starkware.cairo.common.ec.StarkCurve.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.common.ec.StarkCurve.BETA": {
                "type": "const",
                "value": -476910135076337975234679399815567221425937815956490878998147463828055613816
            },
            "starkware.cairo.common.ec.StarkCurve.GEN_X": {
                "type": "const",
                "value": 874739451078007766457464989774322083649278607533249481151382481072868806602
            },
            "starkware.cairo.common.ec.StarkCurve.GEN_Y": {
                "type": "const",
                "value": 152666792071518830868575557812948353041420400780739481342941381225525861407
            },
            "starkware.cairo.common.ec.StarkCurve.ImplicitArgs": {
                "full_name": "starkware.cairo.common.ec.StarkCurve.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.common.ec.StarkCurve.ORDER": {
                "type": "const",
                "value": -96363463615509210819012598251359154898
            },
            "starkware.cairo.common.ec.StarkCurve.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.ec.StarkCurve.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.ec.is_quad_residue": {
                "destination": "starkware.cairo.common.math.is_quad_residue",
                "type": "alias"
            },
            "starkware.cairo.common.ec_point.EcPoint": {
                "full_name": "starkware.cairo.common.ec_point.EcPoint",
                "members": {
                    "x": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "y": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.cairo.common.hash.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.keccak_state.KeccakBuiltinState": {
                "full_name": "starkware.cairo.common.keccak_state.KeccakBuiltinState",
                "members": {
                    "s0": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "s1": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "s2": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "s3": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "s4": {
                        "cairo_type": "felt",
                        "offset": 4
                    },
                    "s5": {
                        "cairo_type": "felt",
                        "offset": 5
                    },
                    "s6": {
                        "cairo_type": "felt",
                        "offset": 6
                    },
                    "s7": {
                        "cairo_type": "felt",
                        "offset": 7
                    }
                },
                "size": 8,
                "type": "struct"
            },
            "starkware.cairo.common.math.FALSE": {
                "destination": "starkware.cairo.common.bool.FALSE",
                "type": "alias"
            },
            "starkware.cairo.common.math.TRUE": {
                "destination": "starkware.cairo.common.bool.TRUE",
                "type": "alias"
            },
            "starkware.cairo.common.math_cmp.RC_BOUND": {
                "type": "const",
                "value": 340282366920938463463374607431768211456
            },
            "starkware.cairo.common.math_cmp.assert_le_felt": {
                "destination": "starkware.cairo.common.math.assert_le_felt",
                "type": "alias"
            },
            "starkware.cairo.common.math_cmp.assert_lt_felt": {
                "destination": "starkware.cairo.common.math.assert_lt_felt",
                "type": "alias"
            },
            "starkware.cairo.common.memcpy.memcpy": {
                "decorators": [],
                "pc": 3,
                "type": "function"
            },
            "starkware.cairo.common.memcpy.memcpy.Args": {
                "full_name": "starkware.cairo.common.memcpy.memcpy.Args",
                "members": {
                    "dst": {
                        "cairo_type": "felt*",
                        "offset": 0
                    },
                    "len": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "src": {
                        "cairo_type": "felt*",
                        "offset": 1
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.cairo.common.memcpy.memcpy.ImplicitArgs": {
                "full_name": "starkware.cairo.common.memcpy.memcpy.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.common.memcpy.memcpy.LoopFrame": {
                "full_name": "starkware.cairo.common.memcpy.memcpy.LoopFrame",
                "members": {
                    "dst": {
                        "cairo_type": "felt*",
                        "offset": 0
                    },
                    "src": {
                        "cairo_type": "felt*",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.cairo.common.memcpy.memcpy.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.memcpy.memcpy.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.memcpy.memcpy.__temp0": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.memcpy.memcpy.__temp0",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 3
                        },
                        "pc": 9,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.memcpy.memcpy.continue_copying": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.memcpy.memcpy.continue_copying",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 3
                        },
                        "pc": 10,
                        "value": "[cast(ap, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.memcpy.memcpy.dst": {
                "cairo_type": "felt*",
                "full_name": "starkware.cairo.common.memcpy.memcpy.dst",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 0
                        },
                        "pc": 3,
                        "value": "[cast(fp + (-5), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.memcpy.memcpy.frame": {
                "cairo_type": "starkware.cairo.common.memcpy.memcpy.LoopFrame",
                "full_name": "starkware.cairo.common.memcpy.memcpy.frame",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 2
                        },
                        "pc": 8,
                        "value": "[cast(ap + (-2), starkware.cairo.common.memcpy.memcpy.LoopFrame*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 2
                        },
                        "pc": 8,
                        "value": "[cast(ap + (-2), starkware.cairo.common.memcpy.memcpy.LoopFrame*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.memcpy.memcpy.len": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.memcpy.memcpy.len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 0
                        },
                        "pc": 3,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.memcpy.memcpy.loop": {
                "pc": 8,
                "type": "label"
            },
            "starkware.cairo.common.memcpy.memcpy.next_frame": {
                "cairo_type": "starkware.cairo.common.memcpy.memcpy.LoopFrame*",
                "full_name": "starkware.cairo.common.memcpy.memcpy.next_frame",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 3
                        },
                        "pc": 10,
                        "value": "cast(ap + 1, starkware.cairo.common.memcpy.memcpy.LoopFrame*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.memcpy.memcpy.src": {
                "cairo_type": "felt*",
                "full_name": "starkware.cairo.common.memcpy.memcpy.src",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 0
                        },
                        "pc": 3,
                        "value": "[cast(fp + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.pow.assert_le": {
                "destination": "starkware.cairo.common.math.assert_le",
                "type": "alias"
            },
            "starkware.cairo.common.pow.get_ap": {
                "destination": "starkware.cairo.common.registers.get_ap",
                "type": "alias"
            },
            "starkware.cairo.common.pow.get_fp_and_pc": {
                "destination": "starkware.cairo.common.registers.get_fp_and_pc",
                "type": "alias"
            },
            "starkware.cairo.common.registers.get_ap": {
                "destination": "starkware.cairo.lang.compiler.lib.registers.get_ap",
                "type": "alias"
            },
            "starkware.cairo.common.registers.get_fp_and_pc": {
                "destination": "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc",
                "type": "alias"
            },
            "starkware.cairo.common.signature.EcOpBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.EcOpBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.signature.EcPoint": {
                "destination": "starkware.cairo.common.ec_point.EcPoint",
                "type": "alias"
            },
            "starkware.cairo.common.signature.FALSE": {
                "destination": "starkware.cairo.common.bool.FALSE",
                "type": "alias"
            },
            "starkware.cairo.common.signature.SignatureBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.SignatureBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.signature.StarkCurve": {
                "destination": "starkware.cairo.common.ec.StarkCurve",
                "type": "alias"
            },
            "starkware.cairo.common.signature.TRUE": {
                "destination": "starkware.cairo.common.bool.TRUE",
                "type": "alias"
            },
            "starkware.cairo.common.signature.ec_add": {
                "destination": "starkware.cairo.common.ec.ec_add",
                "type": "alias"
            },
            "starkware.cairo.common.signature.ec_mul": {
                "destination": "starkware.cairo.common.ec.ec_mul",
                "type": "alias"
            },
            "starkware.cairo.common.signature.ec_sub": {
                "destination": "starkware.cairo.common.ec.ec_sub",
                "type": "alias"
            },
            "starkware.cairo.common.signature.is_x_on_curve": {
                "destination": "starkware.cairo.common.ec.is_x_on_curve",
                "type": "alias"
            },
            "starkware.cairo.common.signature.recover_y": {
                "destination": "starkware.cairo.common.ec.recover_y",
                "type": "alias"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature": {
                "decorators": [],
                "pc": 67,
                "type": "function"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.Args": {
                "full_name": "starkware.cairo.common.signature.verify_ecdsa_signature.Args",
                "members": {
                    "message": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "public_key": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "signature_r": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "signature_s": {
                        "cairo_type": "felt",
                        "offset": 3
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.ImplicitArgs": {
                "full_name": "starkware.cairo.common.signature.verify_ecdsa_signature.ImplicitArgs",
                "members": {
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "starkware.cairo.common.signature.verify_ecdsa_signature.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 67,
                        "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 69,
                        "value": "cast([fp + (-7)] + 2, starkware.cairo.common.cairo_builtins.SignatureBuiltin*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.message": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.signature.verify_ecdsa_signature.message",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 67,
                        "value": "[cast(fp + (-6), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.public_key": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.signature.verify_ecdsa_signature.public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 67,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.signature_r": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.signature.verify_ecdsa_signature.signature_r",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 67,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature.signature_s": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.signature.verify_ecdsa_signature.signature_s",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 67,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.uint256.ALL_ONES": {
                "type": "const",
                "value": 340282366920938463463374607431768211455
            },
            "starkware.cairo.common.uint256.BitwiseBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.HALF_SHIFT": {
                "type": "const",
                "value": 18446744073709551616
            },
            "starkware.cairo.common.uint256.SHIFT": {
                "type": "const",
                "value": 340282366920938463463374607431768211456
            },
            "starkware.cairo.common.uint256.Uint256": {
                "full_name": "starkware.cairo.common.uint256.Uint256",
                "members": {
                    "high": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "low": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.cairo.common.uint256.assert_in_range": {
                "destination": "starkware.cairo.common.math.assert_in_range",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.assert_le": {
                "destination": "starkware.cairo.common.math.assert_le",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.assert_nn_le": {
                "destination": "starkware.cairo.common.math.assert_nn_le",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.assert_not_zero": {
                "destination": "starkware.cairo.common.math.assert_not_zero",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.bitwise_and": {
                "destination": "starkware.cairo.common.bitwise.bitwise_and",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.bitwise_or": {
                "destination": "starkware.cairo.common.bitwise.bitwise_or",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.bitwise_xor": {
                "destination": "starkware.cairo.common.bitwise.bitwise_xor",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.get_ap": {
                "destination": "starkware.cairo.common.registers.get_ap",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.get_fp_and_pc": {
                "destination": "starkware.cairo.common.registers.get_fp_and_pc",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.is_le": {
                "destination": "starkware.cairo.common.math_cmp.is_le",
                "type": "alias"
            },
            "starkware.cairo.common.uint256.pow": {
                "destination": "starkware.cairo.common.pow.pow",
                "type": "alias"
            },
            "starkware.starknet.common.storage.ADDR_BOUND": {
                "type": "const",
                "value": -106710729501573572985208420194530329073740042555888586719489
            },
            "starkware.starknet.common.storage.MAX_STORAGE_ITEM_SIZE": {
                "type": "const",
                "value": 256
            },
            "starkware.starknet.common.storage.assert_250_bit": {
                "destination": "starkware.cairo.common.math.assert_250_bit",
                "type": "alias"
            },
            "starkware.starknet.common.syscalls.CALL_CONTRACT_SELECTOR": {
                "type": "const",
                "value": 20853273475220472486191784820
            },
            "starkware.starknet.common.syscalls.CallContract": {
                "full_name": "starkware.starknet.common.syscalls.CallContract",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.CallContractRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.CallContractResponse",
                        "offset": 5
                    }
                },
                "size": 7,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.CallContractRequest": {
                "full_name": "starkware.starknet.common.syscalls.CallContractRequest",
                "members": {
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 4
                    },
                    "calldata_size": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "contract_address": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "function_selector": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.CallContractResponse": {
                "full_name": "starkware.starknet.common.syscalls.CallContractResponse",
                "members": {
                    "retdata": {
                        "cairo_type": "felt*",
                        "offset": 1
                    },
                    "retdata_size": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.DELEGATE_CALL_SELECTOR": {
                "type": "const",
                "value": 21167594061783206823196716140
            },
            "starkware.starknet.common.syscalls.DELEGATE_L1_HANDLER_SELECTOR": {
                "type": "const",
                "value": 23274015802972845247556842986379118667122
            },
            "starkware.starknet.common.syscalls.DEPLOY_SELECTOR": {
                "type": "const",
                "value": 75202468540281
            },
            "starkware.starknet.common.syscalls.Deploy": {
                "full_name": "starkware.starknet.common.syscalls.Deploy",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.DeployRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.DeployResponse",
                        "offset": 6
                    }
                },
                "size": 9,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.DeployRequest": {
                "full_name": "starkware.starknet.common.syscalls.DeployRequest",
                "members": {
                    "class_hash": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "constructor_calldata": {
                        "cairo_type": "felt*",
                        "offset": 4
                    },
                    "constructor_calldata_size": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "contract_address_salt": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "deploy_from_zero": {
                        "cairo_type": "felt",
                        "offset": 5
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 6,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.DeployResponse": {
                "full_name": "starkware.starknet.common.syscalls.DeployResponse",
                "members": {
                    "constructor_retdata": {
                        "cairo_type": "felt*",
                        "offset": 2
                    },
                    "constructor_retdata_size": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "contract_address": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.DictAccess": {
                "destination": "starkware.cairo.common.dict_access.DictAccess",
                "type": "alias"
            },
            "starkware.starknet.common.syscalls.EMIT_EVENT_SELECTOR": {
                "type": "const",
                "value": 1280709301550335749748
            },
            "starkware.starknet.common.syscalls.EmitEvent": {
                "full_name": "starkware.starknet.common.syscalls.EmitEvent",
                "members": {
                    "data": {
                        "cairo_type": "felt*",
                        "offset": 4
                    },
                    "data_len": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "keys": {
                        "cairo_type": "felt*",
                        "offset": 2
                    },
                    "keys_len": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GET_BLOCK_NUMBER_SELECTOR": {
                "type": "const",
                "value": 1448089106835523001438702345020786
            },
            "starkware.starknet.common.syscalls.GET_BLOCK_TIMESTAMP_SELECTOR": {
                "type": "const",
                "value": 24294903732626645868215235778792757751152
            },
            "starkware.starknet.common.syscalls.GET_CALLER_ADDRESS_SELECTOR": {
                "type": "const",
                "value": 94901967781393078444254803017658102643
            },
            "starkware.starknet.common.syscalls.GET_CONTRACT_ADDRESS_SELECTOR": {
                "type": "const",
                "value": 6219495360805491471215297013070624192820083
            },
            "starkware.starknet.common.syscalls.GET_SEQUENCER_ADDRESS_SELECTOR": {
                "type": "const",
                "value": 1592190833581991703053805829594610833820054387
            },
            "starkware.starknet.common.syscalls.GET_TX_INFO_SELECTOR": {
                "type": "const",
                "value": 1317029390204112103023
            },
            "starkware.starknet.common.syscalls.GET_TX_SIGNATURE_SELECTOR": {
                "type": "const",
                "value": 1448089128652340074717162277007973
            },
            "starkware.starknet.common.syscalls.GetBlockNumber": {
                "full_name": "starkware.starknet.common.syscalls.GetBlockNumber",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetBlockNumberRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetBlockNumberResponse",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetBlockNumberRequest": {
                "full_name": "starkware.starknet.common.syscalls.GetBlockNumberRequest",
                "members": {
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetBlockNumberResponse": {
                "full_name": "starkware.starknet.common.syscalls.GetBlockNumberResponse",
                "members": {
                    "block_number": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetBlockTimestamp": {
                "full_name": "starkware.starknet.common.syscalls.GetBlockTimestamp",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetBlockTimestampRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetBlockTimestampResponse",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetBlockTimestampRequest": {
                "full_name": "starkware.starknet.common.syscalls.GetBlockTimestampRequest",
                "members": {
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetBlockTimestampResponse": {
                "full_name": "starkware.starknet.common.syscalls.GetBlockTimestampResponse",
                "members": {
                    "block_timestamp": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetCallerAddress": {
                "full_name": "starkware.starknet.common.syscalls.GetCallerAddress",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetCallerAddressRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetCallerAddressResponse",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetCallerAddressRequest": {
                "full_name": "starkware.starknet.common.syscalls.GetCallerAddressRequest",
                "members": {
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetCallerAddressResponse": {
                "full_name": "starkware.starknet.common.syscalls.GetCallerAddressResponse",
                "members": {
                    "caller_address": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetContractAddress": {
                "full_name": "starkware.starknet.common.syscalls.GetContractAddress",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetContractAddressRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetContractAddressResponse",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetContractAddressRequest": {
                "full_name": "starkware.starknet.common.syscalls.GetContractAddressRequest",
                "members": {
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetContractAddressResponse": {
                "full_name": "starkware.starknet.common.syscalls.GetContractAddressResponse",
                "members": {
                    "contract_address": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetSequencerAddress": {
                "full_name": "starkware.starknet.common.syscalls.GetSequencerAddress",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetSequencerAddressRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetSequencerAddressResponse",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetSequencerAddressRequest": {
                "full_name": "starkware.starknet.common.syscalls.GetSequencerAddressRequest",
                "members": {
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetSequencerAddressResponse": {
                "full_name": "starkware.starknet.common.syscalls.GetSequencerAddressResponse",
                "members": {
                    "sequencer_address": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetTxInfo": {
                "full_name": "starkware.starknet.common.syscalls.GetTxInfo",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetTxInfoRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetTxInfoResponse",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetTxInfoRequest": {
                "full_name": "starkware.starknet.common.syscalls.GetTxInfoRequest",
                "members": {
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetTxInfoResponse": {
                "full_name": "starkware.starknet.common.syscalls.GetTxInfoResponse",
                "members": {
                    "tx_info": {
                        "cairo_type": "starkware.starknet.common.syscalls.TxInfo*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetTxSignature": {
                "full_name": "starkware.starknet.common.syscalls.GetTxSignature",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetTxSignatureRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.GetTxSignatureResponse",
                        "offset": 1
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetTxSignatureRequest": {
                "full_name": "starkware.starknet.common.syscalls.GetTxSignatureRequest",
                "members": {
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.GetTxSignatureResponse": {
                "full_name": "starkware.starknet.common.syscalls.GetTxSignatureResponse",
                "members": {
                    "signature": {
                        "cairo_type": "felt*",
                        "offset": 1
                    },
                    "signature_len": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.LIBRARY_CALL_L1_HANDLER_SELECTOR": {
                "type": "const",
                "value": 436233452754198157705746250789557519228244616562
            },
            "starkware.starknet.common.syscalls.LIBRARY_CALL_SELECTOR": {
                "type": "const",
                "value": 92376026794327011772951660
            },
            "starkware.starknet.common.syscalls.LibraryCall": {
                "full_name": "starkware.starknet.common.syscalls.LibraryCall",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.LibraryCallRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.CallContractResponse",
                        "offset": 5
                    }
                },
                "size": 7,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.LibraryCallRequest": {
                "full_name": "starkware.starknet.common.syscalls.LibraryCallRequest",
                "members": {
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 4
                    },
                    "calldata_size": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "class_hash": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "function_selector": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.SEND_MESSAGE_TO_L1_SELECTOR": {
                "type": "const",
                "value": 433017908768303439907196859243777073
            },
            "starkware.starknet.common.syscalls.STORAGE_READ_SELECTOR": {
                "type": "const",
                "value": 100890693370601760042082660
            },
            "starkware.starknet.common.syscalls.STORAGE_WRITE_SELECTOR": {
                "type": "const",
                "value": 25828017502874050592466629733
            },
            "starkware.starknet.common.syscalls.SendMessageToL1SysCall": {
                "full_name": "starkware.starknet.common.syscalls.SendMessageToL1SysCall",
                "members": {
                    "payload_ptr": {
                        "cairo_type": "felt*",
                        "offset": 3
                    },
                    "payload_size": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "to_address": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.StorageRead": {
                "full_name": "starkware.starknet.common.syscalls.StorageRead",
                "members": {
                    "request": {
                        "cairo_type": "starkware.starknet.common.syscalls.StorageReadRequest",
                        "offset": 0
                    },
                    "response": {
                        "cairo_type": "starkware.starknet.common.syscalls.StorageReadResponse",
                        "offset": 2
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.StorageReadRequest": {
                "full_name": "starkware.starknet.common.syscalls.StorageReadRequest",
                "members": {
                    "address": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.StorageReadResponse": {
                "full_name": "starkware.starknet.common.syscalls.StorageReadResponse",
                "members": {
                    "value": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.StorageWrite": {
                "full_name": "starkware.starknet.common.syscalls.StorageWrite",
                "members": {
                    "address": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "selector": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "value": {
                        "cairo_type": "felt",
                        "offset": 2
                    }
                },
                "size": 3,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.TxInfo": {
                "full_name": "starkware.starknet.common.syscalls.TxInfo",
                "members": {
                    "account_contract_address": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "chain_id": {
                        "cairo_type": "felt",
                        "offset": 6
                    },
                    "max_fee": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "nonce": {
                        "cairo_type": "felt",
                        "offset": 7
                    },
                    "signature": {
                        "cairo_type": "felt*",
                        "offset": 4
                    },
                    "signature_len": {
                        "cairo_type": "felt",
                        "offset": 3
                    },
                    "transaction_hash": {
                        "cairo_type": "felt",
                        "offset": 5
                    },
                    "version": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 8,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.call_contract": {
                "decorators": [],
                "pc": 18,
                "type": "function"
            },
            "starkware.starknet.common.syscalls.call_contract.Args": {
                "full_name": "starkware.starknet.common.syscalls.call_contract.Args",
                "members": {
                    "calldata": {
                        "cairo_type": "felt*",
                        "offset": 3
                    },
                    "calldata_size": {
                        "cairo_type": "felt",
                        "offset": 2
                    },
                    "contract_address": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "function_selector": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 4,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.call_contract.ImplicitArgs": {
                "full_name": "starkware.starknet.common.syscalls.call_contract.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.call_contract.Return": {
                "cairo_type": "(retdata_size: felt, retdata: felt*)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.call_contract.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.call_contract.__temp1": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.call_contract.__temp1",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 1
                        },
                        "pc": 20,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.call_contract.calldata": {
                "cairo_type": "felt*",
                "full_name": "starkware.starknet.common.syscalls.call_contract.calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 18,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.call_contract.calldata_size": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.call_contract.calldata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 18,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.call_contract.contract_address": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.call_contract.contract_address",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 18,
                        "value": "[cast(fp + (-6), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.call_contract.function_selector": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.call_contract.function_selector",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 18,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.call_contract.response": {
                "cairo_type": "starkware.starknet.common.syscalls.CallContractResponse",
                "full_name": "starkware.starknet.common.syscalls.call_contract.response",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 1
                        },
                        "pc": 25,
                        "value": "[cast([fp + (-7)] + 5, starkware.starknet.common.syscalls.CallContractResponse*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.call_contract.syscall": {
                "cairo_type": "starkware.starknet.common.syscalls.CallContract",
                "full_name": "starkware.starknet.common.syscalls.call_contract.syscall",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 18,
                        "value": "[cast([fp + (-7)], starkware.starknet.common.syscalls.CallContract*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.call_contract.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "starkware.starknet.common.syscalls.call_contract.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 18,
                        "value": "[cast(fp + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 1
                        },
                        "pc": 25,
                        "value": "cast([fp + (-7)] + 7, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_caller_address": {
                "decorators": [],
                "pc": 30,
                "type": "function"
            },
            "starkware.starknet.common.syscalls.get_caller_address.Args": {
                "full_name": "starkware.starknet.common.syscalls.get_caller_address.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.get_caller_address.ImplicitArgs": {
                "full_name": "starkware.starknet.common.syscalls.get_caller_address.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.get_caller_address.Return": {
                "cairo_type": "(caller_address: felt)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.get_caller_address.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.get_caller_address.__temp2": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.get_caller_address.__temp2",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 3,
                            "offset": 1
                        },
                        "pc": 32,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_caller_address.syscall": {
                "cairo_type": "starkware.starknet.common.syscalls.GetCallerAddress",
                "full_name": "starkware.starknet.common.syscalls.get_caller_address.syscall",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 3,
                            "offset": 0
                        },
                        "pc": 30,
                        "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetCallerAddress*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_caller_address.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "starkware.starknet.common.syscalls.get_caller_address.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 3,
                            "offset": 0
                        },
                        "pc": 30,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 3,
                            "offset": 1
                        },
                        "pc": 33,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_contract_address": {
                "decorators": [],
                "pc": 37,
                "type": "function"
            },
            "starkware.starknet.common.syscalls.get_contract_address.Args": {
                "full_name": "starkware.starknet.common.syscalls.get_contract_address.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.get_contract_address.ImplicitArgs": {
                "full_name": "starkware.starknet.common.syscalls.get_contract_address.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.get_contract_address.Return": {
                "cairo_type": "(contract_address: felt)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.get_contract_address.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.get_contract_address.__temp3": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.get_contract_address.__temp3",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 4,
                            "offset": 1
                        },
                        "pc": 39,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_contract_address.syscall": {
                "cairo_type": "starkware.starknet.common.syscalls.GetContractAddress",
                "full_name": "starkware.starknet.common.syscalls.get_contract_address.syscall",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 4,
                            "offset": 0
                        },
                        "pc": 37,
                        "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetContractAddress*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_contract_address.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "starkware.starknet.common.syscalls.get_contract_address.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 4,
                            "offset": 0
                        },
                        "pc": 37,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 4,
                            "offset": 1
                        },
                        "pc": 40,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_tx_info": {
                "decorators": [],
                "pc": 60,
                "type": "function"
            },
            "starkware.starknet.common.syscalls.get_tx_info.Args": {
                "full_name": "starkware.starknet.common.syscalls.get_tx_info.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.get_tx_info.ImplicitArgs": {
                "full_name": "starkware.starknet.common.syscalls.get_tx_info.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.get_tx_info.Return": {
                "cairo_type": "(tx_info: starkware.starknet.common.syscalls.TxInfo*)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.get_tx_info.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.get_tx_info.__temp6": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.get_tx_info.__temp6",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 1
                        },
                        "pc": 62,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_tx_info.response": {
                "cairo_type": "starkware.starknet.common.syscalls.GetTxInfoResponse",
                "full_name": "starkware.starknet.common.syscalls.get_tx_info.response",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 1
                        },
                        "pc": 63,
                        "value": "[cast([fp + (-3)] + 1, starkware.starknet.common.syscalls.GetTxInfoResponse*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_tx_info.syscall": {
                "cairo_type": "starkware.starknet.common.syscalls.GetTxInfo",
                "full_name": "starkware.starknet.common.syscalls.get_tx_info.syscall",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 0
                        },
                        "pc": 60,
                        "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetTxInfo*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_tx_info.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "starkware.starknet.common.syscalls.get_tx_info.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 0
                        },
                        "pc": 60,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 1
                        },
                        "pc": 63,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_read": {
                "decorators": [],
                "pc": 44,
                "type": "function"
            },
            "starkware.starknet.common.syscalls.storage_read.Args": {
                "full_name": "starkware.starknet.common.syscalls.storage_read.Args",
                "members": {
                    "address": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.storage_read.ImplicitArgs": {
                "full_name": "starkware.starknet.common.syscalls.storage_read.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.storage_read.Return": {
                "cairo_type": "(value: felt)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.storage_read.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.storage_read.__temp4": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.storage_read.__temp4",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 1
                        },
                        "pc": 46,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_read.address": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.storage_read.address",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 0
                        },
                        "pc": 44,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_read.response": {
                "cairo_type": "starkware.starknet.common.syscalls.StorageReadResponse",
                "full_name": "starkware.starknet.common.syscalls.storage_read.response",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 1
                        },
                        "pc": 48,
                        "value": "[cast([fp + (-4)] + 2, starkware.starknet.common.syscalls.StorageReadResponse*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_read.syscall": {
                "cairo_type": "starkware.starknet.common.syscalls.StorageRead",
                "full_name": "starkware.starknet.common.syscalls.storage_read.syscall",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 0
                        },
                        "pc": 44,
                        "value": "[cast([fp + (-4)], starkware.starknet.common.syscalls.StorageRead*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_read.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "starkware.starknet.common.syscalls.storage_read.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 0
                        },
                        "pc": 44,
                        "value": "[cast(fp + (-4), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 1
                        },
                        "pc": 48,
                        "value": "cast([fp + (-4)] + 3, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_write": {
                "decorators": [],
                "pc": 52,
                "type": "function"
            },
            "starkware.starknet.common.syscalls.storage_write.Args": {
                "full_name": "starkware.starknet.common.syscalls.storage_write.Args",
                "members": {
                    "address": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "value": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.storage_write.ImplicitArgs": {
                "full_name": "starkware.starknet.common.syscalls.storage_write.ImplicitArgs",
                "members": {
                    "syscall_ptr": {
                        "cairo_type": "felt*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.storage_write.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.storage_write.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.storage_write.__temp5": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.storage_write.__temp5",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 1
                        },
                        "pc": 54,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_write.address": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.storage_write.address",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 0
                        },
                        "pc": 52,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_write.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "starkware.starknet.common.syscalls.storage_write.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 0
                        },
                        "pc": 52,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 1
                        },
                        "pc": 57,
                        "value": "cast([fp + (-5)] + 3, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_write.value": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.storage_write.value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 0
                        },
                        "pc": 52,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            }
        },
        "main_scope": "__main__",
        "prime": "0x800000000000011000000000000000000000000000000000000000000000001",
        "reference_manager": {
            "references": [
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 0
                    },
                    "pc": 3,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 0
                    },
                    "pc": 3,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 0
                    },
                    "pc": 3,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 2
                    },
                    "pc": 8,
                    "value": "[cast(ap + (-2), starkware.cairo.common.memcpy.memcpy.LoopFrame*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 2
                    },
                    "pc": 8,
                    "value": "[cast(ap + (-2), starkware.cairo.common.memcpy.memcpy.LoopFrame*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 3
                    },
                    "pc": 9,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 3
                    },
                    "pc": 10,
                    "value": "[cast(ap, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 3
                    },
                    "pc": 10,
                    "value": "cast(ap + 1, starkware.cairo.common.memcpy.memcpy.LoopFrame*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 18,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 18,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 18,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 18,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 18,
                    "value": "[cast(fp + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 18,
                    "value": "[cast([fp + (-7)], starkware.starknet.common.syscalls.CallContract*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 1
                    },
                    "pc": 20,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 1
                    },
                    "pc": 25,
                    "value": "[cast([fp + (-7)] + 5, starkware.starknet.common.syscalls.CallContractResponse*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 1
                    },
                    "pc": 25,
                    "value": "cast([fp + (-7)] + 7, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 3,
                        "offset": 0
                    },
                    "pc": 30,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 3,
                        "offset": 0
                    },
                    "pc": 30,
                    "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetCallerAddress*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 3,
                        "offset": 1
                    },
                    "pc": 32,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 3,
                        "offset": 1
                    },
                    "pc": 33,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 4,
                        "offset": 0
                    },
                    "pc": 37,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 4,
                        "offset": 0
                    },
                    "pc": 37,
                    "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetContractAddress*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 4,
                        "offset": 1
                    },
                    "pc": 39,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 4,
                        "offset": 1
                    },
                    "pc": 40,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 0
                    },
                    "pc": 44,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 0
                    },
                    "pc": 44,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 0
                    },
                    "pc": 44,
                    "value": "[cast([fp + (-4)], starkware.starknet.common.syscalls.StorageRead*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 1
                    },
                    "pc": 46,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 1
                    },
                    "pc": 48,
                    "value": "[cast([fp + (-4)] + 2, starkware.starknet.common.syscalls.StorageReadResponse*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 1
                    },
                    "pc": 48,
                    "value": "cast([fp + (-4)] + 3, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 0
                    },
                    "pc": 52,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 0
                    },
                    "pc": 52,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 0
                    },
                    "pc": 52,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 1
                    },
                    "pc": 54,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 1
                    },
                    "pc": 57,
                    "value": "cast([fp + (-5)] + 3, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 0
                    },
                    "pc": 60,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 0
                    },
                    "pc": 60,
                    "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetTxInfo*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 1
                    },
                    "pc": 62,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 1
                    },
                    "pc": 63,
                    "value": "[cast([fp + (-3)] + 1, starkware.starknet.common.syscalls.GetTxInfoResponse*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 1
                    },
                    "pc": 63,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 67,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 67,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 67,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 67,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 67,
                    "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 69,
                    "value": "cast([fp + (-7)] + 2, starkware.cairo.common.cairo_builtins.SignatureBuiltin*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 0
                    },
                    "pc": 72,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 0
                    },
                    "pc": 72,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 0
                    },
                    "pc": 72,
                    "value": "cast(550557492744938365112574611882025123252567779123164597803728068558738016655, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 77,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 77,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 77,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 7
                    },
                    "pc": 81,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 7
                    },
                    "pc": 81,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 7
                    },
                    "pc": 81,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 14
                    },
                    "pc": 85,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 14
                    },
                    "pc": 85,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 15
                    },
                    "pc": 86,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 16
                    },
                    "pc": 87,
                    "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 17
                    },
                    "pc": 88,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 18
                    },
                    "pc": 89,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 0
                    },
                    "pc": 90,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 0
                    },
                    "pc": 90,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 0
                    },
                    "pc": 90,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 0
                    },
                    "pc": 90,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 7
                    },
                    "pc": 94,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 7
                    },
                    "pc": 94,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 7
                    },
                    "pc": 94,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 14
                    },
                    "pc": 99,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 0
                    },
                    "pc": 102,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 0
                    },
                    "pc": 102,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 0
                    },
                    "pc": 102,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 0
                    },
                    "pc": 102,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 22
                    },
                    "pc": 108,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 22
                    },
                    "pc": 108,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 22
                    },
                    "pc": 108,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 0
                    },
                    "pc": 109,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 6
                    },
                    "pc": 112,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 6
                    },
                    "pc": 112,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 12
                    },
                    "pc": 115,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 12
                    },
                    "pc": 115,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 0
                    },
                    "pc": 118,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 0
                    },
                    "pc": 118,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 0
                    },
                    "pc": 118,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 23
                    },
                    "pc": 123,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 23
                    },
                    "pc": 123,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 23
                    },
                    "pc": 123,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 0
                    },
                    "pc": 124,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 0
                    },
                    "pc": 124,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 0
                    },
                    "pc": 124,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 0
                    },
                    "pc": 124,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 1
                    },
                    "pc": 126,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 2
                    },
                    "pc": 136,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 150,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 150,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 150,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 150,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 16
                    },
                    "pc": 153,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 37
                    },
                    "pc": 158,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 37
                    },
                    "pc": 158,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 37
                    },
                    "pc": 158,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 159,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 159,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 159,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 159,
                    "value": "[cast(fp + (-9), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 159,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 159,
                    "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 159,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 23
                    },
                    "pc": 164,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 23
                    },
                    "pc": 164,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 23
                    },
                    "pc": 164,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 23
                    },
                    "pc": 164,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 23
                    },
                    "pc": 164,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 23
                    },
                    "pc": 164,
                    "value": "[cast([fp + (-3)] + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 31
                    },
                    "pc": 171,
                    "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-11), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-10), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 178,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 8
                    },
                    "pc": 183,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 8
                    },
                    "pc": 183,
                    "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 9
                    },
                    "pc": 185,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 15
                    },
                    "pc": 189,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 15
                    },
                    "pc": 189,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 18
                    },
                    "pc": 193,
                    "value": "[cast(ap + (-1), account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 18
                    },
                    "pc": 194,
                    "value": "[cast(fp, account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 0
                    },
                    "pc": 201,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 0
                    },
                    "pc": 201,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 3
                    },
                    "pc": 203,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 3
                    },
                    "pc": 204,
                    "value": "[cast(fp + 1, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 0
                    },
                    "pc": 210,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 0
                    },
                    "pc": 210,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 218,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 218,
                    "value": "[cast(fp + (-4), account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 218,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 218,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 3
                    },
                    "pc": 226,
                    "value": "[cast([fp + (-4)], account.library.Call*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 14
                    },
                    "pc": 233,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 14
                    },
                    "pc": 233,
                    "value": "[cast(ap + (-2), (retdata_size: felt, retdata: felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 14
                    },
                    "pc": 235,
                    "value": "[cast(fp, (retdata_size: felt, retdata: felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 14
                    },
                    "pc": 236,
                    "value": "[cast(fp + 2, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 0
                    },
                    "pc": 249,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 0
                    },
                    "pc": 249,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 252,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 252,
                    "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 252,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 252,
                    "value": "[cast(fp + (-3), account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 252,
                    "value": "[cast(fp + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 1
                    },
                    "pc": 257,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 2
                    },
                    "pc": 259,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 3
                    },
                    "pc": 261,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 4
                    },
                    "pc": 263,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 5
                    },
                    "pc": 264,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 25,
                        "offset": 0
                    },
                    "pc": 275,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 0
                    },
                    "pc": 276,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 0
                    },
                    "pc": 276,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 0
                    },
                    "pc": 276,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 0
                    },
                    "pc": 276,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 28
                    },
                    "pc": 282,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 28
                    },
                    "pc": 282,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 28
                    },
                    "pc": 282,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 283,
                    "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 1
                    },
                    "pc": 285,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 35
                    },
                    "pc": 292,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 35
                    },
                    "pc": 292,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 35
                    },
                    "pc": 292,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 35
                    },
                    "pc": 292,
                    "value": "[cast(ap + 0, ()*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 36
                    },
                    "pc": 294,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 36
                    },
                    "pc": 294,
                    "value": "cast(0, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 0
                    },
                    "pc": 303,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 0
                    },
                    "pc": 303,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 0
                    },
                    "pc": 303,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 28
                    },
                    "pc": 308,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 28
                    },
                    "pc": 308,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 28
                    },
                    "pc": 308,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 28
                    },
                    "pc": 308,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 0
                    },
                    "pc": 309,
                    "value": "[cast(fp + (-4), (publicKey: felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 0
                    },
                    "pc": 309,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 1
                    },
                    "pc": 311,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 1
                    },
                    "pc": 311,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 1
                    },
                    "pc": 312,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 2
                    },
                    "pc": 314,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "cast([fp + (-3)] - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 33
                    },
                    "pc": 324,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 33
                    },
                    "pc": 324,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 33
                    },
                    "pc": 324,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 33
                    },
                    "pc": 324,
                    "value": "[cast(ap + (-1), (publicKey: felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 41
                    },
                    "pc": 327,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 41
                    },
                    "pc": 327,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 41
                    },
                    "pc": 327,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 0
                    },
                    "pc": 335,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 0
                    },
                    "pc": 335,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 0
                    },
                    "pc": 335,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 0
                    },
                    "pc": 335,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 0
                    },
                    "pc": 341,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 0
                    },
                    "pc": 341,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 0
                    },
                    "pc": 341,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 342,
                    "value": "[cast(fp + (-4), (success: felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 342,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 1
                    },
                    "pc": 344,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 1
                    },
                    "pc": 344,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 1
                    },
                    "pc": 345,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 2
                    },
                    "pc": 347,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 351,
                    "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 1
                    },
                    "pc": 353,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 360,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 360,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 360,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 360,
                    "value": "[cast(ap + (-1), (success: felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 8
                    },
                    "pc": 363,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 8
                    },
                    "pc": 363,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 8
                    },
                    "pc": 363,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 371,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 371,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 371,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 371,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 43
                    },
                    "pc": 377,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 43
                    },
                    "pc": 377,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 43
                    },
                    "pc": 377,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 378,
                    "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 1
                    },
                    "pc": 380,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 50
                    },
                    "pc": 387,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 50
                    },
                    "pc": 387,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 50
                    },
                    "pc": 387,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 50
                    },
                    "pc": 387,
                    "value": "[cast(ap + 0, ()*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 51
                    },
                    "pc": 389,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 51
                    },
                    "pc": 389,
                    "value": "cast(0, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 398,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 398,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 398,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 398,
                    "value": "[cast(fp + (-9), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 398,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 398,
                    "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 398,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 45
                    },
                    "pc": 407,
                    "value": "[cast(ap + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 45
                    },
                    "pc": 407,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 45
                    },
                    "pc": 407,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 45
                    },
                    "pc": 407,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 45
                    },
                    "pc": 407,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 0
                    },
                    "pc": 408,
                    "value": "[cast(fp + (-4), (isValid: felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 0
                    },
                    "pc": 408,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 1
                    },
                    "pc": 410,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 1
                    },
                    "pc": 410,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 1
                    },
                    "pc": 411,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 2
                    },
                    "pc": 413,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "[cast([fp + (-3)] + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 0
                    },
                    "pc": 417,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 1
                    },
                    "pc": 418,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 2
                    },
                    "pc": 419,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 2
                    },
                    "pc": 420,
                    "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 2
                    },
                    "pc": 420,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 3
                    },
                    "pc": 422,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 4
                    },
                    "pc": 423,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 5
                    },
                    "pc": 424,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 5
                    },
                    "pc": 424,
                    "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 6
                    },
                    "pc": 426,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 60
                    },
                    "pc": 437,
                    "value": "[cast(ap + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 60
                    },
                    "pc": 437,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 60
                    },
                    "pc": 437,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 60
                    },
                    "pc": 437,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 60
                    },
                    "pc": 437,
                    "value": "[cast(ap + (-1), (isValid: felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 68
                    },
                    "pc": 440,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 68
                    },
                    "pc": 440,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 40,
                        "offset": 68
                    },
                    "pc": 440,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-10), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 448,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 6
                    },
                    "pc": 451,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 6
                    },
                    "pc": 451,
                    "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 51
                    },
                    "pc": 460,
                    "value": "[cast(ap + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 51
                    },
                    "pc": 460,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 51
                    },
                    "pc": 460,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 51
                    },
                    "pc": 460,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 465,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 1
                    },
                    "pc": 466,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 2
                    },
                    "pc": 467,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 2
                    },
                    "pc": 468,
                    "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 2
                    },
                    "pc": 468,
                    "value": "cast([fp + (-3)] + 1, account.library.AccountCallArray*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 3
                    },
                    "pc": 470,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 4
                    },
                    "pc": 471,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 5
                    },
                    "pc": 473,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 6
                    },
                    "pc": 474,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 6
                    },
                    "pc": 474,
                    "value": "[cast([ap + (-1)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 6
                    },
                    "pc": 474,
                    "value": "cast([ap + (-1)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 7
                    },
                    "pc": 475,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 8
                    },
                    "pc": 476,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 8
                    },
                    "pc": 477,
                    "value": "cast([[fp + (-5)] + 2] + 2, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 8
                    },
                    "pc": 477,
                    "value": "cast([ap + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 9
                    },
                    "pc": 479,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 10
                    },
                    "pc": 480,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 11
                    },
                    "pc": 481,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 11
                    },
                    "pc": 481,
                    "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 12
                    },
                    "pc": 483,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 77
                    },
                    "pc": 496,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 77
                    },
                    "pc": 496,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 77
                    },
                    "pc": 496,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 77
                    },
                    "pc": 496,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 77
                    },
                    "pc": 496,
                    "value": "[cast(ap + 0, ()*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 78
                    },
                    "pc": 498,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 78
                    },
                    "pc": 498,
                    "value": "cast(0, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 0
                    },
                    "pc": 507,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 0
                    },
                    "pc": 507,
                    "value": "[cast(fp + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 0
                    },
                    "pc": 507,
                    "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 0
                    },
                    "pc": 507,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 0
                    },
                    "pc": 507,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 6
                    },
                    "pc": 510,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 6
                    },
                    "pc": 510,
                    "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 51
                    },
                    "pc": 519,
                    "value": "[cast(ap + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 51
                    },
                    "pc": 519,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 51
                    },
                    "pc": 519,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 43,
                        "offset": 51
                    },
                    "pc": 519,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 524,
                    "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 1
                    },
                    "pc": 526,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 63
                    },
                    "pc": 534,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 63
                    },
                    "pc": 534,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 63
                    },
                    "pc": 534,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 63
                    },
                    "pc": 534,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 63
                    },
                    "pc": 534,
                    "value": "[cast(ap + 0, ()*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 64
                    },
                    "pc": 536,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 64
                    },
                    "pc": 536,
                    "value": "cast(0, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-11), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-10), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 545,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 556,
                    "value": "[cast(ap + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 556,
                    "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 556,
                    "value": "[cast(ap + (-5), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 556,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 556,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 556,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 556,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 0
                    },
                    "pc": 557,
                    "value": "[cast(fp + (-5), (response_len: felt, response: felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 0
                    },
                    "pc": 557,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 3
                    },
                    "pc": 559,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 3
                    },
                    "pc": 559,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 3
                    },
                    "pc": 560,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 3
                    },
                    "pc": 563,
                    "value": "[cast(fp + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 3
                    },
                    "pc": 563,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 4
                    },
                    "pc": 565,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 4
                    },
                    "pc": 566,
                    "value": "[cast(fp + 2, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "[cast([fp + (-5)] + 4, starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 4
                    },
                    "pc": 578,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 5
                    },
                    "pc": 579,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 6
                    },
                    "pc": 580,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 6
                    },
                    "pc": 581,
                    "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 6
                    },
                    "pc": 581,
                    "value": "cast([fp + (-3)] + 1, account.library.AccountCallArray*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 7
                    },
                    "pc": 583,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 8
                    },
                    "pc": 584,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 9
                    },
                    "pc": 586,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 10
                    },
                    "pc": 587,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 10
                    },
                    "pc": 587,
                    "value": "[cast([ap + (-1)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 10
                    },
                    "pc": 587,
                    "value": "cast([ap + (-1)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 11
                    },
                    "pc": 588,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 12
                    },
                    "pc": 589,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 12
                    },
                    "pc": 590,
                    "value": "cast([[fp + (-5)] + 2] + 2, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 12
                    },
                    "pc": 590,
                    "value": "cast([ap + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 13
                    },
                    "pc": 592,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 14
                    },
                    "pc": 593,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 15
                    },
                    "pc": 594,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 15
                    },
                    "pc": 594,
                    "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 16
                    },
                    "pc": 596,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 610,
                    "value": "[cast(ap + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 610,
                    "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 610,
                    "value": "[cast(ap + (-5), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 610,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 610,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 610,
                    "value": "[cast(ap + (-2), (response_len: felt, response: felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 611,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 612,
                    "value": "[cast(fp + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 613,
                    "value": "[cast(fp + 2, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 614,
                    "value": "[cast(fp + 3, starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 617,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 617,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 617,
                    "value": "[cast(ap + (-1), felt**)]"
                }
            ]
        }
    }
}"""
