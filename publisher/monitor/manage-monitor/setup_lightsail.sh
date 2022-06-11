ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@18.224.31.134 -t "mkdir monitor"
scp -i LightsailDefaultKey-us-east-2.pem -r ../../monitor/ ubuntu@18.224.31.134:
scp -i LightsailDefaultKey-us-east-2.pem -r initialize_lightsail.sh ubuntu@18.224.31.134:
ssh -i LightsailDefaultKey-us-east-2.pem ubuntu@18.224.31.134 -t "source initialize_lightsail.sh"
