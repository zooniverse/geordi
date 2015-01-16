var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/test/logEvent"] = requestHandlers.testLogEvent;
handle["/logEvent"] = requestHandlers.logEvent;

server.start(router.route, handle);