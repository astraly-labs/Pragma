# Dockerfile for publisher
FROM python:3.7.13-slim-buster

# Needed for fastecdsa
RUN apt-get update && apt-get install -y gcc python-dev libgmp3-dev

COPY requirements.txt /requirements.txt
RUN pip install -r requirements.txt --upgrade --upgrade-strategy eager

COPY pontis-package /pontis-package
RUN pip install -e pontis-package
