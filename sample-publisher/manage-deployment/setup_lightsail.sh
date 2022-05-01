ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.133.145.212 -t "mkdir all"
scp -i LightsailDefaultKey-us-east-2.pem -r ../all/ ubuntu@3.133.145.212:
scp -i LightsailDefaultKey-us-east-2.pem -r initialize_lightsail.sh ubuntu@3.133.145.212:
ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.133.145.212 -t "source initialize_lightsail.sh"
