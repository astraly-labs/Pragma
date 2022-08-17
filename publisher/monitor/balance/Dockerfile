ARG EMPIRIC_PUBLISHER_BASE_IMAGE_TAG=0.8.0
FROM 42labs/empiric-publisher:$EMPIRIC_PUBLISHER_BASE_IMAGE_TAG

COPY monitor-balance.py ./monitor-balance.py
CMD python monitor-balance.py
