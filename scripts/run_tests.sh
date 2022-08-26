black . --check
flake8 .
isort . --check-only --diff
cairo-format $(find contracts -name '*.cairo') -c
