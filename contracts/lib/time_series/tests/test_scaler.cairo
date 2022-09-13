%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.prelude import scale_data, TickElem

func log_array(arr_len : felt, arr : TickElem**):
    %{ print('Array(', end='') %}
    log_array_iter(0, arr_len, arr)
    %{ print(')') %}
    return ()
end

func log_array_iter(cur_idx, arr_len : felt, arr : TickElem**):
    let tmp1 = arr[cur_idx].tick
    let tmp2 = arr[cur_idx].value
    if cur_idx == arr_len - 1:
        %{
            print('(', end='')
            if ids.tmp1 > 361850278866613121369732278309507010562310721533:
                print(3618502788666131213697322783095070105623107215331596699973092056135872020481 - ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            else:
                print(ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            print(')', end='')
        %}
        return ()
    else:
        %{
            print('(', end='')
            if ids.tmp1 > 361850278866613121369732278309507010562310721533:
                print(3618502788666131213697322783095070105623107215331596699973092056135872020481 - ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            else:
                print(ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            print(')', end=', ')
        %}
        return log_array_iter(cur_idx + 1, arr_len, arr)
    end
end

@view
func test_scaler{range_check_ptr}():
    alloc_locals
    let (x : TickElem**) = alloc()
    let (first : TickElem*) = alloc()
    let (second : TickElem*) = alloc()
    let (third : TickElem*) = alloc()
    assert first[0] = TickElem(100, 2558)
    assert second[0] = TickElem(204, 5791)
    assert third[0] = TickElem(305, 3717)
    assert x[0] = first
    assert x[1] = second
    assert x[2] = third

    let (output) = scale_data(0, 300, 3, x, 4)
    log_array(5, output)

    assert output[0].tick = 0
    assert output[0].value = -542
    assert output[1].tick = 60
    assert output[1].value = 1318
    assert output[2].tick = 120
    assert output[2].value = 3178
    assert output[3].tick = 180
    assert output[3].value = 5038
    assert output[4].tick = 240
    assert output[4].value = 5071
    assert output[5].tick = 300
    assert output[5].value = 3871

    return ()
end

@view
func test_scaler2{range_check_ptr}():
    alloc_locals
    let (x : TickElem**) = alloc()

    assert x[0] = new TickElem(1650590820, 19413)
    assert x[1] = new TickElem(1650590893, 10876)
    assert x[2] = new TickElem(1650591000, 10918)
    assert x[3] = new TickElem(1650591060, 16119)
    assert x[4] = new TickElem(1650591240, 13703)
    assert x[5] = new TickElem(1650591300, 14556)
    assert x[6] = new TickElem(1650591360, 12999)

    let (output) = scale_data(1650590800, 1650591360, 10, x, 30)
    log_array(30, output)

    return ()
end
