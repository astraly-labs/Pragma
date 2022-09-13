import pytest
from utils import transform_calldata


@pytest.mark.asyncio
async def test_transform_calldata():
    response = transform_calldata(
        [
            ["a", "b", "c"],
            [(9, 8), (7, 6), (5, 4)],
            [1, 2, 3, 4, 5, 6],
        ],
    )
    assert response == [3, 97, 98, 99, 3, 9, 8, 7, 6, 5, 4, 6, 1, 2, 3, 4, 5, 6]
