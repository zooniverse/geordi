addEvent = (eventData) ->
  dataString = JSON.stringify(eventData)
  headers =
    "Content-Type": "application/json; charset=utf-8"
    "Content-Length": dataString.length + "{\"events\":[".length + "]}".length

  options =
    host: "localhost" # TODO: move to settings file
    port: 80 #
    path: "/events/" #
    method: "POST"
    headers: headers

  req = http.request(options, (res) ->
    res.setEncoding "utf-8"
    responseString = ""
    res.on "data", (data) ->
      responseString += data
      return

    res.on "end", ->
      resultObject = JSON.parse(responseString)
      true

    return
  )
  req.on "error", (e) ->
    console.log e
    false

  req.write "{\"events\":[" + dataString + "]}"
  req.end()
  return

# This will list all events that meet the specified parameters.
# If parameters object is empty, we return all events
# If parameters object contains key 'user-id' we add a filter to only include events corresponding to that user
# If parameters object contains key 'subject-id' we add a filter to only include events corresponding to that subject
# If parameters object contains key 'related-id' we add a filter to only include events corresponding to that related ID
# If parameters object contains key 'start-date' we add a filter to only include events on or after the specified start date (note: if no time specified, assume midnight)
# If parameters object contains key 'end-date' we add a filter to only include events before or on the specified end date (note: if no time specified, assume midnight)
#
# response is the handle to the response to allow writing to it.
# callback is the function to execute once a response is received.
# 
listEvents = (parameters, response, callback) ->
  console.log "trying to list events matching parameters " + JSON.stringify(parameters)
  headers =
    "Content-Type": "application/json; charset=utf-8"
    "Content-Length": 0

  options =
    host: "localhost" # TODO: move to settings file
    port: 80 #
    path: "/events/" #
    method: "GET"
    headers: headers

  req = http.request(options, (res) ->
    res.setEncoding "utf-8"
    responseString = ""
    res.on "data", (data) ->
      responseString += data
      return

    res.on "end", ->
      eventsList = JSON.parse(responseString)["events"]
      filteredList = []
      eventsList.forEach (event) ->
        filteredList.push event  if utils.eventChecker(event, parameters)
        return

      callback response, filteredList
      true

    return
  )
  req.on "error", (e) ->
    console.log e
    callback response, [e]
    false

  req.end()
  return
http = require("http")
utils = require("./utils")
exports.addEvent = addEvent
exports.listEvents = listEvents
