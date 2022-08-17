from typing import Union


class AddressError(Exception):
    pass


class Address(object):
    def __init__(self, address: Union[int, str]):
        if type(address) == str:
            try:
                self.address = int(address)
            except ValueError:
                raise AddressError(f"invalid hex input: {address}")
        elif type(address) == int:
            self.address = address
        else:
            raise AddressError(f"invalid input address type: {type(address)}")
