FROM astralylabs/empiric-publisher:1.4.6

RUN yum install -y gcc python-devel gmp-devel git
RUN pip install boto3

COPY empiric-package/ /empiric-package
RUN pip install -e empiric-package/

COPY app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ]