#!/bin/bash
if [ "$#" -ne 1 ]
then
  echo "Usage: loadtest.sh <username>"
  exit 1
fi

for i in `seq 1 100`;
do
	dt=$(date +"%Y-%m-%dT%H:%M:%S.000Z")
	json='{"events":[{"time":"'$dt'","user_id":"'$1'","subject_id":"42","related_id":"'$i'","type":"loadtest"}]}'
	curl -X POST -H "Content-Type:application/json" -d $json http://localhost:8090/events
done
