from starknet_py.contract import Contract as StarknetContract


class Contract(StarknetContract):
    def __getattr__(self, attr):
        if attr in self._functions:
            return self._functions[attr]
        elif attr in dir(self):
            return getattr(self, attr)
        else:
            raise AttributeError("Invalid Attribute")
