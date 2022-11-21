FROM public.ecr.aws/lambda/python:3.9-x86_64

RUN yum install -y gcc python-devel gmp-devel git

COPY "empiric-package/" empiric-package/
RUN pip install -e empiric-package

COPY app.py ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ]
