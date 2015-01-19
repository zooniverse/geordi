var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/test/logEvent"] = requestHandlers.testLogEvent;
handle["/test/listEvents"] = requestHandlers.testLogEvent;
handle["/logEvent"] = requestHandlers.logEvent;
handle["/listEvents"] = requestHandlers.listEvents;

server.start(router.route, handle);