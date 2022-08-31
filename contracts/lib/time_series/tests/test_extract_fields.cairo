%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.extract_fields import transform_arr
from time_series.structs import TickElem

struct DataPoint:
    member timestamp : felt
    member val1 : felt
    member val2 : felt
end

func get_tick_and_value(d: DataPoint) -> (tick: felt, value: felt):
    let value = d.val1 + d.val2
    return (tick=d.timestamp, value=value)
end

@view
func test_extract_fields():
    let datapoint1 = DataPoint(timestamp=100000, val1=10, val2=30)
    let datapoint2 = DataPoint(timestamp=100100, val1=11, val2=31)
    let datapoint3 = DataPoint(timestamp=100200, val1=12, val2=32)
    let (tick, value) = get_tick_and_value(datapoint1)
    assert tick = 100000
    assert value = 40

    let (datapoint_arr: DataPoint*) = alloc()
    assert datapoint_arr[0] = datapoint1
    assert datapoint_arr[1] = datapoint2
    assert datapoint_arr[2] = datapoint3

    let (result_arr) = transform_arr(
        get_tick_and_value,
        3,
        datapoint_arr,
        DataPoint.SIZE,
    )
    assert 100000 = result_arr[0].tick
    assert 100100 = result_arr[1].tick
    assert 100200 = result_arr[2].tick

    return ()
end
