FROM python:3.10.4-slim as base

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    curl \
    python3-pip \
    python3-dev \
    libpq-dev \
    postgresql \
    postgresql-contrib \
    npm

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN pip3 install --upgrade pip

# Venv
RUN python -m venv ./venv
ENV VIRTUAL_ENV /usr/src/app/venv
ENV PATH /usr/src/app/venv/bin:$PATH
RUN cd venv/bin && chmod +x activate

# Poetry
COPY pyproject.toml poetry.lock /usr/src/app/
RUN sh ./venv/bin/activate && pip install poetry
RUN poetry install

# Frontend
COPY frontend /usr/src/app/frontend
RUN cd frontend && npm install && npm run build


FROM python:3.10.4-slim AS final
WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY docker_config /usr/src/app/docker_config
COPY gunicorn.conf.py /usr/src/app/
COPY portfolio /usr/src/app/portfolio
COPY --from=base /usr/src/app/venv /usr/src/app/venv
COPY --from=base /usr/src/app/frontend/first_fe_app/dist/main.js /usr/src/app/portfolio/main_app/static/js

ENTRYPOINT ["/usr/src/app/docker_config/entrypoint.sh"]
