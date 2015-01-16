//var querystring = require("querystring");
//var dateFormat = require('dateformat');
var utils = require('utils');
var api = require('api_client');

function logEvent(response, postData) {
    console.log("Request handler 'logEvent' was called.");
    var eventData = utils.getEventDataFromPost(postData);
    var success = api.addEvent(eventData);
    if (success)
    {
        response.writeHead(201, {"Content-Type": "application/json"});
        response.end();
    }
    else
    {
        response.writeHead(500, {"Content-Type": "application/json"});
        response.end();
    }
}

exports.logEvent = logEvent;