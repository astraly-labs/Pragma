import os
import re
from argparse import ArgumentParser

from starkware.starknet.compiler.compile import compile_starknet_files


# Helper func
def extract_arg_name_and_type(string):
    if ":" in string:
        name, type = string.split(":")
        name = name.strip()
        type = type.strip()
    else:
        name = string.strip()
        type = "felt"  # Default type in Cairo

    return name, type


def check_interface(file_path, contract_filename, cairo_path=None):
    # Assumes convention that if contract is called "Contract.cairo"
    # then interface is "IContract.cairo"
    interface_filename = "I" + contract_filename

    # 1. Compile Contract.cairo to get the ABI
    compiled = compile_starknet_files(
        [os.path.join(file_path, contract_filename)], cairo_path=cairo_path.split(",")
    )
    functions = {d["name"]: d for d in compiled.abi if d["type"] == "function"}

    # 2. Check that the interface matches the ABI
    with open(os.path.join(file_path, interface_filename), "r") as f:
        contents = f.readlines()
        for i, line in enumerate(contents):
            # Check that namespace name is identical to interface filename
            if line == "@contract_interface":
                assert (
                    contents[i + 1]
                    == f"namespace {interface_filename.split('.')[0]} {{"
                ), "Wrong namespace name, doesn't match interface filename"

            # Check interface is implemented (same functions, same function signatures)
            if line.strip().startswith("func"):
                match = re.search(r"func .+?\(", line).group()
                function_name = match[5:-1]
                try:
                    abi = functions[function_name]
                except KeyError:
                    print(
                        f"Function {function_name} not found in the ABI, but is defined in the interface"
                    )

                # Gather complete function signature
                function_signature = ""
                j = 0
                while True:
                    if contents[i + j].strip() == "}":
                        break
                    function_signature += contents[i + j].strip()
                    j += 1

                # Check that function signature matches (inputs)
                inputs = re.search(r"\(.*?\)", function_signature).group()[1:-1]
                if not inputs:  # inputs is empty
                    assert (
                        abi["inputs"] == []
                    ), f"Function {function_name} has empty inputs in the interface, but not in the ABI"
                else:
                    inputs_list = inputs.split(",")
                    if inputs_list[-1] == "":
                        inputs_list = inputs_list[:-1]

                    assert len(inputs_list) == len(
                        abi["inputs"]
                    ), f"Function {function_name} has different lengths of inputs in the interface and implementation: {inputs} and {abi['inputs']}"
                    for arg, abi_input in zip(inputs_list, abi["inputs"]):
                        name, type = extract_arg_name_and_type(arg)
                        assert (
                            name == abi_input["name"]
                        ), f"Function {function_name} argument {name} and {abi_input['name']} do not match"
                        assert (
                            type == abi_input["type"]
                        ), f"Function {function_name} types {type} and {abi_input['type']} do not match"

                # Check that function signature matches (outputs)
                if re.search(r"-> \(.*?\)", line) is not None:  # There are outputs
                    outputs = re.search(r"-> \(.*?\)", line).group()[4:-1]

                    no_outputs = len(abi["outputs"]) == 0 and outputs == ""
                    matching_num_outputs = len(outputs.split(",")) == len(
                        abi["outputs"]
                    )

                    assert (
                        no_outputs or matching_num_outputs
                    ), f"Function {function_name} has different lengths of outputs in the interface and implementation: {outputs} and {abi['outputs']}"
                    for interface_output, abi_output in zip(
                        outputs.split(","), abi["outputs"]
                    ):
                        name, type = extract_arg_name_and_type(interface_output)

                        assert (
                            name == abi_output["name"]
                        ), f"Function {function_name} argument {name} and {abi_output['name']} do not match"
                        assert (
                            type == abi_output["type"]
                        ), f"Function {function_name} types {type} and {abi_output['type']} do not match"


if __name__ == "__main__":
    # Search for all files that are Contract.cairo
    # recursively within the "contracts" folder
    parser = ArgumentParser()
    parser.add_argument(
        "--cairo-path",
        default="contracts",
        help="Path to Cairo files, used to search for files to check and for relative imports when compiling.",
    )
    args = parser.parse_args()

    file_paths = []
    contract_filenames = []
    for path in args.cairo_path.split(","):
        for folder, _, files in os.walk(path):
            for file in files:
                if (
                    file.endswith(".cairo")
                    and not (file.startswith("I") and file[1].isupper())
                    and file[0].isupper()
                ):
                    file_paths.append(os.path.join(folder))
                    contract_filenames.append(file)

    for file_path, contract_filename in zip(file_paths, contract_filenames):
        print(f"Checking file {os.path.join(file_path, contract_filename)}")
        check_interface(file_path, contract_filename, args.cairo_path)
