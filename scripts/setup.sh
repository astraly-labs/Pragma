python3 -m venv .venv
source ./.venv/bin/activate

curl -sSL https://install.python-poetry.org | python3 -
poetry install
pip install -e empiric-package
curl -L https://raw.githubusercontent.com/software-mansion/protostar/master/install.sh | bash
