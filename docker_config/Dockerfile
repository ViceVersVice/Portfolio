FROM ubuntu:latest

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y python3-pip python3-dev libpq-dev postgresql postgresql-contrib

RUN pip3 install --upgrade pip
COPY requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

COPY . /usr/src/app/
RUN ls -a
RUN cd docker_config && ls -a

ENTRYPOINT ["/usr/src/app/docker_config/db_entrypoint.sh"]
