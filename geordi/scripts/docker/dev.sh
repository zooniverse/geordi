#!/bin/bash -ex
npm install
cp -f /app/config/docker/datasources.json /app/server/
/usr/bin/supervisord
