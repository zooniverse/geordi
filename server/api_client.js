var http = require('http');
var utils = require('./utils');

function addEvent(eventData) {
    var dataString = JSON.stringify(eventData);

    var headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': dataString.length + '{"events":['.length + ']}'.length
    };

    var options = {
        host: 'localhost',  // TODO: move to settings file
        port: 8090,         //
        path: '/events/',   //
        method: 'POST',
        headers: headers
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
        var responseString = '';
        res.on('data', function (data) {
            responseString += data;
        });
        res.on('end', function () {
            var resultObject = JSON.parse(responseString);
            return true;
        });
    });
    req.on('error', function (e) {
        console.log(e);
        return false;
    });
    req.write('{"events":[' + dataString + ']}');
    req.end();
};

exports.addEvent = addEvent;

/*
 This will list all events that meet the specified parameters.
 If parameters object is empty, we return all events
 If parameters object contains key 'user-id' we add a filter to only include events corresponding to that user
 If parameters object contains key 'subject-id' we add a filter to only include events corresponding to that subject
 If parameters object contains key 'related-id' we add a filter to only include events corresponding to that related ID
 If parameters object contains key 'start-date' we add a filter to only include events on or after the specified start date (note: if no time specified, assume midnight)
 If parameters object contains key 'end-date' we add a filter to only include events before or on the specified end date (note: if no time specified, assume midnight)

 response is the handle to the response to allow writing to it.
 callback is the function to execute once a response is received.
 */
function listEvents(parameters, response, callback) {
    console.log('trying to list events matching parameters '+JSON.stringify(parameters));
    var headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': 0
    };

    var options = {
        host: 'localhost',  // TODO: move to settings file
        port: 8090,         //
        path: '/events/',   //
        method: 'GET',
        headers: headers
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
        var responseString = '';
        res.on('data', function (data) {
            responseString += data;
        });
        res.on('end', function () {
            var eventsList = JSON.parse(responseString)['events'];
            var filteredList = [];
            eventsList.forEach(function (event) {
                if (utils.eventChecker(event, parameters)) {
                    filteredList.push(event);
                }
            });
            callback(response, filteredList);
            return true;
        });
    });
    req.on('error', function (e) {
        console.log(e);
        callback(response, [e]);
        return false;
    });
    req.end();
};

exports.listEvents = listEvents;