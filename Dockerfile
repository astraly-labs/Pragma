# Dockerfile for publisher
FROM python:3.7.13-slim-buster AS base

# Needed for fastecdsa
RUN apt-get update && apt-get install -y gcc python-dev libgmp3-dev

COPY requirements.txt /requirements.txt
RUN pip install -r requirements.txt --upgrade --upgrade-strategy eager

FROM base as test
COPY pontis-package/ /pontis-package
RUN pip install pontis-package/

FROM base as production
ARG PONTIS_PACKAGE_VERSION
RUN pip install pontis==$PONTIS_PACKAGE_VERSION