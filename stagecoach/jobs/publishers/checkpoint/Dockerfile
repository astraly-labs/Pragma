FROM public.ecr.aws/lambda/python:3.9-x86_64

RUN yum install -y gcc python-devel gmp-devel git

RUN pip install pragma-network==1.4.11

COPY app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ]
