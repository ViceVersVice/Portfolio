#!/bin/sh


if [ "$DATABASE" = "postgres" ]
then
  echo "Postgres!"
fi

venv/bin/python3 portfolio/manage.py flush --no-input
venv/bin/python3 portfolio/manage.py migrate

exec "$@"