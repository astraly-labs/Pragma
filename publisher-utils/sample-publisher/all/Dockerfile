ARG PONTIS_PUBLISHER_BASE_IMAGE_TAG=0.4.8
FROM 42labs/pontis-publisher:$PONTIS_PUBLISHER_BASE_IMAGE_TAG

COPY fetch-and-publish.py ./fetch-and-publish.py
CMD python fetch-and-publish.py
