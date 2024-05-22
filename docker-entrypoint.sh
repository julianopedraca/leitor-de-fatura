#!/bin/sh

cd /code
pip3 install -r requirements.txt

exec "$@"
