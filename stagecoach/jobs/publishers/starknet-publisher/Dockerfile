FROM public.ecr.aws/lambda/python:3.9-x86_64

RUN yum install -y gcc python-devel gmp-devel git

RUN python -m pip install --upgrade pip

RUN pip install empiric-network==1.8.4 typeguard==2.13.3

COPY app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ]
