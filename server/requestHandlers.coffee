testLogEvent = (response) ->
  console.log "Request handler 'testLogEvent' was called."
  fs.readFile "html/tests/logEvent.html", (err, data) ->
    response.writeHead 200,
      "Content-Type": "text/html"

    response.write data
    response.end()
    return
  return
testListEvents = (response) ->
  console.log "Request handler 'testListEvents' was called."
  fs.readFile "html/tests/listEvents.html", (err, data) ->
    response.writeHead 200,
      "Content-Type": "text/html"

    response.write data
    response.end()
    return
  return
logEvent = (response, postData) ->
  console.log "Request handler 'logEvent' was called."
  console.log postData
  eventData = utils.getEventDataFromPost(postData)
  success = api.addEvent(eventData)
  if success
    response.writeHead 201,
      "Content-Type": "application/json"
    response.end()
  else
    response.writeHead 500,
      "Content-Type": "application/json"
    response.end()
  return
listEvents = (response, request) ->
  console.log "Request handler 'listEvents' was called."
  parameters = url.parse(request.url, true).query
  callback = (response, events) ->
    if events
      response.writeHead 201,
        "Content-Type": "application/json"
      response.write JSON.stringify(events)
      response.end()
    else
      response.writeHead 500,
        "Content-Type": "application/json"
      response.end()
    return
  api.listEvents parameters, response, callback
  return
utils = require("./utils")
api = require("./api_client")
url = require("url")
fs = require("fs")
exports.testLogEvent = testLogEvent
exports.testListEvents = testListEvents
exports.logEvent = logEvent
exports.listEvents = listEvents
