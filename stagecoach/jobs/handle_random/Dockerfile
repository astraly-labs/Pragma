FROM amazon/aws-lambda-python:3.9

RUN yum install -y gcc python-devel gmp-devel git
RUN pip install pragma-network==1.4.7

COPY cli-config.ini /cli-config.ini

COPY ./stagecoach/jobs/handle_random/app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ] 
