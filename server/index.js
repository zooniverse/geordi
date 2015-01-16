var server = require("./API");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/logEvent"] = requestHandlers.logEvent;

server.start(router.route, handle);