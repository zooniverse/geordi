#!/bin/bash -ex
npm install
ls -al /app/server/
cp /app/config/docker/datasources.json /app/server/
/usr/bin/supervisord
