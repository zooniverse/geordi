var http = require('http');

function addEvent(eventData)
{
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

    var req = http.request(options, function(res) {
      res.setEncoding('utf-8');
      var responseString = '';
      res.on('data', function(data) {
        responseString += data;
      });
      res.on('end', function() {
        var resultObject = JSON.parse(responseString);
         return true;
      });
    });
    req.on('error', function(e) {
      console.log(e);
      return false;
    });
    req.write('{"events":['+dataString+']}');
    req.end();
};

exports.addEvent = addEvent;

/*
    This will list all events that meet the specified parameters.
    If parameters object is empty, we return all events
    If parameters object contains key 'user-id' we add a filter to only include events corresponding to that user
    If parameters object contains key 'subject-id' we add a filter to only include events corresponding to that subject
    If parameters object contains key 'start-date' we add a filter to only include events on or after the specified start date
    If parameters object contains key 'end-date' we add a filter to only include events before or on the specified end date
 */
function listEvents(parameters)
{
    var dataString = JSON.stringify(eventData);

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

    var req = http.request(options, function(res) {
      res.setEncoding('utf-8');
      var responseString = '';
      res.on('data', function(data) {
        responseString += data;
      });
      res.on('end', function() {
        var resultObject = JSON.parse(responseString);
        return resultObject;
      });
    });
    req.on('error', function(e) {
      console.log(e);
      return false;
    });
    req.end();
};

exports.listEvents = listEvents;