route = (handle, pathname, response, request) ->
  if typeof handle[pathname] is "function"
    handle[pathname] response, request
  else
    console.log "No request handler found for " + pathname
    response.writeHead 404,
      "Content-Type": "text/html"
    response.write "404 Not found"
    response.end()
  return
exports.route = route
