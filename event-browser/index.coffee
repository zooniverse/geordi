server = require("./server")
router = require("./router")
requestHandlers = require("./requestHandlers")
handle = {}
handle["/searchEvents"] = requestHandlers.searchEvents
handle["/filterEvents"] = requestHandlers.filterEvents
handle["/showEvents"] = requestHandlers.showEvents
server.start router.route, handle
