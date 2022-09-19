FROM public.ecr.aws/lambda/python:3.9-x86_64

RUN yum install -y gcc python-devel gmp-devel git curl
RUN pip install git+https://github.com/42labs/Empiric.git@create-stagecoach#egg=empiric-network\&subdirectory=empiric-package
