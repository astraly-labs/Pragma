%lang starknet

struct StorageSlot {
    word_1: felt,
    word_2: felt,
    word_3: felt,
    word_4: felt,
}

@contract_interface
namespace L1HeadersStore {
    func get_latest_commitments_l1_block() {
    }
}

@contract_interface
namespace FactsRegistry {
    func get_storage(
        block: felt,
        account_160: felt,
        slot: StorageSlot,
        proof_sizes_bytes_len: felt,
        proof_sizes_bytes: felt*,
        proof_sizes_words_len: felt,
        proof_sizes_words: felt*,
        proofs_concat_len: felt,
        proofs_concat: felt*,
    ) -> (res_bytes_len: felt, res_len: felt, res: felt*) {
    }
}