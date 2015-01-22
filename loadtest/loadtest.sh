#!/bin/bash
if [ "$#" -ne 3 ]
then
  echo "Usage: loadtest.sh <username> <hostname:port> <number of event posts>"
  exit 1
fi
USER=$1
HOSTANDPORT=$2
NOW=$(date +"%Y-%m-%dT%H:%M:%S.000Z")
POSTS=$3
echo "Posting $POSTS user events by user $USER to the API at http://$HOSTANDPORT/events ..."
for i in `seq 1 $POSTS`;
do
	json='{"events":[{"time":"'$NOW'","user_id":"'$USER'","subject_id":"42","related_id":"'$i'","type":"loadtest"}]}'
	address='http://'$HOSTANDPORT'/events'
	curl -X POST -H "Content-Type:application/json" -d $json $address
done
echo "Done posting $POSTS user events."