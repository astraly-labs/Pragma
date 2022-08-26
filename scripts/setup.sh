python3 -m venv .venv
source ./.venv/bin/activate

pip install -r requirements.txt
pip install -r dev-requirements.txt
pip install -e empiric-package
curl -L https://raw.githubusercontent.com/software-mansion/protostar/master/install.sh | bash
