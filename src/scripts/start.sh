#!/bin/bash
cd /srv/api/
npm install 

pm2 describe api > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start /srv/api/bin/api
else
  pm2 restart api
fi;