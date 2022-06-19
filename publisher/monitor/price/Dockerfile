ARG PONTIS_PUBLISHER_BASE_IMAGE_TAG=0.5.2
FROM 42labs/pontis-publisher:$PONTIS_PUBLISHER_BASE_IMAGE_TAG

COPY monitor-price.py ./monitor-price.py
CMD python monitor-price.py