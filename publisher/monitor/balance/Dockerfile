ARG PONTIS_PUBLISHER_BASE_IMAGE_TAG=0.4.14
FROM 42labs/pontis-publisher:$PONTIS_PUBLISHER_BASE_IMAGE_TAG

COPY monitor-balance.py ./monitor-balance.py
CMD python monitor-balance.py