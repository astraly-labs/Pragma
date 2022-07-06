ssh -i LightsailDefaultKey-us-east-1.pem ubuntu@3.237.67.239 -t "mkdir all"
scp -i LightsailDefaultKey-us-east-1.pem -r ../sample-publisher/all/ ubuntu@3.237.67.239:
scp -i LightsailDefaultKey-us-east-1.pem -r initialize_lightsail.sh ubuntu@3.237.67.239:
ssh -i LightsailDefaultKey-us-east-1.pem ubuntu@3.237.67.239 -t "source initialize_lightsail.sh"
