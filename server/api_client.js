var http = require('http');

function addEvent(eventData)
{
    var dataString = JSON.stringify(eventData);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
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
    req.write(dataString);
    req.end();
};

exports.addEvent = addEvent;
