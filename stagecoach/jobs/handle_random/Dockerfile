FROM amazon/aws-lambda-python:3.9

RUN yum install -y gcc python-devel gmp-devel git
RUN pip install git+https://github.com/42labs/Empiric.git@add_future_entry#egg=empiric-network\&subdirectory=empiric-package

COPY cli-config.ini /cli-config.ini

COPY ./stagecoach/jobs/handle_random/app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ] 
