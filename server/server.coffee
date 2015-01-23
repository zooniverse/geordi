start = (route, handle) ->
  onRequest = (request, response) ->
    postData = ""
    pathname = url.parse(request.url).pathname
    console.log "Request for " + pathname + " received."
    console.log request.method
    if request.method is "POST"
      request.setEncoding "utf8"
      request.addListener "data", (postDataChunk) ->
        postData += postDataChunk
        return
      request.addListener "end", ->
        routePost handle, pathname, response, postData
        return
    else
      routeGet handle, pathname, response, request
    return
  http.createServer(onRequest).listen 8888
  console.log "Server has started."
  return
routeGet = (handle, pathname, response, request) ->
  console.log "About to route a request for " + pathname
  if typeof handle[pathname] is "function"
    handle[pathname] response, request
  else
    console.log "No request handler found for " + pathname
    response.writeHead 404,
      "Content-Type": "text/html"
    response.write "404 Not found"
    response.end()
  return
routePost = (handle, pathname, response, postData) ->
  console.log "About to route a request for " + pathname
  if typeof handle[pathname] is "function"
    handle[pathname] response, postData
  else
    console.log "No request handler found for " + pathname
    response.writeHead 404,
      "Content-Type": "text/html"
    response.write "404 Not found"
    response.end()
  return
http = require("http")
url = require("url")
querystring = require("querystring")
exports.start = start
exports.routeGet = routeGet
exports.routePost = routePost
