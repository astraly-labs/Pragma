%lang starknet

from starkware.cairo.common.alloc import alloc

from entry.library import Entries
from entry.structs import BaseEntry, SpotEntry

func make_entry(value: felt) -> (entry: SpotEntry) {
    let entry = SpotEntry(
        base=BaseEntry(timestamp=2, source=3, publisher=4), pair_id=0, price=value, volume=0
    );
    return (entry,);
}

func make_and_add_entry(arr: SpotEntry*, ix: felt, value: felt) {
    let (entry_val) = make_entry(value);
    assert arr[ix] = entry_val;
    return ();
}

func make_entry_array() -> (entry: SpotEntry*) {
    let (struct_array: SpotEntry*) = alloc();

    make_and_add_entry(struct_array, 0, 17);
    make_and_add_entry(struct_array, 1, 14);
    make_and_add_entry(struct_array, 2, 4);
    make_and_add_entry(struct_array, 3, 13);
    make_and_add_entry(struct_array, 4, 19);
    make_and_add_entry(struct_array, 5, 12);
    make_and_add_entry(struct_array, 6, 18);
    make_and_add_entry(struct_array, 7, 1);
    make_and_add_entry(struct_array, 8, 7);
    make_and_add_entry(struct_array, 9, 20);
    make_and_add_entry(struct_array, 10, 6);
    make_and_add_entry(struct_array, 11, 11);
    make_and_add_entry(struct_array, 12, 15);
    make_and_add_entry(struct_array, 13, 10);
    make_and_add_entry(struct_array, 14, 16);
    make_and_add_entry(struct_array, 15, 5);
    make_and_add_entry(struct_array, 16, 8);
    make_and_add_entry(struct_array, 17, 2);
    make_and_add_entry(struct_array, 18, 9);
    make_and_add_entry(struct_array, 19, 3);

    return (struct_array,);
}

@external
func test_bubblesort{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    let (entry_array) = make_entry_array();
    let (sorted_arr) = Entries.sort_entries_by_value(20, entry_array);

    assert sorted_arr[0].price = 1;
    assert sorted_arr[4].price = 5;
    assert sorted_arr[10].price = 11;
    assert sorted_arr[14].price = 15;
    assert sorted_arr[19].price = 20;

    return ();
}

@external
func test_mergesort{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    let (entry_array) = make_entry_array();
    let (sorted_arr) = Entries.mergesort_spot_entries_by_value(20, entry_array);
    assert sorted_arr[0].price = 1;
    assert sorted_arr[4].price = 5;
    assert sorted_arr[10].price = 11;
    assert sorted_arr[14].price = 15;
    assert sorted_arr[19].price = 20;

    return ();
}

@external
func test_merge{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;
    let (sorted_arr: SpotEntry*) = alloc();

    let (left_arr: SpotEntry*) = alloc();

    let (entry0) = make_entry(3);
    assert left_arr[0] = entry0;

    let (entry1) = make_entry(2);
    assert left_arr[1] = entry1;

    let (entry2) = make_entry(4);
    assert left_arr[2] = entry2;

    let (right_arr: SpotEntry*) = alloc();

    let (entry3) = make_entry(5);
    assert right_arr[0] = entry3;

    let (entry4) = make_entry(1);
    assert right_arr[1] = entry4;

    let (merged) = Entries._merge(3, left_arr, 2, right_arr, sorted_arr, 0, 0, 0);

    assert sorted_arr[0].price = 3;
    assert sorted_arr[1].price = 2;
    assert sorted_arr[2].price = 4;
    assert sorted_arr[3].price = 5;
    assert sorted_arr[4].price = 1;

    return ();
}
