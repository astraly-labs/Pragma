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
            "name": "get_public_key",
            "outputs": [
                {
                    "name": "res",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get_nonce",
            "outputs": [
                {
                    "name": "res",
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
                    "name": "new_public_key",
                    "type": "felt"
                }
            ],
            "name": "set_public_key",
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
            "name": "is_valid_signature",
            "outputs": [
                {
                    "name": "is_valid",
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
                },
                {
                    "name": "nonce",
                    "type": "felt"
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
                "offset": "0x1ec",
                "selector": "0x28ffe4ff0f226a9107253e17a904099aa4f63a02a5621de0576e5aa71bc5194"
            }
        ],
        "EXTERNAL": [
            {
                "offset": "0x2d1",
                "selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad"
            },
            {
                "offset": "0x20f",
                "selector": "0x1a35984e05126dbecb7c3bb9929e7dd9106d460c59b1633739a5c733a5fb13b"
            },
            {
                "offset": "0x22f",
                "selector": "0x1ac47721ee58ba2813c2a816bca188512839a00d3970f67c05eab986b14006d"
            },
            {
                "offset": "0x292",
                "selector": "0x28420862938116cb3bbdbedee07451ccc54d4e9412dbef71142ad1980a30941"
            },
            {
                "offset": "0x250",
                "selector": "0x29e211664c0b63c79638fbea474206ca74016b3e9a3dc4f9ac300ffd8bdf2cd"
            },
            {
                "offset": "0x26b",
                "selector": "0x2e3e21ff5952b2531241e37999d9c4c8b3034cccc89a202a6bf019bdf5294f9"
            }
        ],
        "L1_HANDLER": []
    },
    "program": {
        "attributes": [
            {
                "accessible_scopes": [
                    "openzeppelin.introspection.erc165.library",
                    "openzeppelin.introspection.erc165.library.ERC165",
                    "openzeppelin.introspection.erc165.library.ERC165.register_interface"
                ],
                "end_pc": 217,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 21,
                        "offset": 0
                    },
                    "reference_ids": {
                        "openzeppelin.introspection.erc165.library.ERC165.register_interface.interface_id": 129,
                        "openzeppelin.introspection.erc165.library.ERC165.register_interface.pedersen_ptr": 131,
                        "openzeppelin.introspection.erc165.library.ERC165.register_interface.range_check_ptr": 132,
                        "openzeppelin.introspection.erc165.library.ERC165.register_interface.syscall_ptr": 130
                    }
                },
                "name": "error_message",
                "start_pc": 212,
                "value": "ERC165: invalid interface id"
            },
            {
                "accessible_scopes": [
                    "account.library",
                    "account.library.Account",
                    "account.library.Account.assert_only_self"
                ],
                "end_pc": 304,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 29,
                        "offset": 12
                    },
                    "reference_ids": {
                        "account.library.Account.assert_only_self.caller": 196,
                        "account.library.Account.assert_only_self.self": 194,
                        "account.library.Account.assert_only_self.syscall_ptr": 195
                    }
                },
                "name": "error_message",
                "start_pc": 303,
                "value": "Account: caller is not this account"
            },
            {
                "accessible_scopes": [
                    "account.library",
                    "account.library.Account",
                    "account.library.Account.execute"
                ],
                "end_pc": 364,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 34,
                        "offset": 8
                    },
                    "reference_ids": {
                        "account.library.Account.execute.__fp__": 243,
                        "account.library.Account.execute.bitwise_ptr": 242,
                        "account.library.Account.execute.call_array": 234,
                        "account.library.Account.execute.call_array_len": 233,
                        "account.library.Account.execute.calldata": 236,
                        "account.library.Account.execute.calldata_len": 235,
                        "account.library.Account.execute.ecdsa_ptr": 241,
                        "account.library.Account.execute.nonce": 237,
                        "account.library.Account.execute.pedersen_ptr": 239,
                        "account.library.Account.execute.range_check_ptr": 240,
                        "account.library.Account.execute.syscall_ptr": 244,
                        "account.library.Account.execute.tx_info": 245
                    }
                },
                "name": "error_message",
                "start_pc": 353,
                "value": "Account: invalid signature"
            },
            {
                "accessible_scopes": [
                    "account.library",
                    "account.library.Account",
                    "account.library.Account._unsafe_execute"
                ],
                "end_pc": 384,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 36,
                        "offset": 10
                    },
                    "reference_ids": {
                        "account.library.Account._unsafe_execute.bitwise_ptr": 265,
                        "account.library.Account._unsafe_execute.call_array": 257,
                        "account.library.Account._unsafe_execute.call_array_len": 256,
                        "account.library.Account._unsafe_execute.calldata": 259,
                        "account.library.Account._unsafe_execute.calldata_len": 258,
                        "account.library.Account._unsafe_execute.caller": 267,
                        "account.library.Account._unsafe_execute.ecdsa_ptr": 264,
                        "account.library.Account._unsafe_execute.nonce": 260,
                        "account.library.Account._unsafe_execute.pedersen_ptr": 262,
                        "account.library.Account._unsafe_execute.range_check_ptr": 263,
                        "account.library.Account._unsafe_execute.syscall_ptr": 266
                    }
                },
                "name": "error_message",
                "start_pc": 382,
                "value": "Account: no reentrant call"
            },
            {
                "accessible_scopes": [
                    "account.library",
                    "account.library.Account",
                    "account.library.Account._unsafe_execute"
                ],
                "end_pc": 392,
                "flow_tracking_data": {
                    "ap_tracking": {
                        "group": 36,
                        "offset": 33
                    },
                    "reference_ids": {
                        "account.library.Account._unsafe_execute._current_nonce": 271,
                        "account.library.Account._unsafe_execute.bitwise_ptr": 265,
                        "account.library.Account._unsafe_execute.call_array": 257,
                        "account.library.Account._unsafe_execute.call_array_len": 256,
                        "account.library.Account._unsafe_execute.calldata": 259,
                        "account.library.Account._unsafe_execute.calldata_len": 258,
                        "account.library.Account._unsafe_execute.caller": 267,
                        "account.library.Account._unsafe_execute.ecdsa_ptr": 264,
                        "account.library.Account._unsafe_execute.nonce": 260,
                        "account.library.Account._unsafe_execute.pedersen_ptr": 269,
                        "account.library.Account._unsafe_execute.range_check_ptr": 270,
                        "account.library.Account._unsafe_execute.syscall_ptr": 268
                    }
                },
                "name": "error_message",
                "start_pc": 389,
                "value": "Account: nonce is invalid"
            }
        ],
        "builtins": [
            "pedersen",
            "range_check",
            "ecdsa",
            "bitwise"
        ],
        "data": [
            "0x40780017fff7fff",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x400380007ffb7ffc",
            "0x400380017ffb7ffd",
            "0x482680017ffb8000",
            "0x3",
            "0x480280027ffb8000",
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
            "0x208b7fff7fff7ffe",
            "0x48297ffd80007ffc",
            "0x20680017fff7fff",
            "0x4",
            "0x402780017ffc7ffc",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x400380007ffc7ffd",
            "0x482680017ffc8000",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x48297ffc80007ffd",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffffb",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x482680017ffd8000",
            "0x800000000000011000000000000000000000000000000000000000000000000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffff8",
            "0x208b7fff7fff7ffe",
            "0x480680017fff8000",
            "0x3ffffffffffffffffffffffffffffff",
            "0x480280017ffc8000",
            "0x48307fff80007ffe",
            "0x400280027ffc7fff",
            "0x480280017ffc8000",
            "0x484480017fff8000",
            "0x100000000000000000000000000000000",
            "0x480280007ffc8000",
            "0x40317fff7ffe7ffd",
            "0x482680017ffc8000",
            "0x3",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x1",
            "0x20680017fff7fff",
            "0x10",
            "0x480a7ffc7fff8000",
            "0x482680017ffd8000",
            "0x11000000000000000000000000000000000000000000000101",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffed",
            "0x480680017fff8000",
            "0x800000000000011000000000000000000000000000000000000000000000000",
            "0x48127ffe7fff8000",
            "0x48287ffd80007ffe",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffe7",
            "0x482680017ffd8000",
            "0x11000000000000000000000000000000000000000000000101",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x1",
            "0x20680017fff7fff",
            "0xc",
            "0x40780017fff7fff",
            "0xa",
            "0x480680017fff8000",
            "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeff",
            "0x480a7ffc7fff8000",
            "0x48287ffd80007ffe",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd8",
            "0x10780017fff7fff",
            "0x8",
            "0x40780017fff7fff",
            "0xb",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd0",
            "0x480a7ffd7fff8000",
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
            "0x480a7ffb7fff8000",
            "0x480680017fff8000",
            "0x10f6bdc8f69644775581b157f06334cb94ae302da4f6d09656c9a31f092cff6",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff66",
            "0x480a7ffc7fff8000",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff9b",
            "0x48127fe17fff8000",
            "0x48127ffd7fff8000",
            "0x48127ffd7fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffff0",
            "0x480a7ffa7fff8000",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd0",
            "0x48127ffe7fff8000",
            "0x48127ff57fff8000",
            "0x48127ff57fff8000",
            "0x48127ffc7fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffe2",
            "0x480a7ff97fff8000",
            "0x48127ffe7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffc9",
            "0x48127ff67fff8000",
            "0x48127ff67fff8000",
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
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd8",
            "0x208b7fff7fff7ffe",
            "0x480a7ffd7fff8000",
            "0x480680017fff8000",
            "0xffffffff",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff43",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x480680017fff8000",
            "0x1",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd8",
            "0x208b7fff7fff7ffe",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x480680017fff8000",
            "0x1813aac5f5e7799684c6dc33e51f44d3627fd748c800724a184ed5be09b713e",
            "0x208b7fff7fff7ffe",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffffa",
            "0x480a7ffb7fff8000",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff92",
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
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff8c",
            "0x48127ff67fff8000",
            "0x48127ff67fff8000",
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
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff74",
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
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff6e",
            "0x48127ff67fff8000",
            "0x48127ff67fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffff1",
            "0x480680017fff8000",
            "0xf10dbd44",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffaf",
            "0x208b7fff7fff7ffe",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff4e",
            "0x48127ffe7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff44",
            "0x40127fff7fff7ff9",
            "0x48127ffe7fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffd1",
            "0x208b7fff7fff7ffe",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffad",
            "0x208b7fff7fff7ffe",
            "0x480a7ffa7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffeb",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffcf",
            "0x208b7fff7fff7ffe",
            "0x480a7ff77fff8000",
            "0x480a7ff87fff8000",
            "0x480a7ff97fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffbc",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x48127ffd7fff8000",
            "0x480280007ffd8000",
            "0x480280017ffd8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff45",
            "0x48127ff47fff8000",
            "0x48127ff47fff8000",
            "0x48127ff47fff8000",
            "0x48127ffc7fff8000",
            "0x480680017fff8000",
            "0x1",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x0",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffebd",
            "0x480a7ff47fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff30",
            "0x48127ffe7fff8000",
            "0x480a7ff57fff8000",
            "0x480a7ff67fff8000",
            "0x480a7ff77fff8000",
            "0x480080057ffb8000",
            "0x480080037ffa8000",
            "0x480080047ff98000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffe0",
            "0x400680017fff7fff",
            "0x1",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x48127ffb7fff8000",
            "0x480a7ff87fff8000",
            "0x480a7ff97fff8000",
            "0x480a7ffa7fff8000",
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x3",
            "0x208b7fff7fff7ffe",
            "0x40780017fff7fff",
            "0x4",
            "0x480a7ff47fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffef5",
            "0x400680017fff7fff",
            "0x0",
            "0x48127ffe7fff8000",
            "0x480a7ff57fff8000",
            "0x480a7ff67fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff65",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffea3",
            "0x48127fef7fff8000",
            "0x48127fef7fff8000",
            "0x48127ffd7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff69",
            "0x40137ffe7fff8000",
            "0x40137fff7fff8001",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe71",
            "0x40137fff7fff8002",
            "0x48127ffa7fff8000",
            "0x480a7ff97fff8000",
            "0x480a7ffa7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a80027fff8000",
            "0x1104800180018000",
            "0x35",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe67",
            "0x40137fff7fff8003",
            "0x48127ffc7fff8000",
            "0x480a7ff97fff8000",
            "0x480a80027fff8000",
            "0x480a80037fff8000",
            "0x1104800180018000",
            "0xa",
            "0x48127ffe7fff8000",
            "0x480a80007fff8000",
            "0x480a80017fff8000",
            "0x480a7ff77fff8000",
            "0x480a7ff87fff8000",
            "0x48127ffa7fff8000",
            "0x480a80037fff8000",
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
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffead",
            "0x40137ffe7fff8000",
            "0x40137fff7fff8001",
            "0x40137ffd7fff8002",
            "0x480a7ffd7fff8000",
            "0x480a80017fff8000",
            "0x480a80007fff8000",
            "0x1104800180018000",
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe4a",
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
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff36",
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
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff30",
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
            "0x480a7ffb7fff8000",
            "0x480a7ffc7fff8000",
            "0x480a7ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffff16",
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
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffe80",
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
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffed7",
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
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffec2",
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
            "0x482480017ffd8000",
            "0x1",
            "0x480280037ffb8000",
            "0x480280007ffd8000",
            "0x480280017ffd8000",
            "0x482680017ffd8000",
            "0x2",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffdc",
            "0x48127ffd7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffe3",
            "0x48127ff37fff8000",
            "0x48127ff37fff8000",
            "0x48127ffb7fff8000",
            "0x48127ff37fff8000",
            "0x480280047ffb8000",
            "0x48127ff97fff8000",
            "0x48127ff97fff8000",
            "0x208b7fff7fff7ffe",
            "0x480a7ff47fff8000",
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
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffea0",
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
            "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffd3f",
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
            "0x482480017fff8000",
            "0x1",
            "0x402a7ffd7ffc7fff",
            "0x480280027ffb8000",
            "0x480280007ffb8000",
            "0x480280017ffb8000",
            "0x482480017ffd8000",
            "0x2",
            "0x480280037ffb8000",
            "0x480280047ffb8000",
            "0x480280007ffd8000",
            "0x482680017ffd8000",
            "0x1",
            "0x480080007ff18000",
            "0x482480017ff08000",
            "0x1",
            "0x480080007ff48000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffbe",
            "0x40137ff97fff8000",
            "0x40137ffa7fff8001",
            "0x40137ffc7fff8002",
            "0x40137ffd7fff8003",
            "0x48127ffb7fff8000",
            "0x1104800180018000",
            "0x800000000000010ffffffffffffffffffffffffffffffffffffffffffffffc4",
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
            "12": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.memcpy",
                        "starkware.cairo.common.memcpy.memcpy"
                    ],
                    "code": "vm_enter_scope({'n': ids.len})",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 2,
                            "offset": 0
                        },
                        "reference_ids": {
                            "starkware.cairo.common.memcpy.memcpy.dst": 5,
                            "starkware.cairo.common.memcpy.memcpy.len": 7,
                            "starkware.cairo.common.memcpy.memcpy.src": 6
                        }
                    }
                }
            ],
            "20": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.memcpy",
                        "starkware.cairo.common.memcpy.memcpy"
                    ],
                    "code": "n -= 1\nids.continue_copying = 1 if n > 0 else 0",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 2,
                            "offset": 5
                        },
                        "reference_ids": {
                            "starkware.cairo.common.memcpy.memcpy.__temp0": 10,
                            "starkware.cairo.common.memcpy.memcpy.continue_copying": 11,
                            "starkware.cairo.common.memcpy.memcpy.dst": 5,
                            "starkware.cairo.common.memcpy.memcpy.frame": 9,
                            "starkware.cairo.common.memcpy.memcpy.len": 7,
                            "starkware.cairo.common.memcpy.memcpy.next_frame": 12,
                            "starkware.cairo.common.memcpy.memcpy.src": 6
                        }
                    }
                }
            ],
            "23": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.memcpy",
                        "starkware.cairo.common.memcpy.memcpy"
                    ],
                    "code": "vm_exit_scope()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 2,
                            "offset": 6
                        },
                        "reference_ids": {
                            "starkware.cairo.common.memcpy.memcpy.__temp0": 10,
                            "starkware.cairo.common.memcpy.memcpy.continue_copying": 11,
                            "starkware.cairo.common.memcpy.memcpy.dst": 5,
                            "starkware.cairo.common.memcpy.memcpy.frame": 9,
                            "starkware.cairo.common.memcpy.memcpy.len": 7,
                            "starkware.cairo.common.memcpy.memcpy.next_frame": 12,
                            "starkware.cairo.common.memcpy.memcpy.src": 6
                        }
                    }
                }
            ],
            "25": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.math",
                        "starkware.cairo.common.math.assert_not_equal"
                    ],
                    "code": "from starkware.cairo.lang.vm.relocatable import RelocatableValue\nboth_ints = isinstance(ids.a, int) and isinstance(ids.b, int)\nboth_relocatable = (\n    isinstance(ids.a, RelocatableValue) and isinstance(ids.b, RelocatableValue) and\n    ids.a.segment_index == ids.b.segment_index)\nassert both_ints or both_relocatable, \\\n    f'assert_not_equal failed: non-comparable values: {ids.a}, {ids.b}.'\nassert (ids.a - ids.b) % PRIME != 0, f'assert_not_equal failed: {ids.a} = {ids.b}.'",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 4,
                            "offset": 0
                        },
                        "reference_ids": {
                            "starkware.cairo.common.math.assert_not_equal.a": 13,
                            "starkware.cairo.common.math.assert_not_equal.b": 14
                        }
                    }
                }
            ],
            "31": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.math",
                        "starkware.cairo.common.math.assert_nn"
                    ],
                    "code": "from starkware.cairo.common.math_utils import assert_integer\nassert_integer(ids.a)\nassert 0 <= ids.a % PRIME < range_check_builtin.bound, f'a = {ids.a} is out of range.'",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 5,
                            "offset": 0
                        },
                        "reference_ids": {
                            "starkware.cairo.common.math.assert_nn.a": 16,
                            "starkware.cairo.common.math.assert_nn.range_check_ptr": 17
                        }
                    }
                }
            ],
            "47": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.math",
                        "starkware.cairo.common.math.assert_250_bit"
                    ],
                    "code": "from starkware.cairo.common.math_utils import as_int\n\n# Correctness check.\nvalue = as_int(ids.value, PRIME) % PRIME\nassert value < ids.UPPER_BOUND, f'{value} is outside of the range [0, 2**250).'\n\n# Calculation for the assertion.\nids.high, ids.low = divmod(ids.value, ids.SHIFT)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 8,
                            "offset": 0
                        },
                        "reference_ids": {
                            "starkware.cairo.common.math.assert_250_bit.high": 30,
                            "starkware.cairo.common.math.assert_250_bit.low": 29,
                            "starkware.cairo.common.math.assert_250_bit.range_check_ptr": 28,
                            "starkware.cairo.common.math.assert_250_bit.value": 27
                        }
                    }
                }
            ],
            "62": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.storage",
                        "starkware.starknet.common.storage.normalize_address"
                    ],
                    "code": "# Verify the assumptions on the relationship between 2**250, ADDR_BOUND and PRIME.\nADDR_BOUND = ids.ADDR_BOUND % PRIME\nassert (2**250 < ADDR_BOUND <= 2**251) and (2 * 2**250 < PRIME) and (\n        ADDR_BOUND * 2 > PRIME), \\\n    'normalize_address() cannot be used with the current constants.'\nids.is_small = 1 if ids.addr < ADDR_BOUND else 0",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 9,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.storage.normalize_address.addr": 38,
                            "starkware.starknet.common.storage.normalize_address.is_small": 40,
                            "starkware.starknet.common.storage.normalize_address.range_check_ptr": 39
                        }
                    }
                }
            ],
            "80": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.storage",
                        "starkware.starknet.common.storage.normalize_address"
                    ],
                    "code": "ids.is_250 = 1 if ids.addr < 2**250 else 0",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 9,
                            "offset": 2
                        },
                        "reference_ids": {
                            "starkware.starknet.common.storage.normalize_address.addr": 38,
                            "starkware.starknet.common.storage.normalize_address.is_250": 46,
                            "starkware.starknet.common.storage.normalize_address.is_small": 40,
                            "starkware.starknet.common.storage.normalize_address.range_check_ptr": 39
                        }
                    }
                }
            ],
            "107": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.call_contract"
                    ],
                    "code": "syscall_handler.call_contract(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 10,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.call_contract.__temp10": 57,
                            "starkware.starknet.common.syscalls.call_contract.calldata": 54,
                            "starkware.starknet.common.syscalls.call_contract.calldata_size": 53,
                            "starkware.starknet.common.syscalls.call_contract.contract_address": 51,
                            "starkware.starknet.common.syscalls.call_contract.function_selector": 52,
                            "starkware.starknet.common.syscalls.call_contract.syscall": 56,
                            "starkware.starknet.common.syscalls.call_contract.syscall_ptr": 55
                        }
                    }
                }
            ],
            "115": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.get_caller_address"
                    ],
                    "code": "syscall_handler.get_caller_address(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 11,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.get_caller_address.__temp11": 62,
                            "starkware.starknet.common.syscalls.get_caller_address.syscall": 61,
                            "starkware.starknet.common.syscalls.get_caller_address.syscall_ptr": 60
                        }
                    }
                }
            ],
            "122": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.get_contract_address"
                    ],
                    "code": "syscall_handler.get_contract_address(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 12,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.get_contract_address.__temp12": 66,
                            "starkware.starknet.common.syscalls.get_contract_address.syscall": 65,
                            "starkware.starknet.common.syscalls.get_contract_address.syscall_ptr": 64
                        }
                    }
                }
            ],
            "130": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.storage_read"
                    ],
                    "code": "syscall_handler.storage_read(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 13,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.storage_read.__temp13": 71,
                            "starkware.starknet.common.syscalls.storage_read.address": 68,
                            "starkware.starknet.common.syscalls.storage_read.syscall": 70,
                            "starkware.starknet.common.syscalls.storage_read.syscall_ptr": 69
                        }
                    }
                }
            ],
            "139": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.storage_write"
                    ],
                    "code": "syscall_handler.storage_write(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 14,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.storage_write.__temp14": 77,
                            "starkware.starknet.common.syscalls.storage_write.address": 74,
                            "starkware.starknet.common.syscalls.storage_write.syscall_ptr": 76,
                            "starkware.starknet.common.syscalls.storage_write.value": 75
                        }
                    }
                }
            ],
            "145": [
                {
                    "accessible_scopes": [
                        "starkware.starknet.common.syscalls",
                        "starkware.starknet.common.syscalls.get_tx_info"
                    ],
                    "code": "syscall_handler.get_tx_info(segments=segments, syscall_ptr=ids.syscall_ptr)",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 15,
                            "offset": 1
                        },
                        "reference_ids": {
                            "starkware.starknet.common.syscalls.get_tx_info.__temp15": 81,
                            "starkware.starknet.common.syscalls.get_tx_info.syscall": 80,
                            "starkware.starknet.common.syscalls.get_tx_info.syscall_ptr": 79
                        }
                    }
                }
            ],
            "149": [
                {
                    "accessible_scopes": [
                        "starkware.cairo.common.signature",
                        "starkware.cairo.common.signature.verify_ecdsa_signature"
                    ],
                    "code": "ecdsa_builtin.add_signature(ids.ecdsa_ptr.address_, (ids.signature_r, ids.signature_s))",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 16,
                            "offset": 0
                        },
                        "reference_ids": {
                            "starkware.cairo.common.signature.verify_ecdsa_signature.ecdsa_ptr": 88,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.message": 84,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.public_key": 85,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.signature_r": 86,
                            "starkware.cairo.common.signature.verify_ecdsa_signature.signature_s": 87
                        }
                    }
                }
            ],
            "501": [
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
                            "group": 45,
                            "offset": 103
                        },
                        "reference_ids": {
                            "__wrappers__.constructor.__calldata_actual_size": 323,
                            "__wrappers__.constructor.__calldata_arg_public_key": 321,
                            "__wrappers__.constructor.__calldata_ptr": 322,
                            "__wrappers__.constructor.__temp22": 324,
                            "__wrappers__.constructor.bitwise_ptr": 319,
                            "__wrappers__.constructor.ecdsa_ptr": 318,
                            "__wrappers__.constructor.pedersen_ptr": 326,
                            "__wrappers__.constructor.range_check_ptr": 327,
                            "__wrappers__.constructor.ret_value": 328,
                            "__wrappers__.constructor.syscall_ptr": 325
                        }
                    }
                }
            ],
            "518": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.get_public_key_encode_return"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 47,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.get_public_key_encode_return.range_check_ptr": 339,
                            "__wrappers__.get_public_key_encode_return.ret_value": 338
                        }
                    }
                }
            ],
            "550": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.get_nonce_encode_return"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 50,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.get_nonce_encode_return.range_check_ptr": 366,
                            "__wrappers__.get_nonce_encode_return.ret_value": 365
                        }
                    }
                }
            ],
            "583": [
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
                            "group": 54,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.supportsInterface_encode_return.range_check_ptr": 394,
                            "__wrappers__.supportsInterface_encode_return.ret_value": 393
                        }
                    }
                }
            ],
            "628": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.set_public_key"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 58,
                            "offset": 50
                        },
                        "reference_ids": {
                            "__wrappers__.set_public_key.__calldata_actual_size": 431,
                            "__wrappers__.set_public_key.__calldata_arg_new_public_key": 429,
                            "__wrappers__.set_public_key.__calldata_ptr": 430,
                            "__wrappers__.set_public_key.__temp27": 432,
                            "__wrappers__.set_public_key.bitwise_ptr": 427,
                            "__wrappers__.set_public_key.ecdsa_ptr": 426,
                            "__wrappers__.set_public_key.pedersen_ptr": 434,
                            "__wrappers__.set_public_key.range_check_ptr": 435,
                            "__wrappers__.set_public_key.ret_value": 436,
                            "__wrappers__.set_public_key.syscall_ptr": 433
                        }
                    }
                }
            ],
            "649": [
                {
                    "accessible_scopes": [
                        "__main__",
                        "__main__",
                        "__wrappers__",
                        "__wrappers__.is_valid_signature_encode_return"
                    ],
                    "code": "memory[ap] = segments.add()",
                    "flow_tracking_data": {
                        "ap_tracking": {
                            "group": 60,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.is_valid_signature_encode_return.range_check_ptr": 452,
                            "__wrappers__.is_valid_signature_encode_return.ret_value": 451
                        }
                    }
                }
            ],
            "702": [
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
                            "group": 64,
                            "offset": 0
                        },
                        "reference_ids": {
                            "__wrappers__.__execute___encode_return.range_check_ptr": 502,
                            "__wrappers__.__execute___encode_return.ret_value": 501
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
            "__main__.ERC165": {
                "destination": "openzeppelin.introspection.erc165.library.ERC165",
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
                "pc": 689,
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
                    },
                    "nonce": {
                        "cairo_type": "felt",
                        "offset": 4
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "__main__.__execute__.ImplicitArgs": {
                "full_name": "__main__.__execute__.ImplicitArgs",
                "members": {
                    "bitwise_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                        "offset": 4
                    },
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 3
                    },
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
                "size": 5,
                "type": "struct"
            },
            "__main__.__execute__.Return": {
                "cairo_type": "(response_len : felt, response : felt*)",
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 63,
                            "offset": 0
                        },
                        "pc": 701,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-6), account.library.AccountCallArray**)]"
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-7), felt*)]"
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-4), felt**)]"
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-5), felt*)]"
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 63,
                            "offset": 0
                        },
                        "pc": 701,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.__execute__.nonce": {
                "cairo_type": "felt",
                "full_name": "__main__.__execute__.nonce",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-3), felt*)]"
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-11), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 63,
                            "offset": 0
                        },
                        "pc": 701,
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-10), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 63,
                            "offset": 0
                        },
                        "pc": 701,
                        "value": "[cast(ap + (-5), felt*)]"
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
                            "group": 63,
                            "offset": 0
                        },
                        "pc": 701,
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
                            "group": 63,
                            "offset": 0
                        },
                        "pc": 701,
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
                            "group": 62,
                            "offset": 0
                        },
                        "pc": 689,
                        "value": "[cast(fp + (-12), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 63,
                            "offset": 0
                        },
                        "pc": 701,
                        "value": "[cast(ap + (-7), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.constructor": {
                "decorators": [
                    "constructor"
                ],
                "pc": 485,
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
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 485,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 96
                        },
                        "pc": 491,
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
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 485,
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
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 485,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 96
                        },
                        "pc": 491,
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
                            "group": 44,
                            "offset": 0
                        },
                        "pc": 485,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 44,
                            "offset": 96
                        },
                        "pc": 491,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_nonce": {
                "decorators": [
                    "view"
                ],
                "pc": 544,
                "type": "function"
            },
            "__main__.get_nonce.Args": {
                "full_name": "__main__.get_nonce.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__main__.get_nonce.ImplicitArgs": {
                "full_name": "__main__.get_nonce.ImplicitArgs",
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
            "__main__.get_nonce.Return": {
                "cairo_type": "(res : felt)",
                "type": "type_definition"
            },
            "__main__.get_nonce.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.get_nonce.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.get_nonce.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 0
                        },
                        "pc": 544,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 28
                        },
                        "pc": 549,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_nonce.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.get_nonce.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 0
                        },
                        "pc": 544,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 28
                        },
                        "pc": 549,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_nonce.res": {
                "cairo_type": "felt",
                "full_name": "__main__.get_nonce.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 28
                        },
                        "pc": 549,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_nonce.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.get_nonce.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 0
                        },
                        "pc": 544,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 49,
                            "offset": 28
                        },
                        "pc": 549,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_public_key": {
                "decorators": [
                    "view"
                ],
                "pc": 512,
                "type": "function"
            },
            "__main__.get_public_key.Args": {
                "full_name": "__main__.get_public_key.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__main__.get_public_key.ImplicitArgs": {
                "full_name": "__main__.get_public_key.ImplicitArgs",
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
            "__main__.get_public_key.Return": {
                "cairo_type": "(res : felt)",
                "type": "type_definition"
            },
            "__main__.get_public_key.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.get_public_key.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.get_public_key.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 512,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 28
                        },
                        "pc": 517,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_public_key.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.get_public_key.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 512,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 28
                        },
                        "pc": 517,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_public_key.res": {
                "cairo_type": "felt",
                "full_name": "__main__.get_public_key.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 28
                        },
                        "pc": 517,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.get_public_key.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.get_public_key.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 0
                        },
                        "pc": 512,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 46,
                            "offset": 28
                        },
                        "pc": 517,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature": {
                "decorators": [
                    "view"
                ],
                "pc": 639,
                "type": "function"
            },
            "__main__.is_valid_signature.Args": {
                "full_name": "__main__.is_valid_signature.Args",
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
            "__main__.is_valid_signature.ImplicitArgs": {
                "full_name": "__main__.is_valid_signature.ImplicitArgs",
                "members": {
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 3
                    },
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
                "size": 4,
                "type": "struct"
            },
            "__main__.is_valid_signature.Return": {
                "cairo_type": "(is_valid : felt)",
                "type": "type_definition"
            },
            "__main__.is_valid_signature.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.is_valid_signature.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__main__.is_valid_signature.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 0
                        },
                        "pc": 639,
                        "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 45
                        },
                        "pc": 648,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature.hash": {
                "cairo_type": "felt",
                "full_name": "__main__.is_valid_signature.hash",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 0
                        },
                        "pc": 639,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature.is_valid": {
                "cairo_type": "felt",
                "full_name": "__main__.is_valid_signature.is_valid",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 45
                        },
                        "pc": 648,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.is_valid_signature.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 0
                        },
                        "pc": 639,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 45
                        },
                        "pc": 648,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.is_valid_signature.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 0
                        },
                        "pc": 639,
                        "value": "[cast(fp + (-7), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 45
                        },
                        "pc": 648,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature.signature": {
                "cairo_type": "felt*",
                "full_name": "__main__.is_valid_signature.signature",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 0
                        },
                        "pc": 639,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature.signature_len": {
                "cairo_type": "felt",
                "full_name": "__main__.is_valid_signature.signature_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 0
                        },
                        "pc": 639,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.is_valid_signature.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.is_valid_signature.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 0
                        },
                        "pc": 639,
                        "value": "[cast(fp + (-9), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 59,
                            "offset": 45
                        },
                        "pc": 648,
                        "value": "[cast(ap + (-5), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.set_public_key": {
                "decorators": [
                    "external"
                ],
                "pc": 612,
                "type": "function"
            },
            "__main__.set_public_key.Args": {
                "full_name": "__main__.set_public_key.Args",
                "members": {
                    "new_public_key": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "__main__.set_public_key.ImplicitArgs": {
                "full_name": "__main__.set_public_key.ImplicitArgs",
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
            "__main__.set_public_key.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "__main__.set_public_key.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__main__.set_public_key.new_public_key": {
                "cairo_type": "felt",
                "full_name": "__main__.set_public_key.new_public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 57,
                            "offset": 0
                        },
                        "pc": 612,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.set_public_key.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__main__.set_public_key.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 57,
                            "offset": 0
                        },
                        "pc": 612,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 57,
                            "offset": 43
                        },
                        "pc": 618,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.set_public_key.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__main__.set_public_key.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 57,
                            "offset": 0
                        },
                        "pc": 612,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 57,
                            "offset": 43
                        },
                        "pc": 618,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.set_public_key.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__main__.set_public_key.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 57,
                            "offset": 0
                        },
                        "pc": 612,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 57,
                            "offset": 43
                        },
                        "pc": 618,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.supportsInterface": {
                "decorators": [
                    "view"
                ],
                "pc": 576,
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
                "cairo_type": "(success : felt)",
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
                            "group": 52,
                            "offset": 0
                        },
                        "pc": 576,
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
                            "group": 52,
                            "offset": 0
                        },
                        "pc": 576,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 53,
                            "offset": 0
                        },
                        "pc": 582,
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
                            "group": 52,
                            "offset": 0
                        },
                        "pc": 576,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 53,
                            "offset": 0
                        },
                        "pc": 582,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__main__.supportsInterface.success": {
                "cairo_type": "felt",
                "full_name": "__main__.supportsInterface.success",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 53,
                            "offset": 0
                        },
                        "pc": 582,
                        "value": "[cast(ap + (-1), felt*)]"
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
                            "group": 52,
                            "offset": 0
                        },
                        "pc": 576,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 53,
                            "offset": 0
                        },
                        "pc": 582,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__": {
                "decorators": [
                    "external"
                ],
                "pc": 721,
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
                "cairo_type": "(syscall_ptr : felt*, pedersen_ptr : starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr : felt, ecdsa_ptr : starkware.cairo.common.cairo_builtins.SignatureBuiltin*, bitwise_ptr : starkware.cairo.common.cairo_builtins.BitwiseBuiltin*, size : felt, retdata : felt*)",
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
                            "group": 66,
                            "offset": 15
                        },
                        "pc": 739,
                        "value": "cast([ap + (-1)] + 1 - [fp + (-3)], felt)"
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
                            "group": 66,
                            "offset": 6
                        },
                        "pc": 726,
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
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
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
                            "group": 66,
                            "offset": 12
                        },
                        "pc": 735,
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
                            "group": 66,
                            "offset": 10
                        },
                        "pc": 732,
                        "value": "[cast([ap + (-1)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__calldata_arg_nonce": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__calldata_arg_nonce",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 15
                        },
                        "pc": 739,
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
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 10
                        },
                        "pc": 732,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 10
                        },
                        "pc": 732,
                        "value": "cast([ap + (-1)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 15
                        },
                        "pc": 739,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 15
                        },
                        "pc": 739,
                        "value": "cast([ap + (-1)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp35": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp35",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 5
                        },
                        "pc": 724,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp36": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp36",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 6
                        },
                        "pc": 725,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.__temp37": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute__.__temp37",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 7
                        },
                        "pc": 728,
                        "value": "[cast(ap + (-1), felt*)]"
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
                            "group": 66,
                            "offset": 8
                        },
                        "pc": 729,
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
                            "group": 66,
                            "offset": 9
                        },
                        "pc": 731,
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
                            "group": 66,
                            "offset": 11
                        },
                        "pc": 733,
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
                            "group": 66,
                            "offset": 12
                        },
                        "pc": 734,
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
                            "group": 66,
                            "offset": 13
                        },
                        "pc": 737,
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
                            "group": 66,
                            "offset": 14
                        },
                        "pc": 738,
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
                            "group": 66,
                            "offset": 16
                        },
                        "pc": 741,
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
                            "group": 66,
                            "offset": 17
                        },
                        "pc": 743,
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
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
                        "value": "[cast([fp + (-5)] + 4, starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 758,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 762,
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
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
                        "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 758,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 761,
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
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 758,
                        "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 760,
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
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 6
                        },
                        "pc": 726,
                        "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 66,
                            "offset": 12
                        },
                        "pc": 735,
                        "value": "cast([[fp + (-5)] + 2] + 2, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 758,
                        "value": "[cast(ap + (-5), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 68,
                            "offset": 0
                        },
                        "pc": 765,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute__.ret_value": {
                "cairo_type": "(response_len : felt, response : felt*)",
                "full_name": "__wrappers__.__execute__.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 758,
                        "value": "[cast(ap + (-2), (response_len : felt, response : felt*)*)]"
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
                            "group": 68,
                            "offset": 0
                        },
                        "pc": 765,
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
                            "group": 68,
                            "offset": 0
                        },
                        "pc": 765,
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
                            "group": 66,
                            "offset": 4
                        },
                        "pc": 723,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 758,
                        "value": "[cast(ap + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 67,
                            "offset": 0
                        },
                        "pc": 759,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return": {
                "decorators": [],
                "pc": 702,
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
                        "cairo_type": "(response_len : felt, response : felt*)",
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
                "cairo_type": "(range_check_ptr : felt, data_len : felt, data : felt*)",
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
                            "group": 64,
                            "offset": 3
                        },
                        "pc": 704,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 64,
                            "offset": 3
                        },
                        "pc": 705,
                        "value": "cast([fp] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 64,
                            "offset": 4
                        },
                        "pc": 711,
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
                            "group": 64,
                            "offset": 3
                        },
                        "pc": 708,
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
                            "group": 64,
                            "offset": 3
                        },
                        "pc": 704,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return.__temp34": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.__execute___encode_return.__temp34",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 64,
                            "offset": 4
                        },
                        "pc": 710,
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
                            "group": 64,
                            "offset": 0
                        },
                        "pc": 702,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 64,
                            "offset": 3
                        },
                        "pc": 708,
                        "value": "[cast(fp + 1, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.__execute___encode_return.ret_value": {
                "cairo_type": "(response_len : felt, response : felt*)",
                "full_name": "__wrappers__.__execute___encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 64,
                            "offset": 0
                        },
                        "pc": 702,
                        "value": "[cast(fp + (-5), (response_len : felt, response : felt*)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor": {
                "decorators": [
                    "constructor"
                ],
                "pc": 492,
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
                "cairo_type": "(syscall_ptr : felt*, pedersen_ptr : starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr : felt, ecdsa_ptr : felt, bitwise_ptr : felt, size : felt, retdata : felt*)",
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor.__temp22": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.constructor.__temp22",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 1
                        },
                        "pc": 494,
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 103
                        },
                        "pc": 501,
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 103
                        },
                        "pc": 501,
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
                            "group": 45,
                            "offset": 103
                        },
                        "pc": 501,
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
                            "group": 45,
                            "offset": 104
                        },
                        "pc": 503,
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
                            "group": 45,
                            "offset": 104
                        },
                        "pc": 503,
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
                            "group": 45,
                            "offset": 0
                        },
                        "pc": 492,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 45,
                            "offset": 103
                        },
                        "pc": 501,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.constructor_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.get_nonce": {
                "decorators": [
                    "view"
                ],
                "pc": 559,
                "type": "function"
            },
            "__wrappers__.get_nonce.Args": {
                "full_name": "__wrappers__.get_nonce.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.get_nonce.ImplicitArgs": {
                "full_name": "__wrappers__.get_nonce.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.get_nonce.Return": {
                "cairo_type": "(syscall_ptr : felt*, pedersen_ptr : starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr : felt, ecdsa_ptr : felt, bitwise_ptr : felt, size : felt, retdata : felt*)",
                "type": "type_definition"
            },
            "__wrappers__.get_nonce.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.get_nonce.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_nonce.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 559,
                        "value": "cast([fp + (-3)] - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_nonce.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 559,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.__wrapped_func": {
                "destination": "__main__.get_nonce",
                "type": "alias"
            },
            "__wrappers__.get_nonce.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_nonce.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 559,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.ecdsa_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_nonce.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 559,
                        "value": "[cast([fp + (-5)] + 3, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.get_nonce.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 559,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 33
                        },
                        "pc": 565,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_nonce.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 559,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 33
                        },
                        "pc": 565,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 41
                        },
                        "pc": 568,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.ret_value": {
                "cairo_type": "(res : felt)",
                "full_name": "__wrappers__.get_nonce.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 33
                        },
                        "pc": 565,
                        "value": "[cast(ap + (-1), (res : felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_nonce.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 41
                        },
                        "pc": 568,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_nonce.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 41
                        },
                        "pc": 568,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_nonce.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 0
                        },
                        "pc": 559,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 51,
                            "offset": 33
                        },
                        "pc": 565,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce_encode_return": {
                "decorators": [],
                "pc": 550,
                "type": "function"
            },
            "__wrappers__.get_nonce_encode_return.Args": {
                "full_name": "__wrappers__.get_nonce_encode_return.Args",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "ret_value": {
                        "cairo_type": "(res : felt)",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "__wrappers__.get_nonce_encode_return.ImplicitArgs": {
                "full_name": "__wrappers__.get_nonce_encode_return.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.get_nonce_encode_return.Return": {
                "cairo_type": "(range_check_ptr : felt, data_len : felt, data : felt*)",
                "type": "type_definition"
            },
            "__wrappers__.get_nonce_encode_return.SIZEOF_LOCALS": {
                "type": "const",
                "value": 1
            },
            "__wrappers__.get_nonce_encode_return.__return_value_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_nonce_encode_return.__return_value_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 1
                        },
                        "pc": 552,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 1
                        },
                        "pc": 553,
                        "value": "cast([fp] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce_encode_return.__return_value_ptr_start": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_nonce_encode_return.__return_value_ptr_start",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 1
                        },
                        "pc": 552,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce_encode_return.__temp24": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_nonce_encode_return.__temp24",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 2
                        },
                        "pc": 555,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.get_nonce_encode_return.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_nonce_encode_return.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 550,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_nonce_encode_return.ret_value": {
                "cairo_type": "(res : felt)",
                "full_name": "__wrappers__.get_nonce_encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 50,
                            "offset": 0
                        },
                        "pc": 550,
                        "value": "[cast(fp + (-4), (res : felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key": {
                "decorators": [
                    "view"
                ],
                "pc": 527,
                "type": "function"
            },
            "__wrappers__.get_public_key.Args": {
                "full_name": "__wrappers__.get_public_key.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.get_public_key.ImplicitArgs": {
                "full_name": "__wrappers__.get_public_key.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.get_public_key.Return": {
                "cairo_type": "(syscall_ptr : felt*, pedersen_ptr : starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr : felt, ecdsa_ptr : felt, bitwise_ptr : felt, size : felt, retdata : felt*)",
                "type": "type_definition"
            },
            "__wrappers__.get_public_key.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.get_public_key.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_public_key.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 0
                        },
                        "pc": 527,
                        "value": "cast([fp + (-3)] - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_public_key.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 0
                        },
                        "pc": 527,
                        "value": "[cast(fp + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.__wrapped_func": {
                "destination": "__main__.get_public_key",
                "type": "alias"
            },
            "__wrappers__.get_public_key.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_public_key.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 0
                        },
                        "pc": 527,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.ecdsa_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_public_key.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 0
                        },
                        "pc": 527,
                        "value": "[cast([fp + (-5)] + 3, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.get_public_key.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 0
                        },
                        "pc": 527,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 33
                        },
                        "pc": 533,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_public_key.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 0
                        },
                        "pc": 527,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 33
                        },
                        "pc": 533,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 41
                        },
                        "pc": 536,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.ret_value": {
                "cairo_type": "(res : felt)",
                "full_name": "__wrappers__.get_public_key.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 33
                        },
                        "pc": 533,
                        "value": "[cast(ap + (-1), (res : felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_public_key.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 41
                        },
                        "pc": 536,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_public_key.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 41
                        },
                        "pc": 536,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_public_key.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 0
                        },
                        "pc": 527,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 48,
                            "offset": 33
                        },
                        "pc": 533,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key_encode_return": {
                "decorators": [],
                "pc": 518,
                "type": "function"
            },
            "__wrappers__.get_public_key_encode_return.Args": {
                "full_name": "__wrappers__.get_public_key_encode_return.Args",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "ret_value": {
                        "cairo_type": "(res : felt)",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "__wrappers__.get_public_key_encode_return.ImplicitArgs": {
                "full_name": "__wrappers__.get_public_key_encode_return.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.get_public_key_encode_return.Return": {
                "cairo_type": "(range_check_ptr : felt, data_len : felt, data : felt*)",
                "type": "type_definition"
            },
            "__wrappers__.get_public_key_encode_return.SIZEOF_LOCALS": {
                "type": "const",
                "value": 1
            },
            "__wrappers__.get_public_key_encode_return.__return_value_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_public_key_encode_return.__return_value_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 1
                        },
                        "pc": 520,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 1
                        },
                        "pc": 521,
                        "value": "cast([fp] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key_encode_return.__return_value_ptr_start": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.get_public_key_encode_return.__return_value_ptr_start",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 1
                        },
                        "pc": 520,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key_encode_return.__temp23": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_public_key_encode_return.__temp23",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 2
                        },
                        "pc": 523,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.get_public_key_encode_return.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.get_public_key_encode_return.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 0
                        },
                        "pc": 518,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.get_public_key_encode_return.ret_value": {
                "cairo_type": "(res : felt)",
                "full_name": "__wrappers__.get_public_key_encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 47,
                            "offset": 0
                        },
                        "pc": 518,
                        "value": "[cast(fp + (-4), (res : felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature": {
                "decorators": [
                    "view"
                ],
                "pc": 658,
                "type": "function"
            },
            "__wrappers__.is_valid_signature.Args": {
                "full_name": "__wrappers__.is_valid_signature.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.is_valid_signature.ImplicitArgs": {
                "full_name": "__wrappers__.is_valid_signature.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.is_valid_signature.Return": {
                "cairo_type": "(syscall_ptr : felt*, pedersen_ptr : starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr : felt, ecdsa_ptr : starkware.cairo.common.cairo_builtins.SignatureBuiltin*, bitwise_ptr : felt, size : felt, retdata : felt*)",
                "type": "type_definition"
            },
            "__wrappers__.is_valid_signature.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.is_valid_signature.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 5
                        },
                        "pc": 665,
                        "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__calldata_arg_hash": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__calldata_arg_hash",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__calldata_arg_signature": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.is_valid_signature.__calldata_arg_signature",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 2
                        },
                        "pc": 661,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__calldata_arg_signature_len": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__calldata_arg_signature_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast([fp + (-3)] + 1, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.is_valid_signature.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 5
                        },
                        "pc": 665,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__temp29": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__temp29",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 1
                        },
                        "pc": 659,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__temp30": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__temp30",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 2
                        },
                        "pc": 660,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__temp31": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__temp31",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 3
                        },
                        "pc": 663,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__temp32": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__temp32",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 4
                        },
                        "pc": 664,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__temp33": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.__temp33",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 6
                        },
                        "pc": 667,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.__wrapped_func": {
                "destination": "__main__.is_valid_signature",
                "type": "alias"
            },
            "__wrappers__.is_valid_signature.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "__wrappers__.is_valid_signature.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 60
                        },
                        "pc": 678,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.is_valid_signature.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 60
                        },
                        "pc": 678,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 2
                        },
                        "pc": 661,
                        "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 60
                        },
                        "pc": 678,
                        "value": "[cast(ap + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 68
                        },
                        "pc": 681,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.ret_value": {
                "cairo_type": "(is_valid : felt)",
                "full_name": "__wrappers__.is_valid_signature.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 60
                        },
                        "pc": 678,
                        "value": "[cast(ap + (-1), (is_valid : felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.is_valid_signature.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 68
                        },
                        "pc": 681,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 68
                        },
                        "pc": 681,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.is_valid_signature.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 0
                        },
                        "pc": 658,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 61,
                            "offset": 60
                        },
                        "pc": 678,
                        "value": "[cast(ap + (-5), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature_encode_return": {
                "decorators": [],
                "pc": 649,
                "type": "function"
            },
            "__wrappers__.is_valid_signature_encode_return.Args": {
                "full_name": "__wrappers__.is_valid_signature_encode_return.Args",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 1
                    },
                    "ret_value": {
                        "cairo_type": "(is_valid : felt)",
                        "offset": 0
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "__wrappers__.is_valid_signature_encode_return.ImplicitArgs": {
                "full_name": "__wrappers__.is_valid_signature_encode_return.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.is_valid_signature_encode_return.Return": {
                "cairo_type": "(range_check_ptr : felt, data_len : felt, data : felt*)",
                "type": "type_definition"
            },
            "__wrappers__.is_valid_signature_encode_return.SIZEOF_LOCALS": {
                "type": "const",
                "value": 1
            },
            "__wrappers__.is_valid_signature_encode_return.__return_value_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.is_valid_signature_encode_return.__return_value_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 60,
                            "offset": 1
                        },
                        "pc": 651,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 60,
                            "offset": 1
                        },
                        "pc": 652,
                        "value": "cast([fp] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature_encode_return.__return_value_ptr_start": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.is_valid_signature_encode_return.__return_value_ptr_start",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 60,
                            "offset": 1
                        },
                        "pc": 651,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature_encode_return.__temp28": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature_encode_return.__temp28",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 60,
                            "offset": 2
                        },
                        "pc": 654,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.is_valid_signature_encode_return.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.is_valid_signature_encode_return.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 60,
                            "offset": 0
                        },
                        "pc": 649,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.is_valid_signature_encode_return.ret_value": {
                "cairo_type": "(is_valid : felt)",
                "full_name": "__wrappers__.is_valid_signature_encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 60,
                            "offset": 0
                        },
                        "pc": 649,
                        "value": "[cast(fp + (-4), (is_valid : felt)*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key": {
                "decorators": [
                    "external"
                ],
                "pc": 619,
                "type": "function"
            },
            "__wrappers__.set_public_key.Args": {
                "full_name": "__wrappers__.set_public_key.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.set_public_key.ImplicitArgs": {
                "full_name": "__wrappers__.set_public_key.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "__wrappers__.set_public_key.Return": {
                "cairo_type": "(syscall_ptr : felt*, pedersen_ptr : starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr : felt, ecdsa_ptr : felt, bitwise_ptr : felt, size : felt, retdata : felt*)",
                "type": "type_definition"
            },
            "__wrappers__.set_public_key.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "__wrappers__.set_public_key.__calldata_actual_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.set_public_key.__calldata_actual_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.__calldata_arg_new_public_key": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.set_public_key.__calldata_arg_new_public_key",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "[cast([fp + (-3)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.__calldata_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.set_public_key.__calldata_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.__temp27": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.set_public_key.__temp27",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 1
                        },
                        "pc": 621,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.__wrapped_func": {
                "destination": "__main__.set_public_key",
                "type": "alias"
            },
            "__wrappers__.set_public_key.bitwise_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.set_public_key.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "[cast([fp + (-5)] + 4, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.ecdsa_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.set_public_key.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "[cast([fp + (-5)] + 3, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "__wrappers__.set_public_key.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 50
                        },
                        "pc": 628,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.set_public_key.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 50
                        },
                        "pc": 628,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.ret_value": {
                "cairo_type": "()",
                "full_name": "__wrappers__.set_public_key.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 50
                        },
                        "pc": 628,
                        "value": "[cast(ap + 0, ()*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.retdata": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.set_public_key.retdata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 51
                        },
                        "pc": 630,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.retdata_size": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.set_public_key.retdata_size",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 51
                        },
                        "pc": 630,
                        "value": "cast(0, felt)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "__wrappers__.set_public_key.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 0
                        },
                        "pc": 619,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 58,
                            "offset": 50
                        },
                        "pc": 628,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.set_public_key_encode_return.memcpy": {
                "destination": "starkware.cairo.common.memcpy.memcpy",
                "type": "alias"
            },
            "__wrappers__.supportsInterface": {
                "decorators": [
                    "view"
                ],
                "pc": 592,
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
                "cairo_type": "(syscall_ptr : felt*, pedersen_ptr : starkware.cairo.common.cairo_builtins.HashBuiltin*, range_check_ptr : felt, ecdsa_ptr : felt, bitwise_ptr : felt, size : felt, retdata : felt*)",
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
                        "value": "cast([fp + (-3)] + 1, felt*)"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.__temp26": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface.__temp26",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 55,
                            "offset": 1
                        },
                        "pc": 594,
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
                        "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 56,
                            "offset": 0
                        },
                        "pc": 601,
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 56,
                            "offset": 0
                        },
                        "pc": 601,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 56,
                            "offset": 8
                        },
                        "pc": 604,
                        "value": "[cast(ap + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface.ret_value": {
                "cairo_type": "(success : felt)",
                "full_name": "__wrappers__.supportsInterface.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 56,
                            "offset": 0
                        },
                        "pc": 601,
                        "value": "[cast(ap + (-1), (success : felt)*)]"
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
                            "group": 56,
                            "offset": 8
                        },
                        "pc": 604,
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
                            "group": 56,
                            "offset": 8
                        },
                        "pc": 604,
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
                            "group": 55,
                            "offset": 0
                        },
                        "pc": 592,
                        "value": "[cast([fp + (-5)], felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 56,
                            "offset": 0
                        },
                        "pc": 601,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return": {
                "decorators": [],
                "pc": 583,
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
                        "cairo_type": "(success : felt)",
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
                "cairo_type": "(range_check_ptr : felt, data_len : felt, data : felt*)",
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
                            "group": 54,
                            "offset": 1
                        },
                        "pc": 585,
                        "value": "[cast(fp, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 54,
                            "offset": 1
                        },
                        "pc": 586,
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
                            "group": 54,
                            "offset": 1
                        },
                        "pc": 585,
                        "value": "[cast(fp, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return.__temp25": {
                "cairo_type": "felt",
                "full_name": "__wrappers__.supportsInterface_encode_return.__temp25",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 54,
                            "offset": 2
                        },
                        "pc": 588,
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
                            "group": 54,
                            "offset": 0
                        },
                        "pc": 583,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "__wrappers__.supportsInterface_encode_return.ret_value": {
                "cairo_type": "(success : felt)",
                "full_name": "__wrappers__.supportsInterface_encode_return.ret_value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 54,
                            "offset": 0
                        },
                        "pc": 583,
                        "value": "[cast(fp + (-4), (success : felt)*)]"
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
                "pc": 427,
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
                "cairo_type": "(response_len : felt)",
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
                            "group": 39,
                            "offset": 0
                        },
                        "pc": 427,
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
                            "group": 39,
                            "offset": 0
                        },
                        "pc": 427,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._execute_list.res": {
                "cairo_type": "(retdata_size : felt, retdata : felt*)",
                "full_name": "account.library.Account._execute_list.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 14
                        },
                        "pc": 442,
                        "value": "[cast(ap + (-2), (retdata_size : felt, retdata : felt*)*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 14
                        },
                        "pc": 444,
                        "value": "[cast(fp, (retdata_size : felt, retdata : felt*)*)]"
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
                            "group": 39,
                            "offset": 0
                        },
                        "pc": 427,
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
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 458,
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
                            "group": 39,
                            "offset": 0
                        },
                        "pc": 427,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 11
                        },
                        "pc": 442,
                        "value": "[cast(ap + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 455,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 14
                        },
                        "pc": 442,
                        "value": "[cast(ap + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 39,
                            "offset": 14
                        },
                        "pc": 445,
                        "value": "[cast(fp + 2, felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 41,
                            "offset": 0
                        },
                        "pc": 458,
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
                            "group": 39,
                            "offset": 3
                        },
                        "pc": 435,
                        "value": "[cast([fp + (-4)], account.library.Call*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call": {
                "decorators": [],
                "pc": 461,
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
            "account.library.Account._from_call_array_to_call.__temp17": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp17",
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
            "account.library.Account._from_call_array_to_call.__temp18": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp18",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 2
                        },
                        "pc": 468,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.__temp19": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp19",
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
            "account.library.Account._from_call_array_to_call.__temp20": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp20",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 4
                        },
                        "pc": 472,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._from_call_array_to_call.__temp21": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._from_call_array_to_call.__temp21",
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
            "account.library.Account._from_call_array_to_call.call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "account.library.Account._from_call_array_to_call.call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 461,
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
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 461,
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
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 461,
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
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 461,
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
                            "group": 42,
                            "offset": 0
                        },
                        "pc": 461,
                        "value": "[cast(fp + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 43,
                            "offset": 0
                        },
                        "pc": 484,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute": {
                "decorators": [],
                "pc": 377,
                "type": "function"
            },
            "account.library.Account._unsafe_execute.Args": {
                "full_name": "account.library.Account._unsafe_execute.Args",
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
                    },
                    "nonce": {
                        "cairo_type": "felt",
                        "offset": 4
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "account.library.Account._unsafe_execute.ImplicitArgs": {
                "full_name": "account.library.Account._unsafe_execute.ImplicitArgs",
                "members": {
                    "bitwise_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                        "offset": 4
                    },
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 3
                    },
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
                "size": 5,
                "type": "struct"
            },
            "account.library.Account._unsafe_execute.Return": {
                "cairo_type": "(response_len : felt, response : felt*)",
                "type": "type_definition"
            },
            "account.library.Account._unsafe_execute.SIZEOF_LOCALS": {
                "type": "const",
                "value": 4
            },
            "account.library.Account._unsafe_execute._current_nonce": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute._current_nonce",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 33
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.bitwise_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                "full_name": "account.library.Account._unsafe_execute.bitwise_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.call_array": {
                "cairo_type": "account.library.AccountCallArray*",
                "full_name": "account.library.Account._unsafe_execute.call_array",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-6), account.library.AccountCallArray**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.call_array_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute.call_array_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-7), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.calldata": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account._unsafe_execute.calldata",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.calldata_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute.calldata_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-5), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.caller": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute.caller",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 10
                        },
                        "pc": 382,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.calls": {
                "cairo_type": "account.library.Call*",
                "full_name": "account.library.Account._unsafe_execute.calls",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 71
                        },
                        "pc": 402,
                        "value": "[cast(ap + (-1), account.library.Call**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 71
                        },
                        "pc": 403,
                        "value": "[cast(fp + 2, account.library.Call**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.calls_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute.calls_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 410,
                        "value": "[cast(fp + (-7), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.ecdsa_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                "full_name": "account.library.Account._unsafe_execute.ecdsa_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.nonce": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute.nonce",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account._unsafe_execute.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-11), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 29
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 64
                        },
                        "pc": 398,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 33
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 68
                        },
                        "pc": 398,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 68
                        },
                        "pc": 399,
                        "value": "[cast(fp, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-10), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 29
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 42
                        },
                        "pc": 392,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 64
                        },
                        "pc": 398,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 33
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 46
                        },
                        "pc": 392,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 68
                        },
                        "pc": 398,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 68
                        },
                        "pc": 400,
                        "value": "[cast(fp + 1, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.response": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account._unsafe_execute.response",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 3
                        },
                        "pc": 412,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 3
                        },
                        "pc": 413,
                        "value": "[cast(fp + 3, felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.response_len": {
                "cairo_type": "felt",
                "full_name": "account.library.Account._unsafe_execute.response_len",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 419,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account._unsafe_execute.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account._unsafe_execute.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 0
                        },
                        "pc": 377,
                        "value": "[cast(fp + (-12), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 6
                        },
                        "pc": 382,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 29
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-4), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 64
                        },
                        "pc": 398,
                        "value": "[cast(ap + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 407,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 415,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 10
                        },
                        "pc": 382,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 33
                        },
                        "pc": 389,
                        "value": "[cast(ap + (-4), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 36,
                            "offset": 68
                        },
                        "pc": 398,
                        "value": "[cast(ap + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 37,
                            "offset": 0
                        },
                        "pc": 410,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 38,
                            "offset": 0
                        },
                        "pc": 419,
                        "value": "[cast(ap + (-2), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.assert_only_self": {
                "decorators": [],
                "pc": 297,
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
                            "group": 29,
                            "offset": 12
                        },
                        "pc": 303,
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
                            "group": 29,
                            "offset": 6
                        },
                        "pc": 300,
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
                            "group": 29,
                            "offset": 0
                        },
                        "pc": 297,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 6
                        },
                        "pc": 300,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 29,
                            "offset": 12
                        },
                        "pc": 303,
                        "value": "[cast(ap + (-2), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute": {
                "decorators": [],
                "pc": 346,
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
                    },
                    "nonce": {
                        "cairo_type": "felt",
                        "offset": 4
                    }
                },
                "size": 5,
                "type": "struct"
            },
            "account.library.Account.execute.ImplicitArgs": {
                "full_name": "account.library.Account.execute.ImplicitArgs",
                "members": {
                    "bitwise_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.BitwiseBuiltin*",
                        "offset": 4
                    },
                    "ecdsa_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.SignatureBuiltin*",
                        "offset": 3
                    },
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
                "size": 5,
                "type": "struct"
            },
            "account.library.Account.execute.Return": {
                "cairo_type": "(response_len : felt, response : felt*)",
                "type": "type_definition"
            },
            "account.library.Account.execute.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.execute.__fp__": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.execute.__fp__",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 2
                        },
                        "pc": 350,
                        "value": "[cast(ap + (-2), felt**)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 376,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-6), account.library.AccountCallArray**)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-7), felt*)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-4), felt**)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-5), felt*)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 53
                        },
                        "pc": 362,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 376,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.is_valid": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.is_valid",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 53
                        },
                        "pc": 362,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.execute.nonce": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.execute.nonce",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-3), felt*)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-11), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 53
                        },
                        "pc": 362,
                        "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 376,
                        "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-10), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 53
                        },
                        "pc": 362,
                        "value": "[cast(ap + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 376,
                        "value": "[cast(ap + (-5), felt*)]"
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
                            "group": 34,
                            "offset": 0
                        },
                        "pc": 346,
                        "value": "[cast(fp + (-12), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 8
                        },
                        "pc": 353,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 34,
                            "offset": 53
                        },
                        "pc": 362,
                        "value": "[cast(ap + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 35,
                            "offset": 0
                        },
                        "pc": 376,
                        "value": "[cast(ap + (-7), felt**)]"
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
                            "group": 34,
                            "offset": 8
                        },
                        "pc": 353,
                        "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_nonce": {
                "decorators": [],
                "pc": 312,
                "type": "function"
            },
            "account.library.Account.get_nonce.Args": {
                "full_name": "account.library.Account.get_nonce.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account.get_nonce.ImplicitArgs": {
                "full_name": "account.library.Account.get_nonce.ImplicitArgs",
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
            "account.library.Account.get_nonce.Return": {
                "cairo_type": "(res : felt)",
                "type": "type_definition"
            },
            "account.library.Account.get_nonce.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account.get_nonce.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account.get_nonce.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 0
                        },
                        "pc": 312,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 23
                        },
                        "pc": 317,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_nonce.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.get_nonce.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 0
                        },
                        "pc": 312,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 23
                        },
                        "pc": 317,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_nonce.res": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.get_nonce.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 23
                        },
                        "pc": 317,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_nonce.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account.get_nonce.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 0
                        },
                        "pc": 312,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 31,
                            "offset": 23
                        },
                        "pc": 317,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_public_key": {
                "decorators": [],
                "pc": 306,
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
                "cairo_type": "(res : felt)",
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
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 306,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 23
                        },
                        "pc": 311,
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
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 306,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 23
                        },
                        "pc": 311,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.get_public_key.res": {
                "cairo_type": "felt",
                "full_name": "account.library.Account.get_public_key.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 23
                        },
                        "pc": 311,
                        "value": "[cast(ap + (-1), felt*)]"
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
                            "group": 30,
                            "offset": 0
                        },
                        "pc": 306,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 30,
                            "offset": 23
                        },
                        "pc": 311,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.initializer": {
                "decorators": [],
                "pc": 286,
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
                            "group": 28,
                            "offset": 0
                        },
                        "pc": 286,
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
                            "group": 28,
                            "offset": 0
                        },
                        "pc": 286,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 22
                        },
                        "pc": 292,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 90
                        },
                        "pc": 296,
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
                            "group": 28,
                            "offset": 0
                        },
                        "pc": 286,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 22
                        },
                        "pc": 292,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 90
                        },
                        "pc": 296,
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
                            "group": 28,
                            "offset": 0
                        },
                        "pc": 286,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 22
                        },
                        "pc": 292,
                        "value": "[cast(ap + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 28,
                            "offset": 90
                        },
                        "pc": 296,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.is_valid_signature": {
                "decorators": [],
                "pc": 327,
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
                        "offset": 3
                    },
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
                "size": 4,
                "type": "struct"
            },
            "account.library.Account.is_valid_signature.Return": {
                "cairo_type": "(is_valid : felt)",
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
                            "group": 33,
                            "offset": 23
                        },
                        "pc": 332,
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
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 327,
                        "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 31
                        },
                        "pc": 339,
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
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 327,
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
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 327,
                        "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 23
                        },
                        "pc": 332,
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
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 327,
                        "value": "[cast(fp + (-7), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 23
                        },
                        "pc": 332,
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
                            "group": 33,
                            "offset": 23
                        },
                        "pc": 332,
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
                            "group": 33,
                            "offset": 23
                        },
                        "pc": 332,
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
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 327,
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
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 327,
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
                            "group": 33,
                            "offset": 0
                        },
                        "pc": 327,
                        "value": "[cast(fp + (-9), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 33,
                            "offset": 23
                        },
                        "pc": 332,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account.set_public_key": {
                "decorators": [],
                "pc": 318,
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
                            "group": 32,
                            "offset": 0
                        },
                        "pc": 318,
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
                            "group": 32,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 32,
                            "offset": 37
                        },
                        "pc": 326,
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
                            "group": 32,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 32,
                            "offset": 37
                        },
                        "pc": 326,
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
                            "group": 32,
                            "offset": 0
                        },
                        "pc": 318,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 32,
                            "offset": 16
                        },
                        "pc": 321,
                        "value": "[cast(ap + (-1), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 32,
                            "offset": 37
                        },
                        "pc": 326,
                        "value": "[cast(ap + (-3), felt**)]"
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
            "account.library.Account_current_nonce": {
                "type": "namespace"
            },
            "account.library.Account_current_nonce.Args": {
                "full_name": "account.library.Account_current_nonce.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_current_nonce.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "account.library.Account_current_nonce.ImplicitArgs": {
                "full_name": "account.library.Account_current_nonce.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_current_nonce.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account_current_nonce.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_current_nonce.addr": {
                "decorators": [],
                "pc": 226,
                "type": "function"
            },
            "account.library.Account_current_nonce.addr.Args": {
                "full_name": "account.library.Account_current_nonce.addr.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_current_nonce.addr.ImplicitArgs": {
                "full_name": "account.library.Account_current_nonce.addr.ImplicitArgs",
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
            "account.library.Account_current_nonce.addr.Return": {
                "cairo_type": "(res : felt)",
                "type": "type_definition"
            },
            "account.library.Account_current_nonce.addr.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_current_nonce.addr.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account_current_nonce.addr.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 22,
                            "offset": 0
                        },
                        "pc": 226,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.addr.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.addr.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 22,
                            "offset": 0
                        },
                        "pc": 226,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.addr.res": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.addr.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 22,
                            "offset": 0
                        },
                        "pc": 226,
                        "value": "cast(680641068382147823690491849560675892800103278811133310055689865859989991742, felt)"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.hash2": {
                "destination": "starkware.cairo.common.hash.hash2",
                "type": "alias"
            },
            "account.library.Account_current_nonce.normalize_address": {
                "destination": "starkware.starknet.common.storage.normalize_address",
                "type": "alias"
            },
            "account.library.Account_current_nonce.read": {
                "decorators": [],
                "pc": 231,
                "type": "function"
            },
            "account.library.Account_current_nonce.read.Args": {
                "full_name": "account.library.Account_current_nonce.read.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "account.library.Account_current_nonce.read.ImplicitArgs": {
                "full_name": "account.library.Account_current_nonce.read.ImplicitArgs",
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
            "account.library.Account_current_nonce.read.Return": {
                "cairo_type": "(res : felt)",
                "type": "type_definition"
            },
            "account.library.Account_current_nonce.read.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_current_nonce.read.__storage_var_temp0": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.read.__storage_var_temp0",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 14
                        },
                        "pc": 239,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 18
                        },
                        "pc": 243,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.read.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account_current_nonce.read.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 0
                        },
                        "pc": 231,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 7
                        },
                        "pc": 235,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 16
                        },
                        "pc": 241,
                        "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.read.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.read.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 0
                        },
                        "pc": 231,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 7
                        },
                        "pc": 235,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 17
                        },
                        "pc": 242,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.read.storage_addr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.read.storage_addr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 7
                        },
                        "pc": 235,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.read.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account_current_nonce.read.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 0
                        },
                        "pc": 231,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 14
                        },
                        "pc": 239,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 23,
                            "offset": 15
                        },
                        "pc": 240,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.storage_read": {
                "destination": "starkware.starknet.common.syscalls.storage_read",
                "type": "alias"
            },
            "account.library.Account_current_nonce.storage_write": {
                "destination": "starkware.starknet.common.syscalls.storage_write",
                "type": "alias"
            },
            "account.library.Account_current_nonce.write": {
                "decorators": [],
                "pc": 244,
                "type": "function"
            },
            "account.library.Account_current_nonce.write.Args": {
                "full_name": "account.library.Account_current_nonce.write.Args",
                "members": {
                    "value": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "account.library.Account_current_nonce.write.ImplicitArgs": {
                "full_name": "account.library.Account_current_nonce.write.ImplicitArgs",
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
            "account.library.Account_current_nonce.write.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "account.library.Account_current_nonce.write.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "account.library.Account_current_nonce.write.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "account.library.Account_current_nonce.write.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 244,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 7
                        },
                        "pc": 248,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.write.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.write.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 244,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 7
                        },
                        "pc": 248,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.write.storage_addr": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.write.storage_addr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 7
                        },
                        "pc": 248,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.write.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "account.library.Account_current_nonce.write.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 244,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 14
                        },
                        "pc": 253,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "account.library.Account_current_nonce.write.value": {
                "cairo_type": "felt",
                "full_name": "account.library.Account_current_nonce.write.value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 24,
                            "offset": 0
                        },
                        "pc": 244,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
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
                "pc": 256,
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
                "cairo_type": "(res : felt)",
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
                            "group": 25,
                            "offset": 0
                        },
                        "pc": 256,
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
                            "group": 25,
                            "offset": 0
                        },
                        "pc": 256,
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
                            "group": 25,
                            "offset": 0
                        },
                        "pc": 256,
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
                "pc": 261,
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
                "cairo_type": "(res : felt)",
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
                            "group": 26,
                            "offset": 14
                        },
                        "pc": 269,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 18
                        },
                        "pc": 273,
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
                            "group": 26,
                            "offset": 0
                        },
                        "pc": 261,
                        "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 7
                        },
                        "pc": 265,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 16
                        },
                        "pc": 271,
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
                            "group": 26,
                            "offset": 0
                        },
                        "pc": 261,
                        "value": "[cast(fp + (-3), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 7
                        },
                        "pc": 265,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 17
                        },
                        "pc": 272,
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
                            "group": 26,
                            "offset": 7
                        },
                        "pc": 265,
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
                            "group": 26,
                            "offset": 0
                        },
                        "pc": 261,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 14
                        },
                        "pc": 269,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 26,
                            "offset": 15
                        },
                        "pc": 270,
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
                "pc": 274,
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
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 274,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 7
                        },
                        "pc": 278,
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
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 274,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 7
                        },
                        "pc": 278,
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
                            "group": 27,
                            "offset": 7
                        },
                        "pc": 278,
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
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 274,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 27,
                            "offset": 14
                        },
                        "pc": 283,
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
                            "group": 27,
                            "offset": 0
                        },
                        "pc": 274,
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
            "account.library.ERC165": {
                "destination": "openzeppelin.introspection.erc165.library.ERC165",
                "type": "alias"
            },
            "account.library.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "account.library.IACCOUNT_ID": {
                "destination": "contracts.utils.constants.library.IACCOUNT_ID",
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
            "account.library.assert_lt": {
                "destination": "starkware.cairo.common.math.assert_lt",
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
            "contracts.utils.constants.library.DEFAULT_ADMIN_ROLE": {
                "type": "const",
                "value": 0
            },
            "contracts.utils.constants.library.IACCESSCONTROL_ID": {
                "type": "const",
                "value": 2036718347
            },
            "contracts.utils.constants.library.IACCOUNT_ID": {
                "type": "const",
                "value": 4044209476
            },
            "contracts.utils.constants.library.IERC165_ID": {
                "type": "const",
                "value": 33540519
            },
            "contracts.utils.constants.library.IERC721_ENUMERABLE_ID": {
                "type": "const",
                "value": 2014223715
            },
            "contracts.utils.constants.library.IERC721_ID": {
                "type": "const",
                "value": 2158778573
            },
            "contracts.utils.constants.library.IERC721_METADATA_ID": {
                "type": "const",
                "value": 1532892063
            },
            "contracts.utils.constants.library.IERC721_RECEIVER_ID": {
                "type": "const",
                "value": 353073666
            },
            "contracts.utils.constants.library.INVALID_ID": {
                "type": "const",
                "value": 4294967295
            },
            "contracts.utils.constants.library.UINT8_MAX": {
                "type": "const",
                "value": 256
            },
            "openzeppelin.introspection.erc165.library.ERC165": {
                "type": "namespace"
            },
            "openzeppelin.introspection.erc165.library.ERC165.Args": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165.ImplicitArgs": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "openzeppelin.introspection.erc165.library.ERC165.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface": {
                "decorators": [],
                "pc": 212,
                "type": "function"
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.Args": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.register_interface.Args",
                "members": {
                    "interface_id": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.ImplicitArgs": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.register_interface.ImplicitArgs",
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
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.interface_id": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.register_interface.interface_id",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 212,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.register_interface.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 212,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 65
                        },
                        "pc": 225,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.register_interface.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 212,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 65
                        },
                        "pc": 225,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.register_interface.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.register_interface.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 0
                        },
                        "pc": 212,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 21,
                            "offset": 65
                        },
                        "pc": 225,
                        "value": "[cast(ap + (-3), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface": {
                "decorators": [],
                "pc": 195,
                "type": "function"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.Args": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.Args",
                "members": {
                    "interface_id": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.ImplicitArgs": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.ImplicitArgs",
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
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.Return": {
                "cairo_type": "(success : felt)",
                "type": "type_definition"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.__temp16": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.__temp16",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 1
                        },
                        "pc": 197,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.interface_id": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.interface_id",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 0
                        },
                        "pc": 195,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.is_supported": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.is_supported",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 62
                        },
                        "pc": 211,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 0
                        },
                        "pc": 195,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 62
                        },
                        "pc": 211,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 0
                        },
                        "pc": 195,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 62
                        },
                        "pc": 211,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165.supports_interface.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165.supports_interface.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 0
                        },
                        "pc": 195,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 20,
                            "offset": 62
                        },
                        "pc": 211,
                        "value": "[cast(ap + (-4), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces": {
                "type": "namespace"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.Args": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.ImplicitArgs": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr": {
                "decorators": [],
                "pc": 154,
                "type": "function"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.Args": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.Args",
                "members": {
                    "interface_id": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.ImplicitArgs": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.ImplicitArgs",
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
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.Return": {
                "cairo_type": "(res : felt)",
                "type": "type_definition"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.interface_id": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.interface_id",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 154,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 154,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 7
                        },
                        "pc": 160,
                        "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 154,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 36
                        },
                        "pc": 164,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.res": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.addr.res",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 0
                        },
                        "pc": 154,
                        "value": "cast(479559987705328862372362947504386080106579713470203672197513890426980061174, felt)"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 7
                        },
                        "pc": 160,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 17,
                            "offset": 36
                        },
                        "pc": 164,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.hash2": {
                "destination": "starkware.cairo.common.hash.hash2",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.normalize_address": {
                "destination": "starkware.starknet.common.storage.normalize_address",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read": {
                "decorators": [],
                "pc": 168,
                "type": "function"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.Args": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.Args",
                "members": {
                    "interface_id": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.ImplicitArgs": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.ImplicitArgs",
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
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.Return": {
                "cairo_type": "(is_supported : felt)",
                "type": "type_definition"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.__storage_var_temp0": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.__storage_var_temp0",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 51
                        },
                        "pc": 177,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 55
                        },
                        "pc": 181,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.interface_id": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.interface_id",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 168,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 168,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 44
                        },
                        "pc": 173,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 53
                        },
                        "pc": 179,
                        "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 168,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 44
                        },
                        "pc": 173,
                        "value": "[cast(ap + (-2), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 54
                        },
                        "pc": 180,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.storage_addr": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.storage_addr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 44
                        },
                        "pc": 173,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.read.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 0
                        },
                        "pc": 168,
                        "value": "[cast(fp + (-6), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 51
                        },
                        "pc": 177,
                        "value": "[cast(ap + (-2), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 18,
                            "offset": 52
                        },
                        "pc": 178,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.storage_read": {
                "destination": "starkware.starknet.common.syscalls.storage_read",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.storage_write": {
                "destination": "starkware.starknet.common.syscalls.storage_write",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write": {
                "decorators": [],
                "pc": 182,
                "type": "function"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.Args": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.Args",
                "members": {
                    "interface_id": {
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
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.ImplicitArgs": {
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.ImplicitArgs",
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
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.interface_id": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.interface_id",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 182,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.pedersen_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.pedersen_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 182,
                        "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 44
                        },
                        "pc": 187,
                        "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 182,
                        "value": "[cast(fp + (-5), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 44
                        },
                        "pc": 187,
                        "value": "[cast(ap + (-2), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.storage_addr": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.storage_addr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 44
                        },
                        "pc": 187,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.syscall_ptr": {
                "cairo_type": "felt*",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.syscall_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 182,
                        "value": "[cast(fp + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 51
                        },
                        "pc": 192,
                        "value": "[cast(ap + (-1), felt**)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.value": {
                "cairo_type": "felt",
                "full_name": "openzeppelin.introspection.erc165.library.ERC165_supported_interfaces.write.value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 19,
                            "offset": 0
                        },
                        "pc": 182,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "openzeppelin.introspection.erc165.library.HashBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.HashBuiltin",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.IERC165_ID": {
                "destination": "contracts.utils.constants.library.IERC165_ID",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.INVALID_ID": {
                "destination": "contracts.utils.constants.library.INVALID_ID",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.TRUE": {
                "destination": "starkware.cairo.common.bool.TRUE",
                "type": "alias"
            },
            "openzeppelin.introspection.erc165.library.assert_not_equal": {
                "destination": "starkware.cairo.common.math.assert_not_equal",
                "type": "alias"
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
                "cairo_type": "(ptr : felt*)",
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
            "starkware.cairo.common.cairo_secp.field.SECP_REM": {
                "destination": "starkware.cairo.common.cairo_secp.constants.SECP_REM",
                "type": "alias"
            },
            "starkware.cairo.common.cairo_secp.field.UnreducedBigInt3": {
                "destination": "starkware.cairo.common.cairo_secp.bigint.UnreducedBigInt3",
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
            "starkware.cairo.common.hash.hash2": {
                "decorators": [],
                "pc": 3,
                "type": "function"
            },
            "starkware.cairo.common.hash.hash2.Args": {
                "full_name": "starkware.cairo.common.hash.hash2.Args",
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
            "starkware.cairo.common.hash.hash2.ImplicitArgs": {
                "full_name": "starkware.cairo.common.hash.hash2.ImplicitArgs",
                "members": {
                    "hash_ptr": {
                        "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.hash.hash2.Return": {
                "cairo_type": "(result : felt)",
                "type": "type_definition"
            },
            "starkware.cairo.common.hash.hash2.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.hash.hash2.hash_ptr": {
                "cairo_type": "starkware.cairo.common.cairo_builtins.HashBuiltin*",
                "full_name": "starkware.cairo.common.hash.hash2.hash_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 0
                        },
                        "pc": 3,
                        "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 0
                        },
                        "pc": 5,
                        "value": "cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.HashBuiltin*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.hash.hash2.result": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.hash.hash2.result",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 0
                        },
                        "pc": 5,
                        "value": "[cast([fp + (-5)] + 2, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.hash.hash2.x": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.hash.hash2.x",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 1,
                            "offset": 0
                        },
                        "pc": 3,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.hash.hash2.y": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.hash.hash2.y",
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
            "starkware.cairo.common.math.assert_250_bit": {
                "decorators": [
                    "known_ap_change"
                ],
                "pc": 47,
                "type": "function"
            },
            "starkware.cairo.common.math.assert_250_bit.Args": {
                "full_name": "starkware.cairo.common.math.assert_250_bit.Args",
                "members": {
                    "value": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_250_bit.HIGH_BOUND": {
                "type": "const",
                "value": 5316911983139663491615228241121378304
            },
            "starkware.cairo.common.math.assert_250_bit.ImplicitArgs": {
                "full_name": "starkware.cairo.common.math.assert_250_bit.ImplicitArgs",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_250_bit.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.math.assert_250_bit.SHIFT": {
                "type": "const",
                "value": 340282366920938463463374607431768211456
            },
            "starkware.cairo.common.math.assert_250_bit.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.math.assert_250_bit.UPPER_BOUND": {
                "type": "const",
                "value": 1809251394333065553493296640760748560207343510400633813116524750123642650624
            },
            "starkware.cairo.common.math.assert_250_bit.__temp2": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.__temp2",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 1
                        },
                        "pc": 49,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.__temp3": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.__temp3",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 2
                        },
                        "pc": 50,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.__temp4": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.__temp4",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 3
                        },
                        "pc": 51,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.__temp5": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.__temp5",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 4
                        },
                        "pc": 53,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.__temp6": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.__temp6",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 5
                        },
                        "pc": 55,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.__temp7": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.__temp7",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 6
                        },
                        "pc": 56,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.high": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.high",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 47,
                        "value": "[cast([fp + (-4)] + 1, felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.low": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.low",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 47,
                        "value": "[cast([fp + (-4)], felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 47,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 6
                        },
                        "pc": 57,
                        "value": "cast([fp + (-4)] + 3, felt)"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_250_bit.value": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_250_bit.value",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 8,
                            "offset": 0
                        },
                        "pc": 47,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_le": {
                "decorators": [],
                "pc": 35,
                "type": "function"
            },
            "starkware.cairo.common.math.assert_le.Args": {
                "full_name": "starkware.cairo.common.math.assert_le.Args",
                "members": {
                    "a": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "b": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_le.ImplicitArgs": {
                "full_name": "starkware.cairo.common.math.assert_le.ImplicitArgs",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_le.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.math.assert_le.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.math.assert_le.a": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_le.a",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 0
                        },
                        "pc": 35,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_le.b": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_le.b",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 0
                        },
                        "pc": 35,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_le.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_le.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 0
                        },
                        "pc": 35,
                        "value": "[cast(fp + (-5), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 6,
                            "offset": 5
                        },
                        "pc": 39,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_lt": {
                "decorators": [],
                "pc": 40,
                "type": "function"
            },
            "starkware.cairo.common.math.assert_lt.Args": {
                "full_name": "starkware.cairo.common.math.assert_lt.Args",
                "members": {
                    "a": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "b": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_lt.ImplicitArgs": {
                "full_name": "starkware.cairo.common.math.assert_lt.ImplicitArgs",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_lt.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.math.assert_lt.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.math.assert_lt.a": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_lt.a",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 0
                        },
                        "pc": 40,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_lt.b": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_lt.b",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 0
                        },
                        "pc": 40,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_lt.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_lt.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 0
                        },
                        "pc": 40,
                        "value": "[cast(fp + (-5), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 7,
                            "offset": 10
                        },
                        "pc": 46,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_nn": {
                "decorators": [],
                "pc": 31,
                "type": "function"
            },
            "starkware.cairo.common.math.assert_nn.Args": {
                "full_name": "starkware.cairo.common.math.assert_nn.Args",
                "members": {
                    "a": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_nn.ImplicitArgs": {
                "full_name": "starkware.cairo.common.math.assert_nn.ImplicitArgs",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_nn.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.math.assert_nn.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.math.assert_nn.a": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_nn.a",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 0
                        },
                        "pc": 31,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_nn.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_nn.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 0
                        },
                        "pc": 31,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 5,
                            "offset": 0
                        },
                        "pc": 32,
                        "value": "cast([fp + (-4)] + 1, felt)"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_not_equal": {
                "decorators": [],
                "pc": 25,
                "type": "function"
            },
            "starkware.cairo.common.math.assert_not_equal.Args": {
                "full_name": "starkware.cairo.common.math.assert_not_equal.Args",
                "members": {
                    "a": {
                        "cairo_type": "felt",
                        "offset": 0
                    },
                    "b": {
                        "cairo_type": "felt",
                        "offset": 1
                    }
                },
                "size": 2,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_not_equal.ImplicitArgs": {
                "full_name": "starkware.cairo.common.math.assert_not_equal.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.common.math.assert_not_equal.Return": {
                "cairo_type": "()",
                "type": "type_definition"
            },
            "starkware.cairo.common.math.assert_not_equal.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.cairo.common.math.assert_not_equal.__temp1": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_not_equal.__temp1",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 4,
                            "offset": 1
                        },
                        "pc": 26,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_not_equal.a": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_not_equal.a",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 4,
                            "offset": 0
                        },
                        "pc": 25,
                        "value": "[cast(fp + (-4), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.math.assert_not_equal.b": {
                "cairo_type": "felt",
                "full_name": "starkware.cairo.common.math.assert_not_equal.b",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 4,
                            "offset": 0
                        },
                        "pc": 25,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
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
                "pc": 9,
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
                            "group": 2,
                            "offset": 3
                        },
                        "pc": 15,
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
                            "group": 2,
                            "offset": 3
                        },
                        "pc": 16,
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
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 9,
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
                            "group": 2,
                            "offset": 2
                        },
                        "pc": 14,
                        "value": "[cast(ap + (-2), starkware.cairo.common.memcpy.memcpy.LoopFrame*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 2
                        },
                        "pc": 14,
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
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 9,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.cairo.common.memcpy.memcpy.loop": {
                "pc": 14,
                "type": "label"
            },
            "starkware.cairo.common.memcpy.memcpy.next_frame": {
                "cairo_type": "starkware.cairo.common.memcpy.memcpy.LoopFrame*",
                "full_name": "starkware.cairo.common.memcpy.memcpy.next_frame",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 2,
                            "offset": 3
                        },
                        "pc": 16,
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
                            "group": 2,
                            "offset": 0
                        },
                        "pc": 9,
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
            "starkware.cairo.common.signature.SignatureBuiltin": {
                "destination": "starkware.cairo.common.cairo_builtins.SignatureBuiltin",
                "type": "alias"
            },
            "starkware.cairo.common.signature.verify_ecdsa_signature": {
                "decorators": [],
                "pc": 149,
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
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 149,
                        "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 151,
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
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 149,
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
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 149,
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
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 149,
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
                            "group": 16,
                            "offset": 0
                        },
                        "pc": 149,
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
            "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc": {
                "decorators": [],
                "pc": 24,
                "type": "function"
            },
            "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc.Args": {
                "full_name": "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc.Args",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc.ImplicitArgs": {
                "full_name": "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc.ImplicitArgs",
                "members": {},
                "size": 0,
                "type": "struct"
            },
            "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc.Return": {
                "cairo_type": "(fp_val : felt*, pc_val : felt*)",
                "type": "type_definition"
            },
            "starkware.cairo.lang.compiler.lib.registers.get_fp_and_pc.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
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
            "starkware.starknet.common.storage.normalize_address": {
                "decorators": [
                    "known_ap_change"
                ],
                "pc": 60,
                "type": "function"
            },
            "starkware.starknet.common.storage.normalize_address.Args": {
                "full_name": "starkware.starknet.common.storage.normalize_address.Args",
                "members": {
                    "addr": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.storage.normalize_address.ImplicitArgs": {
                "full_name": "starkware.starknet.common.storage.normalize_address.ImplicitArgs",
                "members": {
                    "range_check_ptr": {
                        "cairo_type": "felt",
                        "offset": 0
                    }
                },
                "size": 1,
                "type": "struct"
            },
            "starkware.starknet.common.storage.normalize_address.Return": {
                "cairo_type": "(res : felt)",
                "type": "type_definition"
            },
            "starkware.starknet.common.storage.normalize_address.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.storage.normalize_address.__temp8": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.__temp8",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 13
                        },
                        "pc": 71,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.storage.normalize_address.__temp9": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.__temp9",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 13
                        },
                        "pc": 86,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.storage.normalize_address.addr": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.addr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 0
                        },
                        "pc": 60,
                        "value": "[cast(fp + (-3), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.storage.normalize_address.is_250": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.is_250",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 2
                        },
                        "pc": 80,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.storage.normalize_address.is_small": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.is_small",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 1
                        },
                        "pc": 62,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.storage.normalize_address.range_check_ptr": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.range_check_ptr",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 0
                        },
                        "pc": 60,
                        "value": "[cast(fp + (-4), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 12
                        },
                        "pc": 69,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 24
                        },
                        "pc": 75,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 24
                        },
                        "pc": 90,
                        "value": "[cast(ap + (-1), felt*)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 24
                        },
                        "pc": 98,
                        "value": "[cast(ap + (-1), felt*)]"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.storage.normalize_address.x": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.x",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 1
                        },
                        "pc": 64,
                        "value": "cast([fp + (-3)] + 106710729501573572985208420194530329073740042555888586719489, felt)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.storage.normalize_address.y": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.storage.normalize_address.y",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 9,
                            "offset": 1
                        },
                        "pc": 64,
                        "value": "cast((-1) - [fp + (-3)], felt)"
                    }
                ],
                "type": "reference"
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
                "size": 7,
                "type": "struct"
            },
            "starkware.starknet.common.syscalls.call_contract": {
                "decorators": [],
                "pc": 100,
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
                "cairo_type": "(retdata_size : felt, retdata : felt*)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.call_contract.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.call_contract.__temp10": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.call_contract.__temp10",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 1
                        },
                        "pc": 102,
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
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 100,
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
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 100,
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
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 100,
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
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 100,
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
                            "group": 10,
                            "offset": 1
                        },
                        "pc": 107,
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
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 100,
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
                            "group": 10,
                            "offset": 0
                        },
                        "pc": 100,
                        "value": "[cast(fp + (-7), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 10,
                            "offset": 1
                        },
                        "pc": 107,
                        "value": "cast([fp + (-7)] + 7, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_caller_address": {
                "decorators": [],
                "pc": 112,
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
                "cairo_type": "(caller_address : felt)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.get_caller_address.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.get_caller_address.__temp11": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.get_caller_address.__temp11",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 1
                        },
                        "pc": 114,
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
                            "group": 11,
                            "offset": 0
                        },
                        "pc": 112,
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
                            "group": 11,
                            "offset": 0
                        },
                        "pc": 112,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 11,
                            "offset": 1
                        },
                        "pc": 115,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_contract_address": {
                "decorators": [],
                "pc": 119,
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
                "cairo_type": "(contract_address : felt)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.get_contract_address.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.get_contract_address.__temp12": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.get_contract_address.__temp12",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 1
                        },
                        "pc": 121,
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
                            "group": 12,
                            "offset": 0
                        },
                        "pc": 119,
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
                            "group": 12,
                            "offset": 0
                        },
                        "pc": 119,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 12,
                            "offset": 1
                        },
                        "pc": 122,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.get_tx_info": {
                "decorators": [],
                "pc": 142,
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
                "cairo_type": "(tx_info : starkware.starknet.common.syscalls.TxInfo*)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.get_tx_info.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.get_tx_info.__temp15": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.get_tx_info.__temp15",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 1
                        },
                        "pc": 144,
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
                            "group": 15,
                            "offset": 1
                        },
                        "pc": 145,
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
                            "group": 15,
                            "offset": 0
                        },
                        "pc": 142,
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
                            "group": 15,
                            "offset": 0
                        },
                        "pc": 142,
                        "value": "[cast(fp + (-3), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 15,
                            "offset": 1
                        },
                        "pc": 145,
                        "value": "cast([fp + (-3)] + 2, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_read": {
                "decorators": [],
                "pc": 126,
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
                "cairo_type": "(value : felt)",
                "type": "type_definition"
            },
            "starkware.starknet.common.syscalls.storage_read.SIZEOF_LOCALS": {
                "type": "const",
                "value": 0
            },
            "starkware.starknet.common.syscalls.storage_read.__temp13": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.storage_read.__temp13",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 13,
                            "offset": 1
                        },
                        "pc": 128,
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
                            "group": 13,
                            "offset": 0
                        },
                        "pc": 126,
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
                            "group": 13,
                            "offset": 1
                        },
                        "pc": 130,
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
                            "group": 13,
                            "offset": 0
                        },
                        "pc": 126,
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
                            "group": 13,
                            "offset": 0
                        },
                        "pc": 126,
                        "value": "[cast(fp + (-4), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 13,
                            "offset": 1
                        },
                        "pc": 130,
                        "value": "cast([fp + (-4)] + 3, felt*)"
                    }
                ],
                "type": "reference"
            },
            "starkware.starknet.common.syscalls.storage_write": {
                "decorators": [],
                "pc": 134,
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
            "starkware.starknet.common.syscalls.storage_write.__temp14": {
                "cairo_type": "felt",
                "full_name": "starkware.starknet.common.syscalls.storage_write.__temp14",
                "references": [
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 1
                        },
                        "pc": 136,
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
                            "group": 14,
                            "offset": 0
                        },
                        "pc": 134,
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
                            "group": 14,
                            "offset": 0
                        },
                        "pc": 134,
                        "value": "[cast(fp + (-5), felt**)]"
                    },
                    {
                        "ap_tracking_data": {
                            "group": 14,
                            "offset": 1
                        },
                        "pc": 139,
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
                            "group": 14,
                            "offset": 0
                        },
                        "pc": 134,
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
                    "value": "[cast(fp + (-4), felt*)]"
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
                        "offset": 0
                    },
                    "pc": 3,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 0
                    },
                    "pc": 5,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 1,
                        "offset": 0
                    },
                    "pc": 5,
                    "value": "cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.HashBuiltin*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 9,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 9,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 0
                    },
                    "pc": 9,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 2
                    },
                    "pc": 14,
                    "value": "[cast(ap + (-2), starkware.cairo.common.memcpy.memcpy.LoopFrame*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 2
                    },
                    "pc": 14,
                    "value": "[cast(ap + (-2), starkware.cairo.common.memcpy.memcpy.LoopFrame*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 3
                    },
                    "pc": 15,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 3
                    },
                    "pc": 16,
                    "value": "[cast(ap, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 2,
                        "offset": 3
                    },
                    "pc": 16,
                    "value": "cast(ap + 1, starkware.cairo.common.memcpy.memcpy.LoopFrame*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 4,
                        "offset": 0
                    },
                    "pc": 25,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 4,
                        "offset": 0
                    },
                    "pc": 25,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 4,
                        "offset": 1
                    },
                    "pc": 26,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 0
                    },
                    "pc": 31,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 0
                    },
                    "pc": 31,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 5,
                        "offset": 0
                    },
                    "pc": 32,
                    "value": "cast([fp + (-4)] + 1, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 0
                    },
                    "pc": 35,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 0
                    },
                    "pc": 35,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 0
                    },
                    "pc": 35,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 6,
                        "offset": 5
                    },
                    "pc": 39,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 0
                    },
                    "pc": 40,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 0
                    },
                    "pc": 40,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 0
                    },
                    "pc": 40,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 7,
                        "offset": 10
                    },
                    "pc": 46,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 47,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 47,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 47,
                    "value": "[cast([fp + (-4)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 0
                    },
                    "pc": 47,
                    "value": "[cast([fp + (-4)] + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 1
                    },
                    "pc": 49,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 2
                    },
                    "pc": 50,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 3
                    },
                    "pc": 51,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 4
                    },
                    "pc": 53,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 5
                    },
                    "pc": 55,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 6
                    },
                    "pc": 56,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 8,
                        "offset": 6
                    },
                    "pc": 57,
                    "value": "cast([fp + (-4)] + 3, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 0
                    },
                    "pc": 60,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 0
                    },
                    "pc": 60,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 1
                    },
                    "pc": 62,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 1
                    },
                    "pc": 64,
                    "value": "cast([fp + (-3)] + 106710729501573572985208420194530329073740042555888586719489, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 1
                    },
                    "pc": 64,
                    "value": "cast((-1) - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 12
                    },
                    "pc": 69,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 13
                    },
                    "pc": 71,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 24
                    },
                    "pc": 75,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 2
                    },
                    "pc": 80,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 13
                    },
                    "pc": 86,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 24
                    },
                    "pc": 90,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 24
                    },
                    "pc": 98,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 9,
                        "offset": 24
                    },
                    "pc": 98,
                    "value": "[cast(ap - 0 + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 100,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 100,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 100,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 100,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 100,
                    "value": "[cast(fp + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 0
                    },
                    "pc": 100,
                    "value": "[cast([fp + (-7)], starkware.starknet.common.syscalls.CallContract*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 1
                    },
                    "pc": 102,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 1
                    },
                    "pc": 107,
                    "value": "[cast([fp + (-7)] + 5, starkware.starknet.common.syscalls.CallContractResponse*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 10,
                        "offset": 1
                    },
                    "pc": 107,
                    "value": "cast([fp + (-7)] + 7, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 0
                    },
                    "pc": 112,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 0
                    },
                    "pc": 112,
                    "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetCallerAddress*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 1
                    },
                    "pc": 114,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 11,
                        "offset": 1
                    },
                    "pc": 115,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 0
                    },
                    "pc": 119,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 0
                    },
                    "pc": 119,
                    "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetContractAddress*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 1
                    },
                    "pc": 121,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 12,
                        "offset": 1
                    },
                    "pc": 122,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 0
                    },
                    "pc": 126,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 0
                    },
                    "pc": 126,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 0
                    },
                    "pc": 126,
                    "value": "[cast([fp + (-4)], starkware.starknet.common.syscalls.StorageRead*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 1
                    },
                    "pc": 128,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 1
                    },
                    "pc": 130,
                    "value": "[cast([fp + (-4)] + 2, starkware.starknet.common.syscalls.StorageReadResponse*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 13,
                        "offset": 1
                    },
                    "pc": 130,
                    "value": "cast([fp + (-4)] + 3, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 0
                    },
                    "pc": 134,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 0
                    },
                    "pc": 134,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 0
                    },
                    "pc": 134,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 1
                    },
                    "pc": 136,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 14,
                        "offset": 1
                    },
                    "pc": 139,
                    "value": "cast([fp + (-5)] + 3, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 0
                    },
                    "pc": 142,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 0
                    },
                    "pc": 142,
                    "value": "[cast([fp + (-3)], starkware.starknet.common.syscalls.GetTxInfo*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 1
                    },
                    "pc": 144,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 1
                    },
                    "pc": 145,
                    "value": "[cast([fp + (-3)] + 1, starkware.starknet.common.syscalls.GetTxInfoResponse*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 15,
                        "offset": 1
                    },
                    "pc": 145,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 149,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 149,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 149,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 149,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 149,
                    "value": "[cast(fp + (-7), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 16,
                        "offset": 0
                    },
                    "pc": 151,
                    "value": "cast([fp + (-7)] + 2, starkware.cairo.common.cairo_builtins.SignatureBuiltin*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 154,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 154,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 154,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 0
                    },
                    "pc": 154,
                    "value": "cast(479559987705328862372362947504386080106579713470203672197513890426980061174, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 7
                    },
                    "pc": 160,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 7
                    },
                    "pc": 160,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 36
                    },
                    "pc": 164,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 17,
                        "offset": 36
                    },
                    "pc": 164,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 168,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 168,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 168,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 0
                    },
                    "pc": 168,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 44
                    },
                    "pc": 173,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 44
                    },
                    "pc": 173,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 44
                    },
                    "pc": 173,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 51
                    },
                    "pc": 177,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 51
                    },
                    "pc": 177,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 52
                    },
                    "pc": 178,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 53
                    },
                    "pc": 179,
                    "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 54
                    },
                    "pc": 180,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 18,
                        "offset": 55
                    },
                    "pc": 181,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 0
                    },
                    "pc": 182,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 0
                    },
                    "pc": 182,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 0
                    },
                    "pc": 182,
                    "value": "[cast(fp + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 0
                    },
                    "pc": 182,
                    "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 0
                    },
                    "pc": 182,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 44
                    },
                    "pc": 187,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 44
                    },
                    "pc": 187,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 44
                    },
                    "pc": 187,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 19,
                        "offset": 51
                    },
                    "pc": 192,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 0
                    },
                    "pc": 195,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 0
                    },
                    "pc": 195,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 0
                    },
                    "pc": 195,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 0
                    },
                    "pc": 195,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 1
                    },
                    "pc": 197,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 62
                    },
                    "pc": 211,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 62
                    },
                    "pc": 211,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 62
                    },
                    "pc": 211,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 20,
                        "offset": 62
                    },
                    "pc": 211,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 212,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 212,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 212,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 0
                    },
                    "pc": 212,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 65
                    },
                    "pc": 225,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 65
                    },
                    "pc": 225,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 21,
                        "offset": 65
                    },
                    "pc": 225,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 22,
                        "offset": 0
                    },
                    "pc": 226,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 22,
                        "offset": 0
                    },
                    "pc": 226,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 22,
                        "offset": 0
                    },
                    "pc": 226,
                    "value": "cast(680641068382147823690491849560675892800103278811133310055689865859989991742, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 0
                    },
                    "pc": 231,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 0
                    },
                    "pc": 231,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 0
                    },
                    "pc": 231,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 7
                    },
                    "pc": 235,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 7
                    },
                    "pc": 235,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 7
                    },
                    "pc": 235,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 14
                    },
                    "pc": 239,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 14
                    },
                    "pc": 239,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 15
                    },
                    "pc": 240,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 16
                    },
                    "pc": 241,
                    "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 17
                    },
                    "pc": 242,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 23,
                        "offset": 18
                    },
                    "pc": 243,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 244,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 244,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 244,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 0
                    },
                    "pc": 244,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 7
                    },
                    "pc": 248,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 7
                    },
                    "pc": 248,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 7
                    },
                    "pc": 248,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 24,
                        "offset": 14
                    },
                    "pc": 253,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 25,
                        "offset": 0
                    },
                    "pc": 256,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 25,
                        "offset": 0
                    },
                    "pc": 256,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 25,
                        "offset": 0
                    },
                    "pc": 256,
                    "value": "cast(550557492744938365112574611882025123252567779123164597803728068558738016655, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 0
                    },
                    "pc": 261,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 0
                    },
                    "pc": 261,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 0
                    },
                    "pc": 261,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 7
                    },
                    "pc": 265,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 7
                    },
                    "pc": 265,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 7
                    },
                    "pc": 265,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 14
                    },
                    "pc": 269,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 14
                    },
                    "pc": 269,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 15
                    },
                    "pc": 270,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 16
                    },
                    "pc": 271,
                    "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 17
                    },
                    "pc": 272,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 26,
                        "offset": 18
                    },
                    "pc": 273,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 274,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 274,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 274,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 0
                    },
                    "pc": 274,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 7
                    },
                    "pc": 278,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 7
                    },
                    "pc": 278,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 7
                    },
                    "pc": 278,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 27,
                        "offset": 14
                    },
                    "pc": 283,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 0
                    },
                    "pc": 286,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 0
                    },
                    "pc": 286,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 0
                    },
                    "pc": 286,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 0
                    },
                    "pc": 286,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 22
                    },
                    "pc": 292,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 22
                    },
                    "pc": 292,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 22
                    },
                    "pc": 292,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 90
                    },
                    "pc": 296,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 90
                    },
                    "pc": 296,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 28,
                        "offset": 90
                    },
                    "pc": 296,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 0
                    },
                    "pc": 297,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 6
                    },
                    "pc": 300,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 6
                    },
                    "pc": 300,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 12
                    },
                    "pc": 303,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 29,
                        "offset": 12
                    },
                    "pc": 303,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 306,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 306,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 0
                    },
                    "pc": 306,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 23
                    },
                    "pc": 311,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 23
                    },
                    "pc": 311,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 23
                    },
                    "pc": 311,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 30,
                        "offset": 23
                    },
                    "pc": 311,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 0
                    },
                    "pc": 312,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 0
                    },
                    "pc": 312,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 0
                    },
                    "pc": 312,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 23
                    },
                    "pc": 317,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 23
                    },
                    "pc": 317,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 23
                    },
                    "pc": 317,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 31,
                        "offset": 23
                    },
                    "pc": 317,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 0
                    },
                    "pc": 318,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 16
                    },
                    "pc": 321,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 37
                    },
                    "pc": 326,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 37
                    },
                    "pc": 326,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 32,
                        "offset": 37
                    },
                    "pc": 326,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 327,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 327,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 327,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 327,
                    "value": "[cast(fp + (-9), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 327,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 327,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 0
                    },
                    "pc": 327,
                    "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 23
                    },
                    "pc": 332,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 23
                    },
                    "pc": 332,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 23
                    },
                    "pc": 332,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 23
                    },
                    "pc": 332,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 23
                    },
                    "pc": 332,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 23
                    },
                    "pc": 332,
                    "value": "[cast([fp + (-3)] + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 33,
                        "offset": 31
                    },
                    "pc": 339,
                    "value": "[cast(ap + (-1), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-6), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-12), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-11), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-10), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 0
                    },
                    "pc": 346,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 2
                    },
                    "pc": 350,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 8
                    },
                    "pc": 353,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 8
                    },
                    "pc": 353,
                    "value": "[cast(ap + (-1), starkware.starknet.common.syscalls.TxInfo**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 53
                    },
                    "pc": 362,
                    "value": "[cast(ap + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 53
                    },
                    "pc": 362,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 53
                    },
                    "pc": 362,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 53
                    },
                    "pc": 362,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 34,
                        "offset": 53
                    },
                    "pc": 362,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 376,
                    "value": "[cast(ap + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 376,
                    "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 376,
                    "value": "[cast(ap + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 376,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 35,
                        "offset": 0
                    },
                    "pc": 376,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-6), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-12), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-11), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-10), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 0
                    },
                    "pc": 377,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 10
                    },
                    "pc": 382,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 10
                    },
                    "pc": 382,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 33
                    },
                    "pc": 389,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 33
                    },
                    "pc": 389,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 33
                    },
                    "pc": 389,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 33
                    },
                    "pc": 389,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 46
                    },
                    "pc": 392,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 68
                    },
                    "pc": 398,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 68
                    },
                    "pc": 398,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 68
                    },
                    "pc": 398,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 68
                    },
                    "pc": 399,
                    "value": "[cast(fp, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 68
                    },
                    "pc": 400,
                    "value": "[cast(fp + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 71
                    },
                    "pc": 402,
                    "value": "[cast(ap + (-1), account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 36,
                        "offset": 71
                    },
                    "pc": 403,
                    "value": "[cast(fp + 2, account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 410,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 0
                    },
                    "pc": 410,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 3
                    },
                    "pc": 412,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 37,
                        "offset": 3
                    },
                    "pc": 413,
                    "value": "[cast(fp + 3, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 419,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 38,
                        "offset": 0
                    },
                    "pc": 419,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 0
                    },
                    "pc": 427,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 0
                    },
                    "pc": 427,
                    "value": "[cast(fp + (-4), account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 0
                    },
                    "pc": 427,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 0
                    },
                    "pc": 427,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 3
                    },
                    "pc": 435,
                    "value": "[cast([fp + (-4)], account.library.Call*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 14
                    },
                    "pc": 442,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 14
                    },
                    "pc": 442,
                    "value": "[cast(ap + (-2), (retdata_size : felt, retdata : felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 14
                    },
                    "pc": 444,
                    "value": "[cast(fp, (retdata_size : felt, retdata : felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 39,
                        "offset": 14
                    },
                    "pc": 445,
                    "value": "[cast(fp + 2, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 458,
                    "value": "[cast(ap + (-2), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 41,
                        "offset": 0
                    },
                    "pc": 458,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 461,
                    "value": "[cast(fp + (-6), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 461,
                    "value": "[cast(fp + (-5), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 461,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 461,
                    "value": "[cast(fp + (-3), account.library.Call**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 42,
                        "offset": 0
                    },
                    "pc": 461,
                    "value": "[cast(fp + (-7), felt**)]"
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
                    "pc": 468,
                    "value": "[cast(ap + (-1), felt*)]"
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
                    "pc": 472,
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
                        "group": 43,
                        "offset": 0
                    },
                    "pc": 484,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 485,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 485,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 485,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 0
                    },
                    "pc": 485,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 96
                    },
                    "pc": 491,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 96
                    },
                    "pc": 491,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 44,
                        "offset": 96
                    },
                    "pc": 491,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 0
                    },
                    "pc": 492,
                    "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 1
                    },
                    "pc": 494,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 103
                    },
                    "pc": 501,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 103
                    },
                    "pc": 501,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 103
                    },
                    "pc": 501,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 103
                    },
                    "pc": 501,
                    "value": "[cast(ap + 0, ()*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 104
                    },
                    "pc": 503,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 45,
                        "offset": 104
                    },
                    "pc": 503,
                    "value": "cast(0, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 512,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 512,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 0
                    },
                    "pc": 512,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 28
                    },
                    "pc": 517,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 28
                    },
                    "pc": 517,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 28
                    },
                    "pc": 517,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 46,
                        "offset": 28
                    },
                    "pc": 517,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 0
                    },
                    "pc": 518,
                    "value": "[cast(fp + (-4), (res : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 0
                    },
                    "pc": 518,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 1
                    },
                    "pc": 520,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 1
                    },
                    "pc": 520,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 1
                    },
                    "pc": 521,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 47,
                        "offset": 2
                    },
                    "pc": 523,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 0
                    },
                    "pc": 527,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 0
                    },
                    "pc": 527,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 0
                    },
                    "pc": 527,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 0
                    },
                    "pc": 527,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 0
                    },
                    "pc": 527,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 0
                    },
                    "pc": 527,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 0
                    },
                    "pc": 527,
                    "value": "cast([fp + (-3)] - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 33
                    },
                    "pc": 533,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 33
                    },
                    "pc": 533,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 33
                    },
                    "pc": 533,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 33
                    },
                    "pc": 533,
                    "value": "[cast(ap + (-1), (res : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 41
                    },
                    "pc": 536,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 41
                    },
                    "pc": 536,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 48,
                        "offset": 41
                    },
                    "pc": 536,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 0
                    },
                    "pc": 544,
                    "value": "[cast(fp + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 0
                    },
                    "pc": 544,
                    "value": "[cast(fp + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 0
                    },
                    "pc": 544,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 28
                    },
                    "pc": 549,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 28
                    },
                    "pc": 549,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 28
                    },
                    "pc": 549,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 49,
                        "offset": 28
                    },
                    "pc": 549,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 550,
                    "value": "[cast(fp + (-4), (res : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 0
                    },
                    "pc": 550,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 1
                    },
                    "pc": 552,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 1
                    },
                    "pc": 552,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 1
                    },
                    "pc": 553,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 50,
                        "offset": 2
                    },
                    "pc": 555,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 559,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 559,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 559,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 559,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 559,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 559,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 0
                    },
                    "pc": 559,
                    "value": "cast([fp + (-3)] - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 33
                    },
                    "pc": 565,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 33
                    },
                    "pc": 565,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 33
                    },
                    "pc": 565,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 33
                    },
                    "pc": 565,
                    "value": "[cast(ap + (-1), (res : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 41
                    },
                    "pc": 568,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 41
                    },
                    "pc": 568,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 51,
                        "offset": 41
                    },
                    "pc": 568,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 52,
                        "offset": 0
                    },
                    "pc": 576,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 52,
                        "offset": 0
                    },
                    "pc": 576,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 52,
                        "offset": 0
                    },
                    "pc": 576,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 52,
                        "offset": 0
                    },
                    "pc": 576,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 53,
                        "offset": 0
                    },
                    "pc": 582,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 53,
                        "offset": 0
                    },
                    "pc": 582,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 53,
                        "offset": 0
                    },
                    "pc": 582,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 53,
                        "offset": 0
                    },
                    "pc": 582,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 54,
                        "offset": 0
                    },
                    "pc": 583,
                    "value": "[cast(fp + (-4), (success : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 54,
                        "offset": 0
                    },
                    "pc": 583,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 54,
                        "offset": 1
                    },
                    "pc": 585,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 54,
                        "offset": 1
                    },
                    "pc": 585,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 54,
                        "offset": 1
                    },
                    "pc": 586,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 54,
                        "offset": 2
                    },
                    "pc": 588,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 0
                    },
                    "pc": 592,
                    "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 55,
                        "offset": 1
                    },
                    "pc": 594,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 56,
                        "offset": 0
                    },
                    "pc": 601,
                    "value": "[cast(ap + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 56,
                        "offset": 0
                    },
                    "pc": 601,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 56,
                        "offset": 0
                    },
                    "pc": 601,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 56,
                        "offset": 0
                    },
                    "pc": 601,
                    "value": "[cast(ap + (-1), (success : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 56,
                        "offset": 8
                    },
                    "pc": 604,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 56,
                        "offset": 8
                    },
                    "pc": 604,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 56,
                        "offset": 8
                    },
                    "pc": 604,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 57,
                        "offset": 0
                    },
                    "pc": 612,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 57,
                        "offset": 0
                    },
                    "pc": 612,
                    "value": "[cast(fp + (-6), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 57,
                        "offset": 0
                    },
                    "pc": 612,
                    "value": "[cast(fp + (-5), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 57,
                        "offset": 0
                    },
                    "pc": 612,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 57,
                        "offset": 43
                    },
                    "pc": 618,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 57,
                        "offset": 43
                    },
                    "pc": 618,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 57,
                        "offset": 43
                    },
                    "pc": 618,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "[cast([fp + (-5)] + 3, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 0
                    },
                    "pc": 619,
                    "value": "cast([fp + (-3)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 1
                    },
                    "pc": 621,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 50
                    },
                    "pc": 628,
                    "value": "[cast(ap + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 50
                    },
                    "pc": 628,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 50
                    },
                    "pc": 628,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 50
                    },
                    "pc": 628,
                    "value": "[cast(ap + 0, ()*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 51
                    },
                    "pc": 630,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 58,
                        "offset": 51
                    },
                    "pc": 630,
                    "value": "cast(0, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 0
                    },
                    "pc": 639,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 0
                    },
                    "pc": 639,
                    "value": "[cast(fp + (-4), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 0
                    },
                    "pc": 639,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 0
                    },
                    "pc": 639,
                    "value": "[cast(fp + (-9), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 0
                    },
                    "pc": 639,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 0
                    },
                    "pc": 639,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 0
                    },
                    "pc": 639,
                    "value": "[cast(fp + (-6), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 45
                    },
                    "pc": 648,
                    "value": "[cast(ap + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 45
                    },
                    "pc": 648,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 45
                    },
                    "pc": 648,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 45
                    },
                    "pc": 648,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 59,
                        "offset": 45
                    },
                    "pc": 648,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 60,
                        "offset": 0
                    },
                    "pc": 649,
                    "value": "[cast(fp + (-4), (is_valid : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 60,
                        "offset": 0
                    },
                    "pc": 649,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 60,
                        "offset": 1
                    },
                    "pc": 651,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 60,
                        "offset": 1
                    },
                    "pc": 651,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 60,
                        "offset": 1
                    },
                    "pc": 652,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 60,
                        "offset": 2
                    },
                    "pc": 654,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast([fp + (-5)] + 4, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "[cast([fp + (-3)] + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 0
                    },
                    "pc": 658,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 1
                    },
                    "pc": 659,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 2
                    },
                    "pc": 660,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 2
                    },
                    "pc": 661,
                    "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 2
                    },
                    "pc": 661,
                    "value": "cast([fp + (-3)] + 2, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 3
                    },
                    "pc": 663,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 4
                    },
                    "pc": 664,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 5
                    },
                    "pc": 665,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 5
                    },
                    "pc": 665,
                    "value": "cast([ap + (-1)] - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 6
                    },
                    "pc": 667,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 60
                    },
                    "pc": 678,
                    "value": "[cast(ap + (-5), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 60
                    },
                    "pc": 678,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 60
                    },
                    "pc": 678,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 60
                    },
                    "pc": 678,
                    "value": "[cast(ap + (-2), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 60
                    },
                    "pc": 678,
                    "value": "[cast(ap + (-1), (is_valid : felt)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 68
                    },
                    "pc": 681,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 68
                    },
                    "pc": 681,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 61,
                        "offset": 68
                    },
                    "pc": 681,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-7), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-6), account.library.AccountCallArray**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-4), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-12), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-11), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-10), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-9), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 62,
                        "offset": 0
                    },
                    "pc": 689,
                    "value": "[cast(fp + (-8), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 63,
                        "offset": 0
                    },
                    "pc": 701,
                    "value": "[cast(ap + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 63,
                        "offset": 0
                    },
                    "pc": 701,
                    "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 63,
                        "offset": 0
                    },
                    "pc": 701,
                    "value": "[cast(ap + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 63,
                        "offset": 0
                    },
                    "pc": 701,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 63,
                        "offset": 0
                    },
                    "pc": 701,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 63,
                        "offset": 0
                    },
                    "pc": 701,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 63,
                        "offset": 0
                    },
                    "pc": 701,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 0
                    },
                    "pc": 702,
                    "value": "[cast(fp + (-5), (response_len : felt, response : felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 0
                    },
                    "pc": 702,
                    "value": "[cast(fp + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 3
                    },
                    "pc": 704,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 3
                    },
                    "pc": 704,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 3
                    },
                    "pc": 705,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 3
                    },
                    "pc": 708,
                    "value": "[cast(fp + 1, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 3
                    },
                    "pc": 708,
                    "value": "cast([fp] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 4
                    },
                    "pc": 710,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 64,
                        "offset": 4
                    },
                    "pc": 711,
                    "value": "[cast(fp + 2, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "[cast([fp + (-5)], felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "[cast([fp + (-5)] + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "[cast([fp + (-5)] + 2, felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "[cast([fp + (-5)] + 3, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "[cast([fp + (-5)] + 4, starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "[cast(fp + (-3), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "[cast([fp + (-3)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 4
                    },
                    "pc": 723,
                    "value": "cast([fp + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 5
                    },
                    "pc": 724,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 6
                    },
                    "pc": 725,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 6
                    },
                    "pc": 726,
                    "value": "cast([[fp + (-5)] + 2] + 1, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 6
                    },
                    "pc": 726,
                    "value": "cast([fp + (-3)] + 1, account.library.AccountCallArray*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 7
                    },
                    "pc": 728,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 8
                    },
                    "pc": 729,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 9
                    },
                    "pc": 731,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 10
                    },
                    "pc": 732,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 10
                    },
                    "pc": 732,
                    "value": "[cast([ap + (-1)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 10
                    },
                    "pc": 732,
                    "value": "cast([ap + (-1)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 11
                    },
                    "pc": 733,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 12
                    },
                    "pc": 734,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 12
                    },
                    "pc": 735,
                    "value": "cast([[fp + (-5)] + 2] + 2, felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 12
                    },
                    "pc": 735,
                    "value": "cast([ap + (-3)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 13
                    },
                    "pc": 737,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 14
                    },
                    "pc": 738,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 15
                    },
                    "pc": 739,
                    "value": "[cast(ap + (-1), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 15
                    },
                    "pc": 739,
                    "value": "[cast([ap + (-1)], felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 15
                    },
                    "pc": 739,
                    "value": "cast([ap + (-1)] + 1, felt*)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 15
                    },
                    "pc": 739,
                    "value": "cast([ap + (-1)] + 1 - [fp + (-3)], felt)"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 16
                    },
                    "pc": 741,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 66,
                        "offset": 17
                    },
                    "pc": 743,
                    "value": "[cast(ap + (-1), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 758,
                    "value": "[cast(ap + (-7), felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 758,
                    "value": "[cast(ap + (-6), starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 758,
                    "value": "[cast(ap + (-5), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 758,
                    "value": "[cast(ap + (-4), starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 758,
                    "value": "[cast(ap + (-3), starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 758,
                    "value": "[cast(ap + (-2), (response_len : felt, response : felt*)*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 759,
                    "value": "[cast(fp, felt**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 760,
                    "value": "[cast(fp + 1, starkware.cairo.common.cairo_builtins.HashBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 761,
                    "value": "[cast(fp + 2, starkware.cairo.common.cairo_builtins.SignatureBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 67,
                        "offset": 0
                    },
                    "pc": 762,
                    "value": "[cast(fp + 3, starkware.cairo.common.cairo_builtins.BitwiseBuiltin**)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 68,
                        "offset": 0
                    },
                    "pc": 765,
                    "value": "[cast(ap + (-3), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 68,
                        "offset": 0
                    },
                    "pc": 765,
                    "value": "[cast(ap + (-2), felt*)]"
                },
                {
                    "ap_tracking_data": {
                        "group": 68,
                        "offset": 0
                    },
                    "pc": 765,
                    "value": "[cast(ap + (-1), felt**)]"
                }
            ]
        }
    }
}"""
