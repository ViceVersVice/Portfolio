#!/bin/sh

if [ "$DEBUG" = 0 ]
then
  venv/bin/python3 portfolio/manage.py collectstatic --no-input --clear
fi

if [ "$DATABASE" = "postgres" ]
then
  echo "Postgres!"
fi

venv/bin/python3 portfolio/manage.py migrate

exec "$@"