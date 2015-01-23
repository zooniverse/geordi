// Generated by CoffeeScript 1.8.0
(function() {
  var addEvent, http, listEvents, utils;

  addEvent = function(eventData) {
    var dataString, headers, options, req;
    dataString = JSON.stringify(eventData);
    headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": dataString.length + "{\"events\":[".length + "]}".length
    };
    options = {
      host: "localhost",
      port: 80,
      path: "/events/",
      method: "POST",
      headers: headers
    };
    req = http.request(options, function(res) {
      var responseString;
      res.setEncoding("utf-8");
      responseString = "";
      res.on("data", function(data) {
        responseString += data;
      });
      res.on("end", function() {
        var resultObject;
        resultObject = JSON.parse(responseString);
        return true;
      });
    });
    req.on("error", function(e) {
      console.log(e);
      return false;
    });
    req.write("{\"events\":[" + dataString + "]}");
    req.end();
  };

  listEvents = function(parameters, response, callback) {
    var headers, options, req;
    console.log("trying to list events matching parameters " + JSON.stringify(parameters));
    headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": 0
    };
    options = {
      host: "localhost",
      port: 80,
      path: "/events/",
      method: "GET",
      headers: headers
    };
    req = http.request(options, function(res) {
      var responseString;
      res.setEncoding("utf-8");
      responseString = "";
      res.on("data", function(data) {
        responseString += data;
      });
      res.on("end", function() {
        var eventsList, filteredList;
        eventsList = JSON.parse(responseString)["events"];
        filteredList = [];
        eventsList.forEach(function(event) {
          if (utils.eventChecker(event, parameters)) {
            filteredList.push(event);
          }
        });
        callback(response, filteredList);
        return true;
      });
    });
    req.on("error", function(e) {
      console.log(e);
      callback(response, [e]);
      return false;
    });
    req.end();
  };

  http = require("http");

  utils = require("./utils");

  exports.addEvent = addEvent;

  exports.listEvents = listEvents;

}).call(this);

//# sourceMappingURL=api_client.js.map
