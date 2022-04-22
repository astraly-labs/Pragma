ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.133.151.230 -t "mkdir all"
scp -i LightsailDefaultKey-us-east-2.pem -r ../all/ ubuntu@3.133.151.230:
scp -i LightsailDefaultKey-us-east-2.pem -r initialize_lightsail.sh ubuntu@3.133.151.230:
ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@3.133.151.230 -t "source initialize_lightsail.sh"
