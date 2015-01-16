//var querystring = require("querystring");
//var dateFormat = require('dateformat');
var utils = require('utils');

function logEvent(response, postData) {
    console.log("Request handler 'log' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    var logText = querystring.parse(postData).text;
    response.write("Logged: "+logText);
    var logEntry = { time: Date.now(),text:logText };
    db.insert(logEntry, function (err,newDoc) {
        console.log('error ('+err+'}, failed to log doc with ID '+newDoc._id+' and text '+newDoc.text);
    });
    response.end();
}