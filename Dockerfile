# Dockerfile for publisher
FROM python:3.9.14-slim-buster AS base

# Needed for fastecdsa
RUN apt-get update && apt-get install -y gcc python-dev libgmp3-dev
RUN python -m pip install --upgrade pip

RUN pip install poetry
RUN poetry install

FROM base as test
COPY empiric-package/ /empiric-package
RUN pip install -e empiric-package/

FROM base as production
ARG EMPIRIC_PACKAGE_VERSION
RUN pip install empiric-network==$EMPIRIC_PACKAGE_VERSION
