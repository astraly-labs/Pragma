ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.143.214.121 -t "mkdir all"
scp -i LightsailDefaultKey-us-east-2.pem -r ../all/ ubuntu@3.143.214.121:
scp -i LightsailDefaultKey-us-east-2.pem -r initialize_lightsail.sh ubuntu@3.143.214.121:
ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.143.214.121 -t "source initialize_lightsail.sh"
