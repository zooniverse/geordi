#!/bin/bash
if [ "$#" -ne 4 ]
then
  echo "Usage: worker.sh <username> <worker name> <hostname:port> <number of event posts>"
  exit 1
fi
USER=$1
WORKER=$2
HOSTANDPORT=$3
NOW=$(date +"%Y-%m-%dT%H:%M:%S.000Z")
POSTS=$4
echo "$WORKER will now post $POSTS user events by user $USER to the API at http://$HOSTANDPORT/events ..."
for i in `seq 1 $POSTS`;
do
    event=$WORKER'-'$i
	json='{"events":[{"time":"'$NOW'","user_id":"'$USER'","subject_id":"42","related_id":"'$event'","type":"loadtest"}]}'
	address='http://'$HOSTANDPORT'/events'
    echo "$WORKER POSTing event number $i ($event)..."
    response=$(curl -X POST -H "Content-Type:application/json" -d $json $address)
	echo "$WORKER received this response from event number $i ($event):$n$response"
done
echo "$WORKER done posting $POSTS user events."