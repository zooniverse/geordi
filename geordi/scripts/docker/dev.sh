#!/bin/bash -ex
npm install
cp -f /geordi/config/docker/datasources.json /geordi/server/
/usr/bin/supervisord
