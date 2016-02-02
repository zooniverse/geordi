var SESSION_EXPIRATION_TIME_MINS = 30;

module.exports = function(Event) {
  // model operation hook
  Event.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      //ctx.instance.clientIP = (require("domain")).active.members[1].req.ip;
      loopback = require('loopback');
      req = loopback.getCurrentContext().active.http.req
      ctx.instance.clientIP = req.headers["x-real-ip"];
      ctx.instance.serverURL = req.headers.origin;
      ctx.instance.userAgent = req.headers["user-agent"];

      getSessionNumberAndEventNumberToUse = function(prevTime,prevSessionNumber,prevEventNumberWithinSession) {
        if (prevTime) {
          expirationTimeFromLastEvent = new Date(prevTime + (SESSION_EXPIRATION_TIME_MINS * 60000));
          now = new Date();
          if (now<expirationTimeFromLastEvent) {
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

      // check counters, and find the new counters to use
      Userseq.findOrCreate(
          { where: {userID: ctx.instance.userID}} ,
          { userID: ctx.instance.userID,
            nextSeq: 2,
            currentSession: 1,
            currentEventNumberWithinThisSession: 1,
            timeOfLastEvent: Date.now() },
           function(err, userseq) {
               if (userseq.nextSeq == 2 &&
                   userseq.currentSession == 1 &&
                   userseq.currentEventNumberWithinThisSession == 1)
               {
                 // very first event for this user (which we just created)
                 ctx.instance.userSeq = 1;
                 ctx.instance.sessionNumber = 1;
                 ctx.instance.eventNumber = 1;
               }
               else {
                 // update sequences, checking for new session.
                 ctx.instance.userSeq = userseq.nextSeq;
                 var sessionNumberAndEventNumberToUse = getSessionNumberAndEventNumberToUse(
                     userseq.timeOfLastEvent,
                     userseq.currentSession,
                     userseq.currentEventNumberWithinThisSession);
                 ctx.instance.sessionNumber = sessionNumberAndEventNumberToUse.sessionNumber;
                 ctx.instance.eventNumber = sessionNumberAndEventNumberToUse.eventNumber;
                 // update the counters table
                 userseq.nextSeq++;
                 userseq.currentSession = ctx.instance.sessionNumber;
                 userseq.currentEventNumberWithinThisSession = ctx.instance.eventNumber;
                 userseq.save();
               }
           });
      next();
    }
  });
};
