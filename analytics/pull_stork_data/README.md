## Helpful Commands

### Copy Over Files
scp -i LightsailDefaultKey-us-east-1.pem -r pull_stork_data ubuntu@34.237.176.25:

### Get In
ssh -i LightsailDefaultKey-us-east-1.pem ubuntu@34.237.176.25
cd pull_stork_data

### Initialize Lightsail
source initialize.sh
pip install -r requirements.txt

### Set Up Lond-Running Command
nohup python3 pull_stork_data.py > logs.txt 2>&1 &