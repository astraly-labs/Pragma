FROM public.ecr.aws/lambda/python:3.9-x86_64

COPY app.py ${LAMBDA_TASK_ROOT}
RUN yum install -y gcc python-devel gmp-devel git

RUN pip install git+https://github.com/astralylabs/Empiric.git@create-stagecoach#egg=empiric-network\&subdirectory=empiric-package

CMD [ "app.handler" ]
