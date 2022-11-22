FROM 42labs/empiric-publisher:test

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app.py .

CMD [ "python", "app.py" ]
