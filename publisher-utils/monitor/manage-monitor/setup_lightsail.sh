ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@52.14.202.151 -t "mkdir monitor"
scp -i LightsailDefaultKey-us-east-2.pem -r ../monitor/ ubuntu@52.14.202.151:
scp -i LightsailDefaultKey-us-east-2.pem -r initialize_lightsail.sh ubuntu@52.14.202.151:
ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@52.14.202.151 -t "source initialize_lightsail.sh"
