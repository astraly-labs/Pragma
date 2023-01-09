FROM python:3.9.14-slim-buster AS base

RUN apt-get update && apt-get install -y gcc python-dev libgmp3-dev git
RUN pip install git+https://github.com/Astraly-Labs/Empiric.git@create-stagecoach#egg=empiric-network\&subdirectory=empiric-package
