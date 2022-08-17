ARG EMPIRIC_PUBLISHER_BASE_IMAGE_TAG=0.8.0
FROM 42labs/empiric-publisher:$EMPIRIC_PUBLISHER_BASE_IMAGE_TAG

COPY monitor-price.py ./monitor-price.py
CMD python monitor-price.py
