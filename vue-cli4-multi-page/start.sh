#!/bin/bash
# Start service in docker

# Start the nginx
nginx &
if [[ $? != 0 ]]; then
    echo Failed to start nginx >&2
    exit 1
fi
# Start the oauth app
#echo Start oauth >&2
#uwsgi --xml /etc/oauthapp.xml
#if [[ $? != 0 ]]; then
#    echo Failed to start oauth application >&2
#    exit 1
#fi

# Start the register service in background
python -m register --name vaccination-report-front
if [[ $? != 0 ]]; then
    echo Failed to start PAAS register >&2
    exit 1
fi
