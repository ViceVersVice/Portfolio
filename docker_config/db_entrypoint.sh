#!/bin/sh


if [ "$DATABASE" = "postgres" ]
then
  echo "Postgres!"
fi

venv/bin/python3 portfolio/manage.py migrate

exec "$@"