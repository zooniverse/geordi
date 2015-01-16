var utils = require('utils');
var api = require('api_client');

function start(response) {
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' + 'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/logEvent" method="post">' +
        '<input type="text" name="user_id">' +
        '<input type="text" name="subject_id">' +
        '<input type="text" name="related_id">' +
        '<input type="text" name="type">' +
        '<input type="submit" value="Log Event">' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

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