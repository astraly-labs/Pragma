ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.138.179.159 -t "mkdir all"
scp -i LightsailDefaultKey-us-east-2.pem -r ../all/ ubuntu@3.138.179.159:
scp -i LightsailDefaultKey-us-east-2.pem -r initialize_lightsail.sh ubuntu@3.138.179.159:
ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.138.179.159 -t "source initialize_lightsail.sh"
