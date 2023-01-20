FROM astralylabs/empiric-publisher:1.4.6

RUN pip install boto3

COPY empiric-package/ /empiric-package
RUN pip install -e empiric-package/

COPY stagecoach/jobs/publishers/publish_generic_entry/app.py .