FROM public.ecr.aws/lambda/python:3.9-x86_64

RUN yum install -y gcc python-devel gmp-devel git

RUN pip install empiric-network==1.0.1

COPY app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ]
