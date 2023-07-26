FROM amazon/aws-lambda-python:3.9

RUN yum install -y gcc python-devel gmp-devel git
RUN pip install aiohttp web3 boto3

COPY app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ] 
