#!/bin/sh


if [ "$DATABASE" = "postgres" ]
then
  echo "Postgres!"
fi

cd portfolio
python3 manage.py flush --no-input
python3 manage.py migrate

exec "$@"