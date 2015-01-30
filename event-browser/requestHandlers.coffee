api = require "./api_client"
url = require "url"
fs = require "fs"
eco = require "eco"
jQuery = require "jquery"

searchEvents = (response) ->
  fs.readFile "html/searchEvents.html", (err, data) ->
    response.writeHead 200,
      "Content-Type": "text/html"

    response.write data
    response.end()
    return
  return

showEvents = (response) ->
  fs.readFile "html/dataTables.html", (err, data) ->
    response.writeHead 200,
      "Content-Type": "text/html"

    response.write data
    response.end()
    return
  return

filterEvents = (response, request) ->
  parameters = url.parse(request.url, true).query
  callback = (response, events) ->
    if events
      response.writeHead 200,
        "Content-Type": "text/html"
      template = fs.readFileSync "templates/dataTables.eco", "utf-8"
      response.write eco.render template,
        events: events
      response.end()
    else
      response.writeHead 500,
        "Content-Type": "text/html"
      response.end()
    return
  api.getEvents parameters, response, callback
  return

exports.searchEvents = searchEvents
exports.showEvents = showEvents
exports.filterEvents = filterEvents

