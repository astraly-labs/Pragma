ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@18.190.153.10 -t "mkdir all"
scp -i LightsailDefaultKey-us-east-2.pem -r ../all/ ubuntu@18.190.153.10:
scp -i LightsailDefaultKey-us-east-2.pem -r initialize_lightsail.sh ubuntu@18.190.153.10:
ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@18.190.153.10 -t "source initialize_lightsail.sh"
