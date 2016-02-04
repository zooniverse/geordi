var SESSION_EXPIRATION_TIME_MINS = 30;

module.exports = function (Event) {

  var app = require('../../server/server');

  // model operation hook
  Event.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      //ctx.instance.clientIP = (require("domain")).active.members[1].req.ip;
      loopback = require('loopback');
      req = loopback.getCurrentContext().active.http.req
      ctx.instance.clientIP = req.headers["x-real-ip"];
      ctx.instance.serverURL = req.headers.origin;
      ctx.instance.userAgent = req.headers["user-agent"];

      getSessionNumberAndEventNumberToUse = function (prevTime, prevSessionNumber, prevEventNumberWithinSession) {
        if (prevTime) {
          var expirationTimeFromLastEvent = new Date(prevTime.getTime() + (SESSION_EXPIRATION_TIME_MINS * 60000));
          var now = new Date();
          if (now < expirationTimeFromLastEvent) {
            // continue previous session
            return {
              sessionNumber: prevSessionNumber,
              eventNumber: prevEventNumberWithinSession + 1
            }
          }
          else {
            // new session
            return {
              sessionNumber: prevSessionNumber + 1,
              eventNumber: 1
            }
          }
        }
        else {
          // first session for this user
          return {
            sessionNumber: 1,
            eventNumber: 1
          };
        }
      };

      var thisInstance = ctx.instance;

      // for anonymous users, we track sessions by IP address.
      var userID = ctx.instance.userID;
      if (userID == "(anonymous)") {
        thisInstance.anonymous = true;
        if (ctx.instance.clientIP) {
          userID = ctx.instance.clientIP;
        }
      }
      else {
        thisInstance.anonymous = false;
      }

      if (userID != "(anonymous)") {
        // check counters, and find the new counters to use
        var Userseq = app.models.Userseq;
        Userseq.findOrCreate(
          {where: {userID: userID}},
          {
            userID: userID,
            nextSeq: 1,
            currentSession: 1,
            currentEventNumberWithinSession: 0,
            timeOfLastEvent: Date.now()
          },
          function (err, userseq) {
            if (err) {
              console.log("Error while trying to access user seq table:");
              console.log(err);
            } else {
              // update sequences, checking for new session.
              thisInstance.userSeq = userseq.nextSeq;
              var sessionNumberAndEventNumberToUse = getSessionNumberAndEventNumberToUse(
                userseq.timeOfLastEvent,
                userseq.currentSession,
                userseq.currentEventNumberWithinSession);
              thisInstance.sessionNumber = sessionNumberAndEventNumberToUse.sessionNumber;
              thisInstance.eventNumber = sessionNumberAndEventNumberToUse.eventNumber;
              userseq.nextSeq++;
              userseq.currentSession = thisInstance.sessionNumber;
              userseq.timeOfLastEvent = thisInstance.time;
              userseq.currentEventNumberWithinSession = thisInstance.eventNumber;
              userseq.save();
            }
            next();
          });
      }
      else {
        // not session trackable, so use -1 for counter columns.
        thisInstance.userSeq = -1;
        thisInstance.sessionNumber = -1;
        thisInstance.eventNumber = -1;
        next();
      }
    }
  });
};
