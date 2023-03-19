# Dockerfile for publisher
FROM python:3.9-slim-buster AS base

# Needed for fastecdsa
RUN apt-get update && apt-get install -y gcc python-dev libgmp3-dev curl
RUN python -m pip install --upgrade pip

RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="${PATH}:/root/.local/bin"
# Install grade
RUN mkdir /app/
COPY . /app/

# Defaults
WORKDIR /app/
RUN poetry install --without local

FROM base as test
COPY pragma-package/ /pragma-package
RUN poetry install --only local

FROM base as production
ARG PRAGMA_PACKAGE_VERSION
RUN pip install pragma-network==$PRAGMA_PACKAGE_VERSION
