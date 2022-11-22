FROM 42labs/empiric-publisher:test

RUN pip install -r requirements.txt

COPY app.py .

CMD [ "python", "app.py" ]
