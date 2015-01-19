var utils = require('./utils');
var api = require('./api_client');
var url = require('url');
var fs = require('fs');

function testLogEvent(response) {
    console.log("Request handler 'testLogEvent' was called.");

    fs.readFile('html/tests/logEvent.html',
        function (err, data) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        }
    );
}

exports.testLogEvent = testLogEvent;

function testListEvents(response) {
    console.log("Request handler 'testListEvents' was called.");

    fs.readFile('html/tests/listEvents.html',
        function (err, data) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        }
    );
}

exports.testListEvents = testListEvents;

function logEvent(response, postData) {
    console.log("Request handler 'logEvent' was called.");
    console.log(postData);
    var eventData = utils.getEventDataFromPost(postData);
    var success = api.addEvent(eventData);
    if (success) {
        response.writeHead(201, {"Content-Type": "application/json"});
        response.end();
    }
    else {
        response.writeHead(500, {"Content-Type": "application/json"});
        response.end();
    }
}

exports.logEvent = logEvent;

function listEvents(response, request) {
    console.log("Request handler 'listEvents' was called.");
    var parameters = url.parse(request.url, true).query;
    var callback = function (response, events) {
        if (events) {
            response.writeHead(201, {"Content-Type": "application/json"});
            response.write(JSON.stringify(events));
            response.end();
        }
        else {
            response.writeHead(500, {"Content-Type": "application/json"});
            response.end();
        }
    }
    api.listEvents(parameters, response, callback);
}

exports.listEvents = listEvents;