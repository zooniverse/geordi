var restify = require('restify');

function respond(req, res, next) {
  var doc = {name:req.params.name,data:12};
  res.send(doc);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});