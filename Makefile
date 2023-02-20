.PHONY: build test coverage
cairo_files = $(shell find contracts -name "*.cairo")

build: check
	$(MAKE) clean
	protostar build

build-mac: check
	$(MAKE) clean
	protostar build

check:
	poetry lock --check

setup:
	poetry install --no-root

test: 
	poetry run pytest tests --log-cli-level=INFO -n logical

test-no-log: 
	poetry run pytest tests -n logical

test-integration: 
	poetry run pytest tests/integration --log-cli-level=INFO -n logical

test-unit: 
	poetry run pytest tests/unit --log-cli-level=INFO

run-test-log: 
	poetry run pytest -k $(test) --log-cli-level=INFO -vvv

run-test: 
	poetry run pytest -k $(test)

run-test-mark-log: 
	poetry run pytest -m $(mark) --log-cli-level=INFO -vvv

run-test-mark: 
	poetry run pytest -m $(mark)

deploy:
	poetry run python ./scripts/updates/deploy_oracle.py

format:
	poetry run cairo-format -i ${cairo_files}
	poetry run black tests/.
	poetry run isort tests/.
	poetry run autoflake . -r

format-check:
	poetry run cairo-format -c ${cairo_files}
	poetry run black tests/. --check
	poetry run isort tests/. --check
	poetry run autoflake . -r -cd

clean:
	rm -rf build
	mkdir build

lint:
	amarna ./src/contracts/starknet -o lint.sarif -rules unused-imports,dead-store,unknown-decorator,unused-arguments

format-mac:
	cairo-format contracts/**/*.cairo -i
	black tests/.
	isort tests/.

check-resources:
	poetry run python scripts/check_resources.py

get-blockhashes:
	poetry run python scripts/get_latest_blockhashes.py

build-sol:
	forge build --names --force

check-contracts:
	poetry run python3 -m empiric.test.interface_consistency --cairo-path 'contracts/starknet/src,contracts/starknet/lib'
