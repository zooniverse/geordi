#!/bin/bash
if [ "$#" -ne 4 ]
then
  echo "Usage: loadtest.sh <username> <hostname:port> <number of event posts per worker> <number of concurrent workers>"
  exit 1
fi
USER=$1
HOSTANDPORT=$2
POSTS=$3
WORKERS=$4
echo 'Initializing $WORKERS to post $POSTS user events by user $USER to the API at http://$HOSTANDPORT/events ...'
declare -a pid
for w in `seq 1 $WORKERS`;
do
    ./worker.sh $USER 'Worker'$w $HOSTANDPORT $POSTS &
    echo $!
    echo $w
    pid[$w]=$!
done
echo 'All workers initialized.'
errors=0
for w in `seq 1 $WORKERS`;
do
    wait ${pid[w]}
    result=$?
    if [ $result -eq 0 ]
    then
        echo "Worker$w completed successfully."
    else
        errors++
        echo "Worker$w failed to complete (return code $result)."
    fi
done
total=$((POSTS*WORKERS))
echo "All workers have completed processing ($POSTS posts x $WORKERS workers = $total new user events - assuming no errors)."
echo "There were $errors errors."

